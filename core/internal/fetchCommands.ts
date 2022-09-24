import { Command, ICommand, SubCommand } from "@core/command";
import fs from 'fs'
import path, {dirname} from 'path'
import { Collection } from "discord.js";
import { fileURLToPath } from 'url'
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const commandsPath = path.join(__dirname, '..', '..', 'commands');

export async function fetchAllCommands(): Promise<Collection<string, ICommand>> {
    return await fetchCommands(commandsPath)
}

async function fetchCommands(_path: string) {
    const commands = new Collection<string, ICommand>();
    const commandFiles = fs.readdirSync(_path).filter(file => file.endsWith('.js'));

    const coroutines: Promise<void>[] = []

    for (const file of commandFiles) {
        coroutines.push(
            (async () => {
                const filePath = path.join(_path, file);
                const command: ICommand = (await import(filePath)).default;
                command.build(command.builder.setName(file.slice(0, file.length - 3)))
                if (!command || !command.builder || !command.action) {
                    throw new Error(chalk.red(`There is no command exported from '${file}' in '${filePath}' or one of the following properties is missing: builder, action`))
                }
                commands.set(command.name, command);
            })()
        )
    }

    await Promise.all(coroutines)

    return commands
}

export async function fetchAllSubCommands(command_names: string[]) {
    const subCommands = new Collection<string, Collection<string, ICommand>>()

    const coroutines: Promise<void>[] = []

    for (const name of command_names) {
        coroutines.push(
            (async () => {
                const subPath = path.join(commandsPath, name)
                if (!fs.existsSync(subPath)) return;
                subCommands.set(name, await fetchCommands(subPath))
            })()
        )
    }

    await Promise.all(coroutines)

    return subCommands
}

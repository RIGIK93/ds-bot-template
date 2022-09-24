import { SlashCommandBuilder, Routes, SlashCommandSubcommandBuilder} from 'discord.js';
import { REST } from '@discordjs/rest';
import * as dotenv from 'dotenv'
import { fetchAllCommands, fetchAllSubCommands } from '@core/internal/fetchCommands.js'
import chalk from 'chalk'
import assert from 'assert'

dotenv.config()
const { token, clientId } = process.env;

const commands = await fetchAllCommands()
const subCommands = await fetchAllSubCommands(Array.from(commands.keys()))

for (const key of commands.keys()) {
	const command = commands.get(key)
	const _subCommands = subCommands.get(key)
	if (!_subCommands) continue;
	_subCommands.each(cmd => {
		assert(command.builder instanceof SlashCommandBuilder, `Unexpected Builder type at command: '${command.name}'`)
		assert(cmd.builder instanceof SlashCommandSubcommandBuilder, `Unexpected Builder type at subcommand: '${cmd.name}'`)
		command.build(command.builder.addSubcommand(cmd.builder))
	})
	commands.set(key, command)
}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: Array.from(commands.values()).map(c => c.JSON()) })
	.then((data: any) => console.log(chalk.green(`✅ Successfully registered ${data.length} application commands.`)))
	.catch(e => console.error(chalk.red(e)));

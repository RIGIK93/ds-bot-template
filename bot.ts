import * as dotenv from 'dotenv'
dotenv.config()
const { token } = process.env;
import { Client, IntentsBitField as Intents, SlashCommandBuilder, PermissionsBitField } from 'discord.js'
import chalk from 'chalk';
import { Awake, Start, intents } from './startup.js'
import { fetchAllCommands, fetchAllSubCommands } from "@core/internal/fetchCommands.js"


async function main() {
    const client = new Client({
        intents
    })

    const loadedCommands = await fetchAllCommands();
    const loadedSubCommands = await fetchAllSubCommands(Array.from(loadedCommands.keys()))

    client.once('ready', () => {
        console.log(chalk.green('✅ Bot is Ready!'));
        Start(client);
    });
    
    client.on('interactionCreate', async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const { commandName } = interaction;
        
        const command = loadedCommands.get(commandName)
        
        if (command) {
            command.action(interaction, interaction.options)
            
            const subCommands = loadedSubCommands.get(command.name)
            if (subCommands) {
                const subCommand = subCommands.get(interaction.options.getSubcommand()) 
                if (subCommand)
                    subCommand.action(interaction, interaction.options)
            }
                
        } else {
            console.error(chalk.red("❌ Error: Unsupported command executed! Command: " + commandName + ' \nNote: It means that somehow command was registered via discord api, but wasn\'t loaded (hasn\'t been found in \'commands\') directory.'))
            await interaction.reply({
                content: "**Sorry!**\nIt seems like this command is not yet supported...",
                ephemeral: true,
            })
        }
    });

    await Awake(client);

    client.login(token);
}

await main()

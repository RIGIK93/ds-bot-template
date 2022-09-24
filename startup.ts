import { Client, BitFieldResolvable, GatewayIntentsString, IntentsBitField as Intents } from 'discord.js'

// Bot Permissions 
export const intents: BitFieldResolvable<GatewayIntentsString, number> =
    new Intents().add(
        Intents.Flags.Guilds,
        Intents.Flags.DirectMessages)
    


// executes before client login
export async function Awake(client: Client<boolean>) {
}

// executes after client login 
export function Start(client: Client<boolean>) {

}
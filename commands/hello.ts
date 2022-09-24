import { Command } from "@core/command.js";

const cmd = new Command()

cmd.build(b => b.setDMPermission(true).setDescription("Hello World command"))

cmd.onCommand(async i => {
    await i.reply("Hello World!")
})

export default cmd

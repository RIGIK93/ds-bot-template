import { Command } from "@core/command.js";

const cmd = new Command()

cmd.build(b =>
    b.setDMPermission(true)
    .addStringOption(s =>
        s.setName('some-string')
            .setDescription('string to echo')
            .setRequired(true))
    .setDescription('echo command')
)

cmd.onCommand(async (i, o) => {
    const str = o.getString('some-string')
    await i.reply(str)
})

export default cmd;

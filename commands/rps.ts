import { Command } from "@core/command.js";

const cmd = new Command()

cmd.build(b => b.setDMPermission(true).setDescription("Rock Paper Scissors!"))

export default cmd;
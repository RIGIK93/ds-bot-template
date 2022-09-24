import { SubCommand } from "@core/command.js";
import { Turn, RPSResponse, computerGuess, turnToString, isWinner } from '$src/rps.js'

const cmd = new SubCommand()

cmd.build(b => b.setDescription("You look like you deserve respect!"))

cmd.onCommand(i => {
    const aiTurn = computerGuess()
    const whoWon = isWinner(aiTurn, Turn.Rock)
    const response = RPSResponse(whoWon)

    i.reply(`Your choice: **Rock**\nMy Choice: **${turnToString(aiTurn)}**\n\n*${response}*`)
})

export default cmd

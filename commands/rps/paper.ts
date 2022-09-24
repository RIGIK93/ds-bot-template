import { SubCommand } from "@core/command.js";
import { Turn, RPSResponse, computerGuess, turnToString, isWinner } from '$src/rps.js'

const cmd = new SubCommand()

cmd.build(b => b.setDescription("You're free, free like a wind...."))

cmd.onCommand(i => {
    const aiTurn = computerGuess()
    const whoWon = isWinner(aiTurn, Turn.Paper)
    const response = RPSResponse(whoWon)

    i.reply(`Your choice: **Paper**\nMy Choice: **${turnToString(aiTurn)}**\n\n*${response}*`)
})

export default cmd

import { SubCommand } from "@core/command.js";
import { Turn, RPSResponse, computerGuess, turnToString, isWinner } from '$src/rps.js'

const cmd = new SubCommand()

cmd.build(b => b.setDescription("Cut-Cut-Cut! You're full of energy!"))

cmd.onCommand(i => {
    const aiTurn = computerGuess()
    const whoWon = isWinner(aiTurn, Turn.Scissors)
    const response = RPSResponse(whoWon)

    i.reply(`Your choice: **Scissors**\nMy Choice: **${turnToString(aiTurn)}**\n\n*${response}*`)
})

export default cmd

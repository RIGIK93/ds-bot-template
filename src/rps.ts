// Rock paper scissors modules

export enum Turn {
    Rock,
    Paper,
    Scissors
}

/*
_|0|1|2| Player 1
0|D|W|L
--------
1|L|D|W
--------
2|W|L|D

*/
const winPattern = {
    0: 2,
    1: 0,
    2: 1,
}

export enum GameState {
    Win,
    Loss,
    Draw
}

export function computerGuess(): Turn {
    return Math.round(Math.random() * 2)
}

export function isWinner(player1: Turn, player2: Turn): GameState {
    if (player1 == player2) return GameState.Draw

    if (winPattern[player1] == player2) return GameState.Win

    return GameState.Loss
}

export function turnToString(turn: Turn) {
    switch (turn) {
        case Turn.Paper:
            return "Paper"
        
        case Turn.Rock:
            return "Rock"
        
        case Turn.Scissors:
            return "Scissors"
    }
}

export function RPSResponse(/*player: Turn*/hasWon: GameState): string {
    // const computer: Turn = computerGuess()

    switch (/*isWinner(player, computer)*/hasWon) {
        case GameState.Win: {
            return "You won the battle... But I will not give up!"
        }
        case GameState.Draw: {
            return "Nice game, I'll certainly win next time!"
        }
        case GameState.Loss: {
            return "Haha! You LoOOOOose!"
        }
    }
}

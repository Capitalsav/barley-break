import React from 'react';
import Square from './square';
import NewGameButton from './newGameButton'

function getWinningCombination() {
    return [[1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0]]
}

function checkWin(squares) {
    let winCount = 16;
    let counter = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (squares[i][j] === getWinningCombination()[i][j]) {
                counter++;
            }
        }
    }
    return counter === winCount;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: getWinningCombination(),
            isWin: false,
            turn: 0
        }
    }

    handleClick(row, column) {
        if (this.state.squares[row][column] === 0) {
            return;
        } else if (this.state.isWin) {
            return;
        }
        else {
            let zeroI = 0;
            let zeroJ = 0;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (this.state.squares[i][j] === 0) {
                        zeroI = i;
                        zeroJ = j;
                    }
                }
            }

            const result = this.state.squares.slice();
            if (row === zeroI) {
                if (column === zeroJ + 1 || column === zeroJ - 1) {
                    result[zeroI][zeroJ] = result[row][column];
                    result[row][column] = 0

                    this.setState({
                        squares: result.slice(),
                        turn: this.state.turn + 1
                    });
                }
            } else if (column === zeroJ) {
                if (row === zeroI + 1 || row === zeroI - 1) {
                    result[zeroI][zeroJ] = result[row][column];
                    result[row][column] = 0

                    this.setState({
                        squares: result.slice(),
                        turn: this.state.turn + 1
                    });
                }
            }

            if (checkWin(this.state.squares)) {
                this.setState({
                    isWin: true
                })
            }
        }
    }

    handleNewGame() {
        const field = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
        const result = getWinningCombination()
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                while (true) {
                    const rand = field[Math.floor(Math.random() * field.length)];

                    if (rand === -1) {
                        continue;
                    } else {
                        result[i][j] = rand;
                        field[field.indexOf(rand)] = -1;
                        break;
                    }
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (result[i][j] === 0) {
                    result[i][j] = result[3][3];
                    result[3][3] = 0
                }
            }
        }

        this.setState({
            squares: result.slice(),
            isWin: false,
            turn: 0
        });
    }

    renderSquare(row, column) {
        let squareClass = '';
        if (this.state.squares[row][column] === 0) {
            squareClass = 'square-empty'
        } else {
            squareClass = 'square'
        }

        return <Square
            class={squareClass}
            value={this.state.squares[row][column]}
            onClick={() => this.handleClick(row, column)}
        />;
    }

    render() {
        const status = `Turn: ${this.state.turn}`;
        let victory = '';
        if (this.state.isWin) {
            victory = 'VICTORY!!!'
        }

        return (
            <div className="board">
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(0, 3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, 0)}
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}
                </div>
                <NewGameButton onClick={() => this.handleNewGame()} />
                <div className="victory">{victory}</div>
            </div>
        );
    }
}

export default Board
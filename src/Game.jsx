import React from 'react';
import Choice from './Choice';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerChoiceId: undefined,
            playerChoiceName: '',
            computerChoiceId: undefined,
            computerChoiceName: '',
            gameResult: '',
            playerWins: 0,
            computerWins: 0,
        };
        this.choiceList = [
            [0, 'Rock', '🪨'],
            [1, 'Paper', '🧻'],
            [2, 'Scissors', '✂️'],
        ];
    }

    handlePlayerSelection(props) {
        this.setState(
            {
                playerChoiceId: this.choiceList[props.id][0],
                playerChoiceName: this.choiceList[props.id][1],
            },
            () => {
                this.generateComputerSelection();
            }
        );
    }

    generateComputerSelection() {
        let computerChoiceId = Math.floor(
            Math.random() * this.choiceList.length
        );

        this.setState(
            {
                computerChoiceId: computerChoiceId,
                computerChoiceName: this.choiceList[computerChoiceId][1],
            },
            () => {
                this.checkResults();
            }
        );
    }

    checkResults() {
        if (
            (this.state.playerChoiceId + 1) % 3 ===
            this.state.computerChoiceId
        ) {
            this.setState({
                gameResult: 'Computer won',
                computerWins: this.state.computerWins + 1,
            });
        } else if (this.state.playerChoiceId === this.state.computerChoiceId) {
            this.setState({ gameResult: "It's Draw" });
        } else {
            this.setState({
                gameResult: 'Player won',
                playerWins: this.state.playerWins + 1,
            });
        }
    }

    renderChoice(id, name, icon) {
        return (
            <Choice
                onClick={(props) => this.handlePlayerSelection(props)}
                id={parseInt(id)}
                name={name}
                icon={icon}
            ></Choice>
        );
    }

    render() {
        return (
            <div className='game'>
                <div className='selection-panel player'>
                    <h2 className='header'>Make your choice:</h2>
                    <div className='choices'>
                        {this.renderChoice(...this.choiceList[0])}
                        {this.renderChoice(...this.choiceList[1])}
                        {this.renderChoice(...this.choiceList[2])}
                    </div>
                    <div className='game-status'>
                        <div className='selection-status'>
                            The Player has choosen:
                            {' ' + this.state.playerChoiceName}
                        </div>
                        <div className='selection-status'>
                            The Computer has choosen:
                            {' ' + this.state.computerChoiceName}
                        </div>
                        <div className='selection-status'>
                            Game Result:
                            {' ' + this.state.gameResult}
                        </div>
                    </div>
                    <div className='game-stats'>
                        <div>Player Score:{this.state.playerWins}</div>
                        <div>Computer Score:{this.state.computerWins}</div>
                    </div>
                </div>
            </div>
        );
    }
}

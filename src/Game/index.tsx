import * as React from 'react';
import Title from './Title';
import './Game.css';

interface IGameProps {}

interface IGameState {
  hero: string,
  weapon: string,
  level: number,
  gameState: number
}

const GameStateValues = {
  NEW: 1,
  INTRO: 2,
  MAP: 3,
  BATTLE: 4
}

class Game extends React.Component<IGameProps,IGameState> {

  constructor(props:IGameProps){
    super(props);
    this.state = {
      hero: "",
      weapon: "",
      level: 1,
      gameState: GameStateValues.NEW
    }
  }

  public startGame = () => this.setState({ gameState: 2 })

  public render() {
    return (
      <div className="Game">
        <Title startGame={this.startGame} />
        {this.state.gameState === 2 && "START"}
      </div>
    );
  }
}

export default Game;
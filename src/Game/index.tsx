import * as React from 'react';
import Title from './Title';
import Intro from './Intro';
import Map from './Map';
import Battle from './Battle';
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

  public setGamePosition = (gamePosition:number) => {
    if (gamePosition === 0){
      this.setState({
        hero: "",
        weapon: "",
        level: 1,
        gameState: GameStateValues.NEW
      });
    } else {
      this.setState({ gameState: gamePosition });
    }
  }

  public render() {
    return (
      <div className="Game">
        {this.state.gameState === 1 && <Title setPosition={this.setGamePosition} /> }
        {this.state.gameState === 2 && <Intro setPosition={this.setGamePosition} /> }
        {this.state.gameState === 3 && <Map setPosition={this.setGamePosition} /> }
        {this.state.gameState === 4 && <Battle setPosition={this.setGamePosition} />}
      </div>
    );
  }
}

export default Game;
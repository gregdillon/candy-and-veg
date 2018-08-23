import * as React from 'react';
import Title from './Title';
import './Game.css';

interface IGameProps {}

interface IGameState {
  hero: string,
  weapon: string,
  level: number,
  gameStarted: boolean
}

class Game extends React.Component<IGameProps,IGameState> {
  constructor(props:IGameProps){
    super(props);
    this.state = {
      hero: "",
      weapon: "",
      level: 1,
      gameStarted: false
    }
  }

  public startGame = () => this.setState({ gameStarted: true })

  public render() {
    return (
      <div className="Game">
        <Title startGame={this.startGame} />
        {this.state.gameStarted && "START"}
      </div>
    );
  }
}

export default Game;
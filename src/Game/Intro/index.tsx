import * as React from 'react';

interface IIntroProps { 
  setPosition: (positionNumber: number) => void
}

interface IIntroState { }

class Game extends React.Component<IIntroProps, IIntroState> {

  public setGameState = () => this.props.setPosition(3);

  public render() {
    return (
      <div>
        Choose Hero and weapon
        <button onClick={this.setGameState}>Map</button>
      </div>
    );
  }
}

export default Game;
import * as React from 'react';

interface ITitleProps {
  setPosition: (positionNumber:number) => void
}

interface ITitleState { }

class Game extends React.Component<ITitleProps, ITitleState> {

  public setGameState = () => this.props.setPosition(2);

  public render() {
    return (
      <div>
        Candy and Vegetables!
        <button onClick={this.setGameState}>Start</button>
      </div>
    );
  }
}

export default Game;
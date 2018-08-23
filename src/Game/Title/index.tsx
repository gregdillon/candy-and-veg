import * as React from 'react';

interface ITitleProps {
  startGame: () => void
}

interface ITitleState { }

class Game extends React.Component<ITitleProps, ITitleState> {

  public onClick = () => this.props.startGame();

  public render() {
    return (
      <div>
        Candy and Vegetables!
        <button onClick={this.onClick}>Start</button>
      </div>
    );
  }
}

export default Game;
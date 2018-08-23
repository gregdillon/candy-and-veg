import * as React from 'react';

interface IBattleProps {
  setPosition: (positionNumber: number) => void
}

interface IBattleState { }

class Game extends React.Component<IBattleProps, IBattleState> {

  public returnToMap = () => this.props.setPosition(3);

  public render() {
    return (
      <div>
        Battle NOW!!!
        <button onClick={this.returnToMap}>Return to map</button>
      </div>
    );
  }
}

export default Game;
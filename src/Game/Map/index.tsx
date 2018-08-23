import * as React from 'react';
import Map from '../Images/map.png';

interface IMapProps {
  setPosition: (positionNumber: number) => void
}

interface IMapState { }

class Game extends React.Component<IMapProps, IMapState> {

  public setGameState = () => this.props.setPosition(4);

  public render() {
    return (
      <div>
        <img src={Map} alt=""/>
        <button onClick={this.setGameState}>Battle</button>
      </div>
    );
  }
}

export default Game;
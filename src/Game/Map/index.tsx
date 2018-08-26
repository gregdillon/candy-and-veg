import * as React from 'react';
import Map from '../Images/map.png';
import Princess1 from '../Images/princess_1.png'
import Princess2 from '../Images/princess_2.png'
import './map.css';

interface IMapProps {
  setPosition: (positionNumber: number) => void,
  hero: number | null,
  level: number
}

interface IMapState { }

class Game extends React.Component<IMapProps, IMapState> {

  public setGameState = () => this.props.setPosition(4);

  public render() {
    return (
      <div>
        <div className="map">
          <img src={this.props.hero === 1 ? Princess1 : Princess2} className={`map-hero level-${this.props.level}`} alt="Hero" />
          <img src={Map} alt="Map" />
        </div>
        <div className="instructions">
          <span>Instructions here...</span>
        </div>
        <button onClick={this.setGameState}>Battle</button>
      </div>
    );
  }
}

export default Game;
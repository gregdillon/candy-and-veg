import * as React from 'react';
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
      <div className="map-container">
        <div className="map">
          <img src={this.props.hero === 1 ? Princess1 : Princess2} className={`map-hero level-${this.props.level}`} alt="Hero" />
        </div>
        <div className="instructions">
          <h3>Instructions</h3>
          <p>Click on an enemy to attack.</p>
          <p>After every attack ALL enemies will strike back.</p>
          <p>The attacked enemy has a 50% chance of hitting the princess.</p>
          <p>Non-attacked enemies have a 25% chance of hitting the princess.</p>
          <p>Power-ups, if available, must be choosen before battle and can only be used one time.</p>
          <button onClick={this.setGameState}>Battle</button>
        </div>
      </div>
    );
  }
}

export default Game;
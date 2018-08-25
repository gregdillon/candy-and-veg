import * as React from 'react';
import Princess1 from '../Images/princess_1.png'
import Princess2 from '../Images/princess_2.png'
import './battle.css';

interface IBattleProps {
  setPosition: (positionNumber: number) => void,
  hero: number | null,
  level: number,
}

interface IBattleState { }

class Game extends React.Component<IBattleProps, IBattleState> {

  public returnToMap = () => this.props.setPosition(3);

  public render() {
    return (
      <div className={`battle-container battle-level-${this.props.level}`}>
      <div className="hero-container">
        <img src={this.props.hero === 1 ? Princess1 : Princess2} className="hero-img" alt="Hero"/>
      </div>
      <div className="enemy-container">
k
      </div>
        {/* <button onClick={this.returnToMap}>Return to map</button> */}
      </div>
    );
  }
}

export default Game;
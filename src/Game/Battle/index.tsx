import * as React from 'react';
import Enemy from './Enemy';
import Princess1 from '../Images/princess_1.png';
import Princess2 from '../Images/princess_2.png';
import './battle.css';

interface IBattleProps {
  setPosition: (positionNumber: number) => void,
  hero: number | null,
  weapon: number | null;
  level: number,
  heroHealth: number
}

interface IBattleState {
}

interface IEnemy {
  health: number,
  power: number,
  number: number
}

const MAX_ENEMY_HEALTH = 10;
const MAX_ENEMY_POWER = 10;
const NUMBER_OF_ENEMIES = 9;

class Game extends React.Component<IBattleProps, IBattleState> {

  public returnToMap = () => this.props.setPosition(3);

  public generateEnemies = ():IEnemy[] => {
    const enemies:IEnemy[] = [];
    const level = this.props.level;
    let enemyCount = level > 3 ? 3 : level;
    while(enemyCount > 0){
      enemies.push({
        health: Math.floor(Math.random() * MAX_ENEMY_HEALTH) + 1,
        power: Math.floor(Math.random() * MAX_ENEMY_POWER) + 1,
        number: Math.floor(Math.random() * NUMBER_OF_ENEMIES) + 1})
      enemyCount--
    }
    return enemies;
  }

  public render() {
    return (
      <div className={`battle-container battle-level-${this.props.level} weapon-${this.props.weapon}`}>
      <div className="hero-container">
          <div className="hero-health">
            {this.props.heroHealth}
          </div>
        <img src={this.props.hero === 1 ? Princess1 : Princess2} className="hero-img" alt="Hero"/>
      </div>
      <div className="enemies-container">
          {this.generateEnemies().map((enemy, index) =>
            <Enemy
              key={index}
              enemyNumber={enemy.number}
              enemyPower={enemy.power}
              enemeyHealth={enemy.health}
            />)
          }
      </div>
        {/* <button onClick={this.returnToMap}>Return to map</button> */}
      </div>
    );
  }
}

export default Game;
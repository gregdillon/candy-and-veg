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
  heroHealth: number,
  updateHeorHealth: (health:number) => void
}

interface IBattleState {
  enemies: IEnemy[]
}

export interface IEnemy {
  enemyId: number
  health: number,
  power: number,
  number: number
}

const MAX_ENEMY_HEALTH = 10;
const MAX_ENEMY_POWER = 5;
const NUMBER_OF_ENEMIES = 9;

class Game extends React.Component<IBattleProps, IBattleState> {

  constructor(props:IBattleProps) {
    super(props);
    this.state = {
      enemies : []
    }
  }

  public returnToMap = () => this.props.setPosition(3);

  public componentDidMount = () => {
    const generateEnemies = (): IEnemy[] => {
      const enemies: IEnemy[] = [];
      const level = this.props.level;
      let enemyCount = level > 3 ? 3 : level;
      while (enemyCount > 0) {
        enemies.push({
          enemyId: enemyCount,
          health: Math.floor(Math.random() * MAX_ENEMY_HEALTH) + 1,
          power: Math.floor(Math.random() * MAX_ENEMY_POWER) + 1,
          number: Math.floor(Math.random() * NUMBER_OF_ENEMIES) + 1
        })
        enemyCount--
      }
      return enemies;
    }
    this.setState({ enemies: generateEnemies()})
  }

  public updateEnemy = (enemyId:number,health:number) => {
    const enemies = this.state.enemies;
    const enemyToUpdateIndex = enemies.findIndex(e => e.enemyId === enemyId);
    const enemyToUpdate = enemies[enemyToUpdateIndex];
    enemyToUpdate.health = health;
    enemies[enemyToUpdateIndex] = enemyToUpdate;
    this.setState({enemies}, () => this.enemyAttack());
  }

  public livingEnemies = ():IEnemy[] => this.state.enemies.filter(e => e.health > 0);

  public enemyAttack = () => {
    const allEnemies = this.livingEnemies();
    let heroHealth = this.props.heroHealth;
    allEnemies.forEach(enemy => {
      const randomNumber = Math.floor(Math.random() * 2) + 1;
      if(randomNumber === 1) {
        heroHealth = heroHealth - enemy.power;
      }
    });
    this.props.updateHeorHealth(heroHealth);
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
          {this.state.enemies.map(enemy =>
            <Enemy
              key={enemy.enemyId}
              enemy={enemy}
              weaponUsed={this.props.weapon}
              updateHealth={(enemyId,health) => this.updateEnemy(enemyId,health)}
            />)
          }
      </div>
        {/* <button onClick={this.returnToMap}>Return to map</button> */}
      </div>
    );
  }
}

export default Game;
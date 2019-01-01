import * as React from 'react';
// @ts-ignore
import Sound from 'react-sound';
import Enemy from './Enemy';
import Princess1 from '../Images/princess_1.png';
import Princess2 from '../Images/princess_2.png';
import PrincessGhost from '../Images/princess_ghost.png';
import './battle.css';

interface IBattleProps {
  setPosition: (positionNumber: number) => void,
  hero: number | null,
  weapon: number | null;
  level: number,
  heroHealth: number,
  updateHeorHealth: (health:number) => void,
  continue: () => void,
  restart: () => void
}

interface IBattleState {
  enemies: IEnemy[],
  showHit: boolean,
  deadPricessSoundPlayed: boolean
}

export interface IEnemy {
  enemyId: number
  health: number,
  power: number,
  number: number
}

const MAX_ENEMY_HEALTH = 5;
const MAX_ENEMY_POWER = 4;
const NUMBER_OF_ENEMIES = 9;

class Game extends React.Component<IBattleProps, IBattleState> {

  constructor(props:IBattleProps) {
    super(props);
    this.state = {
      enemies: [],
      showHit: false,
      deadPricessSoundPlayed: false
    }
  }

  public returnToMap = () => this.props.setPosition(3);

  public componentDidMount = () => {
    const level = this.props.level;
    const generateEnemies = (): IEnemy[] => {
      const levelEnemies: IEnemy[] = [];
      let enemyCount = level > 3 ? 3 : level;
      while (enemyCount > 0) {
        levelEnemies.push({
          enemyId: enemyCount,
          health: level === 1 ? 5 : Math.floor(Math.random() * MAX_ENEMY_HEALTH) + 1,
          power: level === 1 ? 1 : Math.floor(Math.random() * MAX_ENEMY_POWER) + 1,
          number: Math.floor(Math.random() * NUMBER_OF_ENEMIES) + 1
        })
        enemyCount--
      }
      return levelEnemies;
    }
    const bossEnemies:IEnemy[] = [
      { enemyId: 1, health: 10, power: 10, number: 10 },
      { enemyId: 2, health: 5, power: 5, number: 4 }
    ];
    const enemies = level === 5 ? bossEnemies : generateEnemies()
    this.setState({ enemies })
  }

  public updateEnemy = (enemyId:number,health:number) => {
    const enemies = this.state.enemies;
    const enemyToUpdateIndex = enemies.findIndex(e => e.enemyId === enemyId);
    const enemyToUpdate = enemies[enemyToUpdateIndex];
    enemyToUpdate.health = health;
    enemies[enemyToUpdateIndex] = enemyToUpdate;
    this.setState({ enemies }, () => this.enemyAttack(enemyId));
  }

  public livingEnemies = ():IEnemy[] => this.state.enemies.filter(e => e.health > 0);

  public triggerHit = () => {
    this.setState({ showHit: true }, () => {
      setTimeout(() => {
        this.setState({ showHit: false });
      }, 1000);
    })
  }

  public enemyAttack = (attackedEnemyId:number) => {
    const allEnemies = this.livingEnemies();
    let heroHealth = this.props.heroHealth;
    allEnemies.forEach(enemy => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      const wasAttackedEnemy = enemy.enemyId === attackedEnemyId;
      if (wasAttackedEnemy && randomNumber % 2 === 0) {
        this.triggerHit();
        heroHealth = heroHealth - enemy.power;
      }
      if (!wasAttackedEnemy && randomNumber < 26) {
        this.triggerHit();
        heroHealth = heroHealth - enemy.power;
      }
    });
    this.props.updateHeorHealth(heroHealth);
  }

  public render() {
    return (
      <div className={`battle-container battle-level-${this.props.level} weapon-${this.props.weapon}`}>
        <div className="hero-container">
        {this.props.heroHealth > 0 ?
            <>
              <div className="hero-health">
                {this.props.heroHealth}
                {this.state.showHit && " OUCH"}
                {this.state.showHit &&
                  <Sound url="princessouch.mp3" volume={15} playStatus={this.state.showHit ? Sound.status.PLAYING : Sound.status.STOPPED} onFinishedPlaying={() => this.setState({ showHit: false })} />
                }
                {this.livingEnemies().length === 0 &&
                  <button onClick={() => this.props.continue()}>You Win! Return to Map!</button>
                }
              </div>
              <img src={this.props.hero === 1 ? Princess1 : Princess2} className={`hero-img ${this.state.showHit ? 'was-hit' : ''}`} alt="Hero" />
            </>
          :
            <>
              <div className="hero-health">
                <button onClick={() => this.props.restart()}>You Loose! Start again!</button>
              </div>
              <img src={PrincessGhost} className="princess-ghost" alt="Ghost Princess"/>
              <Sound url="princessahh.mp3" volume={15} playStatus={this.state.deadPricessSoundPlayed ? Sound.status.PLAYING : Sound.status.STOPPED} onFinishedPlaying={() => this.setState({ deadPricessSoundPlayed: true })} />
            </>
        }
        </div>
        <div className="enemies-container">
            {this.state.enemies.map(enemy =>
              <Enemy
                key={enemy.enemyId}
                enemy={enemy}
                weaponUsed={this.props.weapon}
                updateHealth={(enemyId,health) => this.updateEnemy(enemyId,health)}
                enemyAttack={(attackedId) => this.enemyAttack(attackedId)}
                currentLevel={this.props.level}
                heroLost={this.props.heroHealth <= 0}
              />)
            }
        </div>
      </div>
    );
  }
}

export default Game;
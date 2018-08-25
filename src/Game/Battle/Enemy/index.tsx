import * as React from 'react';
import {IEnemy} from '../index'
import Enemy_1 from './Images/broc.png';
import Enemy_2 from './Images/brocolli.png';
import Enemy_3 from './Images/carrot_bros.png';
import Enemy_4 from './Images/the_carrot.png';
import Enemy_5 from './Images/the_punkin.png';
import Enemy_6 from './Images/the_tomato.png';
import Enemy_7 from './Images/tuff_tomato.png';
import Enemy_8 from './Images/two_punkins.png';
import Enemy_9 from './Images/two_tomatos.png';
import './enemy.css';

interface IEnemyProps {
  enemy: IEnemy,
  weaponUsed: number | null,
  updateHealth: (enemyId:number, health:number) => void
}

interface IEnemyState { }

class Enemy extends React.Component<IEnemyProps, IEnemyState> {

  public generateEnemyImage = ():JSX.Element => {
    const enemy = {
      1: Enemy_1,
      2: Enemy_2,
      3: Enemy_3,
      4: Enemy_4,
      5: Enemy_5,
      6: Enemy_6,
      7: Enemy_7,
      8: Enemy_8,
      9: Enemy_9
    }
    return <img onClick={() => this.attacked()} src={enemy[this.props.enemy.number]} alt="enemy" />
  }

  public attacked = () => {
    const weaponUsed = this.props.weaponUsed;
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const evenNumber = randomNumber % 2 === 0;
    const is33Percent = randomNumber === 3 || randomNumber === 5;
    if((weaponUsed === 1 && !evenNumber) || (weaponUsed === 2 && !is33Percent)) {
      // Show miss and then remove after setTimeout
    } else {
      const currentHealth = this.props.enemy.health;
      const newHealth = weaponUsed === 1 ? currentHealth - 1 : currentHealth - 2;
      this.props.updateHealth(this.props.enemy.enemyId, newHealth);
    }
  }

  public render() {
    return (
      <div className="enemy-container">
      {this.props.enemy.health > 0 ?
        <>
          <div className="enemy-health">
            Health: {this.props.enemy.health} Power: {this.props.enemy.power}
          </div>
          {this.generateEnemyImage()}
        </>
        :
        <div>DEAD</div>
      }
      </div>
    );
  }
}

export default Enemy;
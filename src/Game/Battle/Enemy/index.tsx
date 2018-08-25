import * as React from 'react';
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
  enemyNumber: number,
  enemeyPower: number
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
    return <img src={enemy[this.props.enemyNumber]} alt="enemy" />
  }

  public render() {
    return (
      <div className="enemy-container">
        <div className="enemy-power">
          {this.props.enemeyPower}
        </div>
        {this.generateEnemyImage()}
      </div>
    );
  }
}

export default Enemy;
import * as React from 'react';
// @ts-ignore
import Sound from 'react-sound';
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
import Ghost from './Images/ghost.png';
import './enemy.css';

interface IEnemyProps {
  enemy: IEnemy,
  weaponUsed: number | null,
  updateHealth: (enemyId:number, health:number) => void
}

interface IEnemyState {
  showMiss: boolean,
  showHit: boolean
}

class Enemy extends React.Component<IEnemyProps, IEnemyState> {
  public hitTimeOut:any;
  public missTimeOut:any;

  constructor(props:IEnemyProps){
    super(props);
    this.hitTimeOut = null;
    this.missTimeOut = null;
    this.state = {
      showMiss: false,
      showHit: false
    }
  }

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
    return <img onClick={() => this.attacked()} src={enemy[this.props.enemy.number]} className={`${this.state.showHit ? 'was-hit' : ''}`} alt="enemy" />
  }

  public triggerMiss = () => {
    this.setState({showMiss:true},()=>{
      this.missTimeOut = setTimeout(()=>{
        this.setState({showMiss: false});
      },1300);
    })
  }

  public triggerHit = () => {
    this.setState({ showHit: true }, () => {
      this.hitTimeOut = setTimeout(() => {
        this.setState({ showHit: false });
      }, 1300);
    })
  }

  public attacked = () => {
    const weaponUsed = this.props.weaponUsed;
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    const evenNumber = randomNumber % 2 === 0;
    const is33Percent = randomNumber === 3 || randomNumber === 5;
    // @ts-ignore
    clearTimeout(this.hitTimeOut);
    // @ts-ignore
    clearTimeout(this.missTimeOut);
    this.setState({showMiss:false, showHit:false}, () => {
      if ((weaponUsed === 1 && !evenNumber) || (weaponUsed === 2 && !is33Percent)) {
        this.triggerMiss();
      } else {
        this.triggerHit();
        const currentHealth = this.props.enemy.health;
        const newHealth = weaponUsed === 1 ? currentHealth - 1 : currentHealth - 2;
        this.props.updateHealth(this.props.enemy.enemyId, newHealth);
      }
    });
  }

  public render() {
    const enemyIsAlive = this.props.enemy.health > 0 
    return (
      <div className="enemy-container">
        {this.state.showHit &&
          <Sound url={`${enemyIsAlive ? "ouch.mp3" : "ahhh.mp3"}`} volume={50} playStatus={Sound.status.PLAYING} />
        }
        {this.state.showMiss &&
          <Sound url="swoosh.mp3" volume={50} playStatus={Sound.status.PLAYING} />
        }
        {enemyIsAlive ?
        <>
          <div className="enemy-health">
            Health: {this.props.enemy.health} Power: {this.props.enemy.power}
            {this.state.showMiss && " MISS"}
            {this.state.showHit && " HIT"}
          </div>
          {this.generateEnemyImage()}
        </>
        :
        <>
          <img src={Ghost} className="ghost" alt="Ghost"/>
        </>
      }
      </div>
    );
  }
}

export default Enemy;
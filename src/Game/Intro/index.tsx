import * as React from 'react';
import './Intro.css';
import Princess1 from '../Images/princess_1.png';
import Princess2 from '../Images/princess_2.png';
import Ax from '../Images/ax.png'
import Sword from '../Images/sword.png'

interface IIntroProps {
  currentHero: number | null,
  currentWeapon: number | null, 
  setPosition: (positionNumber: number) => void,
  setHero: (heroNumber:number) => void,
  setWeapon: (weaponNumber:number) => void,
}

interface IIntroState { }

class Game extends React.Component<IIntroProps, IIntroState> {

  public setGameState = () => this.props.setPosition(3);

  public heroClicked = (heroNumber: number) => alert(heroNumber)

  public render() {
    const currentHero = this.props.currentHero;
    const currentWeapon = this.props.currentWeapon;
    return (
      <>
      <h3>Choose a hero and weapon!</h3>
      <div className='intro-main'>
        <div className="intro-col">
          <img onClick={() => this.props.setHero(1)} src={Princess1} className={(currentHero && currentHero !== 1) ? 'dim' : ''} alt="Princess 1"/>
        </div>
        <div className="intro-col">
            <img onClick={() => this.props.setHero(2)} src={Princess2} className={(currentHero && currentHero !== 2) ? 'dim' : ''} alt="Princess 2" />
        </div>
        <div className="intro-col">
          <div className="weapon">
              <span className="weapon-data">Power: 1, Hit Chance: 50%</span>
              <img onClick={() => this.props.setWeapon(1)} src={Sword} className={(currentWeapon && currentWeapon !== 1) ? 'dim' : ''} alt="Sword" />
          </div>
          <div className="weapon">
              <span className="weapon-data">Power: 2, Hit Chance: 33%</span>
              <img onClick={() => this.props.setWeapon(2)} src={Ax} className={(currentWeapon && currentWeapon !== 2) ? 'dim' : ''} alt="Ax" />
          </div>
        </div>
      </div>
        <button disabled={!this.props.currentHero || !this.props.currentWeapon} onClick={this.setGameState}>Map</button>
      </>
    );
  }
}

export default Game;
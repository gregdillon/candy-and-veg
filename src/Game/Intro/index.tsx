import * as React from 'react';
import './Intro.css';
import Princess1 from '../Images/princess_1.png'
import Princess2 from '../Images/princess_2.png'
import Ax from '../Images/ax.png'
import Sword from '../Images/sword.png'

interface IIntroProps { 
  setPosition: (positionNumber: number) => void
}

interface IIntroState { }

class Game extends React.Component<IIntroProps, IIntroState> {

  public setGameState = () => this.props.setPosition(3);

  public heroClicked = (heroNumber: number) => alert(heroNumber)

  public render() {
    return (
      <>
      <h3>Choose a hero and weapon!</h3>
      <div className='intro-main'>
        <div className="intro-col">
          <img src={Princess1} alt="Princess 1"/>
        </div>
        <div className="intro-col">
            <img src={Princess2} alt="Princess 2" />
        </div>
        <div className="intro-col">
          <div className="weapon">
              <img src={Sword} alt="Sword" />
          </div>
          <div className="weapon">
              <img src={Ax} alt="Ax" />
          </div>
        </div>
      </div>
        <button onClick={this.setGameState}>Map</button>
      </>
    );
  }
}

export default Game;
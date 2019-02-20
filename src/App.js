import React, { Component } from 'react';
import './App.css';
import Board from "./Board"

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>Game of Life Help</h1>
          Welcome to the Help function for Paul's React app of Conway's Game
          of Life! Check out wikipedia for a full description of the "game".
          <br/>
          Press Advance to move the game forward one 'tick.'<br/>
          Press the Play/Pause button to have the game keep ticking
          automatically. Speed can only be changed when the game is paused.<br/>
          Pressing Randomize Cells will give each cell a random value. Adjust
          the percentage to change how many cells (on average) are alive.<br/>
          Presets: currently only one preset configuration, the Gosper Glider
          Gun, is available. <br/>
          Lastly, there are a few cosmetic selections at the bottom. Enjoy!<br/>
          See the code on&nbsp;
          <a href="https://github.homedepot.com/Pxd8hr9/small-life-game">
          Github</a> <br/>
          <button onClick={this.props.closePopup}>Close Help</button>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  render() {
    return (
      <div className="App">
        <div>
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
          Conway's Game of Life
        </a>
        <button onClick={this.togglePopup.bind(this)}>
          Help
        </button>
        </div>
        <div>
          {this.state.showPopup ?
            <Popup
              closePopup={this.togglePopup.bind(this)}
            />
            : null
          }
        </div>
        <Board/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Board from "./Board"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="App">
        <div>
        <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">
          Conway's Game of Life
        </a>
        </div>
        <Board/>
      </div>
    );
  }
}

export default App;

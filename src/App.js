import React, { Component } from 'react';
import './App.css';
import Board from "./components/Board"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //squares: Array(10).fill(Array(10).fill(null))
    };
  }
  render() {
    return (
      <div className="App">
        <div>
        Conways Game of Life
        </div>
        <Board/>
      </div>
    );
  }
}

export default App;

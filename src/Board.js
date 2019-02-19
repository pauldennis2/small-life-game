import React from "react"
import update from 'immutability-helper';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import './App.css';
var cloneDeep = require('lodash.clonedeep');

const SIZE = 50;

function Square(props) {
  const style = {
    border: props.gridStyle
  };
  if (props.value === true) {
    style.backgroundColor = props.aliveColor;
  } else {
    style.backgroundColor = props.deadColor;
  }

  return (
    <button className="square" onClick={props.onClick} style={style}/>
  );
}

//Tells us whether a given index is safe to check
function indexIsSafe (i, j) {
  return i >= 0 && j >= 0 && i <= (SIZE - 1) && j <= (SIZE - 1);
}

function arraysAreTheSame (origSquares, newSquares) {
  for (var i = 0; i < SIZE; i++) {
    for (var j = 0; j < SIZE; j++) {
      if (newSquares[i][j] !== origSquares[i][j]) {
        return false;
      }
    }
  }
  return true;
}

//Determines whether a cell lives or dies based on number of living neighbors
function evaluateCell (isAlive, livingNeighbors) {
  if (isAlive) {
    return (livingNeighbors === 2 || livingNeighbors === 3);
  } else {
    return livingNeighbors === 3;
  }
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    var array = new Array(SIZE);
    for (var i = 0; i < SIZE; i++) {
      array[i] = new Array(SIZE).fill(false);
    }
    this.state = {
      squares: array,
      interval: null,
      ticksPerSecond: 1,
      percentToRandomize: 5,
      nextAction: 'Play',
      nextActionIcon: <FaPlay/>,
      aliveColor: '#000000',
      deadColor: '#ffffff',
      gridVisible: true
    };
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handlePercentRandomChange = this.handlePercentRandomChange.bind(this);
    this.handleAliveColorChange = this.handleAliveColorChange.bind(this);
    this.handleDeadColorChange = this.handleDeadColorChange.bind(this);
  }

  renderSquare(i, j) {
    return (
      <Square
        value={this.state.squares[i][j]}
        onClick={() => this.handleSquareClick(i, j)}
        deadColor={this.state.deadColor}
        aliveColor={this.state.aliveColor}
        gridStyle={this.state.gridVisible ? '1px solid #999' : '0px solid #999'}
      />
    );
  }

  handleSquareClick = (i, j) => {
    const squares = this.state.squares.slice();

    if (squares[i][j] === true) {
      squares[i][j] = false;
    } else {
      squares[i][j] = true;
    }

    this.setState({
      squares: squares,
      noChange: false
    });
  }

  handleSpeedChange = (event) => {
    this.setState({ticksPerSecond: event.target.value});
  }

  handlePercentRandomChange = (event) => {
    this.setState({percentToRandomize: event.target.value});
  }

  handleAliveColorChange = (event) => {
    this.setState({aliveColor: event.target.value});
  }

  handleDeadColorChange = (event) => {
    this.setState({deadColor: event.target.value});
  }

  toggleGrid = (event) => {
    if (this.state.gridVisible) {
      this.setState({
        gridVisible: false
      });
    } else {
      this.setState({
        gridVisible: true
      });
    }
  }

  hasNeighborAt = (i, j) => {
    if (indexIsSafe(i, j)) {
      if (this.state.squares[i][j]) {
        return 1;
      }
    }
    return 0;
  };

  countLiveNeighbors = (i, j) => {
      var neighborCount = 0;

      //Check all 8 adjacent neighbors:
      /**
      (i-1, j-1)   (i-1, j)    (i-1, j+1)
      (i, j-1)      (me)       (i, j+1)
      (i+1, j-1)   (i+1, j)    (i+1, j+1)
      */
      neighborCount += this.hasNeighborAt(i-1, j-1);
      neighborCount += this.hasNeighborAt(i-1, j);
      neighborCount += this.hasNeighborAt(i-1, j+1);
      neighborCount += this.hasNeighborAt(i, j-1);
      neighborCount += this.hasNeighborAt(i, j+1);
      neighborCount += this.hasNeighborAt(i+1, j-1);
      neighborCount += this.hasNeighborAt(i+1, j);
      neighborCount += this.hasNeighborAt(i+1, j+1);

      return neighborCount;
  }

  //On each tick we have to iterate over each cell and decide
  //if it lives or dies based on the game rules.
  doTick = () => {

    /*
    This optimization is really just for practice. It DOES allow the non-ticks
    to happen a lot faster... but this doesn't really do anything for "actual"
    performance. i.e. when nothing's going on, optimization is meh.

    TODO: Add optimization to determine when board is in a cycle
    */
    if (this.state.noChange) {
      console.log("Board is in static state. !Skipping tick logic.");
      return;
    }
    const newSquares = cloneDeep(this.state.squares); //Copy for new data
    const origSquares = cloneDeep(this.state.squares); //Keep a clean copy
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        newSquares[i][j] = evaluateCell(origSquares[i][j],
           this.countLiveNeighbors(i, j, origSquares));
      }
    }

    if (arraysAreTheSame(origSquares, newSquares)) {
      this.setState({
        noChange: true
      });
    }

    this.setState({
      squares: newSquares
    });
  }

  clearSquares = () => {
    //TODO: refactor to use something more efficient like Arrays.fill
    const newSquares = this.state.squares.slice();
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        newSquares[i][j] = false;
      }
    }

    this.setState({
      squares: newSquares,
      noChange: false
    });
  }

  makeGliderGun = () => {
    this.clearSquares();
    const newSquares = this.state.squares.slice();
    //Source/credit: https://en.wikipedia.org/wiki/Gun
    //_(cellular_automaton)#/media/File:Game_of_life_glider_gun.svg
    //Leftmost square
    newSquares[5][1] = true;
    newSquares[5][2] = true;
    newSquares[6][1] = true;
    newSquares[6][2] = true;

    //Left bouncer
    newSquares[5][11] = true;
    newSquares[6][11] = true;
    newSquares[7][11] = true;

    newSquares[8][12] = true;
    newSquares[9][13] = true;
    newSquares[9][14] = true;

    newSquares[4][12] = true;
    newSquares[3][13] = true;
    newSquares[3][14] = true;

    newSquares[6][15] = true;

    newSquares[4][16] = true;
    newSquares[5][17] = true;
    newSquares[6][17] = true;
    newSquares[6][18] = true;
    newSquares[7][17] = true;
    newSquares[8][16] = true;

    //Right bouncer

    newSquares[3][21] = true;
    newSquares[4][21] = true;
    newSquares[5][21] = true;
    newSquares[3][22] = true;
    newSquares[4][22] = true;
    newSquares[5][22] = true;

    newSquares[6][23] = true;
    newSquares[2][23] = true;

    newSquares[1][25] = true;
    newSquares[2][25] = true;
    newSquares[6][25] = true;
    newSquares[7][25] = true;

    //Rightmost square
    newSquares[3][35] = true;
    newSquares[4][35] = true;
    newSquares[3][36] = true;
    newSquares[4][36] = true;


    this.setState({
      squares: newSquares,
      noChange: false
    });
  }

  randomize = () => {
    //Can use slice here instead of cloneDeep because each square is independent
    const newSquares = this.state.squares.slice();
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        newSquares[i][j] = Math.random() < (this.state.percentToRandomize / 10);
      }
    }

    this.setState({
      squares: newSquares,
      noChange: false
    });
  }

  togglePlay = () => {
    if (this.state.nextAction === 'Play') {
      this.startTicks();
    } else if (this.state.nextAction === 'Pause') {
      this.stopTicks();
    } else {
      alert("Error: this.state.nextAction is unexpected value: "
      + this.state.nextAction);
    }
  }

  startTicks = () => {
    var rate = 1000 / this.state.ticksPerSecond;
    this.setState({
      interval: setInterval(this.doTick, rate),
      nextAction: 'Pause',
      nextActionIcon: <FaPause/>
    });
    this.refs.ticksPerSecond.disabled = true;
  }

  stopTicks = () => {
    clearInterval(this.state.interval);
    this.setState({
      interval: null,
      nextAction: 'Play',
      nextActionIcon: <FaPlay/>
    });
    this.refs.ticksPerSecond.disabled = false;
  }

  render () {
    var board = [];
    //Create a two-dimensional array of Squares of size SIZE
    for (var i = 0; i < SIZE; i++) {
      var row = [];
      for (var j = 0; j < SIZE; j++) {
        row.push(this.renderSquare(i, j));
      }
      var rowDiv = <div className="board-row">{row}</div>;
      board.push(rowDiv);
    }

    return (
      <div>
        <div>
          {board}
        </div>
        <div className="speedDiv">
          Game Speed/Flow {this.state.noChange ? 'STUCK' : ''}
          <br/>
          <button onClick={this.doTick}>
          Advance
          </button>
          <button onClick={this.togglePlay} className="toggleButton">
            {this.state.nextActionIcon} {this.state.nextAction}
          </button>
          Ticks Per Second:
          <input type="number"
          value={this.state.ticksPerSecond}
          onChange={this.handleSpeedChange}
          ref="ticksPerSecond"/>
        </div>
        <hr/>
        <div className="randomizeDiv">
          <button onClick={this.randomize}>
          Randomize Cells
          </button>
          Percent of Cells Starting Alive:
          <input type="number"
          value={this.state.percentToRandomize}
          onChange={this.handlePercentRandomChange}
          className="right-align"/>
          0%
        </div>
        <hr/>
        <div className="presetsDiv">
          Presets:
          <button onClick={this.makeGliderGun}>
          Glider Gun
          </button>
          <button onClick={this.clearSquares}>
          Clear
          </button>
        </div>
        <hr/>
        <div className="cosmeticsDiv">
          <button onClick={this.toggleGrid}>
          Toggle Grid
          </button>
          <br/>
          <input type="color" defaultValue="#ffffff"
            onChange={this.handleDeadColorChange}>
          </input>
          Dead Cell Color (Background)
          <br/>
          <input type="color" defaultValue="#000000"
            onChange={this.handleAliveColorChange}>
          </input>
          Alive Cell Color
        </div>
      </div>
    );
  }
}

export default Board;

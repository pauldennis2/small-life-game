import React from "react"
import update from 'immutability-helper';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
var cloneDeep = require('lodash.clonedeep');


function Square(props) {
  const whiteBg = {
    backgroundColor: props.bgColor
  };
  const blackBg = {
    backgroundColor: props.fgColor
  };
  var style;
  if (props.value === true) {
    style = blackBg;
  } else {
    style = whiteBg;
  }

  return (
    <button className="square" onClick={props.onClick} style={style}/>
  );

}

const SIZE = 50;

function indexIsSafe (i, j) {
  return i >= 0 && j >= 0 && i <= (SIZE - 1) && j <= (SIZE - 1);
}

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
      foregroundColor: '#000000',
      backgroundColor: '#ffffff'
    };
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handlePercentRandomChange = this.handlePercentRandomChange.bind(this);
    this.handleForegroundColorChange = this.handleForegroundColorChange.bind(this);
    this.handleBackgroundColorChange = this.handleBackgroundColorChange.bind(this);
  }

  renderSquare(i, j) {
    //console.log(i + ", " + j + " = " + this.state.squares[i][j]);
    return (
      <Square
        value={this.state.squares[i][j]}
        onClick={() => this.handleSquareClick(i, j)}
        key={i + ", " + j}
        bgColor={this.state.backgroundColor}
        fgColor={this.state.foregroundColor}
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
      squares: squares
    });
  }

  handleSpeedChange = (event) => {
    this.setState({ticksPerSecond: event.target.value});
  }

  handlePercentRandomChange = (event) => {
    this.setState({percentToRandomize: event.target.value});
  }

  handleForegroundColorChange = (event) => {
    this.setState({foregroundColor: event.target.value});
  }

  handleBackgroundColorChange = (event) => {
    this.setState({backgroundColor: event.target.value});
  }

  toggleGrid = (event) => {
    console.log("toggling grid (but not really)...");
  }

  hasNeighborAt = (i, j) => {
    const board = this.state.squares.slice();
    if (indexIsSafe(i, j)) {
      if (board[i][j]) {
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
    const newSquares = cloneDeep(this.state.squares); //Copy for new data
    const origSquares = cloneDeep(this.state.squares); //Keep a clean copy
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        newSquares[i][j] = evaluateCell(origSquares[i][j],
           this.countLiveNeighbors(i, j, origSquares));
      }
    }

    this.setState({
      squares: newSquares
    });
  }

  clearSquares = () => {
    //TODO: refactor to use something more efficient like Arrays.fill
    console.log("Clearing squares...");
    const newSquares = this.state.squares.slice();
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        newSquares[i][j] = false;
      }
    }

    this.setState({
      squares: newSquares
    });
  }

  makeGliderGun = () => {
    console.log("attempting to make a glider gun...");
    this.clearSquares();
    console.log("For now making a simple cross");
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
      squares: newSquares
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
      squares: newSquares
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
    var rows = [];
    //Create a two-dimensional array of Squares of size SIZE
    for (var i = 0; i < SIZE; i++) {

      var squares = [];
      for (var j = 0; j < SIZE; j++) {
        squares.push(this.renderSquare(i, j));
      }
      var col = <div className="board-row">{squares}</div>;
      rows.push(col);
    }
    const align = {
      textAlign: 'right'
    };
    const toggleStyle = {
      width: '80px'
    };
    return (
      <div>
        <div>
          {rows}
        </div>
        <div className="speedDiv">
          Game Speed/Flow
          <br/>
          <button onClick={this.doTick}>
          Advance
          </button>
          <button onClick={this.togglePlay} style={toggleStyle}>
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
          style={align}/>
          0%
        </div>
        <hr/>
        <div className="presetsDiv">
          Presets:
          <button onClick={this.makeGliderGun}>
          Glider Gun
          </button>
        </div>
        <hr/>
        <div className="cosmeticsDiv">
          <button onClick={this.toggleGrid}>
          Toggle Grid
          </button>
          <br/>
          <input type="color" defaultValue="#ffffff"
            onChange={this.handleBackgroundColorChange}>
          </input>
          Dead Cell Color (Background)
          <br/>
          <input type="color" defaultValue="#000000"
            onChange={this.handleForegroundColorChange}>
          </input>
          Alive Cell Color
        </div>
      </div>
    );
  }
}

export default Board;

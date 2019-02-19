import React from "react"
import update from 'immutability-helper';
var cloneDeep = require('lodash.clonedeep');


function Square(props) {
  const whiteBg = {
    backgroundColor: 'white'
  };
  const blackBg = {
    backgroundColor: 'black'
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
      percentToRandomize: 5
    };
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.handlePercentRandomChange = this.handlePercentRandomChange.bind(this);
    console.log(this.state.squares);
  }

  renderSquare(i, j) {
    //console.log(i + ", " + j + " = " + this.state.squares[i][j]);
    return (
      <Square
        value={this.state.squares[i][j]}
        onClick={() => this.handleSquareClick(i, j)}
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

  startTicks = () => {
    console.log("in startTicks");
    if (this.state.interval === null) {
      console.log("Starting interval");
      var rate = 1000 / this.state.ticksPerSecond;
      this.setState({
        interval: setInterval(this.doTick, rate)
      })
    }
  }

  stopTicks = () => {
    console.log("in stopTicks");
    if (this.state.interval !== null) {
      console.log("stopping interval");
      clearInterval(this.state.interval);
      this.setState({
        interval: null
      })
    }
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
    return (
      <div>
        <div>
          {rows}
        </div>
        <div class="speedDiv">
          Game Speed/Flow
          <br/>
          <button onClick={this.doTick}>
          Advance
          </button>
          <button onClick={this.startTicks}>
          Play
          </button>
          <button onClick={this.stopTicks}>
          Pause
          </button>
          Ticks Per Second:
          <input type="number"
          value={this.state.ticksPerSecond}
          onChange={this.handleSpeedChange} />
        </div>
        <hr/>
        <div class="randomizeDiv">
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
        <div class="presetsDiv">
          Presets:
          <button onClick={this.makeGliderGun}>
          Glider Gun
          </button>
        </div>
        <hr/>
        <div class="cosmeticsDiv">
          <button onClick={this.removeGrid}>
          Remove Grid
          </button>
        </div>
      </div>
    );
  }
}

export default Board;

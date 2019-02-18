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
      squares: array
    };
    console.log(this.state.squares);
  }

  renderSquare(i, j) {
    //console.log(i + ", " + j + " = " + this.state.squares[i][j]);
    return (
      <Square
        value={this.state.squares[i][j]}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }

  handleClick= (i, j) => {
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
        newSquares[i][j] = evaluateCell(origSquares[i][j], this.countLiveNeighbors(i, j, origSquares));
      }
    }

    this.setState({
      squares: newSquares
    });
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
    return (
      <div>
        <div>
          {rows}
        </div>
        <button onClick={this.doTick}>
        Advance
        </button>
      </div>
    );
  }
}

export default Board;

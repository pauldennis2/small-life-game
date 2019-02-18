import React from "react"
import update from 'immutability-helper';
var cloneDeep = require('lodash.clonedeep');
//import Square from "./Square"


function Square(props) {
  const whiteBg = {
    backgroundColor: 'white'
  };
  const blackBg = {
    backgroundColor: 'black'
  };
  const redBg = {
    backgroundColor: 'red'
  };
  const blueBg = {
    backgroundColor: 'blue'
  };
  const greenBg = {
    backgroundColor: 'green'
  };
  const yellowBg = {
    backgroundColor: 'yellow'
  };
  var style;
  if (props.value === true) {
    style = blackBg;
  } else if (props.value === 'highlight-r') {
    style = redBg;
  } else if (props.value === 'highlight-b') {
    style = blueBg;
  } else if (props.value === 'highlight-g') {
    style = greenBg;
  } else if (props.value === 'highlight-y') {
    style = yellowBg;
  } else {
    style = whiteBg;
  }

  /*if (props.value === true) {
    return (
      <button className="square" onClick={props.onClick} style={blackBg}/>
    );
  } else if (props.value === 'highlight-r') {
    return (
      <button className="square" onClick={props.onClick} style={redBg}/>
    );
  } else if (props.value === 'highlight-b') {
    return (
      <button className="square" onClick={props.onClick} style={blueBg}/>
    );
  } else if (props.value === 'highlight-g') {
    return (
      <button className="square" onClick={props.onClick} style={greenBg}/>
    );
  } else if (props.value === 'highlight-y') {
    return (
      <button className="square" onClick={props.onClick} style={yellowBg}/>
    );
  } else {
    return (
      <button className="square" onClick={props.onClick} style={whiteBg}/>
    );
  }*/

  return (
    <button className="square" onClick={props.onClick} style={style}/>
  );

}

function checkIndex (i, j) {
  return i >= 0 && j >= 0 && i <= 9 && j <= 9;
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
    var array = new Array(10);
    for (var i = 0; i < 10; i++) {
      array[i] = new Array(10).fill(false);
    }
    array[0][1] = true;
    array[1][1] = true;
    //array[0][0] = true;
    //array[1][0] = true;
    array[2][1] = true;
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

  highlightClick = (i, j) => {
    console.log("highlighting Click at " + i + ", " + j);

    const squares = this.state.squares.slice();

    squares[i-1][j-1] = 'highlight-r';
    squares[i-1][j]   = 'highlight-g';
    squares[i-1][j+1] = 'highlight-b';

    squares[i][j-1]   = 'highlight-y';
    squares[i][j] = true;
    squares[i][j+1]   = 'highlight-y';

    squares[i+1][j-1] = 'highlight-r';
    squares[i+1][j]   = 'highlight-g';
    squares[i+1][j+1] = 'highlight-b';

    /*
    this.setState({
      squares: squares
    });*/
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

  countLiveNeighbors = (i, j) => {
      const board = this.state.squares.slice();
      var neighborCount = 0;
      if (checkIndex(i-1, j-1)) {
        if (board[i-1][j-1]) {
          neighborCount++;
        }
      }
      if (checkIndex(i-1, j)) {
        if (board[i-1][j]) {
          neighborCount++;
        }
      }
      if (checkIndex(i-1, j+1)) {
        if (board[i-1][j+1]) {
          neighborCount++;
        }
      }
      if (checkIndex(i, j - 1)) {
        if (board[i][j-1]) {
          neighborCount++;
        }
      }
      if (checkIndex(i, j+1)) {
        if (board[i][j+1]) {
          neighborCount++;
        }
      }
      if (checkIndex(i+1, j-1)) {
        if (board[i+1][j-1]) {
          neighborCount++;
        }
      }
      if (checkIndex(i+1, j)) {
        if (board[i+1][j]) {
          neighborCount++;
        }
      }
      if (checkIndex(i+1, j+1)) {
        if (board[i+1][j+1]) {
          neighborCount++;
        }
      }
      return neighborCount;
  }

  countLiveNeighborsAndLog = (i, j) => {
    const board = this.state.squares.slice();
    console.log(i + ", " + j);
    if (board[i][j]) {
      console.log("(Alive)");
    } else {
      console.log("(Dead)");
    }
    var neighborCount = 0;
    if (checkIndex(i-1, j-1)) {
      console.log("\tChecking " + (i-1) + ", " + (j-1))
      if (board[i-1][j-1]) {
        neighborCount++;
        console.log("\tFound live neighbor at " + (i-1) + ", " + (j-1));
      }
    }
    if (checkIndex(i-1, j)) {
      console.log("\tChecking " + (i-1) + ", " + (j))
      if (board[i-1][j]) {
        neighborCount++;
        console.log("\tFound live neighbor at " + (i-1) + ", " + (j));
      }
    }
    if (checkIndex(i-1, j+1)) {
      console.log("\tChecking " + (i-1) + ", " + (j+1));
      if (board[i-1][j+1]) {
        neighborCount++;
        console.log("\tFound live neighbor at " + (i-1) + ", " + (j+1));
      }
    }
    if (checkIndex(i, j - 1)) {
      console.log("\tChecking " + (i) + ", " + (j-1));
      if (board[i][j-1]) {
        neighborCount++;
        console.log("\tFound live neighbor at " + (i) + ", " + (j-1));
      }
    }
    if (checkIndex(i, j+1)) {
      console.log("\tChecking " + (i) + ", " + (j+1));
      if (board[i][j+1]) {
        neighborCount++;
        console.log("\tFound live neighbor at " + (i) + ", " + (j+1));
      }
    }
    if (checkIndex(i+1, j-1)) {
      console.log("\tChecking " + (i+1) + ", " + (j-1))
      if (board[i+1][j-1]) {
        neighborCount++;
        console.log("\tFound live neighbor at " + (i+1) + ", " + (j-1));
      }
    }
    if (checkIndex(i+1, j)) {
      console.log("\tChecking " + (i+1) + ", " + (j));
      if (board[i+1][j]) {
        neighborCount++;
        console.log("\tFound live neighbor at " + (i+1) + ", " + (j));
      }
    }
    if (checkIndex(i+1, j+1)) {
      console.log("\tChecking " + (i+1) + ", " + (j+1));
      if (board[i+1][j+1]) {
        neighborCount++;
        console.log("\tFound live neighbor at " + (i+1) + ", " + (j+1));
      }
    }
    //console.log("countLiveNeighbors(" + i + ", " + j + ") returning: " + neighborCount);
    return neighborCount;
  }

  doTick = () => {
    const newSquares = cloneDeep(this.state.squares);
    const origSquares = cloneDeep(this.state.squares);
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        newSquares[i][j] = evaluateCell(origSquares[i][j], this.countLiveNeighbors(i, j, origSquares));
      }
    }

    this.setState({
      squares: newSquares
    });
  }
  render () {
    return (
      <div>
        <div>
          <div className="board-row">
            {this.renderSquare(0, 0)}
            {this.renderSquare(0, 1)}
            {this.renderSquare(0, 2)}
            {this.renderSquare(0, 3)}
            {this.renderSquare(0, 4)}
            {this.renderSquare(0, 5)}
            {this.renderSquare(0, 6)}
            {this.renderSquare(0, 7)}
            {this.renderSquare(0, 8)}
            {this.renderSquare(0, 9)}
          </div>
          <div className="board-row">
            {this.renderSquare(1, 0)}
            {this.renderSquare(1, 1)}
            {this.renderSquare(1, 2)}
            {this.renderSquare(1, 3)}
            {this.renderSquare(1, 4)}
            {this.renderSquare(1, 5)}
            {this.renderSquare(1, 6)}
            {this.renderSquare(1, 7)}
            {this.renderSquare(1, 8)}
            {this.renderSquare(1, 9)}
          </div>
          <div className="board-row">
            {this.renderSquare(2, 0)}
            {this.renderSquare(2, 1)}
            {this.renderSquare(2, 2)}
            {this.renderSquare(2, 3)}
            {this.renderSquare(2, 4)}
            {this.renderSquare(2, 5)}
            {this.renderSquare(2, 6)}
            {this.renderSquare(2, 7)}
            {this.renderSquare(2, 8)}
            {this.renderSquare(2, 9)}
          </div>
          <div className="board-row">
            {this.renderSquare(3, 0)}
            {this.renderSquare(3, 1)}
            {this.renderSquare(3, 2)}
            {this.renderSquare(3, 3)}
            {this.renderSquare(3, 4)}
            {this.renderSquare(3, 5)}
            {this.renderSquare(3, 6)}
            {this.renderSquare(3, 7)}
            {this.renderSquare(3, 8)}
            {this.renderSquare(3, 9)}
          </div>
          <div className="board-row">
            {this.renderSquare(4, 0)}
            {this.renderSquare(4, 1)}
            {this.renderSquare(4, 2)}
            {this.renderSquare(4, 3)}
            {this.renderSquare(4, 4)}
            {this.renderSquare(4, 5)}
            {this.renderSquare(4, 6)}
            {this.renderSquare(4, 7)}
            {this.renderSquare(4, 8)}
            {this.renderSquare(4, 9)}
          </div>
          <div className="board-row">
            {this.renderSquare(5, 0)}
            {this.renderSquare(5, 1)}
            {this.renderSquare(5, 2)}
            {this.renderSquare(5, 3)}
            {this.renderSquare(5, 4)}
            {this.renderSquare(5, 5)}
            {this.renderSquare(5, 6)}
            {this.renderSquare(5, 7)}
            {this.renderSquare(5, 8)}
            {this.renderSquare(5, 9)}
          </div>
          <div className="board-row">
            {this.renderSquare(6, 0)}
            {this.renderSquare(6, 1)}
            {this.renderSquare(6, 2)}
            {this.renderSquare(6, 3)}
            {this.renderSquare(6, 4)}
            {this.renderSquare(6, 5)}
            {this.renderSquare(6, 6)}
            {this.renderSquare(6, 7)}
            {this.renderSquare(6, 8)}
            {this.renderSquare(6, 9)}
          </div>
          <div className="board-row">
            {this.renderSquare(7, 0)}
            {this.renderSquare(7, 1)}
            {this.renderSquare(7, 2)}
            {this.renderSquare(7, 3)}
            {this.renderSquare(7, 4)}
            {this.renderSquare(7, 5)}
            {this.renderSquare(7, 6)}
            {this.renderSquare(7, 7)}
            {this.renderSquare(7, 8)}
            {this.renderSquare(7, 9)}
          </div>
          <div className="board-row">
            {this.renderSquare(8, 0)}
            {this.renderSquare(8, 1)}
            {this.renderSquare(8, 2)}
            {this.renderSquare(8, 3)}
            {this.renderSquare(8, 4)}
            {this.renderSquare(8, 5)}
            {this.renderSquare(8, 6)}
            {this.renderSquare(8, 7)}
            {this.renderSquare(8, 8)}
            {this.renderSquare(8, 9)}
          </div>
          <div className="board-row">
            {this.renderSquare(9, 0)}
            {this.renderSquare(9, 1)}
            {this.renderSquare(9, 2)}
            {this.renderSquare(9, 3)}
            {this.renderSquare(9, 4)}
            {this.renderSquare(9, 5)}
            {this.renderSquare(9, 6)}
            {this.renderSquare(9, 7)}
            {this.renderSquare(9, 8)}
            {this.renderSquare(9, 9)}
          </div>
        </div>
        <button onClick={this.doTick}>
        Advance
        </button>
      </div>
    );
  }
}

export default Board;

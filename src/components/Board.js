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

const SIZE = 50;

function checkIndex (i, j) {
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

  doTick = () => {
    const newSquares = cloneDeep(this.state.squares);
    const origSquares = cloneDeep(this.state.squares);
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

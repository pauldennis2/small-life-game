import React from "react"
//import Square from "./Square"


function Square(props) {
  if (props.value === true) {
    return (
      <button className="square" onClick={props.onClick}>
        X
      </button>
    );
  } else {
    return (
      <button className="square" onClick={props.onClick}>
        O
      </button>
    );
  }

}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(10).fill(Array(10).fill(false))
    };
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
  handleClick(i, j) {
    const squares = this.state.squares.slice();
    console.log("Before:")
    console.log(squares);
    /*
    if (squares[i][j] === true) {

      squares[i][j] = false;
    } else {
      squares[i][j] = true;
    }*/
    // squares[5][5] = true;
    console.log("After:")

    this.setState({
      squares: squares
    });
    console.log(squares);
    //this.state.squares[i][j] = !this.state.squares[i][j];
    /*alert("Click at " + i + ", " + j + ".\n" +
      "State is now: " + this.state.squares[i][j]);*/
  }
  render () {
    return (
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
    );
  }
}

export default Board;

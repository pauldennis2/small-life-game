import React from "react"

class Square extends React.Component {

  constructor(props) {
    super(props);
  }

  render (props) {
    /*
    if (this.props.value === true) {
      return (
        <button className="square" onClick={this.props.onClick}>
          X
        </button>
      );
    } else {
      return (
        <button className="square" onClick={this.props.onClick}>
          O
        </button>
      );
    }
    */
    return (
      <button className="square" onClick={this.props.onClick}>
        {props.value}
      </button>
    )
  }
}

export default Square;

import React from "react";

export default class AnimateBoardMovement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetPosition: 0
    };
  }

  componentDidMount() {
    this.setState(
      {
        targetPosition: this.props.targetPosition
      },
      () => {
        this.updatePosition(this.props.currentPosition);
      }
    );
  }

  updatePosition = currentPosition => {
    if (currentPosition < this.state.targetPosition) {
      currentPosition++;
      this.props.updatePosition(currentPosition);
      setTimeout(() => {
        this.updatePosition(currentPosition);
      }, 1000);
    } else {
      this.props.completeBoardMovement();
    }
  };
  render() {
    return null;
  }
}

import React from "react";

export default class AnimateBoardMovement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetPosition: 0
    };
  }

  /**
   * When component mounts, the current position is constantly
   * made progress to the target position. Mounts every time
   * a new player is using their turn.
   */
  componentDidMount() {
    this.setState({ targetPosition: this.props.targetPosition }, () => {
      this.updatePosition(this.props.currentPosition);
    });
  }

  /**
   * CORE piece of functionality for moving players around the board.
   * This updates player position in redux container, which then
   * pushes the new postion down the component tree to the gameboard
   * which gives the impression that the player is 'moving' once a
   * 1 second delay has expired.
   *
   * @param currentPosition current position of the player (day X)
   */
  updatePosition = currentPosition => {
    if (currentPosition < this.state.targetPosition) {
      currentPosition++;
      this.props.updatePosition(currentPosition);
      setTimeout(() => {
        this.updatePosition(currentPosition);
      }, 1000);
    } else if (currentPosition > this.state.targetPosition) {
      currentPosition--;
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

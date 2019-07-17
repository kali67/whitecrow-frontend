import React from "react";
import styled from "styled-components";

import avatarImage from "../static/image/avatar.png";

const AvatarWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 50%;
  display: flex;
  background-image: url(${props => props.image});
  height: 35px;
  width: 35px;
  background-size: cover;
  &:hover {
    opacity: 0.8;
  }
  ${({ active }) =>
    active &&
    `transform: scale(0.9);
  `}
  cursor: pointer;
`;

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressing: false
    };
  }
  render() {
    return (
      <AvatarWrapper
        onMouseDown={() => this.setState({ pressing: true })}
        onMouseUp={() => this.setState({ pressing: false })}
        image={avatarImage}
        active={this.state.pressing}
      />
    );
  }
}

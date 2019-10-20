import React from "react";
import styled from "styled-components";

import avatarImage from "../../static/image/avatar.png";

const AvatarWrapper = styled.div`
  border: 1.2px solid grey;
  border-radius: 50%;
  display: flex;
  background-image: url(${props => props.image});
  height: 30px;
  width: 30px;
  background-size: cover;
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

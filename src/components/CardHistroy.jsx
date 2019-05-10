import React from "react";
import styled from "styled-components";
import { borderRadius, colors, gridSize, math, themed } from "@atlaskit/theme";

import Card from "./Card";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%
  margin-top: 5%;
  overflow-y: scroll;
`;

const CardSizeWrapper = styled.div`
  width: 200px;
  margin: 2%
  height: 250px;
`;

const Content = styled.div`
  align-items: center;
  background-color: ${themed({ light: colors.N20, dark: colors.DN10 })};
  border-radius: ${borderRadius}px;
  color: ${colors.subtleText};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 4em;
  font-weight: 500;
  justify-content: center;
  margin-bottom: ${gridSize}px;
  margin-top: ${math.multiply(gridSize, 2)}px;
  padding: ${math.multiply(gridSize, 4)}px;
`;

export default class CardHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.isMail ? this.props.userPlayer.mail : this.props.userPlayer.op
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps != this.props) {
      if (nextProps.isMail) {
        this.setState({ cards: nextProps.userPlayer.mail });
      } else {
        this.setState({ cards: nextProps.userPlayer.op });
      }
    }
  }

  render() {
    if (this.state.cards.length == 0) {
      return (
        <Content>
          <h4>Nothing to display!</h4>
          <h6>{`The ${
            this.props.isMail ? "mail" : "oppourtunity"
          } cards that you have collected are shown here.`}</h6>
        </Content>
      );
    }
    return (
      <CardContainer>
        {this.state.cards.map(card => {
          return (
            <CardSizeWrapper>
              <Card card={card} small={true} />
            </CardSizeWrapper>
          );
        })}
      </CardContainer>
    );
  }
}

import React from "react";
import styled from "styled-components";
import { borderRadius, colors, gridSize, math, themed } from "@atlaskit/theme";
import { Translate } from "react-localize-redux";

import Card from "./Card";

export default class CardHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.isMail ? this.props.mail : this.props.opportunity
    };
  }

  /**
   * Gathers cards to be displayed in the
   * card history tabs from props. Can either be
   * MAIL or OPPORTUNITY.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (nextProps.isMail) {
        this.setState({ cards: nextProps.mail });
      } else {
        this.setState({ cards: nextProps.opportunity });
      }
    }
  }

  render() {
    if (this.state.cards.length === 0) {
      return (
        <Content>
          <h4>
            <Translate id="empty-display" />
          </h4>
          <p>
            {this.props.isMail ? (
              <Translate id="empty-info-tab-mail" />
            ) : (
              <Translate id="empty-info-tab-op" />
            )}
          </p>
        </Content>
      );
    }
    return (
      <CardContainer>
        {this.state.cards.map((card, index) => {
          return (
            <CardSizeWrapper key={index + card["title"]}>
              <Card card={card} key={card["title"] + index} small={true} />
            </CardSizeWrapper>
          );
        })}
      </CardContainer>
    );
  }
}

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
  height: auto;
`;

const Content = styled.div`
  align-items: center;
  background-color: ${themed({ light: colors.N20, dark: colors.DN10 })};
  border-radius: ${borderRadius}px;
  color: ${colors.subtleText};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-weight: 500;
  justify-content: center;
  margin-bottom: ${gridSize}px;
  margin-top: ${math.multiply(gridSize, 2)}px;
  padding: ${math.multiply(gridSize, 4)}px;
`;

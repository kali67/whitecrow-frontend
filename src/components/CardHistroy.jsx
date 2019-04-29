import React from "react";
import styled from "styled-components";

import Card from "./Card";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%
  overflow-y: scroll;
`;

const CardSizeWrapper = styled.div`
  width: 200px;
  margin: 2%
  height: 250px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5%;
  margin-bottom: 5%;
`;

const NoDataPanel = () => {
  return (
    <Content>
      <h4>No data yet :(</h4>
    </Content>
  );
};

export default class CardHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.isMail
        ? this.props.userPlayer.mail
        : this.props.userPlayer.op
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
      return <NoDataPanel />;
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

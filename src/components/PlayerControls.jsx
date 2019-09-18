import React from "react";
import styled from "styled-components";
import { Translate } from "react-localize-redux";

import Button from "@atlaskit/button";
import Tabs from "@atlaskit/tabs";
import CardHistroy from "./CardHistroy";
import PlayerTurnTracker from "./PlayerTurnTracker";
import coin from "../static/image/coin.png";
import calendar from "../static/image/calendar.png";

const PlayerOrderWrapper = styled.div`
  display: flex;
  min-width: 10%;
  padding-right: 2%;
  flex-direction: column;
`;

const LargeIcon = styled.div`
  background-image: url(${props => props.image});
  height: 40px;
  width: 35px;
  margin-right: 10px;
  background-size: cover;
`;

const PlayerControlContainer = styled.div`
  min-height: 375px;
  display: flex;
  flex-direction: row;
  padding: 2%;
  margin-bottom: 3%;
  border-radius: 1%;
  border: 2px solid #e1e1e1;
`;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 2%;
  min-width: 50%;
  border-left: 1px dashed #e1e1e1;
`;

export default class PlayerControls extends React.Component {
  calculatePlayerDayFromTurn = () => {
    if (!this.props.usersPlayerUpdated || !this.props.showEndTurnUpdate) {
      return this.props.userPlayer.day;
    }
    if (this.props.showEndTurnUpdate) {
      return this.props.usersPlayerUpdated["currentDay"];
    }
  };

  render() {
    return (
      <PlayerControlContainer>
        <PlayerOrderWrapper>
          <b
            style={{
              marginBottom: "8%",
              textDecoration: "underline",
              textAlign: "center"
            }}
          >
            <Translate id="play-order" />
          </b>
          <PlayerTurnTracker
            userPlayerId={this.props.userPlayer.id}
            players={this.props.players}
            playerTurn={this.props.playerTurn}
          />
        </PlayerOrderWrapper>
        <PlayerInfoView
          username={this.props.userPlayer["username"]}
          money={this.props.userPlayer["money"]}
          day={this.props.userPlayer["day"]}
          rollDie={this.props.rollDie}
          rolledDisabled={!this.props.isSinglePlayersTurn}
          isLoadingRoll={this.props.isLoadingRoll}
        />
      </PlayerControlContainer>
    );
  }
}

const RollDiceBtnWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconText = styled.div`
  color: ${props => props.color};
  margin-top: 8px;
`;

const ActiveRollButtonStyle = {
  height: "22%",
  width: "100%",
  justifyContent: "center",
  background: "#36B37E"
};
const DisabledRollButtonStyle = {
  height: "22%",
  width: "100%",
  justifyContent: "center"
};

const getMoneyTextColor = money => {
  if (money > 800) {
    return "#36B37E";
  } else if (money < 200) {
    return "#BF2600";
  }
  return "#FF8B00";
};

const PlayerInfoView = ({
  money,
  day,
  rollDie,
  rolledDisabled,
  isLoadingRoll
}) => {
  return (
    <PlayerInfoContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "5%"
        }}
      >
        <TextWrapper>
          <LargeIcon image={coin} />
          <IconText color={getMoneyTextColor(money)}>
            <h4>${money}</h4>
          </IconText>
        </TextWrapper>
        <TextWrapper>
          <LargeIcon image={calendar} />
          <IconText color="black">
            <Translate>
              {({ translate }) => <h4>{translate("day", { day: day })}</h4>}
            </Translate>
          </IconText>
        </TextWrapper>
      </div>

      <RollDiceBtnWrapper>
        <Button
          style={
            rolledDisabled ? DisabledRollButtonStyle : ActiveRollButtonStyle
          }
          onClick={e => rollDie()}
          appearance="primary"
          isDisabled={rolledDisabled}
          isLoading={isLoadingRoll}
        >
          <Translate id="roll-die" />
        </Button>
      </RollDiceBtnWrapper>
    </PlayerInfoContainer>
  );
};

const tabs = props => {
  return [
    {
      label: <Translate id="mail-tab" />,
      content: <CardHistroy {...props} isMail={true} />
    },
    {
      label: <Translate id="oppourtunity-tab" />,
      content: <CardHistroy {...props} isMail={false} />
    }
  ];
};
export class CardHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: this.props.mail,
      opportunity: this.props.opportunity
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.mail.length !== this.props.mail.length ||
      nextProps.opportunity.length !== this.props.opportunity.length
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return <Tabs tabs={tabs(this.state)} />;
  }
}

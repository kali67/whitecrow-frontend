import React from "react";
import styled from "styled-components";

import Button from "@atlaskit/button";
import Tabs from "@atlaskit/tabs";
import CardHistroy from "./CardHistroy";
import InvestmentHistory from "./InvestmentHistory";
import PlayerTurnTracker from "./PlayerTurnTracker";
import coin from "../static/image/coin.png";
import calendar from "../static/image/calendar.png";

const PlayerOrderWrapper = styled.div`
  display: flex;
  min-width: 10%;
  padding-right: 2%;
  flex-direction: column;
  text-align: center;
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
  constructor(props) {
    super(props);
    this.state = {
      rolledDisabled: !this.props.isSinglePlayersTurn
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSinglePlayersTurn != this.props.isSinglePlayersTurn) {
      this.setState({ rolledDisabled: prevProps.isSinglePlayersTurn });
    }
  }

  calculatePlayersMoneyFromTurn = () => {
    if (!this.props.usersPlayerUpdated || !this.props.hasFinishedTurnAnimation) {
      return this.props.userPlayer.money;
    }
    if (this.props.hasFinishedTurnAnimation) {
      return this.props.userPlayer.money + this.props.usersPlayerUpdated["moneyDifference"];
    }
  };

  render() {
    return (
      <PlayerControlContainer>
        <PlayerOrderWrapper>
          <b style={{ marginBottom: "15%", textDecoration: "underline" }}>Player Order</b>
          <PlayerTurnTracker
            userPlayerId={this.props.userPlayer.id}
            players={this.props.players}
            playerTurn={this.props.playerTurn}
          />
        </PlayerOrderWrapper>
        <PlayerInfoView
          username={this.props.userPlayer["username"]}
          money={this.calculatePlayersMoneyFromTurn()}
          day={this.props.userPlayer.day}
          rollDie={this.props.rollDie}
          rolledDisabled={this.state.rolledDisabled}
          isLoadingRoll={this.props.isLoadingRoll}
          showHelpModal={this.props.showHelpModal}
        />
      </PlayerControlContainer>
    );
  }
}

const HelpIcon = styled.div`
  text-decoration: bold;
  background: #108ee9;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid #108ee9;
  width: 25px;
  height: 25px;
  &:hover {
    border: 1px solid #0847a6;
    cursor: grab;
  }
`;

const HelpIconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

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
const DisabledRollButtonStyle = { height: "22%", width: "100%", justifyContent: "center" };

const getMoneyTextColor = money => {
  if (money > 800) {
    return "#36B37E";
  } else if (money < 200) {
    return "#BF2600";
  }
  return "#FF8B00";
};

const PlayerInfoView = ({
  username,
  money,
  day,
  rollDie,
  rolledDisabled,
  isLoadingRoll,
  showHelpModal
}) => {
  return (
    <PlayerInfoContainer>
      <HelpIconWrapper>
        <HelpIcon
          onClick={e => {
            showHelpModal();
          }}>
          ?
        </HelpIcon>
      </HelpIconWrapper>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <TextWrapper>
          <LargeIcon image={coin} />
          <IconText color={getMoneyTextColor(money)}>
            <h4>${money}</h4>
          </IconText>
        </TextWrapper>
        <TextWrapper>
          <LargeIcon image={calendar} />
          <IconText color="black">
            <h4>Day {day}</h4>
          </IconText>
        </TextWrapper>
      </div>

      <RollDiceBtnWrapper>
        <Button
          style={rolledDisabled ? DisabledRollButtonStyle : ActiveRollButtonStyle}
          onClick={e => rollDie()}
          appearance="primary"
          isDisabled={rolledDisabled}
          isLoading={isLoadingRoll}>
          Roll Dice
        </Button>
      </RollDiceBtnWrapper>
    </PlayerInfoContainer>
  );
};

const tabs = props => {
  return [
    { label: "Mail Cards", content: <CardHistroy {...props} isMail={true} /> },
    {
      label: "Oppourtunities Taken",
      content: <CardHistroy {...props} isMail={false} />
    },
    { label: "Cashflows", content: <InvestmentHistory {...props} /> }
  ];
};

export const CardHolder = props => {
  return <Tabs tabs={tabs(props)} />;
};
import React from "react";
import styled from "styled-components";
import Tile, {IndicatedTileWrapper} from "./Tile";

const Counter = styled.div`
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  color: black;
  border: 1px solid white;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  font-family: "Patrick Hand", cursive;
  background-color: white;
  display: flex;
  flex-direction: row;
  margin: 2px;
`;

const CounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export default class PlayerPositionTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingDetails: false
    };
  }

  onClick = e => {
    e.preventDefault();
    this.setState({ showingDetails: !this.state.showingDetails });
  };

  playerCounters = () => {
    return this.props.players.map((element, i) => {
      return <Counter key={i}>{element.id}</Counter>;
    });
  };

  render() {
    if (!this.state.showingDetails) {
      return (
        <IndicatedTileWrapper onClick={e => this.onClick(e)} inputColor={this.props.color}>
          <CounterContainer>{this.playerCounters()}</CounterContainer>
        </IndicatedTileWrapper>
      );
    } else {
      return <Tile {...this.props} onClick={e => this.onClick(e)} isPlayerTile={true} />; //override onclick
    }
  }
}

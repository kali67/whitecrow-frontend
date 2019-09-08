import React from "react";
import styled from "styled-components";
import Tile, { IndicatedTileWrapper } from "./Tile";
import { connect } from "react-redux";

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

class PlayerPositionTile extends React.Component {
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

  createNameTags = (players) => {
    return players.map((player) => {
      let fullUsername = player["username"];
      let endRange = 4;
      if (fullUsername.length < endRange){
        endRange = fullUsername.length - 1
      }
      return [fullUsername.slice(0, endRange).toUpperCase(), player.id]
    });


  };

  playerCounters = () => {
    return this.createNameTags(this.props.players).map((element, i) => {
      let idName = element[0];
        if (this.props.userPlayerId === element[1]){
          idName = <p style={{color: "purple", fontWeight: "900", fontSize: "1.2em"}}>YOU</p>
        }
      return <Counter key={i}>{idName}</Counter>;
    });
  };

  render() {
    if (!this.state.showingDetails) {
      return (
        <IndicatedTileWrapper
          onClick={e => this.onClick(e)}
          inputColor={this.props.color}
        >
          <CounterContainer>{this.playerCounters()}</CounterContainer>
        </IndicatedTileWrapper>
      );
    } else {
      return (
        <Tile
          {...this.props}
          onClick={e => this.onClick(e)}
          isPlayerTile={true}
        />
      ); //override onclick
    }
  }
}

const mapStateToProps = state => ({
  userPlayerId: state.user.player["id"]
});

export default connect(mapStateToProps)(PlayerPositionTile)

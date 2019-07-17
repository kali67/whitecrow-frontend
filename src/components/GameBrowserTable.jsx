import React from "react";
import TableTree, { Headers, Header, Rows, Row, Cell } from "@atlaskit/table-tree";
import axios from "axios";

export default class GameBrowserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }

  componentDidMount() {
    axios
      .get("/game", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
      .then(response => {
        let games = response.data;
        let tableData = [];
        for (var i = 0; i < games.length; i++) {
          let row = {
            id: games[i]["id"],
            type: games[i]["type"],
            status: games[i]["status"],
            rounds: games[i]["numberRounds"],
            players: games[i]["maxPlayers"],
            joinGame: this.joinGame
          };
          tableData.push(row);
        }
        this.setState({ tableData: tableData });
      });
  }

  joinGame = (e, gameId) => {
    e.preventDefault();
    this.props.history.push(`/game/${gameId}`);
  };

  render() {
    return (
      <React.Fragment>
        <h1>Game Browser</h1>
        <TableTree>
          <Headers>
            <Header width={350}>Type</Header>
            <Header width={350}>Status</Header>
            <Header width={250}>No. Rounds</Header>
            <Header width={250}>No. Players</Header>
            <Header width={100} />
          </Headers>
          <Rows
            items={this.state.tableData}
            render={({ id, type, status, rounds, players, joinGame }) => (
              <Row itemId={id}>
                <Cell>{type}</Cell>
                <Cell>{status}</Cell>
                <Cell>{rounds}</Cell>
                <Cell>{players}</Cell>
                <Cell>
                  <button className="btn-success float-right" onClick={e => joinGame(e, id)}>
                    Join
                  </button>
                </Cell>
              </Row>
            )}
          />
        </TableTree>
      </React.Fragment>
    );
  }
}

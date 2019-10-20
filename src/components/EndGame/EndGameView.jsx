import React from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import styled from "styled-components";
import Modal from "react-modal";
import Button from "@atlaskit/button";

import whitecrow from "../../static/image/whitecrow.png";

Modal.setAppElement("#root");

const CenteredCellText = styled.div`
  text-align: center;
`;

const createContentKey = player => {
  return player["id"] + player["username"];
};

const findPlayerRank = (allPlayersInGame, id) => {
  for (let i = 0; i < allPlayersInGame.length; i++) {
    if (allPlayersInGame[i]["id"] === id) {
      return i + 1;
    }
  }
};

const HomeButtonStyle = {
  justifyContent: "center",
  background: "#36B37E",
  height: "50px",
  width: "100px",
  alignSelf: "flex-end"
};

const calculatePlacing = rank => {
  switch (rank) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    case 4:
      return "4th";
    case 5:
      return "5th";
    case 6:
      return "6th";
  }
};

const EndGameView = ({ gameData, userPlayerId, goHome }) => {
  let allPlayersInGame = gameData["players"];
  allPlayersInGame.sort((a, b) => b.score - a.score);
  let userRank = findPlayerRank(allPlayersInGame, userPlayerId);
  return (
    <Modal isOpen={true} style={customStyles}>
      <ModalLeaderboardWrapper>
        <Whitecrow image={whitecrow} />
        <h2 style={{ fontWeight: "800" }}>
          Congratulations, you placed {calculatePlacing(userRank)}!
        </h2>
        <DynamicTable
          head={createHead(true)}
          rows={rows(allPlayersInGame)}
          loadingSpinnerSize="large"
          isLoading={false}
          isFixedSize
          defaultSortKey="term"
          defaultSortOrder="ASC"
          onSort={() => console.log("onSort")}
          onSetPage={() => console.log("onSetPage")}
        />
        <div>
          <Button style={HomeButtonStyle} appearance="primary" onClick={() => goHome()}>
            Home
          </Button>
        </div>
      </ModalLeaderboardWrapper>
    </Modal>
  );
};

export default EndGameView;

const Whitecrow = styled.div`
  background-image: url(${props => props.image});
  width: 16%;
  height: 22%;
  background-size: cover;
`;

const ModalLeaderboardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const customStyles = {
  content: {
    height: "80%",
    width: "60%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255, 1)",
    borderWidth: "0px",
    padding: "0px",
    overflow: "hidden"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.75)"
  }
};

const createHead = withWidth => {
  return {
    cells: [
      {
        key: "rank",
        content: <CenteredCellText>{"Rank"}</CenteredCellText>,
        isSortable: false,
        width: withWidth ? 15 : undefined
      },
      {
        key: "username",
        content: <CenteredCellText>{"Username"}</CenteredCellText>,
        isSortable: false,
        width: withWidth ? 25 : undefined
      },
      {
        key: "score",
        content: <CenteredCellText>{"Score"}</CenteredCellText>,
        isSortable: false,
        width: withWidth ? 25 : undefined
      },
      {
        key: "cards",
        content: <CenteredCellText>{"Mail Cards Received"}</CenteredCellText>,
        isSortable: false,
        width: withWidth ? 25 : undefined
      },
      {
        key: "opCards",
        content: <CenteredCellText>{"Opportunities Taken"}</CenteredCellText>,
        isSortable: false,
        width: withWidth ? 25 : undefined
      }
    ]
  };
};

const rows = allPlayersInGame => {
  return allPlayersInGame.map(player => {
    return {
      key: player["id"],
      cells: [
        {
          key: "test",
          content: (
            <CenteredCellText>{findPlayerRank(allPlayersInGame, player["id"])}</CenteredCellText>
          )
        },
        {
          key: createContentKey(player),
          content: <CenteredCellText>{player["username"]}</CenteredCellText>
        },
        {
          key: createContentKey(player),
          content: <CenteredCellText>{player["score"]}</CenteredCellText>
        },
        {
          key: createContentKey(player),
          content: <CenteredCellText>{player["mailCards"].length}</CenteredCellText>
        },
        {
          key: createContentKey(player),
          content: <CenteredCellText>{player["opportunityCards"].length}</CenteredCellText>
        }
      ]
    };
  });
};

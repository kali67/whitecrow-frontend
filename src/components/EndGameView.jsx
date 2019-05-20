import React from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import styled from "styled-components";
import Modal from "react-modal";
import racepattern from "../static/image/racepattern.png";
Modal.setAppElement("#root");

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
    backgroundColor: "rgba(237,235,235, 1)",
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

const CenteredCellText = styled.div`
  text-align: center;
`;

const createContentKey = player => {
  return player["id"] + player["username"];
};

const findPlayerRank = (allPlayersInGame, player) => {
  return allPlayersInGame.indexOf(player) + 1;
};

const rows = gameData => {
  let allPlayersInGame = gameData["players"];
  allPlayersInGame.sort((a, b) => b.score - a.score);
  return allPlayersInGame.map(player => {
    return {
      key: player["id"],
      cells: [
        {
          key: "test",
          content: <CenteredCellText>{findPlayerRank(allPlayersInGame, player)}</CenteredCellText>
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

const TableWrapper = styled.div`
  display: flex;
  height: 70%;
  padding: 20px;
`;

const EndGameScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PlacementHeader = styled.div`
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalLeaderboardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  flex-direction: column
  height: 100%;
`;

const Banner = styled.div`
  background-image: url(${props => props.image});
  min-height: 45px;
  width: 100%;
  background-size: 255px 160px;
  background-repeat: repeat-x;
`;

const EndGameView = ({ gameData }) => (
  <Modal isOpen={true} style={customStyles}>
    <ModalLeaderboardWrapper>
      <EndGameScreenWrapper>
        <Banner image={racepattern} />
        <PlacementHeader>
          <h1>Congratulations, you placed 1st!</h1>
        </PlacementHeader>
        <TableWrapper>
          <DynamicTable
            head={createHead(true)}
            rows={rows(gameData)}
            loadingSpinnerSize="large"
            isLoading={false}
            isFixedSize
            defaultSortKey="term"
            defaultSortOrder="ASC"
            onSort={() => console.log("onSort")}
            onSetPage={() => console.log("onSetPage")}
          />
        </TableWrapper>
      </EndGameScreenWrapper>
    </ModalLeaderboardWrapper>
  </Modal>
);

export default EndGameView;

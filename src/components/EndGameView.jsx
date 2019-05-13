import React from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import styled from "styled-components";
import SectionMessage from "@atlaskit/section-message";

const createHead = withWidth => {
  return {
    cells: [
      {
        key: "rank",
        content: "Rank",
        isSortable: true,
        width: withWidth ? 25 : undefined
      },
      {
        key: "username",
        content: "Username",
        isSortable: false,
        width: withWidth ? 25 : undefined
      },
      {
        key: "score",
        content: "Score",
        isSortable: false,
        width: withWidth ? 25 : undefined
      },
      {
        key: "money",
        content: "Money",
        isSortable: false,
        width: withWidth ? 25 : undefined
      }
    ]
  };
};

const createContentKey = player => {
  return player["id"] + player["username"];
};

const rows = players => {
  return players.map(player => {
    return {
      key: player["id"],
      cells: [
        {
          key: "test",
          content: player["rank"]
        },
        {
          key: createContentKey(player),
          content: player["username"]
        },
        {
          key: createContentKey(player),
          content: player["score"]
        },
        {
          key: createContentKey(player),
          content: `$ ${player["money"]}`
        }
      ]
    };
  });
};

const TableWrapper = styled.div`
  max-width: 600px;
  margin-top: 200px;
`;

const style = {
  display: "flex",
  flowDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const EndGameView = ({ gameData }) => (
  <div style={style}>
    <SectionMessage appearance="confirmation">
      <p>From the angle of the mountain</p>
      <p>To the sand on our island shore</p>
      <p>I{"'"}ve been here before</p>
    </SectionMessage>
    <TableWrapper>
      <h4>Leaderboard</h4>
      <DynamicTable
        head={createHead()}
        rows={rows(gameData["leaderboard"])}
        loadingSpinnerSize="large"
        isLoading={false}
        isFixedSize
        defaultSortKey="term"
        defaultSortOrder="ASC"
        onSort={() => console.log("onSort")}
        onSetPage={() => console.log("onSetPage")}
      />
    </TableWrapper>
  </div>
);

export default EndGameView;

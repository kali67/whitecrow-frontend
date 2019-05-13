import React from "react";
import { storiesOf } from "@storybook/react";
import CardController from "../src/components/CardController";
import EndGameView from "../src/components/EndGameView";

let card = {
  category: "People",
  title: "This is a test title!",
  action: "Pay $100",
  subTitle: "Situation",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla ligula eros, vitae dapibus urna laoreet quis. Duis finibus tempus purus, vitae dapibus urna laoreet quis. "
};

let mockedData = {
  leaderboard: [
    {
      rank: 1,
      score: 1000,
      money: 12500,
      username: "HappyDeer",
      numberMailCards: 3,
      numberOppourtunityCards: 5
    },
    {
      rank: 2,
      score: 950,
      money: 1750,
      username: "SleepySloth",
      numberMailCards: 5,
      numberOppourtunityCards: 1
    },
    {
      rank: 3,
      score: 605,
      money: 1000,
      username: "RoseSee",
      numberMailCards: 5,
      numberOppourtunityCards: 1
    },
    {
      rank: 4,
      score: 300,
      money: -75,
      username: "FriendlyHedgehog",
      numberMailCards: 5,
      numberOppourtunityCards: 1
    }
  ]
};

storiesOf("Card-Modal", module)
  .add("Requires Decision", () => {
    return <CardController card={card} requiresDecision={true} />;
  })
  .add("Show Decision", () => {
    return <CardController card={card} decision="ACCEPTED" />;
  })
  .add("End Game", () => {
    return <EndGameView gameData={mockedData} />;
  });

import React from "react";
import { storiesOf } from "@storybook/react";
import CardController from "../src/components/CardController";

let card = {
  category: "People",
  title: "This is a test title!",
  action: "Pay $100",
  subTitle: "Situation",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla ligula eros, vitae dapibus urna laoreet quis. Duis finibus tempus purus, vitae dapibus urna laoreet quis. "
};

storiesOf("Card-Modal", module)
  .add("Requires Decision", () => {
    return <CardController card={card} requiresDecision={true} />;
  })
  .add("Show Decision", () => {
    return <CardController card={card} decision="ACCEPTED" />;
  });

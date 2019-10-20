import React from "react";
import { storiesOf } from "@storybook/react";
import CardController from "../src/components/Card/CardController";
import Provider from "./provider";

let card = {
  categoryDescription: "People (Organization)",
  title: "\"Process-itis\"",
  action: "Pay $250",
  subTitle: "Situation",
  color:"#008000",
  description:
    "In this organization everything has to be done following a process that was defined years ago. Currently nobody remembers why the things are done this way."
};



storiesOf("Card-Modal", module)
  .addDecorator(story => <Provider story={story()} />)
  .add("Requires Decision", () => {
    return <CardController card={card} requiresDecision={true} />;
  })
  .add("Show Decision", () => {
    return <CardController card={card} decision="ACCEPTED" />;
  })
  .add("Mail", () => {
    return <CardController card={card} isMail cardCancelled/>;
  });

import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { borderRadius } from "polished";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    height: "65%",
    width: "65vw",
    top: "50%",
    left: "52%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderWidth: "0px",
    overflow: "hidden"
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.9)"
  }
};

const ModalBody = styled.div`
  overflow-y: scroll;
  padding: 3%;
  display: flex;
  flex-direction: column;
  background: white;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  align-items: flex-start;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
`;

const ModalContent = styled.div`
  heigh: 80%;
`;

export default class HelpModal extends React.Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.closeHelpModal}
        style={customStyles}>
        <ModalBody>
          <ModalHeader>
            <h1>Rules of White Crow</h1>
          </ModalHeader>
          <ModalHeader>
            <h4>What could go wrong in a software project?</h4>
          </ModalHeader>
          <ModalContent>
            Game Before beginning the first month of the project (first round),
            each player receives a one time initial payment of $1,000 and
            decides their banking policy. Then each player rolls the dice and
            the person with the highest score starts the game, with the next
            player to throw the dice being the player to their right. 1. When a
            player gets to the square Email, they get a corresponding card and
            must follow the instructions on the card, which is either “Pay” or
            “Receive”. If the email’s instructions say “per month”, the
            indicated to pay quantity must be multiplied by the number of month
            the player is in. 2. When a player gets to the square Improvement
            Opportunity, they take a corresponding card from the pile
            improvement opportunity. The player then decides if they buy it or
            not. Each Improvement Op- portunity card cancels emails that belong
            to the same category as indicated in the card. These categories can
            be visually differentiated by the color of the cards email. 3. When
            a player gets to the square Bonus, they get the indicated bonus.
            This type of squares has a positive effect for the player. 4. When a
            player gets to the square Expenses, they must cover the in- dicated
            expenses. This type of squares has a negative effect for the player.
            5. When a player gets to the square Last minute change, all players
            must go back one square and follow the instructions on the square
            they landed. If when moving backwards, a player happens to get to
            the square Last minute change, the players move back again and
            follow the instructions corresponding to the second movement back
            only. 6. When a player gets to the square A new CEO in the company,
            all players put $100. The money is stored until the player who gets
            a 6 when rolling the dice collects all the money. 7. When a player
            gets to the square Special offer, they get a 50 % discount on all
            the expenses that come from Expenses and emails during the next two
            weeks. 8. The Day of White Crow each player must:
          </ModalContent>
        </ModalBody>
      </Modal>
    );
  }
}

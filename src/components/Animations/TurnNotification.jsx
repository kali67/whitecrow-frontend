import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

/**
 * Notification for players turns. This is a fullscreen modal
 * with players username as text.
 * @param props text used to display on the turn notification
 */
const TurnNotification = props => {
  return (
    <Modal isOpen={true} style={customStyles}>
      <ModalBody>
        <ModalText>{props.text}</ModalText>
      </ModalBody>
    </Modal>
  );
};

export default TurnNotification;
Modal.setAppElement("#root");

export const ModalText = styled.h1`
  font-size: 80px;
  color: #fff;
  text-align: center;
  font-weight: 900;
`;

export const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

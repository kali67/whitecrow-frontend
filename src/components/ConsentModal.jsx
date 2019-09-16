import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { Translate } from "react-localize-redux";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    height: "95%",
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
    backgroundColor: "rgba(0,0,0,0.7)"
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
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;
`;

const ModalContent = styled.div`
  height: 90%;
`;

const ConsentModal = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.closeConsent}
    style={customStyles}
  >
    <ModalBody>
      <ModalHeader>
        <h1>
          <Translate id={"link-info-consent"} />
        </h1>
        <h4 style={{ color: "red" }}>
          <Translate id={"read-carefully"} />
        </h4>
      </ModalHeader>

      <ModalContent>
        <Translate id={"information-para-1"} />
        <br />
        <br />
        <Translate id={"information-para-2"} />
        <br />
        <br />
        <Translate id={"information-para-3"} />
        <br />
        <br />
        <Translate id={"information-para-4"} />
        <br />
        <br />
        <Translate id={"information-para-5"} />
        <h3>
          <Translate id={"consent-title"} />
        </h3>
        <ul>
          <li>
            <Translate id={"clause-1"} />
          </li>
          <li>
            <Translate id={"clause-2"} />
          </li>
          <li>
            <Translate id={"clause-3"} />
          </li>
          <li>
            <Translate id={"clause-4"} />
          </li>
          <li>
            <Translate id={"clause-5"} />
          </li>
          <li>
            <Translate id={"clause-6"} />
          </li>
          <li>
            <Translate id={"clause-7"} />
          </li>
          <li>
            <Translate id={"clause-8"} />
          </li>
          <li>
            <Translate id={"footer-clause"} />
          </li>
        </ul>
        <br />
      </ModalContent>
    </ModalBody>
  </Modal>
);

export default ConsentModal;

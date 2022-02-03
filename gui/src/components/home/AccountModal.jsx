import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Message } from "semantic-ui-react";
import RegistrationLoginWrapper from "../dashboard/RegisterLoginWrapper";

const AccountModal = (props) => {
  const renderMessage = () => (
    <Message style={{ fontSize: "15px" }}>
      <Message.Header>
        Hello {`${props.user.firstname} ${props.user.lastname}`}
      </Message.Header>
      <p>You are logged in and now you can enter dashboard.</p>
      <Button style={{ margin: "0 auto" }} color="blue">
        Dashboard
      </Button>
    </Message>
  );

  const renderBody = () =>
    props.user !== undefined ? (
      renderMessage()
    ) : (
      <RegistrationLoginWrapper accountModal />
    );

  return (
    <Modal show={props.show} size="lg" onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Login/Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderBody()}</Modal.Body>
    </Modal>
  );
};

export default AccountModal;

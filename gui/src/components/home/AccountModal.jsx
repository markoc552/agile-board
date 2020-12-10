import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const AccountModal = (props) => {
  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please log in or register</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Register</Button>
        <Button variant="primary">Login</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AccountModal;

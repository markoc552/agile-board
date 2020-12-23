import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dropdown, Divider, Input, TextArea } from "semantic-ui-react";
import "../../style.css";

const ComponentModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Component</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{
            flex: "display",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ margin: "auto 20px", width: "20px" }}>Project</div>
            <div>
              <Dropdown
                fluid
                selection
                style={{ margin: "10px 35px", width: "10vw" }}
              />
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              flex: "display",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ margin: "auto 20px", width: "20px" }}>Name</div>
              <div>
                <Input style={{ margin: "10px 35px", width: "10vw" }} />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Create</Button>
        <Button variant="secondary">Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComponentModal;

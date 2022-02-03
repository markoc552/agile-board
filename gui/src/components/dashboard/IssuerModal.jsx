import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Divider, Dropdown, Input, TextArea } from "semantic-ui-react";
import "../../style.css";
import { types } from "./issueTypes";

const IssuerModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-75w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create Issue</Modal.Title>
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ margin: "auto 20px", width: "20px" }}>Type</div>
            <div>
              <Dropdown
                fluid
                selection
                options={types}
                style={{ margin: "10px 35px", width: "10vw" }}
              />
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <div
            style={{
              flex: "display",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ margin: "auto 20px", width: "35px" }}>Summary</div>
              <div>
                <Input style={{ margin: "10px 35px", width: "20vw" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ margin: "auto 20px", width: "35px" }}>
                Components
              </div>
              <div>
                <Dropdown fluid selection style={{ margin: "10px 35px" }} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ margin: "5px 20px", width: "35px" }}>
                Description
              </div>
              <div>
                <TextArea
                  style={{
                    margin: "10px 35px",
                    paddingRight: "25px",
                    width: "20vw",
                    height: "20vh",
                  }}
                />
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

export default IssuerModal;

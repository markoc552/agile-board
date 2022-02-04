import Axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import { connect, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Button } from "semantic-ui-react";
import {
  loadCreatedTasks,
  loadStartedSprint,
  setStartedSprint,
} from "../../redux/actions";

const TaskModal = (props) => {
  const [sending, isSending] = useState(false);

  const { addToast } = useToasts();

  const projectName = useSelector((state) => state.managment.selectedProject);

  const user = useSelector((state) => state.auth.user);

  const token = useSelector((state) => state.auth.token);

  const handleAddTaskToSprint = (task) => {
    isSending(true);
    Axios.post(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/sprints/addTaskToSprint`,
      task,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sprintName: `${props.sprint.name}`,
          person: `${user.firstname} ${user.lastname}`,
        },
      }
    )
      .then(() => {
        isSending(false);
        props.setShow(false);
        props.loadStartedSprint(projectName, token);
        addToast("Task has been added to sprint!", {
          appearance: "success",
        });
      })
      .catch(() =>
        addToast("Error while adding task", {
          appearance: "error",
        })
      );
  };

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "'Arvo', serif" }}>
          Add to sprint
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "'Arvo', serif" }}>
        {sending ? (
          <Spinner
            animation="border"
            role="status"
            style={{ margin: "5vh 15.5vw" }}
          />
        ) : (
          <>
            <div>
              Following task <strong>{props.task.content.name}</strong> will be
              added to sprint <strong>{props.sprint.name}</strong>
            </div>
            <Button
              onClick={() => handleAddTaskToSprint(props.task.content)}
              style={{ margin: "2vh 0" }}
              color="blue"
              floated="right"
            >
              Add
            </Button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, {
  loadCreatedTasks,
  setStartedSprint,
  loadStartedSprint,
})(TaskModal);

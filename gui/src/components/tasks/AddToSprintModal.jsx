import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import TaskWidget from "./TaskWidget";
import { useDropzone } from "react-dropzone";
import {
  TaskWidget as StyledTaskWidget,
  TaskSection,
} from "../util/AgileStyledComponents";
import {
  Button,
  Icon,
  Label,
  Accordion,
  Input,
  Form,
  Select,
  TextArea,
  Segment,
  Header,
} from "semantic-ui-react";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import Axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { loadCreatedTasks, setStartedSprint } from "../../redux/actions";
import { connect, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

const TaskModal = (props) => {
  const [sending, isSending] = useState(false);

  const { addToast } = useToasts();

  const projectName = useSelector((state) => state.managment.selectedProject);

  const token = useSelector(state => state.auth.token)

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
        },
      }
    )
      .then((res) => {
        isSending(false);
        props.setShow(false);
        addToast("Task has been added to sprint!", {
          appearance: "success",
        });
      })
      .catch((err) =>
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

export default connect(null, { loadCreatedTasks, setStartedSprint })(TaskModal);

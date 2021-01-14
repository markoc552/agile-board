import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  Button,
  Dropdown,
  Divider,
  Input,
  TextArea,
  Form,
  Select,
  Icon,
} from "semantic-ui-react";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
  StyledLabel,
} from "../util/AgileStyledComponents";
import "../../style.css";
import { Formik, Field, ErrorMessage } from "formik";
import Axios from "axios";
import { connect } from "react-redux";
import {
  selectCurrentProject,
  loadCreatedTasks,
} from "../../redux/actions/index.js";
import { uuid } from "uuidv4";

let countryOptions = [];

const ProjectSelectModal = (props) => {
  const [selectedProject, setSelectedProject] = useState();

  countryOptions = [];
  useEffect(() => {
    Axios.get(
      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/projects/getAllProjects`
    )
      .then((res) => {
        res.data.map((project) =>
          countryOptions.push({
            key: uuid(),
            value: project.name,
            text: (
              <div style={{ fontFamily: "'Arvo', serif" }}>
                <Icon name="columns" color="blue" size="large" />
                {project.name}
              </div>
            ),
          })
        );
      })
      .catch((err) => console.log(err));
  });

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Select project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown
          clearable
          fluid
          search
          selection
          onChange={(e, { value }) => setSelectedProject(value)}
          options={countryOptions}
          placeholder="Select project"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="blue"
          basic
          onClick={() => {
            props.selectCurrentProject(selectedProject);
            props.loadCreatedTasks(selectedProject);
            props.setShow(false);
            props.setShowPage("activity")
          }}
        >
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, { selectCurrentProject, loadCreatedTasks })(
  ProjectSelectModal
);

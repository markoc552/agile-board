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
import { connect, useSelector } from "react-redux";
import {
  selectCurrentProject,
  loadCreatedTasks,
  loadStartedSprint,
  fetchProjectData,
} from "../../redux/actions";
import { uuid } from "uuidv4";

let countryOptions = [];

const ProjectSelectModal = (props) => {
  const [selectedProject, setSelectedProject] = useState();
  const [availableProject, setAvailableProjects] = useState([]);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    Axios.get(
      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/projects/getAllProjects`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        res.data.map((project) =>
          availableProject.push({
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
  }, []);

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
          value={selectedProject}
          fluid
          selection
          onChange={(e, { value }) => setSelectedProject(value)}
          options={availableProject}
          placeholder="Select project"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="blue"
          basic
          onClick={() => {
            props.setShow(false);
            props.selectCurrentProject(selectedProject);
            props.loadCreatedTasks(selectedProject, token);
            props.fetchProjectData(selectedProject, token);
            setTimeout(
              () => props.loadStartedSprint(selectedProject, token),
              1000
            );
            props.setShowPage("activity");
          }}
        >
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, {
  selectCurrentProject,
  loadCreatedTasks,
  loadStartedSprint,
  fetchProjectData,
})(ProjectSelectModal);

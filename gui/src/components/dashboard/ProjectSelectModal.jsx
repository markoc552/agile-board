import Axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { connect, useSelector } from "react-redux";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import { uuid } from "uuidv4";
import {
  fetchProjectData,
  loadCreatedTasks,
  loadStartedSprint,
  selectCurrentProject,
} from "../../redux/actions";
import "../../style.css";

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

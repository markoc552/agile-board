import React from "react";
import Modal from "react-bootstrap/Modal";
import {
  Button,
  Dropdown,
  Divider,
  Input,
  TextArea,
  Form,
  Select,
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

const managerOptions = [
  { value: "tests", text: "Test" },
  { value: "oaksd", text: "Koko" },
];

const UserModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: props.selectedRow.name,
            keyword: props.selectedRow.keyword,
            manager: props.selectedRow.manager,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            props.isSubmitting(true);

            setTimeout(() => {
              Axios.post(
                `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/projects/updateProject`,
                { ...values }
              )
                .then(() => {
                  Axios.get(
                    `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/projects/getAllProjects`
                  )
                    .then((res) => {
                      props.setDataToRender(res.data);
                      props.isSubmitting(false);
                      props.setShow(false);
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            }, 3000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            /* and other goodies */
          }) => (
            <Form
              style={{
                width: "17vw",
                margin: "5vh auto",
                display: "flex",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
              size="large"
            >
              <StyledLabel>Project name</StyledLabel>
              <Input
                name="name"
                placeholder="Project name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                disabled="true"
              />
              <StyledLabel>Keyword</StyledLabel>
              <Input
                name="keyword"
                placeholder="Keyword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.keyword}
              />
              <StyledLabel>Manager</StyledLabel>
              <Select
                placeholder="Select manager"
                name="manager"
                onChange={(value) =>
                  setFieldValue("manager", value.target.innerText)
                }
                onBlur={handleBlur}
                options={managerOptions}
              />
              <Button
                type="submit"
                color="blue"
                style={{ marginTop: "25px" }}
                disabled={isSubmitting}
                loading={props.submitting}
              >
                Update
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;

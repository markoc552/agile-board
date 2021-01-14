import React, { useState } from "react";
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
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import Axios from "axios";

const managerOptions = [
  { value: "tests", text: "Test" },
  { value: "oaksd", text: "Koko" },
];

const ComponentModal = (props) => {
  const [participants, setParticipants] = useState([]);

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
            participants: [],
          }}
          onSubmit={async (values, { setSubmitting }) => {
            props.isSubmitting(true);

            setTimeout(() => {
              Axios.post(
                `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/component/updateComponent`,
                { ...values, projectName: props.currentProject }
              )
                .then(() => {
                  Axios.get(
                    `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/component/getComponents`, {
                      params: props.currentProject,
                    }
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
              <FieldArray
                name="participants"
                style={{ marginTop: "10px" }}
                render={(arrayHelpers) => (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {values.participants && values.participants.length > 0 ? (
                      values.participants.map((friend, index) => (
                        <div key={index} style={{ margin: "10px auto" }}>
                          <Field name={`participants.${index}`} />
                          <Button
                            type="button"
                            color="blue"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            -
                          </Button>
                          <Button
                            type="button"
                            color="blue"
                            onClick={() => arrayHelpers.insert(index, "")}
                          >
                            +
                          </Button>
                        </div>
                      ))
                    ) : (
                      <Button
                        type="button"
                        style={{ margin: "10px auto" }}
                        color="yellow"
                        onClick={() => arrayHelpers.push("")}
                      >
                        {/* show this when user has removed all participants from the list */}
                        Add a participant
                      </Button>
                    )}
                    <div></div>
                  </div>
                )}
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

export default ComponentModal;

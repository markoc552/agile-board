import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { Button, Form, Input } from "semantic-ui-react";
import "../../style.css";
import { StyledLabel } from "../util/AgileStyledComponents";

const ComponentModal = (props) => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update component</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: props.selectedRow.name,
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
                    `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/component/getComponents`,
                    {
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
              <StyledLabel>Component name</StyledLabel>
              <Input
                name="name"
                placeholder="Project name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                disabled="true"
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

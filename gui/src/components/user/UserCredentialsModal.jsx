import Axios from "axios";
import { Formik } from "formik";
import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { Button, Form, Input, Select } from "semantic-ui-react";
import "../../style.css";
import { StyledLabel } from "../util/AgileStyledComponents";

const roles = [
  { value: "admin", text: "ADMIN" },
  { value: "user", text: "USER" },
];
const UserCredentialsModal = (props) => {
  const token = useSelector((state) => state.auth.token);

  const getAllUsers = () =>
    Axios.get(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        props.setDataToRender(res.data);
        props.isSubmitting(false);
        props.setShow(false);
      })
      .catch((err) => console.log(err));

  const changeRole = (values) =>
    Axios.post(
      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/changeRole`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          username: values.username,
          role: values.role,
        },
      }
    ).then(() => getAllUsers());

  const changePassword = (values) =>
    Axios.post(
      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/changePassword`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          username: values.username,
          password: values.password,
        },
      }
    )
      .then(() => changeRole(values))
      .catch((err) => console.log(err));

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update user credentials</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            username: props.selectedRow.username,
            password: props.selectedRow.password,
            role: props.selectedRow.role,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            props.isSubmitting(true);

            setTimeout(() => changePassword(values), 3000);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
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
              <StyledLabel>Username</StyledLabel>
              <Input
                style={{ margin: "10px 0" }}
                name="username"
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                disabled
              />
              <StyledLabel>Password</StyledLabel>
              <Input
                style={{ margin: "10px 0" }}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <StyledLabel>Role</StyledLabel>
              <Select
                placeholder="Select role"
                name="role"
                onChange={(value) =>
                  setFieldValue("role", value.target.innerText)
                }
                onBlur={handleBlur}
                options={roles}
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

export default UserCredentialsModal;

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
import { useSelector } from "react-redux";

const roles = [
  { value: "admin", text: "ADMIN" },
  { value: "user", text: "USER" },
];
const UserCredentialsModal = (props) => {
  const token = useSelector((state) => state.auth.token);

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

            console.log(values);

            setTimeout(() => {
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
                .then(() => {
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
                  ).then(() => {
                    Axios.get(
                      `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/getAllUsers`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                      .then((res) => {
                        props.setDataToRender(res.data);
                        props.isSubmitting(false);
                        props.setShow(false);
                      })
                      .catch((err) => console.log(err));
                  });
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

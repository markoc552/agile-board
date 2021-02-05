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
import {useSelector} from "react-redux"

const managerOptions = [
  { value: "tests", text: "Test" },
  { value: "oaksd", text: "Koko" },
];

const UserModal = (props) => {

  const token = useSelector(state => state.auth.token)


  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            username: props.selectedRow.username,
            firstname: props.selectedRow.firstname,
            lastname: props.selectedRow.lastname,
            email: props.selectedRow.email,
          }}
          onSubmit={async (values, { setSubmitting }) => {
            props.isSubmitting(true);

            setTimeout(() => {
              Axios.post(
                `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/updateUser`,
                { ...values },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
                .then(() => {
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
              <StyledLabel>Firstname</StyledLabel>

              <Input
                style={{ margin: "10px 0" }}
                name="firstname"
                placeholder="Firstname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstname}
              />
              <StyledLabel>Lastname</StyledLabel>

              <Input
                style={{ margin: "10px 0" }}
                name="lastname"
                placeholder="Lastname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastname}
              />
              <StyledLabel>Email</StyledLabel>

              <Input
                style={{ margin: "10px 0" }}
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
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

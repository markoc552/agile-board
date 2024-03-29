import Axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Button, Form, Input } from "semantic-ui-react";
import {
  loadCreatedTasks,
  loadStartedSprint,
  setStartedSprint,
} from "../../redux/actions";

const TaskModal = (props) => {
  const [sending, isSending] = useState(false);

  const { addToast } = useToasts();

  const projectName = useSelector((state) => state.managment.selectedProject);

  const user = useSelector((state) => state.auth.user);

  const token = useSelector((state) => state.auth.token);

  const formatDateTime = (date) =>
    date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate();

  const setNewSprint = (data) => {
    props.setStartedSprint(data);

    props.setShow(false);

    props.loadStartedSprint(projectName, token);
  };

  const createSprint = (values) =>
    Axios.post(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/sprints/createSprint`,
      {
        projectName,
        name: values.name,
        from: formatDateTime(values.from),
        to: formatDateTime(values.to),
        tasks: props.sprintTasks,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          person: `${user.firstname} ${user.lastname}`,
        },
      }
    )
      .then((res) => {
        isSending(false);
        setNewSprint(res.data);
        addToast("Sprint successfully started!", {
          appearance: "success",
        });
      })
      .catch(() =>
        addToast("Sprint has not been started!", {
          appearance: "error",
        })
      );

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "'Arvo', serif" }}>
          Start sprint
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
          <Formik
            initialValues={{ from: new Date(), to: new Date() }}
            onSubmit={async (values, { setSubmitting }) => {
              isSending(true);

              setTimeout(() => createSprint(values), 3000);
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
                <div
                  style={{
                    marginTop: 15,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      margin: "auto 10px",
                      width: "5vw",
                    }}
                  >
                    Name:
                  </div>
                  <Input
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </div>
                <div
                  style={{
                    marginTop: 15,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      margin: "auto 10px",
                      width: "5vw",
                    }}
                  >
                    From:
                  </div>
                  <DatePicker
                    selected={values.from}
                    name="from"
                    onChange={(date) => setFieldValue("from", date)}
                    onBlur={handleBlur}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div
                  style={{
                    marginTop: 15,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    style={{
                      margin: "auto 10px",
                      width: "5vw",
                    }}
                  >
                    To:
                  </div>
                  <DatePicker
                    selected={values.to}
                    name="to"
                    onChange={(date) => setFieldValue("to", date)}
                    onBlur={handleBlur}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <Button
                  basic
                  color="blue"
                  type="submit"
                  size="large"
                  disabled={isSubmitting}
                  loading={sending}
                  style={{ margin: "2vh auto" }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, {
  loadCreatedTasks,
  setStartedSprint,
  loadStartedSprint,
})(TaskModal);

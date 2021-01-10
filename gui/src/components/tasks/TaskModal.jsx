import React, { useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import TaskWidget from "./TaskWidget";
import { useDropzone } from "react-dropzone";
import {
  TaskWidget as StyledTaskWidget,
  TaskSection,
} from "../util/AgileStyledComponents";
import {
  Button,
  Icon,
  Label,
  Accordion,
  Input,
  Form,
  Select,
  TextArea,
  Segment,
  Header,
} from "semantic-ui-react";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import Axios from "axios";

const priorities = [
  { value: "4", text: "Highest" },
  { value: "3", text: "High" },
  { value: "2", text: "Medium" },
  { value: "1", text: "Low" },
];

const components = [
  { value: "4", text: "Highest" },
  { value: "3", text: "High" },
  { value: "2", text: "Medium" },
  { value: "1", text: "Low" },
];

const UserModal = (props) => {
  const [activeIndexs, setActiveIndexs] = useState([0, 1, 2, 3, 4, 5]);
  const [sending, isSending] = useState(false);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;

    const newIndex = activeIndexs;

    const currentIndexPosition = activeIndexs.indexOf(index);

    if (currentIndexPosition > -1) {
      newIndex.splice(currentIndexPosition, 1);
    } else {
      newIndex.push(index);
    }

    setActiveIndexs(newIndex);
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-35w"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "'Arvo', serif" }}>
          New issue
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
            initialValues={{}}
            onSubmit={async (values, { setSubmitting }) => {
              isSending(true);

              console.log(values);

              // setTimeout(() => {
              //   Axios.post(
              //     `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/tasks/createTask`,
              //     { ...values }
              //   ).then(() => )
              // }, 3000);
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
                    Estimated:
                  </div>
                  <Input
                    name="estimated"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.estimated}
                  />
                </div>
                <div style={{ marginTop: "2vh" }}>
                  <Icon name="content" color="blue" />
                  Details
                </div>
                <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                  <div
                    style={{
                      marginLeft: 17,
                      marginTop: 15,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        margin: "auto 10px",
                        marginLeft: "-2.5vw",
                        marginRight: "2vw",
                        width: "5vw",
                      }}
                    >
                      Priority:
                    </div>
                    <Select
                      placeholder="Select priority"
                      name="priority"
                      onChange={(value) =>
                        setFieldValue("priority", value.target.innerText)
                      }
                      onBlur={handleBlur}
                      options={priorities}
                    />
                  </div>
                </div>
                <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                  <div
                    style={{
                      marginLeft: 17,
                      marginTop: 15,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        margin: "auto 10px",
                        width: "5vw",
                        marginLeft: "-2.5vw",
                      }}
                    >
                      Component:
                    </div>
                    <Select
                      placeholder="Select component"
                      name="component"
                      onChange={(value) =>
                        setFieldValue("component", value.target.innerText)
                      }
                      onBlur={handleBlur}
                      options={components}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "2vh" }}>
                  <Icon name="user" color="blue" />
                  People
                </div>
                <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                  <div
                    style={{
                      marginLeft: 17,
                      marginTop: 15,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        margin: "auto 10px",
                        marginLeft: "-2.5vw",
                        marginRight: "2vw",
                        width: "5vw",
                      }}
                    >
                      Reporter:
                    </div>
                    <Select
                      placeholder="Select reporter"
                      name="reporter"
                      onChange={(value) =>
                        setFieldValue("reporter", value.target.innerText)
                      }
                      onBlur={handleBlur}
                      options={priorities}
                    />
                  </div>
                </div>
                <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                  <div
                    style={{
                      marginLeft: 15,
                      marginTop: 15,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        margin: "auto 10px",
                        marginLeft: "-2.5vw",
                        marginRight: "2vw",
                        width: "5vw",
                      }}
                    >
                      Assignee:
                    </div>
                    <Select
                      style={{width: "15vw"}}
                      placeholder="Select assignee"
                      name="assignee"
                      onChange={(value) =>
                        setFieldValue("assignee", value.target.innerText)
                      }
                      onBlur={handleBlur}
                      options={priorities}
                    />
                  </div>
                </div>
                <div style={{ margin: "2vh 0" }}>
                  <Icon name="newspaper outline" color="blue" />
                  Description
                </div>
                <TextArea
                  placeholder="Input text..."
                  style={{ width: "19vw" }}
                />
                <div style={{ margin: "2vh 0" }}>
                  <Icon name="file alternate outline" color="blue" />
                  Attachments
                </div>
                <div
                  {...getRootProps()}
                  style={{
                    width: "19vw",
                    height: "7vh",
                    border: "1px solid #b0b0b0",
                    opacity: 0.3,
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <div style={{ margin: "2.5vh 3.5vw" }}>
                        <Icon name="pdf file outline" /> Add attachemnt
                      </div>
                    )}
                  </div>
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

export default UserModal;

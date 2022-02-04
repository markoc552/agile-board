import Axios from "axios";
import { Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import { connect, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  Form,
  Icon,
  Input,
  Label,
  Select,
  TextArea,
} from "semantic-ui-react";
import { uuid } from "uuidv4";
import { loadCreatedTasks } from "../../redux/actions";

const TaskModal = (props) => {
  const [activeIndexs, setActiveIndexs] = useState([0, 1, 2, 3, 4, 5]);
  const [sending, isSending] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { addToast } = useToasts();

  const priorities = [
    { value: "4", text: "Highest" },
    { value: "3", text: "High" },
    { value: "2", text: "Medium" },
    { value: "1", text: "Low" },
  ];

  const token = useSelector((state) => state.auth.token);

  const projectName = useSelector((state) => state.managment.selectedProject);

  const user = useSelector((state) => state.auth.user);

  const components = [];
  const reporters = [];
  const assignees = [];

  const loadReportersAndAssignees = () =>
    Axios.get(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) =>
        res.data.map((user) => {
          reporters.push({
            value: `${user.firstname} ${user.lastname}`,
            text: `${user.firstname} ${user.lastname}`,
          });
          assignees.push({
            value: `${user.firstname} ${user.lastname}`,
            text: `${user.firstname} ${user.lastname}`,
          });
        })
      )
      .catch((err) => console.log(err));

  const loadComponents = () =>
    Axios.get(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/component/getComponents`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { projectName },
      }
    )
      .then((res) =>
        res.data.map((component) => {
          console.log(component);
          components.push({
            value: `${component.name}`,
            text: `${component.name}`,
          });
        })
      )
      .catch((err) => console.log(err));

  useEffect(() => {
    loadReportersAndAssignees();
    loadComponents();
  });

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

  const downloadAttachment = (name) =>
    Axios.get(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/attachment/downloadAttachment`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          filename: name,
          ticket: `${props.selectedProject.toUpperCase()}_${props.taskNo}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          const attachment = res.data;

          const url = window.URL.createObjectURL(new Blob([attachment]));

          const link = document.createElement("a");

          link.href = url;
          link.setAttribute("download", name);

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch((err) => console.log(err));

  const uploadAttachment = (formData) =>
    Axios.post(
      `${
        window.ENVIRONMENT.AGILE_CENTRAL
      }/v1/attachment/uploadAttachment/${props.selectedProject.toUpperCase()}_${
        props.taskNo
      }`,
      formData
    ).then((res) => {
      uploadedFiles.push(res.data);
    });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file, i) => {
      const reader = new FileReader();

      reader.onabort = () => {
        console.log("Reading file aborted!");
      };

      reader.onerror = () => {
        console.log("Error while reading a file");
      };

      reader.onload = () => {
        const formData = new FormData();

        formData.set("file", file);

        uploadAttachment(formData);
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const updateCurrentTasks = (task) => {
    props.loadCreatedTasks(projectName, token);
    props.setShow(false);
    props.updateTasks({
      id: task.dndId,
      content: (
        <div>
          <Label color="blue" basic style={{ marginRight: "1vw" }}>
            {task.keyword}
          </Label>
          {task.name}
          <Icon name="user" style={{ marginLeft: "1.5vw" }} />
        </div>
      ),
    });
  };

  const formatDateTime = (date) =>
    date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate();

  const createTask = (values) =>
    Axios.post(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/tasks/createTask`,
      {
        dndId: uuid(),
        ...values,
        priority: 0,
        ticket: `${props.selectedProject.toUpperCase()}_${props.taskNo}`,
        projectName: props.selectedProject,
        createdAt: formatDateTime(new Date()),
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
        updateCurrentTasks(res.data);

        addToast("Task has been successfully created!", {
          appearance: "success",
        });
      })
      .catch(() =>
        addToast("Error while creating task", {
          appearance: "error",
        })
      );

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
            initialValues={{ estimated: new Date() }}
            onSubmit={async (values, { setSubmitting }) => {
              isSending(true);
              setTimeout(() => createTask(values), 3000);
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
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      margin: "5px 10px",
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
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      margin: "5px 10px",
                      width: "5vw",
                    }}
                  >
                    Estimated:
                  </div>
                  <DatePicker
                    selected={values.estimated}
                    name="estimated"
                    onChange={(date) => setFieldValue("estimated", date)}
                    onBlur={handleBlur}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
                <div style={{ marginTop: "2vh" }}>
                  <Icon name="content" color="blue" />
                  Details
                </div>
                <div style={{ marginLeft: "-0,5vw", marginTop: "10px" }}>
                  <div
                    style={{
                      marginTop: 15,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        margin: "5px 10px",
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
                <div style={{ marginLeft: "-0,5vw", marginTop: "10px" }}>
                  <div
                    style={{
                      marginTop: 15,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        margin: "5px 10px",
                        width: "5vw",
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
                <div style={{ marginLeft: "-0,5vw", marginTop: "10px" }}>
                  <div
                    style={{
                      marginTop: 15,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        margin: "5px 10px",
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
                      options={reporters}
                    />
                  </div>
                </div>
                <div style={{ marginLeft: "-0,5vw", marginTop: "10px" }}>
                  <div
                    style={{
                      marginTop: 15,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        margin: "5px 10px",
                        width: "5vw",
                      }}
                    >
                      Assignee:
                    </div>
                    <Select
                      placeholder="Select assignee"
                      name="assignee"
                      onChange={(value) =>
                        setFieldValue("assignee", value.target.innerText)
                      }
                      onBlur={handleBlur}
                      options={assignees}
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
                  name="description"
                  onChange={(value) =>
                    setFieldValue("description", value.target.innerText)
                  }
                  onBlur={handleBlur}
                />
                <div style={{ margin: "2vh 0" }}>
                  <Icon name="file alternate outline" color="blue" />
                  Attachments
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "1vh auto",
                  }}
                >
                  {uploadedFiles.map((file) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "5vw",
                        height: "9vh",
                        border: "1px solid rgb(217, 217, 217)",
                        cursor: "pointer",
                        padding: "5px",
                        marginLeft: "5px",
                      }}
                      onClick={() => downloadAttachment(file)}
                    >
                      <Icon
                        style={{ margin: "10px auto", padding: "5px" }}
                        name="pdf file outline"
                        size="big"
                        color="red"
                      />
                      <div style={{ margin: "0 auto" }}>
                        {file.substring(0, 7)}...
                      </div>
                    </div>
                  ))}
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

export default connect(null, { loadCreatedTasks })(TaskModal);

import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import {
  Button,
  Form,
  Header,
  Icon,
  Label,
  Segment,
  TextArea,
} from "semantic-ui-react";
import {
  IssueCard,
  IssueCardItem,
  IssuesList,
  StyledLabel,
} from "../util/AgileStyledComponents";
import ProjectSelectModal from "./ProjectSelectModal";

const Issues = (props) => {
  const tasks = useSelector((state) => state.managment.tasks);
  const [attachemnts, setAttachments] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState();

  const token = useSelector((state) => state.auth.token);

  const user = useSelector((state) => state.auth.user);

  let backupAttachments = [];

  const [selectedTask, setSelectedTask] = useState(
    tasks.length !== 0 ? tasks[0].content : undefined
  );

  const selectedProject = useSelector(
    (state) => state.managment.selectedProject
  );

  const fetchAttachments = (ticket) => {
    selectedTask !== undefined &&
      Axios.get(
        `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/attachment/getAttachments/${ticket}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => {
        setAttachments(res.data);
        backupAttachments = res.data;
      });
  };

  const fetchComments = (ticket) => {
    selectedTask !== undefined &&
      Axios.get(`${window.ENVIRONMENT.AGILE_CENTRAL}/v1/comments/getComments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          taskNumber: `${ticket}`,
        },
      })
        .then((res) => {
          setComments(res.data);
        })
        .catch(() => setComments([]));
  };

  useEffect(() => {
    if (selectedTask !== undefined) {
      fetchComments(selectedTask.ticket);
      fetchComments(selectedTask.ticket);
      fetchAttachments(selectedTask.ticket);
    }
  }, []);

  const downloadAttachment = (name) => {
    Axios.get(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/attachment/downloadAttachment`,
      {
        params: {
          filename: name,
          ticket: `${selectedTask.ticket}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          const attachment = res.data;

          const url = window.URL.createObjectURL(new Blob([attachment]));

          const link = document.createElement("a");

          link.href = url;

          console.log("Downloading file", name);

          link.setAttribute("download", name);

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch((err) => console.log(err));
  };

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

        Axios.post(
          `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/attachment/uploadAttachment/${selectedTask.ticket}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => {
          console.log(backupAttachments);
          setAttachments([...attachemnts, res.data]);
          console.log("Uploaded file: ", res.data);
        });
      };

      reader.readAsArrayBuffer(file);
    });
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const publishComment = (comment) => {
    Axios.post(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/comments/createComment`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        setComments([...comments, res.data]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <IssuesList>
        <StyledLabel
          style={{
            height: "5vw",
            boxShadow: "2px 8px 5px 0px rgba(0,0,0,0.09)",
            fontFamily: "'Arvo', serif",
            fontWeight: "bold",
            display: "flex",
            fontSize: "15px",
          }}
        >
          <div style={{ margin: "auto 2vw" }}>Issues list</div>
        </StyledLabel>
        <div style={{ height: "94.5vh" }}>
          {console.log(tasks)}
          {tasks.map((task, i) => (
            <>
              <div
                onClick={() => {
                  setAttachments([]);
                  setComments([]);
                  setSelectedTask(task.content);
                  fetchAttachments(task.content.ticket);
                  fetchComments(task.content.ticket);
                }}
                style={{
                  display: "flex",
                  height: "7vh",
                  margin: "8px 0",
                  backgroundColor: "white",
                  borderLeft: "4px solid #3396ff",
                  boxShadow: "1px 5px 10px -4px rgba(0, 0, 0, 0.07)",
                }}
              >
                <div style={{ margin: "auto 2vw" }}>
                  <Label
                    style={{ marginRight: "1vw" }}
                    color="blue"
                    size="large"
                    basic
                  >
                    {task.content.ticket}
                  </Label>
                  {task.content.name}
                </div>
              </div>
            </>
          ))}
        </div>
      </IssuesList>

      <IssueCard>
        {selectedProject === undefined ? (
          <ProjectSelectModal
            show={true}
            setShow={props.isModalShow}
            setShowPage={props.setPage}
          />
        ) : selectedTask === undefined ? (
          <div></div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <IssueCardItem>Taskname: {selectedTask.name}</IssueCardItem>
                <IssueCardItem>
                  Project name: {selectedTask.projectName}
                </IssueCardItem>
                <Segment
                  color="blue"
                  style={{
                    border: "1px solid rgb(237, 237, 237, 0.9)",
                    borderRadius: "1px",
                    margin: "25px",
                    height: "35vh",
                    width: "40vw",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div>
                    <IssueCardItem>Status</IssueCardItem>
                    <IssueCardItem>
                      Priority:{" "}
                      {selectedTask.priority === 0
                        ? "Highest"
                        : selectedTask.priority === 1
                        ? "High"
                        : selectedTask.priority === 2
                        ? "Medium"
                        : selectedTask.priority === 3
                        ? "Low"
                        : ""}
                    </IssueCardItem>
                    <IssueCardItem>Component: </IssueCardItem>
                  </div>
                  <div style={{ marginLeft: "10vw" }}>
                    <IssueCardItem>
                      Reporter: {selectedTask.reporter}
                    </IssueCardItem>
                    <IssueCardItem>
                      Assignee: {selectedTask.assignee}
                    </IssueCardItem>
                  </div>
                </Segment>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "2vw",
              }}
            >
              {console.log(selectedTask)}
              {attachemnts.map((file) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "7vw",
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
                    {typeof file === "string" && file.substring(0, 8)}...
                  </div>
                </div>
              ))}
            </div>
            <Segment
              {...getRootProps()}
              placeholder
              color="blue"
              style={{
                borderRadius: "1px",
                margin: "25px",
                height: "15vh",
                width: "50vw",
              }}
            >
              <div style={{ display: "flex" }}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ margin: "0 22vw" }}>
                      <Header icon>
                        <Icon name="pdf file outline" />
                        Drop files
                      </Header>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ margin: "0 22vw" }}>
                      <Header icon>
                        <Icon name="pdf file outline" />
                        {attachemnts.length === 0
                          ? "No files"
                          : `${attachemnts.length} files`}
                      </Header>
                      <Button primary style={{ margin: "0 auto" }}>
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Segment>

            <div>
              <IssueCardItem>Comments</IssueCardItem>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50vw",
                  margin: "10px 30px",
                }}
              >
                {comments.map((c) => (
                  <div>
                    <Segment secondary>
                      <div>{c.publisher}</div>
                      <div
                        style={{
                          margin: "0.4vw 0",
                          fontWeight: "100",
                          fontSize: "11px",
                        }}
                      >
                        {c.publishTime}
                      </div>
                      <Segment color="blue">{c.content}</Segment>
                    </Segment>
                  </div>
                ))}
              </div>
              <Form>
                <TextArea
                  placeholder="Write a comment"
                  style={{ width: "50vw", margin: "0 30px" }}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form>
              <div style={{ width: "50vw", margin: "30px" }}>
                <Button
                  attached="bottom"
                  color="blue"
                  onClick={() =>
                    publishComment({
                      taskNumber: selectedTask.ticket,
                      publisher: `${user.firstname} ${user.lastname}`,
                      content: comment,
                      publishTime:
                        new Date().getFullYear() +
                        "-" +
                        new Date().getMonth() +
                        1 +
                        "-" +
                        new Date().getDate(),
                    })
                  }
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}
      </IssueCard>
    </div>
  );
};

export default Issues;

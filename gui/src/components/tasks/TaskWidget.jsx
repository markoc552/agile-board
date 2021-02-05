import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TaskWidget as StyledTaskWidget,
  TaskSection,
} from "../util/AgileStyledComponents";
import { Button, Icon, Label, Accordion } from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";
import Axios from "axios";
import { useSelector } from "react-redux";

const TaskWidget = (props) => {
  const [activeIndexs, setActiveIndexs] = useState([0, 1, 2, 3, 4, 5]);
  const [attachemnts, setAttachments] = useState([]);

  const token = useSelector((state) => state.auth.token);

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

  const fetchAttachments = () => {
    Axios.get(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/attachment/getAttachments/${props.selectedTask[0].content.ticket}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {
      setAttachments(res.data);
    });
  };

  useEffect(() => {
    fetchAttachments();
  }, []);

  const downloadAttachment = (name) => {
    Axios.get(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/attachment/downloadAttachment`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          filename: name,
          ticket: `${props.selectedTask[0].content.ticket}`,
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

  return (
    <StyledTaskWidget>
      {props.selectedTask[0] === undefined ? (
        <Spinner
          animation="border"
          role="status"
          style={{ margin: "5vh 15.5vw" }}
        />
      ) : (
        <>
          <Icon
            name="close"
            style={{ marginLeft: "27vw" }}
            onClick={() => props.onClose(false)}
          />
          <div style={{ padding: 15 }}>
            Ticket: {props.selectedTask[0].content.ticket}
          </div>
          <div style={{ marginLeft: 17, marginTop: 15 }}>
            Task name: {props.selectedTask[0].content.name}
          </div>
          <div style={{ marginLeft: 17, marginTop: 15 }}>
            Estimated: {props.selectedTask[0].content.estimated}
          </div>

          <Accordion
            styled
            fluid
            exclusive={false}
            style={{ marginTop: "20px" }}
          >
            <Accordion.Title
              active={activeIndexs.includes(0)}
              index={0}
              onClick={handleClick}
            >
              <Icon name="content" color="blue" />
              Details
            </Accordion.Title>
            <Accordion.Content active={activeIndexs.includes(0)}>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Status:
                <Label
                  style={{ marginLeft: "1vw" }}
                  basic
                  color={props.selectedTask.column === "0" ? "green" : "red"}
                >
                  {props.selectedTask.column === "0" ? "Active" : "Inactive"}
                </Label>
              </div>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Priority:{" "}
                {props.selectedTask[0].content.priority === 0
                  ? "Highest"
                  : props.selectedTask[0].content.priority === 1
                  ? "High"
                  : props.selectedTask[0].content.priority === 2
                  ? "Medium"
                  : props.selectedTask[0].content.priority === 3
                  ? "Low"
                  : ""}
              </div>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Component:
              </div>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndexs.includes(1)}
              index={1}
              onClick={handleClick}
            >
              <Icon name="user" color="blue" />
              People
            </Accordion.Title>
            <Accordion.Content active={activeIndexs.includes(1)}>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Reporter: {props.selectedTask[0].content.reporter}
              </div>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Assignee: {props.selectedTask[0].content.assignee}
              </div>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndexs.includes(2)}
              index={2}
              onClick={handleClick}
            >
              <Icon name="calendar check outline" color="blue" />
              Dates
            </Accordion.Title>
            <Accordion.Content active={activeIndexs.includes(2)}>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Created: {props.selectedTask[0].content.createdAt}
              </div>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Updated: Not updated
              </div>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndexs.includes(3)}
              index={3}
              onClick={handleClick}
            >
              <Icon name="newspaper outline" color="blue" />
              Description
            </Accordion.Title>
            <Accordion.Content active={activeIndexs.includes(3)}>
              <p>{props.selectedTask[0].content.description}</p>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndexs.includes(4)}
              index={4}
              onClick={handleClick}
            >
              <Icon name="comment outline" color="blue" />
              Comments
            </Accordion.Title>
            <Accordion.Content active={activeIndexs.includes(4)}>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Created:
              </div>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Updated:
              </div>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndexs.includes(5)}
              index={5}
              onClick={handleClick}
            >
              <Icon name="file alternate outline" color="blue" />
              Attachments
            </Accordion.Title>
            <Accordion.Content active={activeIndexs.includes(5)}>
              {console.log(attachemnts)}
              <div style={{ display: "flex", flexDirection: "row" }}>
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
                      {file.substring(0, 7)}...
                    </div>
                  </div>
                ))}
              </div>
            </Accordion.Content>
          </Accordion>
        </>
      )}
    </StyledTaskWidget>
  );
};

export default TaskWidget;

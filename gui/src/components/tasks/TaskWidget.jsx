import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TaskWidget as StyledTaskWidget,
  TaskSection,
} from "../util/AgileStyledComponents";
import { Button, Icon, Label, Accordion } from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";

const TaskWidget = (props) => {
  const [activeIndexs, setActiveIndexs] = useState([0, 1, 2, 3, 4, 5]);

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

  console.log(props.selectedTask);

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
                Updated:
                <div style={{ marginLeft: "1vw" }}>Not yet updated</div>
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
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Created:
              </div>
              <div style={{ marginLeft: "2vw", marginTop: "10px" }}>
                Updated:
              </div>
            </Accordion.Content>
          </Accordion>
        </>
      )}
    </StyledTaskWidget>
  );
};

export default TaskWidget;

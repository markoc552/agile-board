import React, { useState, useEffect, useMemo } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  Headline,
  DashboardNav as Navigation,
  BacklogWidget,
  BacklogHeadline,
  WidgetItem,
  TaskSection,
} from "../util/AgileStyledComponents";
import { Button, Icon, Label, Accordion } from "semantic-ui-react";
import Spinner from "react-bootstrap/Spinner";

import { uuid } from "uuidv4";
import { useSelector } from "react-redux";
import TaskWidget from "../tasks/TaskWidget";
import TaskModal from "../tasks/TaskModal";
import Axios from "axios";
import _ from "lodash";

const Backlog = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("newProject");
  const [selected, setSelected] = useState("newProject");
  const [taskOpen, setTaskopen] = useState(false);
  const [newIssuerModal, showIssuerModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();

  const selectedProject = useSelector(
    (state) => state.managment.selectedProject
  );

  const tasks = useSelector((state) => state.managment.tasks);

  const itemsFromBackend = useSelector(
    (state) => state.managment.itemsFromBackend
  );

  const data = useMemo(() => [...tasks], [tasks]);

  const columnsFromBackend = {
    0: {
      name: "Sprint",
      items: [],
    },
    1: {
      name: "Backlog",
      items: itemsFromBackend,
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];

      const destColumn = columns[destination.droppableId];

      const sourceItems = [...sourceColumn.items];

      const destItems = [...destColumn.items];

      const [removed] = sourceItems.splice(source.index, 1);

      destItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];

      const copiedItems = [...column.items];

      const [removed] = copiedItems.splice(source.index, 1);

      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const backlogDiv = document.querySelector("#backlog");

  const handleCloseTaskMenu = () => {
    setTaskopen(false);
    backlogDiv.removeEventListener("click", handleCloseTaskMenu);
  };

  if (taskOpen) {
    backlogDiv.addEventListener("click", handleCloseTaskMenu);
  }

  return (
    <div id="backlog">
      {selectedProject === undefined ? (
        <Spinner
          animation="border"
          role="status"
          style={{ margin: "5vh 15.5vw" }}
        />
      ) : (
        <>
          <Headline style={{ width: "20vw", height: "2vh" }}>Backlog</Headline>
          <div
            style={{ display: "flex", flexDirection: "row" }}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "35px",
              }}
            >
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
              >
                {Object.entries(columns).map(([id, column]) => {
                  return (
                    <BacklogWidget
                      style={{ width: !taskOpen ? "80vw" : "50vw" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <BacklogHeadline
                          style={{ marginLeft: !taskOpen ? "1vw" : "1.5vw" }}
                        >
                          {column.name}
                        </BacklogHeadline>
                        <div style={{ margin: "auto 10px" }}>10 Issues</div>
                        {column.name === "Sprint" && (
                          <Label
                            color="green"
                            size="tiny"
                            style={{ margin: "auto 0" }}
                          >
                            Active
                          </Label>
                        )}
                        {column.name === "Backlog" && (
                          <Button
                            style={{ margin: "auto 0" }}
                            color="blue"
                            size="mini"
                            onClick={() => showIssuerModal(true)}
                          >
                            New issue
                          </Button>
                        )}
                      </div>
                      {column.name === "Sprint" && (
                        <div
                          style={{
                            marginLeft: "2vw",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Icon name="user" rounded />
                          <Icon name="user" rounded />
                          <Icon name="user" rounded />
                          <Icon name="user" rounded />

                          <div>Today . Tomorrow</div>
                        </div>
                      )}
                      <Droppable droppableId={id} key={id}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "#b3d1ff"
                                  : "white",
                                transition: "0.5s",
                                padding: 4,
                                marginTop: "4vh",
                                width: !taskOpen ? "77vw" : "45vw",
                                height: "30vh",
                                overflowY: "scroll",
                                margin: "0 auto",
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          onClick={() => {
                                            console.log(tasks);
                                            const filtered = tasks.filter(
                                              (i) => i.id === item.id
                                            );
                                            setSelectedTask({
                                              ...filtered,
                                              column: id,
                                            });
                                            setTaskopen(true);
                                            console.log(selectedTask);
                                          }}
                                          style={{
                                            padding: 7,
                                            height: "4vh",
                                            margin: "5px 0",
                                            backgroundColor: "white",
                                            fontFamily: "'Arvo', serif",
                                            cursor: "default",
                                            fontSize: "14px",
                                            boxShadow: !snapshot.isDragging
                                              ? "1px 5px 10px -4px rgba(0, 0, 0, 0.10)"
                                              : "inset 1px 5px 10px -4px rgba(0, 0, 0, 0.10)",
                                            fontWeight: snapshot.isDragging
                                              ? "bolder"
                                              : "100",
                                            borderLeft: !snapshot.isDragging
                                              ? "4px solid #3396ff"
                                              : "7px solid #3396ff",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          {item.content}
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </BacklogWidget>
                  );
                })}
              </DragDropContext>
            </div>
            {taskOpen && selectedTask !== undefined && (
              <TaskWidget
                onClose={setTaskopen}
                onClick={(e) => e.stopPropagation()}
                selectedTask={selectedTask}
              />
            )}
            {newIssuerModal && (
              <TaskModal
                show={newIssuerModal}
                setShow={showIssuerModal}
                taskNo={tasks.length}
                selectedProject={selectedProject}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Backlog;

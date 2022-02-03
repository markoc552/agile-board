import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { Button, Icon, Label } from "semantic-ui-react";
import AddToSprintModal from "../tasks/AddToSprintModal";
import SprintModal from "../tasks/SprintModal";
import TaskModal from "../tasks/TaskModal";
import TaskWidget from "../tasks/TaskWidget";
import {
  BacklogHeadline,
  BacklogWidget,
  Headline,
} from "../util/AgileStyledComponents";
import { secondVariants } from "../util/animations";
import ProjectSelectModal from "./ProjectSelectModal";

const Backlog = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("newProject");
  const [selected, setSelected] = useState("newProject");
  const [taskOpen, setTaskopen] = useState(false);
  const [newIssuerModal, showIssuerModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [sprintTasks, setSprintTasks] = useState([]);
  const [sprintModal, isSprintModalShow] = useState(false);
  const [addTaskToSprintModal, setAddTaskToSprintModal] = useState(false);
  const [taskToSprint, setTaskToSprint] = useState({});
  const [items, setItems] = useState([]);

  const selectedProject = useSelector(
    (state) => state.managment.selectedProject
  );

  const startedSprint = useSelector((state) => state.managment.sprint);

  const tasks = useSelector((state) => state.managment.tasks);

  const itemsBackend = useSelector((state) => state.managment.itemsFromBackend);

  const dinamicDroppables = useMemo(() => [...items], [items]);

  useEffect(() => {
    setItems(itemsBackend);
  }, []);

  let filtered = [];

  if (startedSprint !== undefined) {
    filtered = itemsBackend.filter(
      ({ id: id1 }) => !startedSprint.tasks.some(({ id: id2 }) => id2 === id1)
    );
  }

  const columnsFromBackend = {
    0: {
      name: "Sprint",
      items: startedSprint !== undefined ? startedSprint.tasks : [],
    },
    1: {
      name: "Backlog",
      items: startedSprint !== undefined ? filtered : itemsBackend,
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);

  const updateTasks = (task) => {
    setColumns({
      ...columns,
      1: {
        ...columns[1],
        items: [
          ...(startedSprint !== undefined ? filtered : itemsBackend),
          task,
        ],
      },
    });
  };

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

      if (destination.droppableId === "0" && startedSprint !== undefined) {
        const task = tasks.filter((item) => item.id === removed.id);
        console.log("TASK TO SPRINT", task);
        setTaskToSprint(task[0]);
        setAddTaskToSprintModal(true);
      }

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

  // const backlogDiv = document.querySelector("#backlog");
  //
  // const handleCloseTaskMenu = () => {
  //   setTaskopen(false);
  //   backlogDiv.removeEventListener("click", handleCloseTaskMenu);
  // };
  //
  // if (taskOpen) {
  //   backlogDiv.addEventListener("click", handleCloseTaskMenu);
  // }

  return (
    <div id="backlog">
      {selectedProject === undefined ? (
        <ProjectSelectModal
          show={true}
          setShow={props.isModalShow}
          setShowPage={props.setPage}
        />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={secondVariants}
        >
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
                        <div style={{ margin: "auto 10px" }}>
                          {column.items.length} Issues
                        </div>
                        {column.name === "Sprint" && (
                          <Label
                            color={
                              startedSprint !== undefined ? "green" : "red"
                            }
                            size="tiny"
                            style={{ margin: "auto 0" }}
                          >
                            {startedSprint !== undefined
                              ? "Active"
                              : "Inactive"}
                          </Label>
                        )}
                        {column.name === "Sprint" &&
                          column.items.length !== 0 &&
                          startedSprint === undefined && (
                            <Button
                              color="green"
                              size="mini"
                              basic
                              style={{ margin: "auto 2vw", height: "3vh" }}
                              onClick={() => {
                                isSprintModalShow(true);

                                let result = [];

                                const filtered = columns["0"].items.filter(
                                  (i) => {
                                    tasks.map((item) => {
                                      if (item.id === i.id) {
                                        result = [...result, item.content];
                                      }
                                    });
                                  }
                                );

                                setSprintTasks(result);
                              }}
                            >
                              Start sprint
                            </Button>
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
                          {startedSprint !== undefined && (
                            <div>
                              {startedSprint.from}{" "}
                              <Icon name="dot circle" size="tiny" />
                              {startedSprint.to}
                            </div>
                          )}
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
                updateTasks={updateTasks}
              />
            )}
            {sprintModal && (
              <SprintModal
                show={sprintModal}
                setShow={isSprintModalShow}
                sprintTasks={sprintTasks}
              />
            )}
            {addTaskToSprintModal && (
              <AddToSprintModal
                show={addTaskToSprintModal}
                setShow={setAddTaskToSprintModal}
                task={taskToSprint}
                sprint={startedSprint}
              />
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Backlog;

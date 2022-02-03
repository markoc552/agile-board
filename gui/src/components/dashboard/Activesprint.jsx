import Axios from "axios";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { connect, useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMedia } from "use-media";
import { loadCreatedTasks, loadStartedSprint } from "../../redux/actions";
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

const ActiveSprint = (props) => {
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

  const { addToast } = useToasts();

  const selectedProject = useSelector(
    (state) => state.managment.selectedProject
  );

  const token = useSelector((state) => state.auth.token);

  const startedSprint = useSelector((state) => state.managment.sprint);

  const tasks = useSelector((state) => state.managment.tasks);

  const itemsBackend = useSelector((state) => state.managment.itemsFromBackend);

  const user = useSelector((state) => state.auth.user);

  const dinamicDroppables = useMemo(() => [...items], [items]);

  const isMobile = useMedia("only screen and (max-width: 768px)");
  const isTablet = useMedia("only screen and (max-width: 968px)");

  let filtered = [];

  if (startedSprint !== undefined) {
    filtered = itemsBackend.filter(
      ({ id: id1 }) => !startedSprint.tasks.some(({ id: id2 }) => id2 === id1)
    );
  }

  const filterTasksByStatus = (startedSprint) => {
    if (startedSprint === undefined) {
      return {
        0: {
          name: "Todo",
          items: [],
        },
        1: {
          name: "In progress",
          items: [],
        },
        2: {
          name: "To be verified",
          items: [],
        },
        3: {
          name: "Finished",
          items: [],
        },
      };
    }

    const tasks = startedSprint.tasks;

    console.log(tasks);

    const filteredtodoTasks = tasks.filter(
      (task) => task.metadata.status === "TODO"
    );
    const filteredInProgressTasks = tasks.filter(
      (task) => task.metadata.status === "IN_PROGRESS"
    );
    const filteredToBeVerTasks = tasks.filter(
      (task) => task.metadata.status === "TO_BE_VERIFIED"
    );
    const filteredFinishedTasks = tasks.filter(
      (task) => task.metadata.status === "FINISHED"
    );

    return {
      0: {
        name: "Todo",
        items: filteredtodoTasks,
      },
      1: {
        name: "In progress",
        items: filteredInProgressTasks,
      },
      2: {
        name: "To be verified",
        items: filteredToBeVerTasks,
      },
      3: {
        name: "Finished",
        items: filteredFinishedTasks,
      },
    };
  };

  const [columns, setColumns] = useState(filterTasksByStatus(startedSprint));

  const updateTasks = (tasks, id, currentItems) => {
    setColumns({
      ...columns,
      id: {
        ...columns[id],
        items: [...currentItems, tasks],
      },
    });
  };

  const handleUpdateTask = (task, status) => {
    console.log(task.content);
    Axios.post(
      `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/tasks/updateTaskStatus`,
      {},
      {
        params: {
          ticket: task.content.ticket,
          status: `${status}`,
          person: `${user.firstname} ${user.lastname}`,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        addToast(`Task set to: ${status}!`, {
          appearance: "success",
        });
      })
      .catch((err) => {
        addToast("Task not updated!", {
          appearance: "error",
        });
      });
    console.log("STARTED STAS", selectedProject);
    props.loadStartedSprint(selectedProject, token);
    props.loadCreatedTasks(selectedProject, token);
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

      if (destination.droppableId === "1") {
        const task = tasks.filter((item) => item.id === removed.id);

        console.log(task);

        handleUpdateTask(task[0], "IN_PROGRESS");
      }

      if (destination.droppableId === "2") {
        const task = tasks.filter((item) => item.id === removed.id);

        console.log(task);

        handleUpdateTask(task[0], "TO_BE_VERIFIED");
      }

      if (destination.droppableId === "3") {
        const task = tasks.filter((item) => item.id === removed.id);

        console.log(task);

        handleUpdateTask(task[0], "FINISHED");
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
          <Headline style={{ width: "20vw", height: "2vh" }}>
            Sprint board
          </Headline>
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
                flexDirection: isMobile ? "column" : "row",
                height: isMobile && "102vh",
                padding: "25px",
                margin: isMobile && "auto",
              }}
            >
              <DragDropContext
                onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
              >
                {Object.entries(columns).map(([id, column]) => {
                  return (
                    <BacklogWidget
                      style={{
                        width: isMobile ? "70vw" : "20vw",
                        height: "75vh",
                        margin: isMobile ? "3vh 0.5vw" : "0 0.5vw",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <BacklogHeadline
                          style={{ marginLeft: !taskOpen ? "1vw" : "1.5vw" }}
                        >
                          {column.name}
                        </BacklogHeadline>
                        <div
                          style={{
                            margin: "auto 10px",
                            fontSize: isTablet && "10px",
                          }}
                        >
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
                                background:
                                  snapshot.isDraggingOver &&
                                  column.name === "Todo"
                                    ? "#b3d1ff"
                                    : snapshot.isDraggingOver &&
                                      column.name === "In progress"
                                    ? "#edc34e"
                                    : snapshot.isDraggingOver &&
                                      column.name === "To be verified"
                                    ? "#cf54ff"
                                    : snapshot.isDraggingOver &&
                                      column.name === "Finished"
                                    ? "#9dff70"
                                    : "white",
                                transition: "0.5s",
                                padding: 4,
                                marginTop: "4vh",
                                width: !isMobile ? "17vw" : "68vw",
                                height: "72vh",
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
                                            height: "10vh",
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
                                            borderLeft:
                                              column.name === "Todo"
                                                ? "4px solid #3396ff"
                                                : column.name === "In progress"
                                                ? "4px solid #ffae00"
                                                : column.name ===
                                                  "To be verified"
                                                ? "4px solid #a880ff"
                                                : column.name === "Finished"
                                                ? "4px solid #0dff00"
                                                : "4px solid #3396ff",
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

export default connect(null, { loadStartedSprint, loadCreatedTasks })(
  ActiveSprint
);

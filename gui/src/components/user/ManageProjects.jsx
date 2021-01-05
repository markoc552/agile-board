import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
} from "../util/AgileStyledComponents";
import { Search, Button, Icon, Divider } from "semantic-ui-react";
import NewProject from "./NewProject";
import UpdateProjects from "./UpdateProjects";
import "../../style.css";

const ManageUsers = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("newProject");
  const [selected, setSelected] = useState("newProject");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Headline style={{ width: "20vw", height: "2vh" }}>Manage Projects</Headline>
      <ComponentWidget style={{ flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "12vw",
            height: "36.5",
            boxShadow: "4px 0px 10px -4px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ marginTop: "5vh", backgroundColor: "#fcfcfc" }}></div>
          <WidgetItem
            className={selected === "newProject" ? "user-item" : ""}
            onClick={() => {
              setShowPage("newProject");
              setSelected("newProject");
            }}
          >
            <Icon name="plus circle" color="blue" size="large" /> New project
          </WidgetItem>
          <WidgetItem
            className={selected === "updateProject" ? "user-item" : ""}
            onClick={() => {
              setShowPage("updateProjects");
              setSelected("updateProject");
            }}
            style={{fontSize: "12px"}}
          >
            <Icon name="sitemap" color="blue" size="large" /> Update projects
          </WidgetItem>
        </div>
        {showPage === "newProject" ? (
          <NewProject />
        ) : showPage === "updateProjects" ? (
          <UpdateProjects />
        ) : (
          <div>Invalid</div>
        )}
      </ComponentWidget>
    </div>
  );
};

export default ManageUsers;

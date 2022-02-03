import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import "../../style.css";
import {
  ComponentWidget,
  Headline,
  SideWidgetMenu,
  WidgetItem,
} from "../util/AgileStyledComponents";
import NewProject from "./NewProject";
import UpdateProjects from "./UpdateProjects";

const ManageUsers = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("newProject");
  const [selected, setSelected] = useState("newProject");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Headline style={{ width: "20vw", height: "2vh" }}>
        Manage Projects
      </Headline>
      <ComponentWidget style={{ flexDirection: "row" }}>
        <SideWidgetMenu>
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
            style={{ fontSize: "12px" }}
          >
            <Icon name="sitemap" color="blue" size="large" /> Update projects
          </WidgetItem>
        </SideWidgetMenu>
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

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import "../../style.css";
import {
  ComponentWidget,
  Headline,
  SideWidgetMenu,
  WidgetItem,
} from "../util/AgileStyledComponents";
import NewComponent from "./NewComponent";
import UpdateComponent from "./UpdateComponent";

const Components = () => {
  const [showPage, setShowPage] = useState("newComponent");
  const [selected, setSelected] = useState("newComponent");

  const currentProject = useSelector(
    (state) => state.managment.selectedProject
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Headline style={{ width: "20vw", height: "2vh" }}>Components</Headline>
      <ComponentWidget style={{ flexDirection: "row" }}>
        <SideWidgetMenu>
          <div style={{ marginTop: "5vh", backgroundColor: "#fcfcfc" }}></div>
          <WidgetItem
            className={selected === "newComponent" ? "user-item" : ""}
            onClick={() => {
              setShowPage("newComponent");
              setSelected("newComponent");
            }}
          >
            <Icon name="plus circle" color="blue" size="large" /> New
          </WidgetItem>
          <WidgetItem
            className={selected === "updateComponent" ? "user-item" : ""}
            onClick={() => {
              setShowPage("updateComponents");
              setSelected("updateComponent");
            }}
            style={{ fontSize: "12px" }}
          >
            <Icon name="sitemap" color="blue" size="large" /> Components
          </WidgetItem>
        </SideWidgetMenu>
        {showPage === "newComponent" && currentProject !== undefined && (
          <NewComponent currentProject={currentProject} />
        )}
        {showPage === "updateComponents" && <UpdateComponent />}
      </ComponentWidget>
    </div>
  );
};

export default Components;

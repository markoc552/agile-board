import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import "../../style.css";
import {
  ComponentWidget,
  Headline,
  SideWidgetMenu,
  WidgetItem,
} from "../util/AgileStyledComponents";
import EnrolledProjects from "./EnrolledProjects";

const MyProjects = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("enrolled");
  const [selected, setSelected] = useState("enrolled");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Headline style={{ width: "15vw", height: "2vh" }}>My projects</Headline>
      <ComponentWidget style={{ flexDirection: "row" }}>
        <SideWidgetMenu>
          <div style={{ marginTop: "5vh", backgroundColor: "#fcfcfc" }}></div>
          <WidgetItem
            className={selected === "enrolled" ? "user-item" : ""}
            onClick={() => {
              setShowPage("newUser");
              setSelected("newUser");
            }}
          >
            <Icon name="user plus" color="blue" size="large" /> Enrolled
          </WidgetItem>
        </SideWidgetMenu>
        {showPage === "enrolled" ? <EnrolledProjects /> : <div>Invalid</div>}
      </ComponentWidget>
    </div>
  );
};

export default MyProjects;

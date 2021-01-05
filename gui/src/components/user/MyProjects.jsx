import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
} from "../util/AgileStyledComponents";
import { Search, Button, Icon, Divider } from "semantic-ui-react";
import EnrolledProjects from "./EnrolledProjects";
import "../../style.css";

const MyProjects = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("enrolled");
  const [selected, setSelected] = useState("enrolled");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Headline style={{ width: "15vw", height: "2vh" }}>My projects</Headline>
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
            className={selected === "enrolled" ? "user-item" : ""}
            onClick={() => {
              setShowPage("newUser");
              setSelected("newUser");
            }}
          >
            <Icon name="user plus" color="blue" size="large" /> Enrolled
          </WidgetItem>
        </div>
        {showPage === "enrolled" ? <EnrolledProjects /> : <div>Invalid</div>}
      </ComponentWidget>
    </div>
  );
};

export default MyProjects;

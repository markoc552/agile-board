import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
} from "../util/AgileStyledComponents";
import { Search, Button, Icon, Divider } from "semantic-ui-react";
import NewUser from "./NewUser";
import UpdateUsers from "./UpdateUsers";

const ManageUsers = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("updateUsers");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Headline style={{ width: "15vw", height: "2vh" }}>Manage Users</Headline>
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
          <WidgetItem onClick={() => setShowPage("newUser")}>
            <Icon name="user plus" color="blue" size="large" /> New user
          </WidgetItem>
          <WidgetItem onClick={() => setShowPage("updateUsers")}>
            <Icon name="users" color="blue" size="large" /> Update users
          </WidgetItem>
          <WidgetItem onClick={() => setShowPage("deleteUser")}>
            <Icon name="user times" color="blue" size="large" /> Delete user
          </WidgetItem>
        </div>
        {showPage === "newUser" ? (
          <NewUser />
        ) : showPage === "updateUsers" ? (
          <UpdateUsers />
        ) : (
          <div>Invalid</div>
        )}
      </ComponentWidget>
    </div>
  );
};

export default ManageUsers;

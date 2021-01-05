import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Headline,
  DashboardNav as Navigation,
  ComponentWidget,
  WidgetItem,
} from "../util/AgileStyledComponents";
import { Search, Button, Icon, Divider } from "semantic-ui-react";
import ProfilePage from "./ProfilePage";
import UpdateProfilePage from "./UpdateProfilePage";
import "../../style.css";

const MyProfile = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("myProfile");
  const [selected, setSelected] = useState("myProfile");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Headline style={{ width: "20vw", height: "2vh" }}>My profile</Headline>
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
            className={selected === "myProfile" ? "user-item" : ""}
            onClick={() => {
              setShowPage("myProfile");
              setSelected("myProfile");
            }}
          >
            <Icon name="user" color="blue" size="large" /> My profile
          </WidgetItem>
          <WidgetItem
            className={selected === "updateProfile" ? "user-item" : ""}
            onClick={() => {
              setShowPage("updateProfiles");
              setSelected("updateProfile");
            }}
          >
            <Icon name="user plus" color="blue" size="large" /> Update profile
          </WidgetItem>
        </div>
        {showPage === "myProfile" ? (
          <ProfilePage />
        ) : showPage === "updateProfiles" ? (
          <UpdateProfilePage />
        ) : (
          <div>Invalid</div>
        )}
      </ComponentWidget>
    </div>
  );
};

export default MyProfile;

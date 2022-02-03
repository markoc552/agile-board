import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import "../../style.css";
import {
  ComponentWidget,
  Headline,
  SideWidgetMenu,
  WidgetItem,
} from "../util/AgileStyledComponents";
import ProfilePage from "./ProfilePage";
import UpdateProfilePage from "./UpdateProfilePage";

const MyProfile = (props) => {
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState("myProfile");
  const [selected, setSelected] = useState("myProfile");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Headline style={{ width: "20vw", height: "2vh" }}>My profile</Headline>
      <ComponentWidget style={{ flexDirection: "row" }}>
        <SideWidgetMenu>
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
        </SideWidgetMenu>
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

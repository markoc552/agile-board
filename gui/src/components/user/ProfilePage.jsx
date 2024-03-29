import React from "react";
import { Icon, Image, Message } from "semantic-ui-react";
import { Headline, StyledProfileLabel } from "../util/AgileStyledComponents";

const NewProject = () => {
  return (
    <div>
      <Headline>My profile</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ padding: "50px", margin: "0 30px" }}>
          <Image
            src={require("../../assets/images/agile-logo.png")}
            size="mini"
            avatar
            style={{ width: "80px", height: "80px", margin: "15px 20px" }}
          />
          <div>
            <StyledProfileLabel>
              <Icon name="user" />
              Username
            </StyledProfileLabel>
            <StyledProfileLabel style={{ fontWeight: "100", fontSize: "14px" }}>
              Value
            </StyledProfileLabel>
          </div>
          <div>
            <StyledProfileLabel>
              <Icon name="user" />
              Firstname
            </StyledProfileLabel>
            <StyledProfileLabel style={{ fontWeight: "100", fontSize: "14px" }}>
              Value
            </StyledProfileLabel>
          </div>
          <div>
            <StyledProfileLabel>
              <Icon name="user" />
              Lastname
            </StyledProfileLabel>
            <StyledProfileLabel style={{ fontWeight: "100", fontSize: "14px" }}>
              Value
            </StyledProfileLabel>
          </div>
          <div>
            <StyledProfileLabel>
              <Icon name="at" />
              Email
            </StyledProfileLabel>
            <StyledProfileLabel style={{ fontWeight: "100", fontSize: "14px" }}>
              Value
            </StyledProfileLabel>
          </div>
        </div>
        <Message
          color="blue"
          style={{ width: "25vw", height: "10vh", marginLeft: "10vw" }}
        >
          <Message.Header>Info</Message.Header>
          <p style={{ fontSize: "15px", marginTop: "10px", color: "#253858" }}>
            This page shows your profile info. You can if you want change that
            in Update profile section
          </p>
        </Message>
      </div>
    </div>
  );
};

export default NewProject;

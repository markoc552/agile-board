import React from "react";
import PropTypes from "prop-types";
import {
  DashboardWelcomeWrapper,
  Headline,
  SystemDashboardContentWrapper,
  ContentNav,
  DashboardNavItem as NavItem,
  ProjectNavigationItem,
  DashboardHeadline,
} from "../util/AgileStyledComponents";
import { Divider, Icon } from "semantic-ui-react";

const ProjectNavigation = (props) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "14vw",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "11vw",
          height: "7vh",
          borderRadius: "10px",
          backgroundColor: "#a6cbff",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DashboardHeadline>General</DashboardHeadline>
        <DashboardHeadline style={{ fontSize: "10px", marginTop: "-10px" }}>
          Dashboards, Projects ...
        </DashboardHeadline>
      </div>
      <NavItem>
        <div style={{ margin: "auto auto", verticalAlign: "middle" }} onClick={() => props.setPage("dashboard")}>
          <Icon name="box" size="large" /> Dashboards
        </div>
      </NavItem>
      <NavItem>
        <div style={{ margin: "auto auto", verticalAlign: "middle" }} onClick={() => props.setPage("projects")}>
          <Icon name="box" size="large" /> Projects
        </div>
      </NavItem>
      <div
        style={{
          width: "11vw",
          height: "7vh",
          borderRadius: "10px",
          backgroundColor: "#c4caff",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DashboardHeadline>Applications</DashboardHeadline>
        <DashboardHeadline style={{ fontSize: "10px", marginTop: "-10px" }}>
          Ready to use
        </DashboardHeadline>
      </div>
      <NavItem>
        <div style={{ margin: "auto auto", verticalAlign: "middle" }} onClick={() => props.setPage("project")}>
          <Icon name="box" size="large" /> Project
        </div>
      </NavItem>
      <NavItem>
        <div style={{ margin: "auto auto", verticalAlign: "middle" }} onClick={() => props.setPage("sprint")}>
          <Icon name="box" size="large" /> Active sprint
        </div>
      </NavItem>
      <NavItem>
        <div style={{ margin: "auto auto", verticalAlign: "middle" }} onClick={() => props.setPage("backlog")}>
          <Icon name="box" size="large" /> Backlog
        </div>
      </NavItem>
      <NavItem>
        <div style={{ margin: "auto auto", verticalAlign: "middle" }} onClick={() => props.setPage("issues")}>
          <Icon name="box" size="large" /> Issues
        </div>
      </NavItem>
      <NavItem>
        <div style={{ margin: "auto auto", verticalAlign: "middle" }} onClick={() => props.setPage("components")}>
          <Icon name="box" size="large" /> Components
        </div>
      </NavItem>
    </div>
  );
};

export default ProjectNavigation;

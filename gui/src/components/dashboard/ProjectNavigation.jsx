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
  ProjectNavigationBar,
  DashboardHeadlineWrapper,
} from "../util/AgileStyledComponents";
import { Divider, Icon } from "semantic-ui-react";

const ProjectNavigation = (props) => {
  return (
    <ProjectNavigationBar
      style={{
        opacity: !props.showMenu ? "0" : "1",
        height: !props.showMenu ? "0vh" : "94vh",
        transition: "0.5s",
      }}
    >
      <div style={{ display: !props.showMenu ? "none" : "block" }}>
        <DashboardHeadlineWrapper>
          <DashboardHeadline>General</DashboardHeadline>
          <DashboardHeadline style={{ fontSize: "10px", marginTop: "-10px" }}>
            Dashboards, Projects ...
          </DashboardHeadline>
        </DashboardHeadlineWrapper>
        <NavItem>
          <div
            style={{ margin: "auto auto", verticalAlign: "middle" }}
            onClick={() => props.setPage("dashboard")}
          >
            <Icon name="box" size="large" /> Dashboards
          </div>
        </NavItem>
        <NavItem>
          <div
            style={{ margin: "auto auto", verticalAlign: "middle" }}
            onClick={() => props.setPage("projects")}
          >
            <Icon name="box" size="large" /> Projects
          </div>
        </NavItem>
        <DashboardHeadlineWrapper>
          <DashboardHeadline>Applications</DashboardHeadline>
          <DashboardHeadline style={{ fontSize: "10px", marginTop: "-10px" }}>
            Ready to use
          </DashboardHeadline>
        </DashboardHeadlineWrapper>
        <NavItem>
          <div
            style={{ margin: "auto auto", verticalAlign: "middle" }}
            onClick={() => props.setPage("project")}
          >
            <Icon name="box" size="large" /> Project
          </div>
        </NavItem>
        <NavItem>
          <div
            style={{ margin: "auto auto", verticalAlign: "middle" }}
            onClick={() => props.setPage("sprint")}
          >
            <Icon name="box" size="large" /> Active sprint
          </div>
        </NavItem>
        <NavItem>
          <div
            style={{ margin: "auto auto", verticalAlign: "middle" }}
            onClick={() => props.setPage("backlog")}
          >
            <Icon name="box" size="large" /> Backlog
          </div>
        </NavItem>
        <NavItem>
          <div
            style={{ margin: "auto auto", verticalAlign: "middle" }}
            onClick={() => props.setPage("issues")}
          >
            <Icon name="box" size="large" /> Issues
          </div>
        </NavItem>
        <NavItem>
          <div
            style={{ margin: "auto auto", verticalAlign: "middle" }}
            onClick={() => props.setPage("components")}
          >
            <Icon name="box" size="large" /> Components
          </div>
        </NavItem>
      </div>
    </ProjectNavigationBar>
  );
};

export default ProjectNavigation;

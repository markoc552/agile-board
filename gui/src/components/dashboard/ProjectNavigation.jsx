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
          <DashboardHeadline style={{margin: "auto 1vw"}}>General</DashboardHeadline>
        </DashboardHeadlineWrapper>
        <NavItem>
          <div
            style={{ margin: "auto auto", verticalAlign: "middle" }}
            onClick={() => props.setPage("dashboard")}
          >
            <Icon name="box" size="large" /> Activity
          </div>
        </NavItem>
        <NavItem>
          <div
            style={{ margin: "auto auto", verticalAlign: "middle" }}
            onClick={() => props.setPage("dashboard")}
          >
            <Icon name="box" size="large" /> Dashboards
          </div>
        </NavItem>
        <DashboardHeadlineWrapper>
          <DashboardHeadline style={{margin: "auto 1vw"}}>Project</DashboardHeadline>
        </DashboardHeadlineWrapper>
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

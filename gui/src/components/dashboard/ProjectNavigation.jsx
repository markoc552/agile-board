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
          <DashboardHeadline style={{ margin: "auto 1vw" }}>
            General
          </DashboardHeadline>
        </DashboardHeadlineWrapper>
        <NavItem onClick={() => props.setPage("activity")}>
          <div style={{ margin: "auto 0", verticalAlign: "middle" }}>
            <Icon name="adn" color="blue" size="big" /> Activity
          </div>
        </NavItem>
        <NavItem onClick={() => props.setPage("dashboard")}>
          <div style={{ margin: "auto 0", verticalAlign: "middle" }}>
            <Icon name="dashboard" color="orange" size="big" /> Dashboards
          </div>
        </NavItem>
        <DashboardHeadlineWrapper>
          <DashboardHeadline style={{ margin: "auto 1vw" }}>
            Project
          </DashboardHeadline>
        </DashboardHeadlineWrapper>
        <NavItem onClick={() => props.setPage("sprint")}>
          <div style={{ margin: "auto 0", verticalAlign: "middle" }}>
            <Icon name="keyboard outline" color="green" size="big" /> Sprint dashboard
          </div>
        </NavItem>
        <NavItem onClick={() => props.setPage("backlog")}>
          <div style={{ margin: "auto 0", verticalAlign: "middle" }}>
            <Icon name="bars" color="teal" size="big" /> Backlog
          </div>
        </NavItem>
        <NavItem onClick={() => props.setPage("issues")}>
          <div style={{ margin: "auto 0", verticalAlign: "middle" }}>
            <Icon name="clipboard list" color="violet" size="big" /> Issues
          </div>
        </NavItem>
        <NavItem onClick={() => props.setPage("components")}>
          <div style={{ margin: "auto 0", verticalAlign: "middle" }}>
            <Icon name="boxes" color="blue" size="big" /> Components
          </div>
        </NavItem>
      </div>
    </ProjectNavigationBar>
  );
};

export default ProjectNavigation;

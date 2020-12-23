import React, { useState } from "react";
import PropTypes from "prop-types";
import Navigation from "../components/dashboard/DashboardNavigation";
import {
  DashboardWelcomeWrapper,
  Headline,
  SystemDashboardContentWrapper,
  ContentNav,
  DashboardNavItem as NavItem,
  ProjectNavigationItem,
  DashboardHeadline,
} from "../components/util/AgileStyledComponents";
import { Divider, Icon } from "semantic-ui-react";
import IssuerModal from "../components/dashboard/IssuerModal";
import ProjectNavigation from "../components/dashboard/ProjectNavigation";
import General from "../components/dashboard/General";
import ProjectActivity from "../components/dashboard/ProjectActivity";
import Backlog from "../components/dashboard/Backlog";
import Issues from "../components/dashboard/Issues";
import Activesprint from "../components/dashboard/Activesprint";
import Components from "../components/dashboard/Components";

const Dashboard = (props) => {
  const [issuerModalShow, setIssuerModalShow] = useState(false);
  const [showPage, setPage] = useState("components");

  return (
    <>
      <Navigation setShowModal={setIssuerModalShow} />
      <DashboardWelcomeWrapper>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <ProjectNavigation setPage={setPage} />
          {showPage === "activity" ? (
            <ProjectActivity />
          ) : showPage === "backlog" ? (
            <Backlog />
          ) : showPage === "issues" ? (
            <Issues />
          ) : showPage === "sprint" ? (
            <Activesprint />
          ) : showPage === "components" ? (
            <Components />
          ) : showPage === "dashboard" ? (
            <General />
          ) : (
            <div></div>
          )}
        </div>
      </DashboardWelcomeWrapper>
      {issuerModalShow && (
        <IssuerModal show={issuerModalShow} setShow={setIssuerModalShow} />
      )}
    </>
  );
};

export default Dashboard;

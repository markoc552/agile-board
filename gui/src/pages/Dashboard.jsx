import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Navigation from "../components/dashboard/DashboardNavigation";
import { DashboardWelcomeWrapper } from "../components/util/AgileStyledComponents";
import { Divider, Icon } from "semantic-ui-react";
import IssuerModal from "../components/dashboard/IssuerModal";
import ProjectNavigation from "../components/dashboard/ProjectNavigation";
import General from "../components/dashboard/General";
import ProjectActivity from "../components/dashboard/ProjectActivity";
import Backlog from "../components/dashboard/Backlog";
import Issues from "../components/dashboard/Issues";
import Activesprint from "../components/dashboard/Activesprint";
import Components from "../components/dashboard/Components";
import RegisterLoginWrapper from "../components/dashboard/RegisterLoginWrapper";
import ManageUsers from "../components/user/ManageUsers";
import ManageProjects from "../components/user/ManageProjects";
import MyIssues from "../components/user/MyIssues";
import MyProfile from "../components/user/MyProfile";
import MyProjects from "../components/user/MyProjects";

const Dashboard = (props) => {
  const [issuerModalShow, setIssuerModalShow] = useState(false);
  const [showPage, setPage] = useState("manageUsers");

  const isLogged = useSelector((state) => {
    return state.auth.logged;
  });

  console.log("Showing page: ", showPage)

  return (
    <>
      <Navigation
        setShowModal={setIssuerModalShow}
        isLogged={isLogged}
        setShowPage={setPage}
      />
      <DashboardWelcomeWrapper>
        {isLogged === true ? (
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
            ) : showPage === "manageUsers" ? (
              <ManageUsers />
            ) : showPage === "manageProjects" ? (
              <ManageProjects />
            ) : showPage === "myIssues" ? (
              <MyIssues />
            ) : showPage === "myProfile" ? (
              <MyProfile />
            ) : showPage === "myProjects" ? (
              <MyProjects />
            ) : (
              <div>Wrong page</div>
            )}
          </div>
        ) : (
          <RegisterLoginWrapper>Please register or login</RegisterLoginWrapper>
        )}
      </DashboardWelcomeWrapper>
      {issuerModalShow && (
        <IssuerModal show={issuerModalShow} setShow={setIssuerModalShow} />
      )}
    </>
  );
};

export default Dashboard;

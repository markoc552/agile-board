import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Navigation from "../components/dashboard/DashboardNavigation";
import {
  DashboardWelcomeWrapper,
  ProjectBoard,
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
import RegisterLoginWrapper from "../components/dashboard/RegisterLoginWrapper";
import ManageUsers from "../components/user/ManageUsers";
import ManageProjects from "../components/user/ManageProjects";
import MyIssues from "../components/user/MyIssues";
import MyProfile from "../components/user/MyProfile";
import MyProjects from "../components/user/MyProjects";
import { useMedia } from "use-media";
import ProjectSelectModal from "../components/dashboard/ProjectSelectModal";

const Dashboard = (props) => {
  const [issuerModalShow, setIssuerModalShow] = useState(false);
  const [showPage, setPage] = useState("issues");
  const [showMenu, isMenuShow] = useState(true);
  const [showModal, isModalShow] = useState(false);

  const isMobileView = useMedia("(max-width: 1270px)");
  const isDesktopView = useMedia("(min-width: 1042px)");

  const handleClickMenu = () => {
    showMenu ? isMenuShow(false) : isMenuShow(true);
  };

  const isLogged = useSelector((state) => {
    return state.auth.logged;
  });

  const selectedProject = useSelector(
    (state) => state.managment.selectedProject
  );

  console.log("Showing page: ", showPage);

  return (
    <>
      <Navigation
        setShowModal={setIssuerModalShow}
        isLogged={isLogged}
        setShowPage={setPage}
        onClick={(e) => e.stopPropagation()}
        handleClickMenu={handleClickMenu}
        isMobileView={isMobileView}
        setShowPage={setPage}
      />
      <DashboardWelcomeWrapper
        style={{
          height:
            isMobileView && showMenu
              ? "190vh"
              : isMobileView
              ? "120vh"
              : "100vh",
        }}
      >
        {isLogged === true ? (
          <ProjectBoard>
            <ProjectNavigation
              setPage={setPage}
              onClick={(e) => e.stopPropagation()}
              showMenu={showMenu}
            />
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
            ) : showPage === "selectProjectModal" ? (
              <ProjectSelectModal
                show={true}
                setShow={isModalShow}
                setShowPage={setPage}
              />
            ) : (
              <div>Wrong page</div>
            )}
          </ProjectBoard>
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

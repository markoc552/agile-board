import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMedia } from "use-media";
import Activesprint from "../components/dashboard/Activesprint";
import Backlog from "../components/dashboard/Backlog";
import Components from "../components/dashboard/Components";
import Navigation from "../components/dashboard/DashboardNavigation";
import General from "../components/dashboard/General";
import IssuerModal from "../components/dashboard/IssuerModal";
import Issues from "../components/dashboard/Issues";
import ProjectActivity from "../components/dashboard/ProjectActivity";
import ProjectNavigation from "../components/dashboard/ProjectNavigation";
import ProjectSelectModal from "../components/dashboard/ProjectSelectModal";
import RegisterLoginWrapper from "../components/dashboard/RegisterLoginWrapper";
import ManageProjects from "../components/user/ManageProjects";
import ManageUsers from "../components/user/ManageUsers";
import MyIssues from "../components/user/MyIssues";
import MyProfile from "../components/user/MyProfile";
import MyProjects from "../components/user/MyProjects";
import {
  DashboardWelcomeWrapper,
  ProjectBoard,
} from "../components/util/AgileStyledComponents";

const Dashboard = (props) => {
  const [issuerModalShow, setIssuerModalShow] = useState(false);
  const [showPage, setPage] = useState("issues");
  const [showMenu, isMenuShow] = useState(true);
  const [showModal, isModalShow] = useState(false);

  const isMobileView = useMedia("(max-width: 1410px)");
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
              <ProjectActivity setPage={setPage} isModalShow={isModalShow} />
            ) : showPage === "backlog" ? (
              <Backlog setPage={setPage} isModalShow={isModalShow} />
            ) : showPage === "issues" ? (
              <Issues setPage={setPage} isModalShow={isModalShow} />
            ) : showPage === "sprint" ? (
              <Activesprint setPage={setPage} isModalShow={isModalShow} />
            ) : showPage === "components" ? (
              <Components setPage={setPage} isModalShow={isModalShow} />
            ) : showPage === "dashboard" ? (
              <General setPage={setPage} isModalShow={isModalShow} />
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
                show={showModal}
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

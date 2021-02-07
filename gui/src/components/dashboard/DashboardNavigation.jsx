import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  DashboardNav as Navigation,
  DashboardNavItem,
  DashboardNavHeadline,
  DashboardUserWrapper,
  DashboardNavHeadlineItemWrapper,
  DashboardNavHeadlineItemContainer,
} from "../util/AgileStyledComponents";
import { Image, Search, Dropdown, Icon, Button } from "semantic-ui-react";
import { useSelector, connect } from "react-redux";
import ProjectSelectModal from "./ProjectSelectModal";
import { login } from "../../redux/actions";

const DashboardNav = (props) => {
  const [showModal, isModalShow] = useState(false);

  const user = useSelector((state) => state.auth.user);

  console.log(user);

  return (
    <Navigation>
      <DashboardNavHeadline>
        <div style={{ margin: "1vh 0" }}>
          <Image
            src={require("../../assets/images/agile-logo.png")}
            size="mini"
            avatar
            style={{ width: "40px", height: "40px" }}
          />
          AGILE BOARD
        </div>
      </DashboardNavHeadline>
      <DashboardUserWrapper>
        <DashboardNavHeadlineItemContainer>
          {props.isMobileView && (
            <DashboardNavHeadlineItemWrapper onClick={props.handleClickMenu}>
              <Icon
                name="align justify"
                size="big"
                color="blue"
                style={{ cursor: "pointer", margin: "0.5vh 0" }}
              />
            </DashboardNavHeadlineItemWrapper>
          )}

          {user !== undefined && (
            <>
              <Button
                color="teal"
                circular
                style={{
                  margin: props.isMobileView ? "1vh 0" : "auto 0",
                  height: props.isMobileView && "5vh",
                }}
                onClick={() => isModalShow(true)}
              >
                Choose project
              </Button>
              <DashboardNavHeadlineItemWrapper>
                <Search style={{ margin: "1vh 50px" }} />
              </DashboardNavHeadlineItemWrapper>
              <div>
                <Dropdown
                  icon="false"
                  trigger={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        fontFamily: "'Arvo', serif",
                        margin: "0.4vh auto",
                      }}
                    >
                      <Image
                        src={require("../../assets/images/agile-logo.png")}
                        size="mini"
                        avatar
                        bordered
                        style={{
                          width: "50px",
                          height: "50px",
                          margin: "0 auto",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          color: "white",
                          fontSize: "15.9px",
                          fontWeight: "bold",
                        }}
                      >
                        <div style={{ margin: "auto 10px" }}>
                          <div>{`${user.firstname} ${user.lastname}`}</div>
                          <div>
                            <Icon name="circle" color="green" />
                            Online
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <Dropdown.Menu>
                    <Dropdown.Header icon="user" content="Administrator" />
                    <Dropdown.Divider />
                    <Dropdown.Item
                      icon="sitemap"
                      text="Manage projects"
                      onClick={() => props.setShowPage("manageProjects")}
                    />
                    <Dropdown.Item
                      icon="user"
                      text="Manage users"
                      onClick={() => props.setShowPage("manageUsers")}
                    />
                    <Dropdown.Header icon="user" content="User" />
                    <Dropdown.Divider />
                    <Dropdown.Item
                      icon="attention"
                      text="My profile"
                      onClick={() => props.setShowPage("myProfile")}
                    />
                    <Dropdown.Item
                      icon="sitemap"
                      text="My projects"
                      onClick={() => props.setShowPage("myProjects")}
                    />
                    <Dropdown.Item
                      icon="file code"
                      text="My issues"
                      onClick={() => props.setShowPage("myIssues")}
                    />
                    <Dropdown.Item
                      icon="sign out"
                      text="Sign out"
                      onClick={() => props.login(false, undefined)}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          )}
        </DashboardNavHeadlineItemContainer>
      </DashboardUserWrapper>
      {showModal && (
        <ProjectSelectModal
          show={showModal}
          setShowPage={props.setShowPage}
          setShow={isModalShow}
        />
      )}
    </Navigation>
  );
};

export default connect(null, { login })(DashboardNav);

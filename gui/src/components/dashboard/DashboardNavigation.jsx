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
import { useMedia } from "use-media";

const DashboardNav = (props) => {
  const [showModal, isModalShow] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const isMobile = useMedia("only screen and (max-width: 645px)")

  console.log(user);

  return (
    <Navigation>
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
                style={{margin: "auto 0"}}
                onClick={() => isModalShow(true)}
              >
                Choose project
              </Button>
              <DashboardNavHeadlineItemWrapper>
                <Search style={{ margin: "auto 50px", display: isMobile && "none" }} />
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
                        <div style={{fontSize: 14}}>
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

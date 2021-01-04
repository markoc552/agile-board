import React from "react";
import PropTypes from "prop-types";
import {
  DashboardNav as Navigation,
  DashboardNavItem,
  DashboardNavHeadline,
} from "../util/AgileStyledComponents";
import { Image, Search, Dropdown, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

const DashboardNav = (props) => {
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  return (
    <Navigation>
      <DashboardNavHeadline>
        <Image
          src={require("../../assets/images/agile-logo.png")}
          size="mini"
          avatar
          style={{ width: "40px", height: "40px", margin: "0 auto" }}
        />
        Agile Board
      </DashboardNavHeadline>
      <div
        style={{
          marginLeft: "52vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Dropdown
          text="Language"
          icon="add user"
          labeled
          button
          basic
          className="icon"
          style={{ width: "7.5vw", height: "3.5vh", margin: "auto 0" }}
        >
          <Dropdown.Menu></Dropdown.Menu>
        </Dropdown>

        <Search style={{ margin: "auto 50px" }} />

        <div>
          <Dropdown
            icon="false"
            trigger={
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  src={require("../../assets/images/agile-logo.png")}
                  size="mini"
                  avatar
                  bordered
                  style={{ width: "50px", height: "50px", margin: "0 auto" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ margin: "auto 10px" }}>
                    <div>Marko</div>
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
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {user !== undefined && (
          <>
            <Image
              src={require("../../assets/images/agile-logo.png")}
              size="mini"
              avatar
              bordered
              style={{ width: "50px", height: "50px", margin: "0 auto" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ margin: "auto 10px" }}>
                <div>{user.firstname}</div>
                <div>
                  <Icon name="circle" color="green" />
                  Online
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Navigation>
  );
};

export default DashboardNav;

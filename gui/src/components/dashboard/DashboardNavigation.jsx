import React from "react";
import PropTypes from "prop-types";
import {
  DashboardNav as Navigation,
  DashboardNavItem,
  DashboardNavHeadline,
} from "../util/AgileStyledComponents";
import { Image, Search, Dropdown } from "semantic-ui-react";

const DashboardNav = (props) => {
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
          style={{width: "7.5vw", height: "3.5vh", margin: "auto 0"}}
        >
          <Dropdown.Menu></Dropdown.Menu>
        </Dropdown>

        <Search style={{ margin: "auto 50px" }} />
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
            <div>Active</div>
          </div>
        </div>
      </div>
    </Navigation>
  );
};

export default DashboardNav;

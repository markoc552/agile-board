import React, { useState } from "react";
import { Icon, Search } from "semantic-ui-react";
import {
  ComponentWidget,
  DashboardNav as Navigation,
  Headline,
} from "../util/AgileStyledComponents";

const MyIssues = (props) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Headline style={{ width: "11vw", height: "2vh" }}>MyIssues</Headline>
      <ComponentWidget>
        <Navigation
          style={{
            width: "70vw",
            height: "8vh",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            boxShadow: "none",
            borderBottom: "2px solid #cfcfcf",
            padding: "5px",
          }}
        >
          <Headline
            style={{
              fontSize: "15px",
              margin: "auto auto",
              width: "12vw",
              padding: "2px",
              cursor: "default",
            }}
          >
            <Icon name="numbered list" size="large"></Icon>Active components: 2
          </Headline>
          <Search
            style={{ padding: "4px", margin: "auto", marginLeft: "34vw" }}
          />
          <Icon
            name="plus"
            size="large"
            circular
            style={{
              padding: "4px",
              width: "7.5vw",
              height: "4vh",
              margin: "auto 10px",
              cursor: "pointer",
            }}
            onClick={() => setShow(true)}
          />
        </Navigation>
      </ComponentWidget>
    </div>
  );
};

export default MyIssues;

import React from "react";
import PropTypes from "prop-types";
import { Headline } from "../util/AgileStyledComponents";

const ProjectActivity = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Headline>Activity</Headline>
        <div
          style={{
            width: "35vw",
            height: "85vh",
            backgroundColor: "blue",
            margin: "25px",
          }}
        ></div>
      </div>
      <Headline style={{ margin: "0 100px", fontSize: "15px" }}> </Headline>
      <div>
        <Headline style={{ margin: "0 100px", fontSize: "15px" }}>
          Project lead
        </Headline>
        <Headline style={{ margin: "-50px 100px", fontSize: "15px" }}>
          Key
        </Headline>
      </div>
    </div>
  );
};

export default ProjectActivity;

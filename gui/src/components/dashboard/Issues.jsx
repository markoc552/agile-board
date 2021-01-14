import React from "react";
import PropTypes from "prop-types";
import {
  IssuesList,
  IssueCard,
  StyledLabel,
} from "../util/AgileStyledComponents";
import {Label} from "semantic-ui-react"

const Issues = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <IssuesList>
        <StyledLabel
          style={{
            height: "5vw",
            boxShadow: "2px 8px 5px 0px rgba(0,0,0,0.09)",
            fontFamily: "'Arvo', serif",
            fontWeight: "bold",
            display: "flex",
            fontSize: "15px",
          }}
        >
          <div style={{ margin: "auto 2vw" }}>Issues list</div>
        </StyledLabel>
        <div style={{ height: "94.5vh" }}>
          <div
            style={{
              display: "flex",
              height: "7vh",
              margin: "8px 0",
              backgroundColor: "white",
              borderLeft: "4px solid #3396ff",
              boxShadow: "1px 5px 10px -4px rgba(0, 0, 0, 0.07)",
            }}
          >
            <div style={{margin: "auto 2vw"}}>
              <Label style={{marginRight: "1vw"}}color="blue"size="large" basic>Agile</Label> Test
            </div>
          </div>
          <div
            style={{
              height: "7vh",
              margin: "8px 0",
              backgroundColor: "white",
              boxShadow: "1px 5px 10px -4px rgba(0, 0, 0, 0.07)",
              borderLeft: "4px solid #3396ff",
            }}
          ></div>
        </div>
      </IssuesList>
      <IssueCard></IssueCard>
    </div>
  );
};

export default Issues;

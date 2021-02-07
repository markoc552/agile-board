import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Headline } from "../util/AgileStyledComponents";
import { Feed, Icon, Label, Segment } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Axios from "axios";

const ProjectActivity = (props) => {
  const [feed, setFeed] = useState([]);

  const projectData = useSelector((state) => state.managment.projectData);

  const selectedProject = useSelector(
    (state) => state.managment.selectedProject
  );

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    Axios.get(`${window.ENVIRONMENT.AGILE_CENTRAL}/v1/tasks/getActivity`, {
      params: {
        projectName: selectedProject,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => setFeed(res.data));
  }, []);

  console.log("FEED", feed);

  return projectData === undefined ? (
    <div></div>
  ) : (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Headline>Activity</Headline>
        <div
          style={{
            width: "35vw",
            height: "85vh",
            margin: "25px",
            overflowY: "scroll",
          }}
        >
          <Feed>
            {feed.map((item) => (
              <Feed.Event>
                <Feed.Label>
                  <Icon name="user" color="blue" />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>{item.person}</Feed.User> {item.action}
                    <Feed.Date>{item.timeAt}</Feed.Date>
                  </Feed.Summary>
                  <Feed.Meta>
                    <Feed.Like>
                      <Label basic>Comment</Label>
                    </Feed.Like>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>
        </div>
      </div>
      <Segment
        color="blue"
        raised
        style={{ width: "25vw", height: "25vh", margin: "5vh, 5vw" }}
      >
        <Headline style={{ margin: "0 0", fontSize: "15px" }}>
          Project: {selectedProject}
        </Headline>
        <Headline style={{ margin: "0 0", fontSize: "15px" }}>
          Manager: {projectData.manager}
        </Headline>
        <Headline style={{ margin: "-50px 0", fontSize: "15px" }}>
          Ticket: {projectData.keyword}
        </Headline>
      </Segment>
    </div>
  );
};

export default ProjectActivity;

import React from "react";
import PropTypes from "prop-types";
import { Headline } from "../util/AgileStyledComponents";
import { Feed, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

const ProjectActivity = (props) => {
  const projectData = useSelector((state) => state.managment.projectData);

  const selectedProject = useSelector(
    (state) => state.managment.selectedProject
  );

  console.log(projectData);

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
          }}
        >
          <Feed>
            <Feed.Event>
              <Feed.Label>
                <img src="/images/avatar/small/elliot.jpg" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>Elliot Fu</Feed.User> added you as a friend
                  <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name="like" />4 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </div>
      </div>
      <div>
        <Headline style={{ margin: "0 100px", fontSize: "15px" }}>
          {selectedProject}
        </Headline>
        <Headline style={{ margin: "0 100px", fontSize: "15px" }}>
          Project manager: {projectData.manager}
        </Headline>
        <Headline style={{ margin: "-50px 100px", fontSize: "15px" }}>
          Ticket: {projectData.keyword}
        </Headline>
      </div>
    </div>
  );
};

export default ProjectActivity;

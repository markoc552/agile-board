import React from "react";
import {SolutionsWrapper, SoftwareName} from "../util/AgileStyledComponents"
import {Grid, Image} from "semantic-ui-react"

const SolutionOne = (props) => {
  return (
    <>
      <div style={{ marginTop: "35px" }}>
        <SolutionsWrapper>Dolor sit amet</SolutionsWrapper>
        <div style={{ marginTop: "10px" }}>
          Stay on track as you plan, develop, and deliver products.
        </div>
      </div>
      <div style={{ width: "35vw", marginTop: "25px" }}>
        <Grid verticalAlign="middle">
          <Grid.Row columns={2}>
            <Grid.Column textAlign="center">
              <Image
                src={require("../../assets/images/company-six.png")}
                style={{ width: "75px", height: "75px" }}
                centered
              />
            </Grid.Column>
            <Grid.Column>
              <SoftwareName>Software 7</SoftwareName>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image
                src={require("../../assets/images/company-seven.png")}
                size="mini"
                centered
                style={{ width: "75px", height: "75px" }}
              />
            </Grid.Column>
            <Grid.Column>
              <SoftwareName>Software 8</SoftwareName>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image
                src={require("../../assets/images/company-three.png")}
                size="mini"
                centered
                style={{ width: "75px", height: "75px" }}
              />
            </Grid.Column>
            <Grid.Column>
              <SoftwareName>Software 9</SoftwareName>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default SolutionOne;

import React from "react";
import { Grid, Image } from "semantic-ui-react";
import { SoftwareName, SolutionsWrapper } from "../util/AgileStyledComponents";

const Solution = ({ imageUris, softwareNames }) => {
  const renderSoutions = () =>
    imageUris.map((imageUri, index) => (
      <Grid.Row columns={2}>
        <Grid.Column textAlign="center">
          <Image
            src={`${imageUri}`}
            style={{ width: "75px", height: "75px" }}
            centered
          />
        </Grid.Column>
        <Grid.Column>
          <SoftwareName>{softwareNames[index]}</SoftwareName>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Grid.Column>
      </Grid.Row>
    ));

  return (
    <>
      <div style={{ marginTop: "35px" }}>
        <SolutionsWrapper>Consectetur adipiscing elit</SolutionsWrapper>
        <div style={{ marginTop: "10px" }}>
          Stay on track as you plan, develop, and deliver products.
        </div>
      </div>
      <div style={{ width: "35vw", marginTop: "25px" }}>
        <Grid verticalAlign="middle">{renderSoutions()}</Grid>
      </div>
    </>
  );
};

export default Solution;

import React from "react";
import { Grid, Image } from "semantic-ui-react";
import useMediaQuery from "use-mediaquery";
import companyFour from "../../assets/images/company-four.png";
import companyThree from "../../assets/images/company-three.png";
import companyTwo from "../../assets/images/company-two.png";
import {
  BottomHeadline,
  BottomSubline,
  HomeBottom,
} from "../util/AgileStyledComponents";

const Bottom = () => {
  const imageUris = [companyTwo, companyThree, companyFour];

  const isMobile = useMediaQuery("only screen and (max-width: 870px)");

  const renderCompaniesImage = () =>
    imageUris.map((imageUri) => (
      <Grid.Column>
        <Image
          src={imageUri}
          size="mini"
          floated="left"
          style={{
            width: "125px",
            height: "125px",
            marginLeft: "25px",
            marginTop: "25px",
          }}
        />
      </Grid.Column>
    ));

  const renderBottomSignature = () => (
    <Grid.Column textAlign="center">
      <BottomSubline>
        © 2020 Agile Inc. All rights reserved | Terms of Service | Privacy |
        Legal
      </BottomSubline>
    </Grid.Column>
  );

  return (
    <HomeBottom>
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column width={10}>
            <BottomHeadline>
              Powering innovation at 180,000+ companies worldwide
            </BottomHeadline>
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
          <Grid.Column width={2}></Grid.Column>
        </Grid.Row>
        <Grid.Row columns={4}>
          {!isMobile && <Grid.Column />}
          {renderCompaniesImage()}
        </Grid.Row>
        <Grid.Row>{renderBottomSignature()}</Grid.Row>
      </Grid>
    </HomeBottom>
  );
};

export default Bottom;

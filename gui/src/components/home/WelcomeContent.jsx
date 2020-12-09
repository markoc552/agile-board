import React from "react";
import {Container, Image} from "semantic-ui-react"
import {WelcomeDialog, WelcomeDivWrapper} from "../util/AgileStyledComponents"

const WelcomeContent = (props) => {
  return (
    <>
      <WelcomeDialog>
        <Container>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Container>
      </WelcomeDialog>
      <WelcomeDivWrapper>
        <Image
          src={require("../../assets/images/green-car.png")}
          size="mini"
          style={{ width: "115px", height: "115px", margin: "auto 40px" }}
        />
        <div style={{ margin: "auto 10px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </div>
      </WelcomeDivWrapper>
    </>
  );
};

export default WelcomeContent;

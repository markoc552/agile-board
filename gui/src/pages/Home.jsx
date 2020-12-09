import React from "react";
import {
  MainContentWrapper,
  MainContainerWrapper,
} from "../components/util/AgileStyledComponents";
import { Header, Divider, Icon } from "semantic-ui-react";
import Navigation from "../components/home/Navigation";
import WelcomeContent from "../components/home/WelcomeContent";
import TrustedCompanies from "../components/home/TrustedCompanies";
import Solutions from "../components/home/Solutions";
import Bottom from "../components/home/Bottom";

const Home = (props) => {
  return (
    <>
      <MainContainerWrapper>
        <MainContentWrapper>
          <Navigation />
          <WelcomeContent />
          <Solutions />
          <Divider horizontal style={{ marginTop: "25vh" }}>
            <Header as="h4">
              <Icon name="bar chart" />
              Business
            </Header>
          </Divider>
          <TrustedCompanies />
        </MainContentWrapper>
        <Bottom />
      </MainContainerWrapper>
    </>
  );
};

export default Home;

import { motion } from "framer-motion";
import React from "react";
import { Divider, Header, Icon } from "semantic-ui-react";
import Bottom from "../components/home/Bottom";
import Navigation from "../components/home/Navigation";
import Solutions from "../components/home/Solutions.jsx";
import TrustedCompanies from "../components/home/TrustedCompanies";
import WelcomeContent from "../components/home/WelcomeContent";
import {
  MainContainerWrapper,
  MainContentWrapper,
} from "../components/util/AgileStyledComponents";
import { variants } from "../components/util/animations";

const Home = () => {
  return (
    <MainContainerWrapper>
      <MainContentWrapper>
        <Navigation />
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <WelcomeContent />
        </motion.div>
        <Solutions />
        <Divider horizontal style={{ paddingTop: "27vh" }}>
          <Header as="h4">
            <Icon name="bar chart" />
            Business
          </Header>
        </Divider>
        <TrustedCompanies />
        <Divider horizontal style={{ padding: 50, margin: "5vh auto" }}>
          <Header as="h4">
            <Icon name="bar chart" />
            Info
          </Header>
        </Divider>
        <Bottom />
      </MainContentWrapper>
    </MainContainerWrapper>
  );
};

export default Home;

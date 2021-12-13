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
import { motion } from "framer-motion";

const Home = () => {
  const variants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35 },
    },
    hidden: { opacity: 0, scale: 1.05 },
  };

  return (
    <MainContainerWrapper>
      <MainContentWrapper>
        <Navigation />
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <WelcomeContent />
        </motion.div>
        <Solutions />
        <Divider horizontal style={{marginTop: "27vh"}}>
          <Header as="h4">
            <Icon name="bar chart" />
            Business
          </Header>
        </Divider>
        <TrustedCompanies />
        <Divider horizontal style={{marginTop: "5vh"}}>
          <Header as="h4">
            <Icon name="bar chart" />
            Info
          </Header>
        </Divider>
        <Bottom/>
      </MainContentWrapper>
    </MainContainerWrapper>
  );
};

export default Home;

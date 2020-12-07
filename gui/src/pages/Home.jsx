import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Image } from "semantic-ui-react";

const MainContainerWrapper = styled.div`
  width: 100vw;
  height: 75vh;
  background-color: blue;
`;

const MainContentWrapper = styled.div`
  width: 80vw;
  height: 100vh;
  background-color: green;
  margin-right: 10vw;
  margin-left: 10vw;
`;

const NavigationBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 10vh;
  background-color: red;
`;

const HeadlineWrapper = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin: auto 0;
`;

const NavbarItem = styled.div`
  padding-left: 50px;
  padding-right: 5px;
  margin: auto 0;
`;


const Home = (props) => {
  return (
    <MainContainerWrapper>
      <MainContentWrapper>
        <NavigationBarWrapper>
          <Image
            src={require("../assets/images/agile-logo.png")}
            size="mini"
            style={{ width: "100px", height: "100px" }}
          />
          <HeadlineWrapper>AGILE BOARD</HeadlineWrapper>
          <NavbarItem>AGILE BOARD</NavbarItem>
          <NavbarItem>AGILE BOARD</NavbarItem>
        </NavigationBarWrapper>
      </MainContentWrapper>
    </MainContainerWrapper>
  );
};

export default Home;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Image,
  Button,
  Container,
  Grid,
  Divider,
  Header,
  Icon,
} from "semantic-ui-react";
import HomeBackground from "../assets/images/home.jpg";

const MainContainerWrapper = styled.div`
  width: 100vw;
  height: 75vh;
  background-image: url(${HomeBackground});
  background-repeat: no-repeat;
  background-size: 115% 125%;
`;

const MainContentWrapper = styled.div`
  width: 70vw;
  height: 100vh;
  margin-right: 15vw;
  margin-left: 15vw;
`;

const NavigationBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 8vh;
`;

const HeadlineWrapper = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin: auto 0;
  font-family: "Russo One", sans-serif;
  font-size: 25px;
  color: #2185d0;
`;

const NavbarItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 50px;
  margin: auto 0;
  font-size: 10px;
  font-family: "Libre Baskerville", serif;
`;

const NavbarItem = styled.div`
  padding-right: 20px;
  font-weight: bold;
  color: #00324d;
  margin: auto 0;
  font-size: 15px;
`;

const AccountsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 50px;
  padding-right: 5px;
  margin: auto 0;
  margin-left: 25vw;
`;

const WelcomeDialog = styled.div`
  color: #253858;
  font-size: 40px;
  font-family: "Josefin Sans", sans-serif;
  padding-left: 10vw;
  padding-right: 10vw;
  line-height: 1.4;
  padding-top: 7vh;
  height: 35vh;
`;

const WelcomeDivWrapper = styled.div`
  display: flex;
  width: 45vw;
  height: 15vh;
  margin: 70px auto;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.17);
  background-color: #f4f5f7;
  font-family: "Libre Baskerville", serif;
`;

const SolutionsWrapper = styled.div`
  font-family: "Libre Baskerville", serif;
  font-size: 25px;
  font-weight: bold;
  color: #253858;
`;

const SolutionsDiv = styled.div`
  width: 75vw;
  height: 35vh;
  margin: 25px auto;
  color: #253858;
  font-family: "Libre Baskerville", serif;
`;

const SolutionOptions = styled.div`
  padding-left: 30px;
  margin-down: 20px;
  font-size: 15px;
  font-weight: bold;
`;

const SoftwareName = styled.div`
  color: #253858;
  font-family: "Libre Baskerville", serif;
  font-weight: bold;
`;

const TrustedCompany = styled.div`
  width: 15vw;
  height: 40vh;
  margin: 20px auto;
  border-radius: 9px;
`;

const Home = (props) => {
  return (
    <MainContainerWrapper>
      <MainContentWrapper>
        <NavigationBarWrapper>
          <Image
            src={require("../assets/images/agile-logo.png")}
            size="mini"
            style={{ width: "45px", height: "45px", margin: "auto 0" }}
          />
          <HeadlineWrapper>AGILE BOARD</HeadlineWrapper>
          <NavbarItemWrapper>
            <NavbarItem>Products</NavbarItem>
            <NavbarItem>For teams</NavbarItem>
            <NavbarItem>Support</NavbarItem>
          </NavbarItemWrapper>
          <AccountsWrapper>
            <NavbarItem>
              <Button color="blue">Buy now</Button>
            </NavbarItem>
            <NavbarItem>AGILE BOARD</NavbarItem>
          </AccountsWrapper>
        </NavigationBarWrapper>
        <WelcomeDialog>
          <Container>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Container>
        </WelcomeDialog>
        <WelcomeDivWrapper>
          <Image
            src={require("../assets/images/green-car.png")}
            size="mini"
            style={{ width: "115px", height: "115px", margin: "auto 40px" }}
          />
          <div style={{ margin: "auto 10px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor.
          </div>
        </WelcomeDivWrapper>
        <SolutionsWrapper>Our solutions</SolutionsWrapper>
        <SolutionsDiv>
          <div
            style={{ display: "flex", flexDirection: "row", padding: "25px 0" }}
          >
            <SolutionOptions>Solution 1</SolutionOptions>
            <SolutionOptions>Solution 1</SolutionOptions>
            <SolutionOptions>Solution 1</SolutionOptions>
            <SolutionOptions>Solution 1</SolutionOptions>
          </div>
          <div style={{ marginTop: "35px" }}>
            <SolutionsWrapper>Lorem ipsum</SolutionsWrapper>
            <div style={{ marginTop: "10px" }}>
              Stay on track as you plan, develop, and deliver products.
            </div>
          </div>
          <div style={{ width: "35vw", marginTop: "25px" }}>
            <Grid verticalAlign="middle">
              <Grid.Row columns={2}>
                <Grid.Column textAlign="center">
                  <Image
                    src={require("../assets/images/company-one.png")}
                    style={{ width: "75px", height: "75px" }}
                    centered
                  />
                </Grid.Column>
                <Grid.Column>
                  <SoftwareName>Software 1</SoftwareName>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    src={require("../assets/images/company-two.png")}
                    size="mini"
                    centered
                    style={{ width: "75px", height: "75px" }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <SoftwareName>Software 2</SoftwareName>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Image
                    src={require("../assets/images/company-three.png")}
                    size="mini"
                    centered
                    style={{ width: "75px", height: "75px" }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <SoftwareName>Software 3</SoftwareName>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </SolutionsDiv>
        <Divider horizontal style={{ marginTop: "25vh" }}>
          <Header as="h4">
            <Icon name="bar chart" />
            Business
          </Header>
        </Divider>
        <SolutionsDiv>
          <div style={{ marginTop: "35px" }}>
            <SolutionsWrapper>Trusted Companies</SolutionsWrapper>
            <div style={{ marginTop: "15px", width: "35vw" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TrustedCompany style={{ backgroundColor: "#172b4d" }}>
              <Grid>
                <Grid.Row>
                  <Image
                    src={require("../assets/images/company-four.png")}
                    size="mini"
                    floated="left"
                    style={{
                      width: "125px",
                      height: "125px",
                      marginLeft: "25px",
                      marginTop: "25px",
                    }}
                  />
                </Grid.Row>
                <Grid.Row>
                  <div
                    style={{
                      width: "10vw",
                      marginLeft: "31px",
                      fontSize: "17px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Lorem ipsum
                  </div>
                  ;
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
            </TrustedCompany>
            <TrustedCompany style={{ backgroundColor: "#79f2c0" }}>
              <Grid>
                <Grid.Row>
                  <Image
                    src={require("../assets/images/company-five.png")}
                    size="mini"
                    floated="left"
                    style={{
                      width: "125px",
                      height: "125px",
                      marginLeft: "25px",
                      marginTop: "25px",
                    }}
                  />
                </Grid.Row>
                <Grid.Row>
                  <div
                    style={{
                      width: "10vw",
                      marginLeft: "31px",
                      fontSize: "17px",
                      color: "#172b4d",
                      fontWeight: "bold",
                    }}
                  >
                    Lorem ipsum
                  </div>
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
            </TrustedCompany>
            <TrustedCompany style={{ backgroundColor: "#ffc400" }}>
              <Grid>
                <Grid.Row>
                  <Image
                    src={require("../assets/images/company-six.png")}
                    size="mini"
                    floated="left"
                    style={{
                      width: "125px",
                      height: "125px",
                      marginLeft: "25px",
                      marginTop: "25px",
                    }}
                  />
                </Grid.Row>
                <Grid.Row>
                  <div
                    style={{
                      width: "10vw",
                      marginLeft: "31px",
                      fontSize: "17px",
                      color: "#172b4d",
                      fontWeight: "bold",
                    }}
                  >
                    Lorem ipsum
                  </div>
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
            </TrustedCompany>
            <TrustedCompany style={{ backgroundColor: "#0052cc" }}>
              <Grid>
                <Grid.Row>
                  <Image
                    src={require("../assets/images/company-seven.png")}
                    size="mini"
                    floated="left"
                    style={{
                      width: "125px",
                      height: "125px",
                      marginLeft: "25px",
                      marginTop: "25px",
                    }}
                  />
                </Grid.Row>
                <Grid.Row>
                  <div
                    style={{
                      width: "10vw",
                      marginLeft: "31px",
                      fontSize: "17px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Lorem ipsum
                  </div>
                </Grid.Row>
                <Grid.Row></Grid.Row>
              </Grid>
            </TrustedCompany>
          </div>
        </SolutionsDiv>
      </MainContentWrapper>
    </MainContainerWrapper>
  );
};

export default Home;

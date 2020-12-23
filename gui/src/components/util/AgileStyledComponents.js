import styled from "styled-components";
import HomeBackground from "../../assets/images/home.jpg";
import BottomBackground from "../../assets/images/home-bottom.jpg";
import WelcomeBackground from "../../assets/images/welcome-widget.jpg";

export const MainContainerWrapper = styled.div`
  width: 100vw;
  height: 75vh;
  background-image: url(${HomeBackground});
  background-repeat: no-repeat;
  background-size: 115% 125%;
`;

export const MainContentWrapper = styled.div`
  width: 70vw;
  height: 100vh;
  margin-right: 15vw;
  margin-left: 15vw;
  padding-down: 10vh;
`;

export const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 8vh;
`;

export const HeadlineWrapper = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin: auto 0;
  font-family: "Russo One", sans-serif;
  font-size: 25px;
  color: #2185d0;
  cursor: default;
`;

export const NavItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 50px;
  margin: auto 0;
  font-size: 10px;
  font-family: "Libre Baskerville", serif;
`;

export const NavItem = styled.div`
  padding-right: 20px;
  font-weight: bold;
  color: #00324d;
  margin: auto 0;
  font-size: 15px;
  cursor: default;

  &:hover {
    text-decoration: underline;
    transition: 1s;
  }
`;

export const NavAccountsItem = styled.div`
  padding-right: 20px;
  font-weight: bold;
  color: #00324d;
  margin: auto 0;
  font-size: 15px;
  cursor: default;
  padding: 7px;
  border-radius: 7px;

  &:hover {
    background-color: #dbdbdb;
    transition: 0.5s;
  }
`;

export const AccountsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 50px;
  padding-right: 5px;
  margin: auto 0;
  margin-left: 25vw;
`;

export const WelcomeDialog = styled.div`
  color: #253858;
  font-size: 40px;
  font-family: "Josefin Sans", sans-serif;
  padding-left: 10vw;
  padding-right: 10vw;
  line-height: 1.4;
  padding-top: 7vh;
  padding-down: 2vh;
  height: 35vh;
  cursor: default;
`;

export const WelcomeDivWrapper = styled.div`
  display: flex;
  width: 45vw;
  height: 15vh;
  margin: 70px auto;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.17);
  background-color: #f4f5f7;
  font-family: "Libre Baskerville", serif;
`;

export const SolutionsWrapper = styled.div`
  font-family: "Libre Baskerville", serif;
  font-size: 25px;
  font-weight: bold;
  color: #253858;
`;

export const BottomHeadline = styled.div`
  font-family: "Libre Baskerville", serif;
  margin-top: 20px;
  font-size: 25px;
  font-weight: bold;
  line-height: 1.2;
  color: white;
`;

export const BottomSublineHeader = styled.div`
  font-family: "Russo One", sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: #bfbfbf;
  text-decoration: underline;
  word-wrap: break-word;
`;

export const BottomSubline = styled.div`
  font-family: "Libre Baskerville", serif;
  font-size: 11.5px;
  color: #bfbfbf;
`;

export const BottomModal = styled.div`
  width: 20vw;
  height: 40vh;
  background-color: white;
  margin: 5vh 10vw;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
`;

export const AgileWrapper = styled.div`
  width: 75vw;
  height: 35vh;
  margin: 25px auto;
  color: #253858;
  font-family: "Libre Baskerville", serif;
`;

export const SolutionOptions = styled.div`
  margin-left: 20px;
  margin-down: 20px;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: default;
  border-radius: 20px;

  &:hover {
    background-color: #bfbfbf;

    transition: 0.7s;
  }
`;

export const SoftwareName = styled.div`
  color: #253858;
  font-family: "Libre Baskerville", serif;
  font-weight: bold;
`;

export const TrustedCompany = styled.div`
  width: 15vw;
  height: 40vh;
  margin: 20px auto;
  border-radius: 9px;
`;

export const TrustedCompanyDescription = styled.div`
  width: 12vw;
  height: 15vh;
  color: white;
  margin: 0 auto;
  font-weight: bold;
`;

export const HomeBottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 50vh;
  margin-top: 110vh;
  margin-left: auto;
  margin-right: auto;
  background-color: #001a3f;
`;

export const MenuTitle = styled.div`
  margin-left: 3vw;
  margin-right: 3vw;
  margin-top: 4vh;
  font-family: "Libre Baskerville", serif;
  color: #001a3f;
  font-weight: bold;
`;

export const MenuSubTitle = styled.div`
  margin: 2vh 3vw;
  font-family: "Libre Baskerville", serif;
  font-size: 12px;
  font-weight: 500;
  color: #001a3f;
`;

export const MenuBoard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 60vh;
  background-color: white;
  position: absolute;
  top: 7%;
`;

export const HomeBottomModalHeadline = styled.div`
  font-family: "Libre Baskerville", serif;
  margin: 15px auto;
  font-size: 15px;
  font-weight: bold;
  word-wrap: break-word;
  background-color: #f4f5f7;
`;

export const SolutionImageWrapper = styled.div`
  width: 30vw;
  height: 30vh;
  margin: -17vh 37vw;
`;

export const DashboardNav = styled.div`
  width: 100vw;
  height: 5.5vh;
  display: flex;
  flex-direction: row;
  text-align: center;
  background-color: white;
  box-shadow: 0px 7px 14px 0px rgba(50, 50, 50, 0.41);
`;

export const ContentNav = styled.div`
  width: 45vw;
  height: 5.5vh;
  display: flex;
  flex-direction: row;
  text-align: center;
  background-color: #1b5cb5;
`;

export const DashboardNavHeadline = styled.div`
  padding: 5px;
  font-family: "Russo One", sans-serif;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.07);
  font-size: 19px;
  color: black;
  width: 14vw;
  height: 5.5vh;
  z-index: 10;
`;

export const DashboardNavItem = styled.div`
  padding: 10px;
  font-family: "Russo One", sans-serif;
  color: black;
  font-size: 15px;
  cursor: default;
  margin: 5px auto;
  width: 11vw;
  height: 5vh;
  border-radius: 10px;
  transition: 0.7s;

  &:hover {
    background-color: #63a4ff;
  }
`;

export const DashboardHeadline = styled.div`
  font-family: "Russo One", sans-serif;
  font-size: 15px;
  margin: 12px 20px;
`;

export const WelcomeWidgetHello = styled.div`
  font-family: "Libre Baskerville", serif;
  font-weight: bold;
  font-size: 45px;
  color: #f5f5f5;
  margin: 7vh auto;
`;

export const DashboardWelcomeWrapper = styled.div`
  width: 100vw;
  height: 94.5vh;
  display: flex;
  flex-direction: row;
  background-color: #f4f5f7;
`;

export const Headline = styled.div`
  padding: 35px;
  font-family: "Libre Baskerville", serif;
  color: #253858;
  font-weight: bold;
  font-size: 25px;
  cursor: pointer;
`;

export const SystemDashboardContentWrapper = styled.div`
  width: 45vw;
  height: 25vh;
  background-color: white;
  margin: 45px;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.17);
`;

export const ProjectNavigation = styled.div`
  width: 15vw;
  height: 100vh;
  background-color: #f4f5f7;
`;

export const WelcomeWidget = styled.div`
  width: 40vw;
  height: 35.9vh;
  background-color: white;
  border-radius: 10px;
  margin: 0.4vh auto;
  display: flex;
  flex-direction: column;
  background-image: url(${WelcomeBackground});
  background-repeat: no-repeat;
  background-size: 115% 125%;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
`;

export const ComponentWidget = styled.div`
  width: 70vw;
  height: 75vh;
  background-color: white;
  border-radius: 10px;
  margin: 2vh 2vw;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
`;

export const AccountImageWrapper = styled.div`
  margin: 5vh auto;
  width: 7vw;
  height: 7vh;
  border-radius: 50px;
`;

export const TodoWidget = styled.div`
  width: 35vw;
  height: 75.5vh;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto;
  margin-right: 7vw;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
`;

export const TimeWidget = styled.div`
  width: 19vw;
  height: 36.5vh;
  background-color: white;
  padding: 35px;
  border-radius: 10px;
  margin: 0.4vh 2.5vw;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
  font-family: "Russo One", sans-serif;
  font-size: 13px;
`;

export const ProjectNavigationItem = styled.div`
  padding: 15px;
  margin: 10px 40px;
  font-family: "Libre Baskerville", serif;
  cursor: pointer;
  width: 11vw;
  transition: 0.5s;
  border-radius: 2px;

  &:hover {
    background-color: #abb2c2;
  }
`;

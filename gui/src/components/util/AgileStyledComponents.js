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
  background-position: center;
`;

export const MainContentWrapper = styled.div`
  width: 70vw;
  height: 100vh;
  margin-right: 15vw;
  margin-left: 15vw;
  padding-down: 10vh;

  @media only screen and (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  height: 8vh;
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const HeadlineWrapper = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin: auto 0;
  font-family: "Russo One", sans-serif;
  font-size: 25px;
  color: #2185d0;
  cursor: default;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    margin: auto auto;
  }
`;

export const NavItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto 1vw;
  font-size: 10px;
  font-family: "Libre Baskerville", serif;

  @media only screen and (max-width: 768px) {
    margin: auto auto;
  }
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

  @media only screen and (max-width: 845px) {
    font-size: 13px;
  }

  @media only screen and (max-width: 768px) {
    padding: 0.5vh 2vw;
  }
`;

export const HeadlineNameWrapper = styled.div`
  margin: auto 0;
  @media only screen and (max-width: 845px) {
    font-size: 13px;
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

  @media only screen and (max-width: 768px) {
    margin: 0 auto;
    padding: 1vh 2vw;
  }
`;

export const AccountsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto 0;

  @media only screen and (max-width: 768px) {
    margin: 2vh auto;
    padding: 1vh 2vw;
  }
`;

export const WelcomeDialog = styled.div`
  color: #253858;
  font-size: 32px;
  font-family: "Josefin Sans", sans-serif;
  padding-left: 10vw;
  padding-right: 10vw;
  line-height: 1.4;
  padding-top: 7vh;
  padding-down: 2vh;
  height: 35vh;
  cursor: default;

  @media only screen and (max-width: 1300px) {
    font-size: 28px;
  }

  @media only screen and (max-width: 1020px) {
    font-size: 25px;
  }

  @media only screen and (max-width: 845px) {
    font-size: 22px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 20px;
    margin: 2vh auto;
    width: 80vw;
  }
`;

export const WelcomeDivWrapper = styled.div`
  display: flex;
  width: 45vw;
  height: 15vh;
  margin: 12vh auto;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.17);
  background-color: #f4f5f7;
  font-family: "Libre Baskerville", serif;

  @media only screen and (max-width: 1300px) {
    font-size: 15px;
  }

  @media only screen and (max-width: 1020px) {
    font-size: 12px;
    width: 55vw;
  }

  @media only screen and (max-width: 768px) {
    font-size: 10px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 8px;
  }
`;

export const SolutionsWrapper = styled.div`
  font-family: "Libre Baskerville", serif;
  font-size: 25px;
  font-weight: bold;
  color: #253858;
  margin-top: 1vh;

  @media only screen and (max-width: 845px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

export const BottomHeadline = styled.div`
  font-family: "Libre Baskerville", serif;
  margin: 3vh 2vw;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
  color: white;
  width: 35vw;


  @media only screen and (max-width: 1020px) {
    text-align: center;
  }

  @media only screen and (max-width: 587px) {
    font-size: 8px;
  }
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
  margin: 0 auto;
`;

export const BottomModal = styled.div`
  width: 70vw;
  height: 45vh;
  background-color: white;
  margin: 5vh 10vw;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1220px) {
    display: none;
  }
`;

export const TrustedCompanyWrapper = styled.div`
  width: 75vw;
  height: 35vh;
  margin: 25px auto;
  color: #253858;
  font-family: "Libre Baskerville", serif;
  margin: 20vh auto;

  @media only screen and (max-width: 1009px) {
    height: 85vh;
    overflow-y: scroll;
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 587px) {
    font-size: 8px;
  }
`;

export const AgileWrapper = styled.div`
  width: 75vw;
  height: 35vh;
  margin: 25px auto;
  color: #253858;
  font-family: "Libre Baskerville", serif;
  margin: 20vh auto;

  @media only screen and (max-width: 1009px) {
    height: 85vh;
  }

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 587px) {
    font-size: 8px;
  }
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

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 550px) {
    font-size: 10px;
  }
`;

export const SoftwareName = styled.div`
  color: #253858;
  font-family: "Libre Baskerville", serif;
  font-weight: bold;
`;

export const TrustedCompany = styled.div`
  width: 18vw;
  height: 45vh;
  margin: 2vh 0.2vw;
  border-radius: 9px;

  @media only screen and (max-width: 1010px) {
    margin: 2vh auto;
    width: 30vw;
    height: 45vh;
  }

  @media only screen and (max-width: 850px) {
    width: 40vw;
    height: 50vh;
  }
`;

export const TrustedCompanyDescription = styled.div`
  width: 12vw;
  height: 15vh;
  color: white;
  margin: 0 auto;
  font-weight: bold;

  @media only screen and (max-width: 1345px) {
    font-size: 12px;
  }

  @media only screen and (max-width: 1130px) {
    font-size: 10px;
  }

  @media only screen and (max-width: 850px) {
    font-size: 9px;
  }
`;

export const HomeBottom = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #001a3f;

  @media only screen and (max-width: 768px) {
    font-size: 22px;
  }
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
  font-size: 12px;
  font-weight: bold;
  word-wrap: break-word;
  background-color: #f4f5f7;

  @media only screen and (max-width: 768px) {
    font-size: 22px;
  }
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
  background-color: #4289c7;
  box-shadow: 0px 7px 14px 0px rgba(50, 50, 50, 0.41);

  @media only screen and (max-width: 1410px) {
    flex-direction: column;
    padding: 50px;
    width: 100vw;
    margin-top: 1vh;
  }
`;

export const DashboardUserWrapper = styled.div`
  margin-left: 52vw;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 1410px) {
    flex-direction: column;
    margin: 2vh auto;
  }
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
  font-family: "Russo One", sans-serif;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.07);
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 14vw;
  height: 5.5vh;
  margin: auto 0;
  z-index: 10;

  @media only screen and (max-width: 1420px) and (min-width: 1410px) {
    flex-direction: column;
    width: 22.5vw;
    height: 5.5vh;
    font-size: 15px;
  }

  @media only screen and (max-width: 1410px) {
    flex-direction: column;
    width: 104vw;
    padding: 10px;
    margin-left: -6.8vw;
    margin-top: -5vw;
    height: 10vh;
  }

  @media only screen and (max-width: 734px) {
    width: 100vw;
    margin-top: -5.9vh;
    margin-left: -11vw;
    height: 10vh;
  }
`;

export const DashboardNavHeadlineItemWrapper = styled.div`
  font-family: "Arvo", serif;
  font-weight: bold;
  @media only screen and (max-width: 1410px) {
    margin: 1vh 5vw;
  }
`;

export const DashboardNavHeadlineItemContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 1410px) {
    margin: 1vh -10vw;
    flex-direction: row;
    background-color: white;
    width: 100vw;
  }

  @media only screen and (max-width: 734px) {
    flex-direction: column;
  }
`;

export const DashboardNavItem = styled.div`
  padding: 10px;
  font-family: "Roboto", sans-serif;
  color: #253858;
  font-size: 17px;
  font-weight: bold;
  cursor: default;
  margin: 5px auto;
  width: 11vw;
  height: 5vh;
  border-radius: 10px;
  transition: 0.7s;
  display: flex;

  &:hover {
    background-color: #63a4ff;
  }

  @media only screen and (max-width: 1410px) {
    width: 50vw;
  }
`;

export const DashboardHeadlineWrapper = styled.div`
  width: 11vw;
  height: 5vh;
  border-radius: 10px;
  background-color: #a6cbff;
  margin: 20px auto;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1410px) {
    width: 50vw;
    padding: 20px;
  }
`;

export const DashboardHeadline = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  margin: 12px 20px;

  @media only screen and (max-width: 1410px) {
    width: 50vw;
    margin: -10px 0;
    padding: 7px;
  }
`;

export const IssueCardItem = styled.div`
  padding: 30px;
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
  cursor: default;

  @media only screen and (max-width: 1400px) {
    font-size: 19px;
  }
  @media only screen and (max-width: 1150px) {
    font-size: 15px;
    margin: 0 auto;
  }
  @media only screen and (max-width: 1150px) {
    font-size: 15px;
    margin: 2vh auto;
  }

  @media only screen and (max-width: 980px) {
    font-size: 12px;
    margin: 2vh auto;
  }
`;

export const SideWidgetMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 12vw;
  height: 36.5;
  box-shadow: 4px 0px 10px -4px rgba(0, 0, 0, 0.15);

  @media only screen and (max-width: 1450px) {
    width: 20vw;
  }

  @media only screen and (max-width: 785px) {
    width: 25vw;
  }
`;

export const BacklogHeadline = styled.div`
  padding: 10px;
  margin-left: 1vw;
  font-family: "Libre Baskerville", serif;
  color: #253858;
  font-weight: bold;
  font-size: 17px;
  cursor: default;
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
  height: 94.5vh;
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

export const IssuesList = styled.div`
  width: 25vw;
  height: 94.5vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
  border-right: 2px solid #b0b0b0;
  }
`;

export const IssueCard = styled.div`
  font-family: "Arvo", serif;
  font-weight: bold;
  width: 70vw;
  height: 94.5vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  box-shadow: 10px 7px 13px 5px rgba(0, 0, 0, 0.05);
  }
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

  @media only screen and (max-width: 1400px) {
    margin: 0 auto;
    width: 80vw;
  }
`;

export const FormikWrapper = styled.div`
  @media only screen and (max-width: 1400px) {
  }
`;

export const BacklogWidget = styled.div`
  width: 80vw;
  height: 38vh;
  padding: 10px;
  background-color: white;
  margin: 1vh 2vw;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
`;

export const TaskWidget = styled.div`
  width: 30vw;
  height: 95vh;
  padding: 10px;
  background-color: white;
  transition: 0.5s;
  margin: -7vh -2vw;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 3px 5px 0px rgba(0, 0, 0, 0.27);
  font-weight: bold;
  font-family: "Arvo", serif;
  font-size: 15px;
  overflow-y: scroll;

  @media only screen and (max-width: 1410px) {
    width: 50vh;
  }
`;

export const ProjectNavigationBar = styled.div`
  width: 14vw;
  background-color: white;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1410px) {
    width: 100vw;
    margin: 0 auto;
    margin-top: 5vh;
    margin-bottom: 1.5vh;
  }

  @media only screen and (max-width: 1420px) and (min-width: 1410px) {
    width: 17.3vw;
  }

  @media only screen and (max-width: 734px) {
    margin-top: 15vh;
  }
`;

export const ProjectBoard = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 1410px) {
    flex-direction: column;
  }
`;

export const TaskSection = styled.div`
  width: 25vw;
  padding: 15px;
  color: #b0b0b0;
  margin: 10px;
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
  height: 28vh;
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
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  width: 11vw;
  transition: 0.5s;
  border-radius: 2px;

  &:hover {
    background-color: #abb2c2;
  }
`;

export const RegisterLoginWrapper = styled.div`
  margin-top: 20vh;
  margin-left: auto;
  margin-right: auto;
  width: 22vw;
  height: 47vh;
  background-color: white;
  box-shadow: 0px 7px 13px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const WidgetItem = styled.div`
  margin: 0 auto;
  width: 12vw;
  height: 5vh;
  text-align: left;
  font-family: "Roboto", sans-serif;
  box-shadow: 1px 5px 10px -4px rgba(0, 0, 0, 0.07);
  padding: 50px;
  transition: 0.25s;
  vertical-align: center;
  cursor: default;

  &:hover {
    background-color: #fcfcfc;
    color: #3396ff;
    font-weight: bold;
    border-left: 4px solid #3396ff;
    font-size: 12px;
  }
  @media only screen and (max-width: 1450px) {
    width: 20vw;
  }

  @media only screen and (max-width: 785px) {
    width: 25vw;
  }
`;

export const StyledLabel = styled.div`
  font-family: "Roboto", sans-serif;
  color: #253858;
  padding: 5px;
  margin: 10px 0;

  @media only screen and (max-width: 1400px) {
    font-size: 15px;
  }
`;

export const StyledProfileLabel = styled.div`
  font-family: "Roboto", sans-serif;
  color: #253858;
  padding: 15px;
  margin: 2px 0;
  font-size: 17px;
  font-weight: bold;
`;

export const styledTable = styled.div`
  padding: 45px;

  table {
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

import styled from "styled-components";
import HomeBackground from "../../assets/images/home.jpg";
import BottomBackground from "../../assets/images/home-bottom.jpg";

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

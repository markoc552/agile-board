import React from "react";
import {
  NavigationWrapper,
  HeadlineWrapper,
  NavItemWrapper,
  NavItem,
  AccountsWrapper,
} from "../util/AgileStyledComponents";
import { Image, Button } from "semantic-ui-react";

const Navigation = (props) => {
  return (
    <NavigationWrapper>
      <Image
        src={require("../../assets/images/agile-logo.png")}
        size="mini"
        style={{ width: "45px", height: "45px", margin: "auto 0" }}
      />
      <HeadlineWrapper>AGILE BOARD</HeadlineWrapper>
      <NavItemWrapper>
        <NavItem>Products</NavItem>
        <NavItem>For teams</NavItem>
        <NavItem>Support</NavItem>
      </NavItemWrapper>
      <AccountsWrapper>
        <NavItem>
          <Button color="blue">Buy now</Button>
        </NavItem>
        <NavItem>AGILE BOARD</NavItem>
      </AccountsWrapper>
    </NavigationWrapper>
  );
};

export default Navigation;

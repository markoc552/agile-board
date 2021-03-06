import React, { useState } from "react";
import {
  NavigationWrapper,
  HeadlineWrapper,
  NavItemWrapper,
  NavItem,
  AccountsWrapper,
  NavAccountsItem,
} from "../util/AgileStyledComponents";
import { Image, Button, Icon } from "semantic-ui-react";
import ProductsMenu from "./ProductsMenu";
import ResourcesMenu from "./ResourcesMenu";
import AccountModal from "./AccountModal";
import history from "../../history";
import { useSelector } from "react-redux";

const Navigation = (props) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [accountShow, setAccountShow] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const body = document.querySelector("#root");

  const handleHideMenu = () => {
    setShowProducts(false);
    setShowResources(false);
    body.removeEventListener("click", handleHideMenu);
  };

  if (showProducts || showResources) {
    body.setAttribute("style", "filter: blur(2px)");
    body.addEventListener("click", handleHideMenu);
  } else {
    body.setAttribute("style", "filter: blur(0px)");
  }

  return (
    <NavigationWrapper>
      <Image
        src={require("../../assets/images/agile-logo.png")}
        size="mini"
        style={{ width: "45px", height: "45px", margin: "auto 0" }}
      />
      <HeadlineWrapper>AGILE BOARD</HeadlineWrapper>
      <NavItemWrapper>
        <NavItem onClick={() => setShowProducts(true)}>Products</NavItem>
        <NavItem onClick={() => setShowResources(true)}>For teams</NavItem>
        <NavItem>Support</NavItem>
      </NavItemWrapper>
      <AccountsWrapper>
        <NavItem>
          <Button color="blue" onClick={() => history.push("/dashboard")}>
            Dashboard
          </Button>
        </NavItem>
        <NavAccountsItem onClick={() => setAccountShow(true)}>
          <Icon name="user circle" size="large" />{" "}
          {user !== undefined && `${user.firstname} ${user.lastname}`}
        </NavAccountsItem>
      </AccountsWrapper>
      {showProducts && <ProductsMenu setShow={setShowProducts} />}
      {showResources && <ResourcesMenu setShow={setShowResources} />}
      {accountShow && (
        <AccountModal show={accountShow} setShow={setAccountShow} user={user} />
      )}
    </NavigationWrapper>
  );
};

export default Navigation;

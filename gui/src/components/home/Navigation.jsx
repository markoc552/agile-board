import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Icon, Image } from "semantic-ui-react";
import useMediaQuery from "use-mediaquery";
import history from "../../history";
import {
  AccountsWrapper,
  HeadlineNameWrapper,
  HeadlineWrapper,
  NavAccountsItem,
  NavigationWrapper,
  NavItem,
  NavItemWrapper,
} from "../util/AgileStyledComponents";
import AccountModal from "./AccountModal";
import ProductsMenu from "./ProductsMenu";
import ResourcesMenu from "./ResourcesMenu";

const Navigation = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [accountShow, setAccountShow] = useState(false);

  const isTabletOnly = useMediaQuery("only screen and (max-width: 845px)");

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

  const renderAccountModal = () => (
    <AccountsWrapper>
      <NavItem>
        <Button
          circular
          color="blue"
          size={isTabletOnly ? "mini" : "medium"}
          onClick={() => history.push("/dashboard")}
        >
          Dashboard
        </Button>
      </NavItem>
      <NavAccountsItem onClick={() => setAccountShow(true)}>
        <Icon name="user circle" size="large" />{" "}
        {user !== undefined && `${user.firstname} ${user.lastname}`}
      </NavAccountsItem>
    </AccountsWrapper>
  );

  return (
    <NavigationWrapper>
      <HeadlineWrapper>
        <Image
          verticalAlign="middle"
          avatar
          src={require("../../assets/images/agile-logo.png")}
          size="mini"
        />
        <HeadlineNameWrapper>AGILE BOARD</HeadlineNameWrapper>
      </HeadlineWrapper>
      <NavItemWrapper>
        <NavItem onClick={() => setShowProducts(true)}>Products</NavItem>
        <NavItem onClick={() => setShowResources(true)}>For teams</NavItem>
        <NavItem>Support</NavItem>
      </NavItemWrapper>
      {renderAccountModal()}
      {showProducts && <ProductsMenu setShow={setShowProducts} />}
      {showResources && <ResourcesMenu setShow={setShowResources} />}
      {accountShow && (
        <AccountModal show={accountShow} setShow={setAccountShow} user={user} />
      )}
    </NavigationWrapper>
  );
};

export default Navigation;

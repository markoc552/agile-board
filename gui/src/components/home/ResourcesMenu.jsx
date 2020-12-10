import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  MenuBoard,
  MenuTitle,
  MenuSubTitle,
} from "../util/AgileStyledComponents";
import {
  Grid,
  Icon,
  Divider,
  Message,
  Segment,
  Search,
  Header,
  Button,
} from "semantic-ui-react";

const Menu = (props) => {
  const items = [
    "You can now have cover images on blog pages",
    "Drafts will now auto-save while writing",
  ];

  return ReactDOM.createPortal(
    <div
      style={{ width: "100vw", height: "100vh" }}
      onClick={() => props.setShow(false)}
    >
      <MenuBoard
        style={{ height: "40vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginLeft: "15vw" }}>
            <div>
              <MenuTitle>Title 1</MenuTitle>
              <MenuSubTitle>Content 1</MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>Content 2</MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>Content 3</MenuSubTitle>
            </div>
          </div>
          <div>
            <div>
              <MenuTitle>Title 2</MenuTitle>
              <MenuSubTitle>Content 4</MenuSubTitle>
            </div>
            <div>
              <MenuTitle>Title 3</MenuTitle>
              <MenuSubTitle>Content 4</MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>Content 4</MenuSubTitle>
            </div>
          </div>
          <div>
            <div>
              <MenuTitle>Title 4</MenuTitle>
              <MenuSubTitle>Content 7</MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>Content 8</MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>Content 9</MenuSubTitle>
            </div>
          </div>
          <Divider style={{ height: "150px" }} vertical />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "4vh 10vw",
            }}
          >
            <Segment placeholder style={{ width: "25vw" }}>
              <Grid columns={2} stackable textAlign="center">
                <Divider vertical>Or</Divider>

                <Grid.Row verticalAlign="middle">
                  <Grid.Column>
                    <Header icon>
                      <Icon name="search" />
                      Search for articles
                    </Header>

                    <Search placeholder="Search articles..." />
                  </Grid.Column>

                  <Grid.Column>
                    <Header icon>
                      <Icon name="world" />
                      Contact us
                    </Header>
                    <Button primary>Contact</Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </div>
        </div>
      </MenuBoard>
    </div>,
    document.querySelector("#menu")
  );
};

export default Menu;

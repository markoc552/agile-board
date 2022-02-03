import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
} from "semantic-ui-react";
import {
  MenuBoard,
  MenuSubTitle,
  MenuTitle,
} from "../util/AgileStyledComponents";

const Menu = (props) => {
  const contents = [
    "Content 1",
    "Content 2",
    "Content 3",
    "Content 4",
    "Content 5",
  ];

  const titles = ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"];

  const renderTiles = () => (
    <div>
      {contents.map((content, index) => (
        <div>
          <MenuTitle>{titles[index]}</MenuTitle>
          <MenuSubTitle>{content}</MenuSubTitle>
        </div>
      ))}
    </div>
  );

  const renderContacts = () => (
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
  );

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
            {renderTiles()}
            <Divider style={{ height: "150px" }} vertical />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "4vh 10vw",
              }}
            >
              <Segment placeholder style={{ width: "25vw" }}>
                {renderContacts()}
              </Segment>
            </div>
          </div>
        </div>
      </MenuBoard>
    </div>,
    document.querySelector("#menu")
  );
};

export default Menu;

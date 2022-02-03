import React from "react";
import ReactDOM from "react-dom";
import { Divider, Icon, Message } from "semantic-ui-react";
import {
  MenuBoard,
  MenuSubTitle,
  MenuTitle,
} from "../util/AgileStyledComponents";

const Menu = (props) => {
  const items = [
    "You can now have cover images on blog pages",
    "Drafts will now auto-save while writing",
  ];

  const icons = [
    "address card",
    "book",
    "compass outline",
    "envelope",
    "pen square",
    "file code",
    "inbox",
    "terminal",
  ];

  const contents = [
    "Content 1",
    "Content 2",
    "Content 3",
    "Content 4",
    "Content 5",
  ];

  const titles = ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5"];

  const renderTiles = () => (
    <div style={{ marginLeft: "15vw" }}>
      {contents.map((content, index) => (
        <div>
          <MenuTitle>{titles[index]}</MenuTitle>
          <MenuSubTitle>
            <Icon name={`${icons[index]}`} size="big" />
            {content}
          </MenuSubTitle>
        </div>
      ))}
    </div>
  );

  return ReactDOM.createPortal(
    <div
      style={{ width: "100vw", height: "100vh", zIndex: "1000" }}
      onClick={() => props.setShow(false)}
    >
      <MenuBoard onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {renderTiles()}
          <Divider style={{ height: "250px" }} vertical />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "4vh 4vw",
            }}
          >
            <Message>
              <Message.Header>New Site Features</Message.Header>
              <Message.List items={items} />
            </Message>
            <Message>
              <Message.Header>New Site Features</Message.Header>
              <Message.List items={items} />
            </Message>
          </div>
        </div>
      </MenuBoard>
    </div>,
    document.querySelector("#menu")
  );
};

export default Menu;

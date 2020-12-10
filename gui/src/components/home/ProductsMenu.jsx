import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  MenuBoard,
  MenuTitle,
  MenuSubTitle,
} from "../util/AgileStyledComponents";
import { Grid, Icon, Divider, Message } from "semantic-ui-react";

const Menu = (props) => {
  const items = [
    "You can now have cover images on blog pages",
    "Drafts will now auto-save while writing",
  ];

  return ReactDOM.createPortal(
    <div
      style={{ width: "100vw", height: "100vh", zIndex: "1000" }}
      onClick={() => props.setShow(false)}
    >
      <MenuBoard onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ marginLeft: "15vw" }}>
            <div>
              <MenuTitle>Title 1</MenuTitle>
              <MenuSubTitle>
                <Icon name="address card" size="big" />
                Content 1
              </MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>
                <Icon name="book" size="big" />
                Content 2
              </MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>
                <Icon name="compass outline" size="big" />
                Content 3
              </MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>
                <Icon name="book" size="big" />
                Content 4
              </MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>
                <Icon name="compass outline" size="big" />
                Content 5
              </MenuSubTitle>
            </div>
          </div>
          <div>
            <div>
              <MenuTitle>Title 2</MenuTitle>
              <MenuSubTitle>
                <Icon name="envelope" size="big" />
                Content 4
              </MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>
                <Icon name="pen square" size="big" />
                Content 5
              </MenuSubTitle>
            </div>
            <div>
              <MenuTitle>Title 3</MenuTitle>
              <MenuSubTitle>
                <Icon name="envelope" size="big" />
                Content 4
              </MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>
                <Icon name="envelope" size="big" />
                Content 4
              </MenuSubTitle>
            </div>
          </div>
          <div>
            <div>
              <MenuTitle>Title 4</MenuTitle>
              <MenuSubTitle>
                <Icon name="file code" size="big" />
                Content 7
              </MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>
                <Icon name="inbox" size="big" />
                Content 8
              </MenuSubTitle>
            </div>
            <div>
              <MenuSubTitle>
                <Icon name="terminal" size="big" />
                Content 9
              </MenuSubTitle>
            </div>
          </div>
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

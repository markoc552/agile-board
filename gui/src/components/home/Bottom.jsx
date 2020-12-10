import React from "react";
import PropTypes from "prop-types";
import {
  HomeBottom,
  BottomHeadline,
  BottomSubline,
  BottomSublineHeader,
  BottomModal,
  HomeBottomModalHeadline,
} from "../util/AgileStyledComponents";
import { Grid, Image, Divider, Button } from "semantic-ui-react";

const Bottom = (props) => {
  return (
    <HomeBottom>
      <div style={{ width: "45vw", marginTop: "5vh" }}>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column></Grid.Column>
            <Grid.Column width={10}>
              <BottomHeadline>
                Powering innovation at 180,000+ companies worldwide
              </BottomHeadline>
            </Grid.Column>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid.Row>
          <Grid.Row columns={4}>
            <Grid.Column></Grid.Column>
            <Grid.Column>
              <Image
                src={require("../../assets/images/company-two.png")}
                size="mini"
                floated="left"
                style={{
                  width: "125px",
                  height: "125px",
                  marginLeft: "25px",
                  marginTop: "25px",
                }}
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src={require("../../assets/images/company-three.png")}
                size="mini"
                floated="left"
                style={{
                  width: "125px",
                  height: "125px",
                  marginLeft: "25px",
                  marginTop: "25px",
                }}
              />
            </Grid.Column>
            <Grid.Column>
              <Image
                src={require("../../assets/images/company-four.png")}
                size="mini"
                floated="left"
                style={{
                  width: "125px",
                  height: "125px",
                  marginLeft: "25px",
                  marginTop: "25px",
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <BottomSubline>
                © 2020 Agile Inc. All rights reserved | Terms of Service |
                Privacy | Legal
              </BottomSubline>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <BottomModal>
        <Image
          style={{ margin: "15px auto" }}
          size="medium"
          src="https://images.unsplash.com/photo-1581093803931-46e730e7622e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
        />
        <HomeBottomModalHeadline>
          The best development process for your team
        </HomeBottomModalHeadline>
        <Divider />
        <Button style={{ width: "250px", margin: "0 auto" }} color="instagram">
          See offers
        </Button>
      </BottomModal>
    </HomeBottom>
  );
};

export default Bottom;

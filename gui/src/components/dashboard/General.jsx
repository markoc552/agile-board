import React, { useState, useEffect } from "react";
import {
  ProjectNavigation,
  ProjectNavigationItem,
  Headline,
  ContentNav,
  SystemDashboardContentWrapper,
  DashboardNavItem as NavItem,
  WelcomeWidget,
  TimeWidget,
  TodoWidget,
  AccountImageWrapper,
  WelcomeWidgetHello,
} from "../util/AgileStyledComponents";
import { Icon, Divider, Image } from "semantic-ui-react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { Calendar } from "react-modern-calendar-datepicker";
//import {OpenWeatherMap} from "react-weather";
import "../../style.css";
import "react-clock/dist/Clock.css";
import Clock from "react-clock";

const General = (props) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "89vw",
        height: "100vh",
        boxShadow: "inset -4px -4px 21px -7px rgba(0,0,0,0.75)",
      }}
    >
      <Headline>System Dashboard</Headline>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", flexDirection: "column", margin: "0 auto"}}>
          <WelcomeWidget>
            <AccountImageWrapper>
              <Image src={require("../../assets/images/company-two.png")} />
            </AccountImageWrapper>
            <WelcomeWidgetHello>Good morning, Marko</WelcomeWidgetHello>
          </WelcomeWidget>
          <div style={{display: "flex", flexDirection: "row", margin: "2vh auto"}}>
            <div style={{ margin: "0 auto" }}>
              <Calendar
                value={selectedDay}
                onChange={setSelectedDay}
                calendarClassName="responsive-calendar"
                shouldHighlightWeekends
              />
            </div>
            <TimeWidget>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ margin: "0 auto" }}>
                  <Clock value={value} size="220" />
                </div>
                <div style={{ margin: "2vh auto" }}>{value.toUTCString()}</div>
              </div>
            </TimeWidget>
          </div>
        </div>
        <TodoWidget></TodoWidget>
      </div>

      <Divider style={{ marginTop: "0.5vh" }} />
      <div style={{ padding: "2px", margin: "0 auto" }}>
        © 2020 Agile Inc. All rights reserved | Terms of Service | Privacy |
        Legal
      </div>
    </div>
  );
};

export default General;

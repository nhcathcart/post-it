import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import "../css/Homepage.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { dateFormatter, getEventsThunk } from "../reducers/eventsReducer";
import { CustomEvent } from "../reducers/eventsReducer";
import { createAvailObj } from "../helpers";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);
  const eventState = useAppSelector((state) => state.events);
  const availObj = eventState.events.length? createAvailObj(dateFormatter(eventState.events)) : null;
  console.log(availObj);
  useEffect(() => {
    dispatch(getEventsThunk());
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="homepage-card">
          <div className="homepage-card-text-container">
            <h4>You have</h4>
            <div className="big-number">{availObj? availObj["fri"] : "loading"}</div>{" "}
            <h4>free Fridays in the next 3 weeks</h4>
          </div>
          <div className="homepage-card-text-container">
            <h4>You have</h4>
            <div className="big-number">{availObj? availObj["sat"] : "loading"}</div>{" "}
            <h4>free Saturdays in the next 3 weeks</h4>
          </div>
          <div className="homepage-card-text-container">
            <h4>You have </h4>
            <div className="big-number">{availObj? availObj["sun"] : "loading"}</div>{" "}
            <h4>free Sundays in the next 3 weeks</h4>
          </div>
        </div>

        <div className="homepage-card" style={{ marginTop: "2%" }}>
          <h4>You have scheduled anything with ... ... in the last 4 weeks.</h4>
        </div>
      </div>
    </div>
  );
}

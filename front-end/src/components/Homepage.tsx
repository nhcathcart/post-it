import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import "../css/Homepage.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import {
  dateFormatter,
  getEventsThunk,
  getFriendEventsThunk,
} from "../reducers/eventsReducer";
import { CustomEvent } from "../reducers/eventsReducer";
import { createAvailObj, availMaker, sharedAvailMaker } from "../helpers";
import { getFriendGroupsThunk, getPinsThunk } from "../reducers/friendsReducer";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const { events, friendEvents } = useAppSelector((state) => state.events);
  const { friends, friendGroups, pins } = useAppSelector(
    (state) => state.friends
  );
  const availObj = events.length ? availMaker(dateFormatter(events)) : null;
  const sharedAvailObj =
    pins && friendEvents && events
      ? sharedAvailMaker(events, friendEvents, pins)
      : null;

  useEffect(() => {
    dispatch(getEventsThunk());
    dispatch(getFriendEventsThunk());
    dispatch(getFriendGroupsThunk());
    dispatch(getPinsThunk());
  }, []);
  const pinComps = pins?.map((pin) => {
    return (
      <div className="homepage-card-text-container">
        <h4>You and {pin} are free</h4>
        <div className="big-number">
          {sharedAvailObj ? sharedAvailObj[pin] : "loading"}
        </div>{" "}
      </div>
    );
  });
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="homepage-card">
          <div className="homepage-card-text-container">
            <h4>You have</h4>
            <div className="big-number">
              {availObj ? availObj["fri"] : "loading"}
            </div>{" "}
            <h4>free Fridays in the next 3 weeks</h4>
          </div>
          <div className="homepage-card-text-container">
            <h4>You have</h4>
            <div className="big-number">
              {availObj ? availObj["sat"] : "loading"}
            </div>{" "}
            <h4>free Saturdays in the next 3 weeks</h4>
          </div>
          <div className="homepage-card-text-container">
            <h4>You have </h4>
            <div className="big-number">
              {availObj ? availObj["sun"] : "loading"}
            </div>{" "}
            <h4>free Sundays in the next 3 weeks</h4>
          </div>
        </div>

        <div className="homepage-card" style={{ marginTop: "2%" }}>
          {pinComps}
        </div>
      </div>
    </div>
  );
}

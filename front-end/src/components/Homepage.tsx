import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import "../css/Homepage.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { getEventsThunk } from "../reducers/eventsReducer";
import { CustomEvent } from "../reducers/eventsReducer";
import { createAvailObj } from "../helpers";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);
  const eventState = useAppSelector((state) => state.events)
  const availObj = createAvailObj(eventState.events)
  console.log(availObj)
  useEffect(()=>{
    dispatch(getEventsThunk())
  }, [])

  
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="homepage-card">
          <h4 style={{ display: "inline" }}>
            You are free after 7pm on {" "}
            <span className="big-number">X</span> Fridays in the next 4
            weeks
          </h4>
          <h4 style={{ display: "inline" }}>
            You have <span className="big-number">X</span> free
            Saturdays in the next 4 weeks
          </h4>
          <h4 style={{ display: "inline" }}>
            You have <span className="big-number">X</span> free Sundays
            in the next 4 weeks
          </h4>
        </div>

        <div className="homepage-card" style={{ marginTop: "2%" }}>
          <h4>You have scheduled anything with ... ... in the last 4 weeks.</h4>
        </div>
      </div>
    </div>
  );
}

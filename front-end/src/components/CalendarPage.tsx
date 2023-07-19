import { Navbar } from "./Navbar";
import "../css/utility-css.css";
import "../css/Calendar.css"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { MyCalendar } from "./Calendar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { checkUserAuth } from "../reducers/loginReducer";
import { ModalButton } from "./ModalButton";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="calendar-container">
          <MyCalendar />
        </div>
      </div>
    </div>
  );
}
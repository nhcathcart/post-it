import { useAppDispatch, useAppSelector } from "../hooks";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "../css/AddEventForm.css";
import "../css/utility-css.css";
import { useState } from "react";
import {
  updateTitle,
  updateStart,
  updateEnd,
  updateAllDay,
  updateResource,
  updateEvents,
  postEventThunk,
} from "../reducers/eventsReducer";

// Event {
//   title: string,
//   start: Date,
//   end: Date,
//   allDay?: boolean
//   resource?: any,
//}

export default function AddEventForm() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.events.newEvent)
  const start = state.start
  const end = state.end

  return (
    <div className="event-form-container">
      <input
        type="text"
        placeholder="Event Title"
        className="event-form-input"
        onChange={(e) => dispatch(updateTitle(e.target.value))}
      />
      <DateTimePicker
        onChange={(date) => {
            dispatch(updateStart(date?.toISOString()));
            dispatch(updateEnd(date?.toISOString()));
        }}
        value={start}
        disableClock={true}
      />
      <DateTimePicker 
        onChange={(date) => {
            dispatch(updateEnd(date?.toISOString()))
        }}
        value={end} 
        disableClock={true} 
      />
      <span>
        <label>All day</label>
        <input type="checkbox" onChange={(e) => dispatch(updateAllDay(e.target.checked))}/>
      </span>
      <textarea className="event-form-text-area" onChange={(e) => dispatch(updateResource(e.target.value))}></textarea>
      <button className="button" style={{ width: "50%" }} onClick={() => dispatch(postEventThunk(state))}>
        Add Event
      </button>
    </div>
  );
}

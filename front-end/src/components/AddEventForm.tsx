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
import moment from "moment";

// Event {
//   title: string,
//   start: Date,
//   end: Date,
//   allDay?: boolean
//   resource?: any,
//}

export default function AddEventForm() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.events.newEvent);
  const start = state.start;
  const end = state.end;

  function handleSubmit() {
    if (state.title === "") return alert("The event needs a title");
    if (!state.start || !state.end)
      return alert("The event needs a start and end time/date");
    if (new Date(state.start) > new Date(state.end))
      return alert("The event start time must be before it ends");
    dispatch(postEventThunk(state));
    return;
  }

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
          dispatch(updateStart(moment(date).format()));
          dispatch(updateEnd(moment(date).format()));
          // dispatch(updateStart(date?.toISOString()));
          // dispatch(updateEnd(date?.toISOString()));
        }}
        value={start}
        disableClock={true}
      />
      <DateTimePicker
        onChange={(date) => {
          dispatch(updateEnd(date?.toISOString()));
        }}
        value={end}
        disableClock={true}
      />
      <span>
        <label>All day</label>
        <input
          type="checkbox"
          onChange={(e) => dispatch(updateAllDay(e.target.checked))}
        />
      </span>
      <textarea
        className="event-form-text-area"
        onChange={(e) => dispatch(updateResource(e.target.value))}
      ></textarea>
      <button
        className="button"
        style={{ width: "50%" }}
        onClick={() => handleSubmit()}
      >
        Add Event
      </button>
    </div>
  );
}

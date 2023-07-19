import { Event } from "react-big-calendar";
import {SQLEvent} from "../reducers/eventsReducer"
import eventsReducer from "../reducers/eventsReducer";

export async function getEvents() {
  const response = await fetch("/api/events/get-events", {
    method: "GET",
    credentials: "include",
  });
  const responseParsed = response.json();
  return responseParsed;
}

export async function postEvent(event: Event) {
  const eventStart = event.start? dateFormater(event.start) : null;
  const eventEnd = event.end? dateFormater(event.end) : null;
  let sqlEvent
  if (eventStart && eventEnd){
     sqlEvent = {
      title: event.title,
      start: eventStart,
      end: eventEnd,
      allDay: event.allDay,
      resource: event.resource,
    }
  }else{
    return null
  }
  const response = await fetch("/api/events/post-event", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sqlEvent)
  })
  const responseParsed = response.json();
  return responseParsed
}

function dateFormater(date: Date) {

  const isoString = date.toISOString();
  const formattedDate = isoString.slice(0, 19).replace('T', ' ');

  if (isoString.endsWith('Z')) {
    return formattedDate + 'Z';
  } else {
    const timeZoneOffset = date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timeZoneOffset) / 60);
    const offsetMinutes = Math.abs(timeZoneOffset) % 60;
    const offsetSign = timeZoneOffset < 0 ? '+' : '-';

    const offsetString = `${offsetSign}${padZero(offsetHours)}:${padZero(offsetMinutes)}`;

    return formattedDate + offsetString;
  }
}

function padZero(number: Number) {
  return number.toString().padStart(2, '0');
}

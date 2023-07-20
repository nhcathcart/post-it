import { Event } from "react-big-calendar";

export async function getEvents() {
  const response = await fetch("/api/events/get-events", {
    method: "GET",
    credentials: "include",
  });
  const responseParsed = await response.json();
  return responseParsed;
}

export async function postEvent(event: Event) {
  const response = await fetch("/api/events/post-event", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  const responseParsed = response.json();
  return responseParsed;
}




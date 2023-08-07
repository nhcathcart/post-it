import { Event } from "react-big-calendar";
import { CustomEvent } from "../reducers/eventsReducer";


export async function getEvents() {
  const response = await fetch("/api/events/get-events", {
    method: "GET",
    credentials: "include",
  });
  const responseParsed = await response.json();
  return responseParsed;
}

export async function getFriendGroupEvents(friendGroup: string) {
  const response = await fetch("/api/events/get-friend-group-events", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({friendGroup: friendGroup}),
  });
  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems deleteing friend group");
  }
  return responseParsed;
}
export async function getFriendEvents() {
  const response = await fetch("/api/events/get-friend-events", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems deleteing friend group");
  }
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
  const responseParsed = await response.json();
  return responseParsed;
}
export async function deleteEvent(eventId: number){
  const response = await fetch("/api/events/delete-event", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({eventId: eventId})
  })
  const responseParsed = await response.json();
  if (response.status >= 400) {
    throw new Error("Problems deleteing event");
  }
  return responseParsed
}


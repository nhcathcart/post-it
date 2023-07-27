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
export async function getFriendEvents(friend: string) {
  const response = await fetch("/api/events/get-friend-events", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({friend: friend}),
  });
  const responseParsed = await response.json();
  console.log(responseParsed)
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
  const responseParsed = response.json();
  return responseParsed;
}

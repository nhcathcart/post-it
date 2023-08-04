import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "react-big-calendar";
import {
  getEvents,
  postEvent,
  getFriendGroupEvents,
  getFriendEvents,
} from "../services/eventsService";
import { ReactNode } from "react";

export interface EventAdapter {
  title: React.ReactNode;
  start: string | Date;
  end: string | Date;
  allDay?: boolean;
  resource?: any;
}

export interface CustomEvent {
  title: React.ReactNode;
  username: string;
  start: string | Date;
  end: string | Date;
  allDay?: boolean;
  resource?: any;
}
type FriendEvents = {
  [username: string]: CustomEvent[]; // Index signature: dynamic keys (usernames) mapped to arrays of EventObjects
};
const initialState: EventsStateType = {
  events: [],
  friendEvents: {},
  viewChoice: [],
  newEvent: {
    title: "",
    start: undefined,
    end: undefined,
    allDay: false,
    resource: undefined,
  },
};

interface EventsStateType {
  events: CustomEvent[];
  friendEvents: FriendEvents;
  viewChoice: string[];
  newEvent: Event;
}
//helper function to format date strings into date objects in event objects
export function dateFormatter(events: CustomEvent[]) {
  const newEventArray: CustomEvent[] = [];
  if (events?.length) {
    events?.forEach((event) => {
      const newEvent = Object.assign({}, event);
      newEvent.start = new Date(event.start);
      newEvent.end = new Date(event.end);
      newEventArray.push(newEvent);
    });
  }
  return newEventArray;
}

//Thunks, these use functions imported from the eventsService
export const getEventsThunk = createAsyncThunk(
  "/api/events/get-events",
  async (_, thunkAPI) => {
    try {
      const response = await getEvents();
      if (response === "There was a problem") throw "Problems getting events";
      // const formattedResponse = dateFormatter(response)
      thunkAPI.dispatch(loadEvents(response));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFriendGroupEventsThunk = createAsyncThunk(
  "/api/events/get-friend-group-events",
  async (friendGroup: string, thunkAPI) => {
    try {
      const response = await getFriendGroupEvents(friendGroup);
      // const formattedResponse = dateFormatter(response)
      thunkAPI.dispatch(loadEvents(response));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getFriendEventsThunk = createAsyncThunk(
  "/api/events/get-friend-events",
  async (_, thunkAPI) => {
    try {
      const response = await getFriendEvents();
      // const formattedResponse = dateFormatter(response)
      thunkAPI.dispatch(loadFriendEvents(response));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const postEventThunk = createAsyncThunk(
  "/api/events/post-event",
  async (event: Event, thunkAPI) => {
    try {
      const response = await postEvent(event);
      if (response === "There was a problem") throw "Problems posting event";
      thunkAPI.dispatch(updateEvents(event));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    updateTitle: (state, action) => {
      state.newEvent.title = action.payload;
    },
    updateStart: (state, action) => {
      state.newEvent.start = action.payload;
    },
    updateEnd: (state, action) => {
      state.newEvent.end = action.payload;
    },
    updateAllDay: (state, action) => {
      state.newEvent.allDay = action.payload;
    },
    updateResource: (state, action) => {
      state.newEvent.resource = action.payload;
    },
    updateEvents: (state, action) => {
      state.events = state.events.concat(action.payload);
    },
    loadEvents: (state, action) => {
      state.events = action.payload;
    },
    loadFriendEvents: (state, action) => {
      state.friendEvents = action.payload;
    },
    setViewChoice: (state, action) => {
      state.viewChoice = action.payload;
    },
    clearNewEvent: (state) => {
      state.newEvent = {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      };
    },
  },
});

export const {
  updateTitle,
  updateStart,
  updateEnd,
  updateAllDay,
  updateResource,
  updateEvents,
  loadEvents,
  loadFriendEvents,
  setViewChoice,
  clearNewEvent
} = eventsSlice.actions;

export default eventsSlice.reducer;

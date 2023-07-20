import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "react-big-calendar";
import { getEvents, postEvent } from "../services/eventsService";
import { ReactNode } from "react";

export interface EventAdapter {
  title: React.ReactNode,
  start: string | Date,
  end: string | Date,
  allDay?: boolean
  resource?: any,
}

const initialState: EventsStateType = {
  events: [],
  newEvent: {
    title: "",
    start: undefined,
    end: undefined,
    allDay: false,
    resource: undefined,
  },
};

interface EventsStateType {
  events: Event[];
  newEvent: Event;
}

//Thunks, these use functions imported from the eventsService
export const getEventsThunk = createAsyncThunk(
  "/api/events/get-events",
  async (_, thunkAPI) => {
    try {
      const response = await getEvents();
      if (response === "There was a problem") throw "Problems getting events";
      thunkAPI.dispatch(loadEvents(response));
      return response;
    } catch(error) {
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
    } catch(error) {
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
      state.newEvent.allDay = action.payload
    },
    updateResource: (state, action) => {
      state.newEvent.resource = action.payload;
    },
    updateEvents: (state, action) => {
      state.events = state.events.concat(action.payload);
    },
    loadEvents: (state, action) => {
      state.events = action.payload
    }
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
} = eventsSlice.actions;

export default eventsSlice.reducer;

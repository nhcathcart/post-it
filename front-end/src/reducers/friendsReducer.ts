import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "react-big-calendar";
import { getEvents, postEvent } from "../services/eventsService";

interface FriendState {
  friendSearch: "";
  friends: string[];
  viewableFriends: string[];
  friendGroupSearch: string;
  friendGroups: string[];
  viewableFriendGroups: string[];
  friendsView: FriendsView;
}

interface FriendsView {
  friendsList: boolean;
  friendGroups: boolean;
  findFriends: boolean;
}

const initialState: FriendState = {
  friendSearch: "",
  friends: [
    "Nan",
    "Katz",
    "Lisa",
    "Jenny",
    "Noah",
    "Alex",
    "Amy",
    "Matt",
    "Kohli",
    "Erin",
  ],
  viewableFriends: [
    "Nan",
    "Katz",
    "Lisa",
    "Jenny",
    "Noah",
    "Alex",
    "Amy",
    "Matt",
    "Kohli",
    "Erin",
  ],
  friendGroupSearch: "",
  friendGroups: ["The Crew", "Classon House", "Dinner Party", "BBQ"],
  viewableFriendGroups: ["The Crew", "Classon House", "Dinner Party", "BBQ"],
  friendsView: {
    friendsList: true,
    friendGroups: false,
    findFriends: false,
  },
};

//Thunks, these use functions imported from the eventsService
// export const getEventsThunk = createAsyncThunk(
//   "",
//   async (_, thunkAPI) => {

//   }
// );
//helpers
function filterByPrefix(strings: string[], search: string): string[] {
  const lowercasedSearch = search.toLowerCase();
  return strings.filter((str) =>
    str.toLowerCase().startsWith(lowercasedSearch)
  );
}

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    updateFriendSearch: (state, action) => {
      state.friendSearch = action.payload;
    },
    filterViewableFriends: (state, action) => {
      state.viewableFriends = filterByPrefix(state.friends, action.payload);
    },
    updateFriendGroupSearch: (state, action) => {
      state.friendGroupSearch = action.payload;
    },
    filterViewableFriendGroups: (state, action) => {
      state.viewableFriendGroups = filterByPrefix(
        state.friendGroups,
        action.payload
      );
    },
    toggleFriendsList(state) {
      state.friendsView.friendsList = true;
      state.friendsView.friendGroups = false;
      state.friendsView.findFriends = false;
    },
    toggleFriendGroups(state) {
      state.friendsView.friendsList = false;
      state.friendsView.friendGroups = true;
      state.friendsView.findFriends = false;
    },
    toggleFindFriends(state) {
      state.friendsView.friendsList = false;
      state.friendsView.friendGroups = false;
      state.friendsView.findFriends = true;
    },
  },
});

export const {
  updateFriendSearch,
  filterViewableFriendGroups,
  updateFriendGroupSearch,
  filterViewableFriends,
  toggleFriendsList,
  toggleFindFriends,
  toggleFriendGroups,
} = friendsSlice.actions;

export default friendsSlice.reducer;

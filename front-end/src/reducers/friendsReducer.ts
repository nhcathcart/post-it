import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "react-big-calendar";
import { friendSearch, addFriend, loadFriends } from "../services/friendsService";

interface FriendState {
  friendSearch: "";
  findFriendsList: string[];
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
  findFriendsList: [],
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
export const friendSearchThunk = createAsyncThunk(
  "/api/friends/search",
  async (searchTerm: string, thunkAPI) => {
    try {
      const response = await friendSearch(searchTerm);
      thunkAPI.dispatch(updateFindFriendList(response));
      return response;
    } catch (error) {
      console.log('caught error:', error);
      throw new Error("Problems finding friends");
    }
  }
);

export const addFriendThunk = createAsyncThunk(
  "/api/friends/add-friend",
  async (username: string, thunkAPI) => {
    try{
      const response = await addFriend(username);
      if (response === "There was a problem") throw "Problems adding friend";
      thunkAPI.dispatch(addFriendToFriends(username));
      return "SUCCESS";
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const loadFriendsThunk = createAsyncThunk(
  "/api/friends/get-friends",
  async (_, thunkAPI) => {
    try{
      const response = await loadFriends();
      if (response === "There was a problem") throw "Problems adding friend";
      thunkAPI.dispatch(loadFriendsList)
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
)
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
    updateFindFriendList: (state, action) => {
      state.findFriendsList = action.payload
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
    addFriendToFriends: (state, action) => {
      state.friends.push(action.payload)
    },
    loadFriendsList: (state, action) => {
      state.friends = action.payload
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
  updateFindFriendList,
  loadFriendsList,
  filterViewableFriendGroups,
  updateFriendGroupSearch,
  filterViewableFriends,
  addFriendToFriends,
  toggleFriendsList,
  toggleFindFriends,
  toggleFriendGroups,
} = friendsSlice.actions;

export default friendsSlice.reducer;

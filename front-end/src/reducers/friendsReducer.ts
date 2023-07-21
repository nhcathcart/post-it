import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "react-big-calendar";
import { friendSearch, addFriend, loadFriends, loadPendingFriends, acceptFriend } from "../services/friendsService";

interface FriendState {
  friendSearch: "";
  findFriendsList: string[];
  friends: string[];
  pendingFriends: string[];
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
  friends: [],
  pendingFriends: [],
  viewableFriends: [],
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
      return "SUCCESS";
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const acceptFriendThunk = createAsyncThunk(
  "/api/friends/accept-friend-request",
  async (username: string, thunkAPI) => {
    try{
      const response = await acceptFriend(username);
      if (response === "There was a problem") throw "Problems accepting friend";
      thunkAPI.dispatch(addFriendToFriends(username))
      thunkAPI.dispatch(addFriendtoViewableFriends(username))
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
      if (response === "There was a problem") throw "Problems getting friends";
      thunkAPI.dispatch(loadFriendsList(response))
      thunkAPI.dispatch(loadViewableFriendsList(response))
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const loadPendingFriendsThunk = createAsyncThunk(
  "/api/friends/get-pending-friends",
  async (_, thunkAPI) => {
    try{
      const response = await loadPendingFriends();
      if (response === "There was a problem") throw "Problems getting pending friends";
      thunkAPI.dispatch(loadPendingFriendsList(response))
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
    addFriendtoViewableFriends: (state, action) => {
      state.viewableFriends.push(action.payload)
    },
    loadFriendsList: (state, action) => {
      state.friends = action.payload
    },
    loadViewableFriendsList: (state, action) => {
      state.viewableFriends = action.payload
    },
    loadPendingFriendsList: (state, action) => {
      state.pendingFriends = action.payload
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
  loadViewableFriendsList,
  loadPendingFriendsList,
  filterViewableFriendGroups,
  updateFriendGroupSearch,
  filterViewableFriends,
  addFriendToFriends,
  addFriendtoViewableFriends,
  toggleFriendsList,
  toggleFindFriends,
  toggleFriendGroups,
} = friendsSlice.actions;

export default friendsSlice.reducer;

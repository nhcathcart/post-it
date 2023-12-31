import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "react-big-calendar";
import {
  friendSearch,
  friendSearchAll,
  addFriend,
  loadFriends,
  loadPendingFriends,
  acceptFriend,
  addFriendGroup,
  getFriendGroups,
  removeFriendFromGroup,
  deleteFriendGroup,
  loadSentFriendRequests,
  getPins,
  addPin,
  removePin,
} from "../services/friendsService";
import FriendGroup from "../components/FriendGroups";

interface FriendState {
  friendSearch: "";
  findFriendsList: string[];
  friends: string[];
  pendingFriends: string[];
  sentFriendRequests: string[];
  viewableFriends: string[];
  newFriendGroup: FriendGroup;
  friendGroups: FriendGroup[];
  friendsView: FriendsView;
  pins: string[];
}

interface FriendGroup {
  name: string;
  friends: string[];
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
  sentFriendRequests: [],
  viewableFriends: [],
  newFriendGroup: { name: "", friends: [] },
  friendGroups: [],
  friendsView: {
    friendsList: true,
    friendGroups: false,
    findFriends: false,
  },
  pins: [],
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
      throw new Error("Problems finding friends");
    }
  }
);
export const friendSearchAllThunk = createAsyncThunk(
  "/api/friends/search-all",
  async (searchTerm: string, thunkAPI) => {
    try {
      const response = await friendSearchAll(searchTerm);
      thunkAPI.dispatch(updateFindFriendList(response));
      return response;
    } catch (error) {
      throw new Error("Problems finding friends");
    }
  }
);

export const addFriendThunk = createAsyncThunk(
  "/api/friends/add-friend",
  async (username: string, thunkAPI) => {
    try {
      const response = await addFriend(username);
      if (response === "There was a problem") throw "Problems adding friend";
      return "SUCCESS";
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const acceptFriendThunk = createAsyncThunk(
  "/api/friends/accept-friend-request",
  async (username: string, thunkAPI) => {
    try {
      const response = await acceptFriend(username);
      if (response === "There was a problem") throw "Problems accepting friend";
      thunkAPI.dispatch(addFriendToFriends(username));
      thunkAPI.dispatch(addFriendtoViewableFriends(username));
      return "SUCCESS";
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loadFriendsThunk = createAsyncThunk(
  "/api/friends/get-friends",
  async (_, thunkAPI) => {
    try {
      const response = await loadFriends();
      if (response === "There was a problem") throw "Problems getting friends";
      thunkAPI.dispatch(loadFriendsList(response));
      thunkAPI.dispatch(loadViewableFriendsList(response));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loadPendingFriendsThunk = createAsyncThunk(
  "/api/friends/get-pending-friends",
  async (_, thunkAPI) => {
    try {
      const response = await loadPendingFriends();
      if (response === "There was a problem")
        throw "Problems getting pending friends";
      thunkAPI.dispatch(loadPendingFriendsList(response));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loadSentFriendRequestsThunk = createAsyncThunk(
  "/api/friends/get-sent-friend-requests",
  async(_, thunkAPI) => {
    try{
      const response = await loadSentFriendRequests();
      thunkAPI.dispatch(loadSentFriendRequestsList(response))
    }catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
export const addFriendGroupThunk = createAsyncThunk(
  "/api/friends/add-friend-group",
  async (groupObj: { name: string; friends: string[] }, thunkAPI) => {
    try {
      const response = await addFriendGroup(groupObj);
      thunkAPI.dispatch(addGroupToFriendGroups(groupObj));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const removeFriendFromGroupThunk = createAsyncThunk(
  "/api/friends/remove-friend-from-group",
  async (groupObj: { name: string; friendToRemove: string }, thunkAPI) => {
    try {
      const response = await removeFriendFromGroup(groupObj);
      thunkAPI.dispatch(
        removeFriendfromGroupList({
          name: groupObj.name,
          friendToRemove: groupObj.friendToRemove,
        })
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getFriendGroupsThunk = createAsyncThunk(
  "/api/friends/get-friend-groups",
  async (_, thunkAPI) => {
    try {
      const response = await getFriendGroups();
      thunkAPI.dispatch(loadFriendGroups(response));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteFriendGroupThunk = createAsyncThunk(
  "/api/friends/delete-friend-group",
  async (groupName: string, thunkAPI) => {
    try {
      const response = await deleteFriendGroup(groupName);
      thunkAPI.dispatch(removeGroupFromGroupList(groupName));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addPinThunk = createAsyncThunk(
  "/api/friends/add-pin",
  async (pinName: string, thunkAPI) => {
    try {
      const response = await addPin(pinName);
      thunkAPI.dispatch(updatePinAdd(pinName));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const removePinThunk = createAsyncThunk(
  "/api/friends/remove-pin",
  async (pinName: string, thunkAPI) => {
    try {
      const response = await removePin(pinName);
      thunkAPI.dispatch(updatePinRemove(pinName));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getPinsThunk = createAsyncThunk(
  "/api/friends/get-pins",
  async (_, thunkAPI) => {
    try {
      const response = await getPins();
      thunkAPI.dispatch(loadPins(response));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
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
      state.findFriendsList = action.payload;
    },
    filterViewableFriends: (state, action) => {
      state.viewableFriends = filterByPrefix(state.friends, action.payload);
    },
    addFriendToFriends: (state, action) => {
      state.friends.push(action.payload);
    },
    updateNewGroupName: (state, action) => {
      state.newFriendGroup.name = action.payload;
    },
    addNewGroupFriend: (state, action) => {
      state.newFriendGroup.friends.push(action.payload);
    },
    loadFriendGroups: (state, action) => {
      state.friendGroups = action.payload;
    },
    removeNewGroupFriend: (state, action) => {
      state.newFriendGroup.friends = state.newFriendGroup.friends.filter(
        (item) => item !== action.payload
      );
    },
    addGroupToFriendGroups: (state, action) => {
      state.friendGroups.push(action.payload);
    },
    removeFriendfromGroupList: (state, action) => {
      const groupIndex = state.friendGroups.findIndex(
        (item) => item.name === action.payload.name
      );
      if (groupIndex !== -1) {
        const updatedGroup = state.friendGroups[groupIndex].friends.filter(
          (item: string) => item !== action.payload.friendToRemove
        );
        console.log(updatedGroup);
        state.friendGroups[groupIndex].friends = updatedGroup;
      }
    },
    removeGroupFromGroupList: (state, action) => {
      state.friendGroups = state.friendGroups.filter(
        (item: FriendGroup) => item.name !== action.payload
      );
    },
    addFriendtoViewableFriends: (state, action) => {
      state.viewableFriends.push(action.payload);
    },
    loadFriendsList: (state, action) => {
      state.friends = action.payload;
    },
    loadViewableFriendsList: (state, action) => {
      state.viewableFriends = action.payload;
    },
    loadPendingFriendsList: (state, action) => {
      state.pendingFriends = action.payload;
    },
    loadSentFriendRequestsList: (state, action) => {
      state.sentFriendRequests = action.payload
    },
    pushtoSentFriendRequests: (state, action) => {
      state.sentFriendRequests.push(action.payload)
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
    updatePinAdd: (state, action) => {
      state.pins.push(action.payload);
    },
    updatePinRemove: (state, action) => {
      state.pins = state.pins.filter((item) => item !== action.payload)
    },
    loadPins: (state, action) => {
      state.pins = action.payload;
    },
    clearNewFriendGroup: (state) => {
      state.newFriendGroup = { name: "", friends: [] }
    }
  },
});

export const {
  updateFriendSearch,
  updateFindFriendList,
  loadFriendsList,
  loadViewableFriendsList,
  loadPendingFriendsList,
  addGroupToFriendGroups,
  filterViewableFriends,
  addFriendToFriends,
  addFriendtoViewableFriends,
  toggleFriendsList,
  toggleFindFriends,
  toggleFriendGroups,
  updateNewGroupName,
  loadFriendGroups,
  addNewGroupFriend,
  removeNewGroupFriend,
  removeFriendfromGroupList,
  removeGroupFromGroupList,
  loadSentFriendRequestsList,
  pushtoSentFriendRequests,
  updatePinAdd,
  updatePinRemove,
  loadPins,
  clearNewFriendGroup,
} = friendsSlice.actions;

export default friendsSlice.reducer;

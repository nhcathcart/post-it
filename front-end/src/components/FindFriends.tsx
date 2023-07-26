import "../css/utility-css.css";
import "../css/FriendsPage.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  updateFriendSearch,
  friendSearchThunk,
} from "../reducers/friendsReducer";
import { v4 as uuid } from "uuid";
import { ModalButton } from "./ModalButton";
import { addFriendThunk } from "../reducers/friendsReducer";
import { useEffect } from "react"
import { loadPendingFriendsThunk } from "../reducers/friendsReducer";

export default function FindFriends() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);
  const searchList = state.findFriendsList.map((username: string) => {
    return (
      <div className="friend-bubble" key={uuid()}>
        <p>{username}</p>
        <button
          className="friend-button"
          onClick={() => {
            dispatch(addFriendThunk(username));
          }}
        >
          Add
        </button>
      </div>
    );
  });
  const sentFriendRequests = state.sentFriendRequests.map((friend) => {
    return (
      <div className="friend-bubble" key={uuid()}>
        <p>{friend}</p>
      </div>
    );
  });
  useEffect(() => {
    dispatch(loadPendingFriendsThunk())
  }, []);

  return (
    <div className="friends-content-container">
      <div className="friends-list-container">
        <h3>Find Friends</h3>
        <input
          type="text"
          placeholder="search"
          className="friend-search-input"
          onChange={(e) => {
            dispatch(friendSearchThunk(e.target.value));
          }}
        />
        {searchList}
        <h4>Sent Friend Requests</h4>
        {sentFriendRequests}
      </div>
      
    </div>
  );
}

import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addPinThunk,
  filterViewableFriends,
  getPinsThunk,
  loadFriendsList,
  loadPins,
  loadSentFriendRequestsThunk,
  removePinThunk,
} from "../reducers/friendsReducer";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  loadPendingFriendsThunk,
  acceptFriendThunk,
  loadFriendsThunk,
} from "../reducers/friendsReducer";
import { ModalButton } from "./ModalButton";
import { FriendsPending } from "./FriendsPending";
import "../css/FriendsList.css";

export default function FriendsList() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);
  const pins = new Set(state.pins);
  console.log("pins : ", pins)
  function togglePin(pinName: string, pins: Set<string>) {
    if (pins.has(pinName)) {
      dispatch(removePinThunk(pinName));
    } else {
      dispatch(addPinThunk(pinName));
    }
  }
  const friendsList = state.viewableFriends.map((friend) => {
    return (
      <div className="friend-list-bubble" key={uuid()}>
        <p>{friend}</p>
        <button className="svg-button" onClick={() => togglePin(friend, pins)}>
          <svg
            style={{ width: "20px", height: "20px", color: "#ccc" }}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill={pins.has(friend) ? "#ccc" : "none"}
            viewBox="0 0 21 19"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.1"
              d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
            />
          </svg>
        </button>
      </div>
    );
  });
  const sentFriendRequests = state.sentFriendRequests.map((friend) => {
    return (
      <div className="friend-list-bubble" key={uuid()}>
        <p>{friend}--Pending</p>
      </div>
    );
  });
  useEffect(() => {
    dispatch(loadPendingFriendsThunk());
    dispatch(loadFriendsThunk());
    dispatch(loadSentFriendRequestsThunk());
    dispatch(getPinsThunk());
  }, []);
  return (
    <div className="friends-list-container">
      <div className="friends-list-button-container">
        <ModalButton
          isDefault={false}
          cssClass="friend-button"
          text="Friend Requests"
        >
          <FriendsPending />
        </ModalButton>
      </div>
      <h3>Friends</h3>
      <input
        type="text"
        placeholder="search"
        className="friend-search-input"
        onChange={(e) => dispatch(filterViewableFriends(e.target.value))}
      />
      {friendsList}
      {sentFriendRequests}
    </div>
  );
}

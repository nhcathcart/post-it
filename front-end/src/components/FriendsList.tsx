import { useAppDispatch, useAppSelector } from "../hooks";
import {
  filterViewableFriends,
  loadFriendsList,
  loadSentFriendRequestsThunk,
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

export default function FriendsList() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);

  const friendsList = state.viewableFriends.map((friend) => {
    return (
      <div className="friend-bubble" key={uuid()}>
        <p>{friend}</p>
      </div>
    );
  });
  const sentFriendRequests = state.sentFriendRequests.map((friend) => {
    return (
      <div className="friend-bubble" key={uuid()}>
        <p>{friend}--Pending</p>
      </div>
    );
  });
  useEffect(() => {
    dispatch(loadPendingFriendsThunk());
    dispatch(loadFriendsThunk());
    dispatch(loadSentFriendRequestsThunk());
  }, []);
  return (
    <div className="friends-content-container">
      <div className="friends-list-container">
        <div className="friends-button-container">
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
    </div>
  );
}

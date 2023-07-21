import { useAppDispatch, useAppSelector } from "../hooks";
import {
  filterViewableFriends,
  loadFriendsList,
} from "../reducers/friendsReducer";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { loadPendingFriendsThunk, acceptFriendThunk, loadFriendsThunk } from "../reducers/friendsReducer";
import { ModalButton } from "./ModalButton"
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
  const pendingFrinedsList = state.pendingFriends.map((username: string) => {
    return (
      <div className="friend-bubble" key={uuid()}>
        <p>{username}</p>
        <button className="add-friend-button" onClick={() => {dispatch(acceptFriendThunk(username))}}>
          Accept
        </button>
      </div>
    );
  });
  useEffect(() => {
    dispatch(loadPendingFriendsThunk())
    dispatch(loadFriendsThunk())
  }, []);
  return (
    <div className="friends-content-container">
      <div className="friends-list-container">
        <div className="friends-button-container">
          <ModalButton isDefault={false} cssClass="friend-button" text="Friend Requests">
            <FriendsPending/>
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
      </div>
      {/* <div className="friends-list-container">
        <h3>Pending Friends</h3>
        {pendingFrinedsList}
      </div> */}
      
    </div>
  );
}

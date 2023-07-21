import { useAppDispatch, useAppSelector } from "../hooks";
import { v4 as uuid } from "uuid";
import {
  loadPendingFriendsThunk,
  acceptFriendThunk,
  loadFriendsThunk,
} from "../reducers/friendsReducer";
import { useEffect } from "react";
import "../css/FriendsPage.css"

export function FriendsPending() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);

  const pendingFrinedsList = state.pendingFriends.map((username: string) => {
    return (
      <div className="friend-bubble" key={uuid()}>
        <p>{username}</p>
        <button
          className="friend-button"
          onClick={() => {
            dispatch(acceptFriendThunk(username));
          }}
        >
          Accept
        </button>
      </div>
    );
  });
  useEffect(() => {
    dispatch(loadPendingFriendsThunk());
    dispatch(loadFriendsThunk());
  }, []);
  return (
    <div className="friends-list-container">
      <h3>Pending Friends</h3>
      {pendingFrinedsList}
    </div>
  );
}

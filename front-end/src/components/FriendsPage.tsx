import { useAppDispatch, useAppSelector } from "../hooks";
import "../css/utility-css.css";
import "../css/FriendsPage.css";
import { Navbar } from "./Navbar";
import {
  toggleFriendsList,
  toggleFriendGroups,
  toggleFindFriends,
} from "../reducers/friendsReducer";
import FriendsList from "./FriendsList";
import FriendGroup from "./FriendGroups";
import FindFriends from "./FindFriends";

export default function FriendsPage() {
  const state = useAppSelector((state) => state.friends.friendsView);
  const dispatch = useAppDispatch();

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="friends-page-conatiner">
          <div className="friends-sidebar">
            <button
              className="friends-sidebar-button"
              onClick={() => dispatch(toggleFriendsList())}
            >
              Friends
            </button>
            <button
              className="friends-sidebar-button"
              onClick={() => dispatch(toggleFriendGroups())}
            >
              Friend-Groups
            </button>
            <button
              className="friends-sidebar-button"
              onClick={() => dispatch(toggleFindFriends())}
            >
              Find Friends
            </button>
          </div>
          <div className="friends-content-container">
            {state.friendsList ? <FriendsList /> : null}
            {state.friendGroups ? <FriendGroup /> : null}
            {state.findFriends ? <FindFriends /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

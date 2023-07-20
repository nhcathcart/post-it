import { useAppDispatch, useAppSelector } from "../hooks";
import "../css/utility-css.css";
import "../css/FriendsPage.css";
import { Navbar } from "./Navbar";
import {
  updateFriendGroupSearch,
  updateFriendSearch,
  filterViewableFriendGroups,
  filterViewableFriends,
} from "../reducers/friendsReducer";

export default function FriendsPage() {
  const state = useAppSelector((state) => state.friends);
  const dispatch = useAppDispatch();

  const friendsList = state.viewableFriends.map((friend) => {
    return (
      <div className="friend-bubble" key={friend}>
        <p>{friend}</p>
      </div>
    );
  });
  const friendGroupsList = state.viewableFriendGroups.map((friendGroup) => {
    return (
        <div className="friend-bubble" key={friendGroup}>
            <p>{friendGroup}</p>
        </div>
    )
  })
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-container">
        <div className="friends-page-conatiner">
          <div className="friends-sidebar">
            <button className="friends-sidebar-button">Friends</button>
            <button className="friends-sidebar-button">Friend-Groups</button>
            <button className="friends-sidebar-button">Find Friends</button>
          </div>
          <div className="friends-content-container">
          <div className="friends-list-container">
            <h3>Friends</h3>
            <input
              type="text"
              placeholder="search"
              className="friend-search-input"
              onChange={(e) => dispatch(filterViewableFriends(e.target.value))}
            />
            {friendsList}
          </div>
          <div className="friends-list-container">
            <h3>Friend Groups</h3>
            <input
              type="text"
              placeholder="search"
              className="friend-search-input"
              onChange={(e) => dispatch(filterViewableFriendGroups(e.target.value))}
            />
            {friendGroupsList}
          </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

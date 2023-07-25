import "../css/FriendsPage.css";
import "../css/utility-css.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  updateNewGroupName,
  addFriendGroupThunk,
  addNewGroupFriend,
  friendSearchAllThunk,
  removeNewGroupFriend
} from "../reducers/friendsReducer";
import { v4 as uuid } from "uuid";

export default function FriendGroupForm() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);

  const newGroupFriends = state.newFriendGroup.friends.map(
    (username: string) => {
      return (
        <div className="staged-friend-bubble" key={uuid()}>
          <p>{username}</p>
          <button className="expand-button" onClick={()=>{dispatch(removeNewGroupFriend(username))}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="expand-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      );
    }
  );

  const searchList = state.findFriendsList.map((username: string) => {
    return (
      <div className="friend-bubble" key={uuid()}>
        <div className="title-and-button-container">
          <p>{username}</p>
          <button
            className="friend-button"
            onClick={() => {
              dispatch(addNewGroupFriend(username));
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="form-container">
      <div className="form-container-inner">
        <label>Group-Name</label>
        <input
          type="text"
          placeholder="Group Name"
          className="form-input"
          onChange={(e) => {
            dispatch(updateNewGroupName(e.target.value));
          }}
        />
      </div>
      <div className="staged-friend-container">{newGroupFriends}</div>
      <div className="friends-content-container">
        <div className="friends-list-container">
          <h3>Find Friends</h3>
          <input
            type="text"
            placeholder="search"
            className="friend-search-input"
            onChange={(e) => {
              dispatch(friendSearchAllThunk(e.target.value));
            }}
          />
          {searchList}
        </div>
      </div>
      <button
        className="button"
        style={{ width: "50%" }}
        onClick={() => {
          dispatch(addFriendGroupThunk(state.newFriendGroup));
        }}
      >
        Create Group
      </button>
    </div>
  );
}


import "../css/FriendGroupForm.css";
import "../css/utility-css.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  updateNewGroupName,
  addFriendGroupThunk,
  addNewGroupFriend,
  friendSearchAllThunk,
  removeNewGroupFriend,
  filterViewableFriends,
  clearNewFriendGroup,
} from "../reducers/friendsReducer";
import { v4 as uuid } from "uuid";

interface props {
  onClose: Function;
}

export default function FriendGroupForm({ onClose }: props) {

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.friends);

  async function handleSubmit(){
    const { name, friends } = state.newFriendGroup;
    if (name === "") return alert("The friend group needs a name");
    if (friends?.length === 0) return alert("The friend group needs at least on friend");
    await dispatch(addFriendGroupThunk(state.newFriendGroup));
    dispatch(clearNewFriendGroup())
    onClose()
    return
  }
  function handleClose(){
    dispatch(clearNewFriendGroup())
    onClose();
  }
  const newGroupFriends = state.newFriendGroup.friends.map(
    (username: string) => {
      return (
        <div className="staged-friend-bubble" key={uuid()}>
          <p>{username}</p>
          <button
            className="svg-button"
            onClick={() => {
              dispatch(removeNewGroupFriend(username));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="svg-button-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      );
    }
  );

  const searchList = state.viewableFriends.map((username: string) => {
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
    <>
    <div className="modal-close-container">
          <button
            className="close-button"
            onClick={() => {
              handleClose()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="#ccc"
              className="close-button-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
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
      <div className="form-content-container" style={{ height: "60%" }}>
        <div className="form-list-container" style={{height: "100%"}}>
          <h3>Friends</h3>
          <input
            type="text"
            placeholder="search"
            className="friend-search-input"
            onChange={(e) => {
              dispatch(filterViewableFriends(e.target.value));
            }}
          />
          <div className="form-search-list-container">{searchList}</div>
        </div>
      </div>
      <button
        className="button"
        style={{ width: "50%" }}
        onClick={() => {
          handleSubmit()
        }}
      >
        Create Group
      </button>
    </div>
    </>
  );
}

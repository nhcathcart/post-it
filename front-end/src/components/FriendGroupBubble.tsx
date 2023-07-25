import { ReactNode, useState } from "react";
import "../css/FriendsPage.css";
import "../css/utility-css.css";
import { useAppDispatch } from "../hooks";
import {
  removeFriendFromGroupThunk,
  deleteFriendGroupThunk,
} from "../reducers/friendsReducer";

export function FriendGroupBubble(props: {
  title: string;
  children?: string[];
  buttons?: ReactNode[];
}) {
  const [expand, setExpand] = useState(false);
  const { title, children } = props;
  const dispatch = useAppDispatch();
  const friendsList = children?.map((username) => {
    return (
      <div className="friend-bubble">
        <div className="title-and-button-container">
          <p>{username}</p>
          <button
            className="friend-button"
            onClick={() => {
              dispatch(
                removeFriendFromGroupThunk({
                  name: title,
                  friendToRemove: username,
                })
              );
            }}
          >
            remove
          </button>
        </div>
      </div>
    );
  });
  return (
    <div className="friend-bubble">
      <div className="title-and-button-container">
        <button
          type="button"
          className="expand-button"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="expand-icon"
              style={{
                transform: expand ? "rotate(90deg)" : "rotate(0)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            {title}
          </span>
        </button>
        <div className="bubble-button-conatiner">
          <button className="friend-button">Find-Dates</button>
        </div>
      </div>

      <div
        style={{ display: expand ? "flex" : "none" }}
        className="expand-container"
      >
        {friendsList}
        <button
          className="danger-button"
          style={{ marginTop: "5px" }}
          onClick={() => dispatch(deleteFriendGroupThunk(title))}
        >
          Delete-Group
        </button>
      </div>
    </div>
  );
}

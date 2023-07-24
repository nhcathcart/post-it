import { ReactNode, useState } from "react";
import "../css/FriendsPage.css";
import "../css/utility-css.css";
export function FriendGroupBubble(props: {
  title: string;
  children?: ReactNode[];
  buttons?: ReactNode[];
}) {
  const [expand, setExpand] = useState(false);
  const { title, children } = props;

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

      <div style={{ display: expand ? "block" : "none" }}>
        {children}
        <button className="friend-button">Add-Friend</button>
      </div>
    </div>
  );
}

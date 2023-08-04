import { useAppDispatch, useAppSelector } from "../hooks";
import "../css/CalendarPopup.css"
import { CustomEvent } from "../reducers/eventsReducer";
interface props {
  onClose: Function;
  data: CustomEvent | undefined 
}
export default function CalendarPopup({ onClose, data }: props) {
  if (!data) return null
  const { username, start, end } = data
  function handleClose() {
    onClose();
    return;
  }
  return (
    <div className="event-form-container">
      <div className="modal-close-container">
        <button
          className="close-button"
          onClick={() => {
            handleClose();
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
      <div>{username? username : "me"}</div>
    </div>
  );
}
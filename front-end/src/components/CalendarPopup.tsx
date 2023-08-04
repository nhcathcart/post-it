import { useAppDispatch, useAppSelector } from "../hooks";
import "../css/CalendarPopup.css";
import { CustomEvent } from "../reducers/eventsReducer";
import DateTimePicker from "react-datetime-picker";
interface props {
  onClose: Function;
  data: CustomEvent | undefined;
}
export default function CalendarPopup({ onClose, data }: props) {
  if (!data) return null;
  const { username, start, end, resource } = data;
  function handleClose() {
    onClose();
    return;
  }
  return (
    <>
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
    <div className="view-event-container">
      
      <div className="owner-container">
        <h4>
          {"Event Owner: "}
          {username ? username : "me"}
        </h4>
      </div>
      <div className="date-container">
        <DateTimePicker value={start} disableClock={true} disabled={true} />
        <DateTimePicker value={end} disableClock={true} disabled={true} />
      </div>
      <div className="notes-container">
          <h4>Notes:</h4>
          <p>{resource? resource : "---"}</p>
      </div>
    </div>
    </>
  );
}

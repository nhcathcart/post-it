import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { ModalButton } from "./ModalButton";
import AddEventForm from "./AddEventForm"
import { useAppDispatch, useAppSelector } from "../hooks";
import { getEventsThunk } from "../reducers/eventsReducer";

interface Props {}

//dummy event data

// Event {
//   title: string,
//   start: Date,
//   end: Date,
//   allDay?: boolean
//   resource?: any,
//}
const events: Event[] = [
  {
    title: "event-1",
    start: new Date(2023, 6, 22, 22),
    end: new Date(2023, 6, 22, 23),
  },
];
const localizer = momentLocalizer(moment);

export function MyCalendar(props: Props) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.events.events)
  const events = state

  useEffect(()=> {
    dispatch(getEventsThunk())
  }, [])

  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        toolbar: customToolbar,
      },
      defaultDate: new Date(2015, 3, 13),
    }),
    []
  );

  function customToolbar(toolbar: any) {
    return (
      <div
        className="rbc-toolbar"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              toolbar.onNavigate("PREV");
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              toolbar.onNavigate("TODAY");
            }}
          >
            Today
          </button>
          <button
            onClick={() => {
              toolbar.onNavigate("NEXT");
            }}
          >
            Next
          </button>
          
        </div>

        {toolbar.label}

        <div style={{ display: "flex", gap: "10px" }}>
          {toolbar.views.map((view: any) => (
            <button
              key={view}
              type="button"
              className={toolbar.view === view ? "rbc-active" : ""}
              onClick={() => toolbar.onView(view)}
            >
              {view}
            </button>
          ))}
          <ModalButton >
            <AddEventForm />
          </ModalButton>
        </div>
      </div>
    );
  }

  console.log(Calendar);

  return (
    <>
      <Calendar
        localizer={localizer}
        style={{ height: "90%", width: "87%" }}
        events={events}
        components={{
          // Use the `toolbar` prop to render your custom button component
          toolbar: customToolbar,
        }}
      />
    </>
  );
}

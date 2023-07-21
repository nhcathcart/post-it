import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { ModalButton } from "./ModalButton";
import AddEventForm from "./AddEventForm";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getEventsThunk } from "../reducers/eventsReducer";


//helper function to format event objects

function formatEvents(events: any) {
  const formattedEvents = events.map((event: any) => {
    //This formats the date strings into date objects
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      allDay: event.allDay,
      resource: event.resource,
    };
  });
  return formattedEvents;
}
const localizer = momentLocalizer(moment);

export function MyCalendar() {

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.events.events);
  const events = formatEvents(state);

  useEffect(() => {
    dispatch(getEventsThunk());
  }, []);

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
          <ModalButton isDefault={true}>
            <AddEventForm />
          </ModalButton>
        </div>
      </div>
    );
  }

  

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

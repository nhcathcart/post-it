import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { ModalButton } from "./ModalButton";
import AddEventForm from "./AddEventForm";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  getEventsThunk,
  getFriendGroupEventsThunk,
  CustomEvent,
} from "../reducers/eventsReducer";
import {
  getFriendGroupsThunk,
  loadFriendsThunk,
} from "../reducers/friendsReducer";

const localizer = momentLocalizer(moment);

export function MyCalendar() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.events.events);
  const friendsState = useAppSelector((state) => state.friends);
  const colorPointer = makeColorPointer(friendsState.friends);
  useEffect(() => {
    dispatch(getEventsThunk());
    dispatch(getFriendGroupsThunk());
    dispatch(loadFriendsThunk());
  }, []);

  const { components } = useMemo(
    () => ({
      components: {
        toolbar: customToolbar,
        event: customEvent,
      },
    }),
    []
  );
  // export interface CustomEvent {
  //   title: React.ReactNode,
  //   owner: string,
  //   start: string,
  //   end: string,
  //   allDay?: boolean
  //   resource?: any,
  // }
  //function to return event in the calendar component
  function customEvent(event: any) {
    return <div>{event.title}</div>;
  }
  const colorChoiceObj = {};
  //function to return styling for events in the calendar component

  function makeColorPointer(friends: string[]) {
    const colorPointer: any = {};
    const colorArray = ["#63474d", "#8B0000", "#eb9486"];
    let counter = 0;
    for (let i = 0; i < friends.length; i++) {
      if (counter >= friends.length) counter = 0;
      colorPointer[friends[i]] = colorArray[counter];
      counter += 1;
    }

    return colorPointer;
  }
  function customEventPropGetter(
    event: CustomEvent,
    start: any,
    end: any,
    isSelected: any
  ) {
    let newStyle = {
      backgroundColor: "#5a7d7c",
    };
    if (event.username in colorPointer) {
      newStyle.backgroundColor = colorPointer[event.username];
    }

    return {
      style: newStyle,
    };
  }
  //function to return the toolbar in the calendar component
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
          <ModalButton isDefault={true} text="Add">
            <AddEventForm />
          </ModalButton>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="calendar-controls-container">
        <select
          onChange={(e) => {
            dispatch(getFriendGroupEventsThunk(e.target.value));
          }}
          className="calendar-select"
        >
          <option value={"Just me"}>Just me</option>
          {/* creating all of the options from the state */}
          {friendsState.friendGroups.map((friendGroup) => {
            return (
              <option value={friendGroup.name} key={friendGroup.name}>
                {friendGroup.name}
              </option>
            );
          })}
        </select>
      </div>
      <Calendar
        localizer={localizer}
        style={{ height: "90%", width: "87%" }}
        events={state}
        components={components}
        eventPropGetter={customEventPropGetter}
      />
    </>
  );
}

import eventsReducer, {
  updateTitle,
  updateEvents,
  loadEvents,
  loadFriendEvents,
  removeEvent,
  updateStart,
  updateEnd,
  updateAllDay,
  updateResource,
  setViewChoice,
  clearNewEvent,
} from '../src/reducers/eventsReducer';

describe('events reducer', () => {
  it('should handle updateTitle', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const nextState = eventsReducer(initialState, updateTitle('New Title'));
    expect(nextState.newEvent.title).toBe('New Title');
  });

  it('should handle updateEvents', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const event = {
      id: 1,
      title: 'Test Event',
      start: new Date(),
      end: new Date(),
    };
    const nextState = eventsReducer(initialState, updateEvents(event));
    expect(nextState.events).toContainEqual(event);
  });

  it('should handle loadEvents', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const events = [
      {
        id: 1,
        title: 'Event 1',
        start: new Date(),
        end: new Date(),
      },
      {
        id: 2,
        title: 'Event 2',
        start: new Date(),
        end: new Date(),
      },
    ];
    const nextState = eventsReducer(initialState, loadEvents(events));
    expect(nextState.events).toEqual(events);
  });

  it('should handle loadFriendEvents', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const friendEvents = {
      username1: [
        {
          id: 1,
          title: 'Event 1',
          start: new Date(),
          end: new Date(),
        },
      ],
    };
    const nextState = eventsReducer(initialState, loadFriendEvents(friendEvents));
    expect(nextState.friendEvents).toEqual(friendEvents);
  });

  it('should handle removeEvent', () => {
    const initialState = {
      events: [
        {
          id: 1,
          username: undefined,
          title: 'Event 1',
          start: new Date(),
          end: new Date(),
        },
      ],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const nextState = eventsReducer(initialState, removeEvent(1));
    expect(nextState.events).toHaveLength(0);
  });

  it('should handle updateStart', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const newStartDate = new Date('2023-08-09T10:00:00');
    const nextState = eventsReducer(initialState, updateStart(newStartDate));
    expect(nextState.newEvent.start).toBe(newStartDate);
  });

  it('should handle updateEnd', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const newEndDate = new Date('2023-08-09T12:00:00');
    const nextState = eventsReducer(initialState, updateEnd(newEndDate));
    expect(nextState.newEvent.end).toBe(newEndDate);
  });

  it('should handle updateAllDay', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const nextState = eventsReducer(initialState, updateAllDay(true));
    expect(nextState.newEvent.allDay).toBe(true);
  });

  it('should handle updateResource', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const newResource = 'Room A';
    const nextState = eventsReducer(initialState, updateResource(newResource));
    expect(nextState.newEvent.resource).toBe(newResource);
  });

  it('should handle setViewChoice', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "",
        start: undefined,
        end: undefined,
        allDay: false,
        resource: undefined,
      },
    };
    const newViewChoice = ['day', 'week'];
    const nextState = eventsReducer(initialState, setViewChoice(newViewChoice));
    expect(nextState.viewChoice).toEqual(newViewChoice);
  });

  it('should handle clearNewEvent', () => {
    const initialState = {
      events: [],
      friendEvents: {},
      viewChoice: [],
      newEvent: {
        title: "Sample Event",
        start: new Date(),
        end: new Date(),
        allDay: false,
        resource: "Room B",
      },
    };
    const nextState = eventsReducer(initialState, clearNewEvent());
    expect(nextState.newEvent).toEqual({
      title: "",
      start: undefined,
      end: undefined,
      allDay: false,
      resource: undefined,
    });
  });
});


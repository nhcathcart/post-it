import { CustomEvent, dateFormatter } from "./reducers/eventsReducer";

function getNextDayOfTheWeek(
  dayName: string,
  occurrence: number = 1,
  excludeToday: boolean = true,
  refDate: Date = new Date()
) {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
    dayName.slice(0, 3).toLowerCase()
  );

  if (dayOfWeek < 0) return;

  refDate.setHours(0, 0, 0, 0);

  if (excludeToday && dayOfWeek === refDate.getDay()) {
    occurrence++;
  }

  const daysUntilNextDay = (dayOfWeek + 7 - refDate.getDay()) % 7;
  const nextOccurrenceDays =
    occurrence === 1
      ? daysUntilNextDay
      : (occurrence - 1) * 7 + daysUntilNextDay;

  refDate.setDate(refDate.getDate() + nextOccurrenceDays);
  return refDate;
}

export function createAvailObj(events: CustomEvent[]) {
  const dayArray = ["fri", "sat", "sun"];
  const compareSet: any = new Set();
  const refObj: any = {};
  const availabilityObj: any = {};
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < dayArray.length; j++) {
      const dayKey = dayArray[j] + i;
      compareSet.add(dayKey);
      availabilityObj[dayKey] = true;
      const startHour = dayArray[j] === "fri" ? 19 : 0;
      const endHour = 23;

      const start = getNextDayOfTheWeek(dayArray[j], i)?.setHours(
        startHour,
        0,
        0,
        0
      );
      const end = getNextDayOfTheWeek(dayArray[j], i)?.setHours(
        endHour,
        59,
        0,
        0
      );

      refObj[dayKey] = { start, end };
    }
  }

  for (let i = 0; i < events.length; i++) {
    for (const key in refObj) {
      const { start, end } = refObj[key];
      if (events[i].end < start || events[i].start > end) {
        continue;
      } else {
        compareSet.delete(key);
        availabilityObj[key] = false;
      }
    }
  }

  const output: any = {
    fri: 0,
    sat: 0,
    sun: 0,
  };

  compareSet.forEach((key: string) => {
    if (key.startsWith("fri")) output["fri"] += 1;
    if (key.startsWith("sat")) output["sat"] += 1;
    if (key.startsWith("sun")) output["sun"] += 1;
  });
  console.log("input: ", events);
  console.log("output: ", availabilityObj);
  return availabilityObj;
}

export function availMaker(myEvents: CustomEvent[]) {
  const availObj = createAvailObj(myEvents);
  const output: any = {
    fri: 0,
    sat: 0,
    sun: 0,
  };
  for (const key in availObj) {
    if (availObj[key] && key.startsWith("fri")) output.fri += 1;
    if (availObj[key] && key.startsWith("sat")) output.sat += 1;
    if (availObj[key] && key.startsWith("sun")) output.sun += 1;
  }
  return output;
}

export function sharedAvailMaker(
  myEvents: CustomEvent[],
  friendEvents: {
    [username: string]: CustomEvent[];
  },
  pins: string[]
) {
  
  const myAvailObj = createAvailObj(dateFormatter(myEvents));
  const friendAvailabilityObj: any = {};

  pins?.forEach(
    (item) =>
      (friendAvailabilityObj[item] = createAvailObj(
        dateFormatter(friendEvents[item])
      ))
  );
  const sharedAvailObj: any = {};

  for (const key in friendAvailabilityObj) {
    for (let i = 1; i < 4; i++) {
      if (
        friendAvailabilityObj[key]["fri" + i] === true &&
        myAvailObj["fri" + i] === true
      ) {
        sharedAvailObj[key] = getNextDayOfTheWeek("fri", i)?.toDateString();
        break;
      }
      if (
        friendAvailabilityObj[key]["sat" + i] === true &&
        myAvailObj["sat" + i] === true
      ) {
        sharedAvailObj[key] = getNextDayOfTheWeek("sat", i)?.toDateString();
        break;
      }
      if (
        friendAvailabilityObj[key]["sun" + i] === true &&
        myAvailObj["sun" + i] === true
      ) {
        sharedAvailObj[key] = getNextDayOfTheWeek("sun", i)?.toDateString();
        break;
      }
    }
  }
  return sharedAvailObj;
}

function formatDateToString(date: Date) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];

  // Concatenate the parts to form the desired format
  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;
  return formattedDate;
}
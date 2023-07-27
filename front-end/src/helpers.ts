import { CustomEvent } from "./reducers/eventsReducer";

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
  const compareSet: any = new Set([])
  const refObj: any = {};

  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < dayArray.length; j++) {
      compareSet.add(dayArray[j] + i)
      if (dayArray[j] === "fri"){
        refObj[dayArray[j] + i] = {
            start: getNextDayOfTheWeek(dayArray[j], i)?.setHours(19, 0, 0, 0),
            end: getNextDayOfTheWeek(dayArray[j], i)?.setHours(23, 59, 0, 0),
          };
      }else{
        refObj[dayArray[j] + i] = {
            start: getNextDayOfTheWeek(dayArray[j], i)?.setHours(0, 0, 0, 0),
            end: getNextDayOfTheWeek(dayArray[j], i)?.setHours(23, 59, 0, 0),
          };
      }
      
    }
  }
  
  for (let i=0; i<events.length; i++){
    for (const key in refObj){
        if (events[i].start > refObj[key].end || events[i].end < refObj.start) continue;
        else compareSet.delete(key)
    }
  }
  const output: any = {
    fri : 0,
    sat : 0,
    sun : 0,
  }
  for (const key in compareSet){
    if (key.startsWith('fri')) output['fri'] += 1;
    if (key.startsWith('sat')) output['sat'] += 1;
    if (key.startsWith('sun')) output['sun'] += 1;
  }
  return output;
}



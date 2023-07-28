
export interface CustomEvent {
    title: string,
    username: string,
    start: string | Date,
    end: string | Date,
    allDay?: boolean
    resource?: any,
  }

export function makeFriendEventObj (events: CustomEvent[]){
    const output : any = {};
    for (let i=0; i<events.length; i++){
        const username: string = events[i].username
        if (username in output){
            output[username].push(events[i]);
        }else{
            output[username] = [events[i]]
        }
    }
    return output;
}
import { SendAnalyticEvent } from "./events/analytics";
import { EventPayload } from "./types/event";

export const Events = {
    "SendAnalyticEvent": SendAnalyticEvent
}

function HandleEvent(event: EventPayload) {
    let func = Events[event?.Type];
    if (func != null) {
        func(event.Data)
    }
    if (Events[event?.Type]) {

    }
}
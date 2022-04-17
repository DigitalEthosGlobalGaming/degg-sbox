import { PlayerEvents } from "./events/player/_player";
import { SystemEvents } from "./events/system/_system";
import { EventPayload } from "./types/event";

export const Events = {
    ...PlayerEvents,
    ...SystemEvents,
}

export async function HandleEvent(event: EventPayload): Promise<EventPayload> {
    let func = Events[event?.Type?.toLowerCase()];
    let response: EventPayload = {
        ...(event as any ?? {}),
    }

    if (func != null) {
        let result = func(event.Data, event);
        if (result?.then != null && result?.catch != null) {
            result = await result;
        }
        response.Data = result;
    } else {
        console.log(`invalid event ${event?.Type}`);
    }

    delete response.ws;
    delete response.organisation;

    return response;
}
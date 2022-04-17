import { EventPayload } from "../../types/event";

export async function UnSubscribeEvent(data: any, payload: EventPayload) {
    var id = data?.id;
    payload.ws.unSubscribe(id);

    return id;
}
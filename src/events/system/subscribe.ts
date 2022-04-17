import { EventPayload } from "../../types/event";

export async function SubscribeEvent(data: any, payload: EventPayload) {
    var topic = data?.topic;
    var id = data?.id;
    payload.ws.subscribe(topic, id);

    return id;
}
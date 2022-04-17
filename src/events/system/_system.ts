import { LoginEvent } from "./login";
import { SubscribeEvent } from "./subscribe";
import { UnSubscribeEvent } from "./unsubscribe";

export const SystemEvents = {
    "unsubscribe": UnSubscribeEvent,
    "subscribe": SubscribeEvent,
    "login": LoginEvent
}
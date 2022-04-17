import { PlayerGet } from "./player.get";
import { PlayerJoin } from "./player.join";
import { PlayerSet } from "./player.set";
import { PlayerSyncEvent } from "./player.sync";

export const PlayerEvents = {
    "player.join": PlayerJoin,
    "player.set": PlayerSet,
    "player.get": PlayerGet,
    "player.sync": PlayerSyncEvent
}
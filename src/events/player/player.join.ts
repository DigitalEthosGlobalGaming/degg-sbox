import { findOrCreatePlayer } from "../../application/player";
import { EventPayload, GameEventFunc } from "../../types/event";

export const PlayerJoin: GameEventFunc = async (data: any, event: EventPayload) => {
    if (data?.playerId != null && event?.organisation != null) {

        var player = await findOrCreatePlayer(event?.organisation, data?.name ?? "unknown", data?.playerId);
        return player;
    }
}
import { PlayerData } from "@prisma/client";
import { findOrCreatePlayer } from "../../application/player";
import { forceArray } from "../../helpers/forceArray";
import { EventPayload, GameEventFunc } from "../../types/event";

export const PlayerSyncEvent: GameEventFunc = async (data: any, event: EventPayload) => {
    let codes: string[] = forceArray(data?.codes);
    let organisation = event.ws.organisation;
    let playerId = data?.playerId;
    let player: any = await findOrCreatePlayer(organisation, null, playerId, codes);
    let results: any = {};
    let playerData: PlayerData[] = player?.PlayerData ?? [];

    for (let i in playerData) {
        let item = playerData[i];
        results[item.code] = item.data;
    }

    return results;
}
import { PlayerData } from "@prisma/client";
import { findOrCreatePlayer } from "../../application/player";
import { EventPayload, GameEventFunc } from "../../types/event";

export const PlayerGet: GameEventFunc = async (data: any, event: EventPayload) => {
    let organisation = event?.organisation;
    let playerId = data?.playerId;
    console.log(playerId);
    let key = data?.key;
    let player: any = await findOrCreatePlayer(organisation, null, playerId, [key]);

    let dataItem: PlayerData[] = player?.PlayerData ?? [];
    for (let i in dataItem) {
        let item = dataItem[i];
        if (item.code == key) {

            return item.data;
        }
    }

    return null;
}
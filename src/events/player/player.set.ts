import { PlayerData } from "@prisma/client";
import { findOrCreatePlayer } from "../../application/player";
import { db } from "../../prisma";
import { EventPayload, GameEventFunc } from "../../types/event";

export const PlayerSet: GameEventFunc = async (data: any, event: EventPayload) => {
    let organisation = event.ws.organisation;
    let playerId = data?.playerId;
    let key = data?.key;
    let value = data?.value;
    let player: any = await findOrCreatePlayer(organisation, null, playerId, [key]);

    var dataItem: PlayerData[] = player?.PlayerData ?? [];
    for (let i in dataItem) {
        var item = dataItem[i];
        if (item.code == key) {
            await db.playerData.update({
                data: {
                    data: value,
                },
                where: {
                    id: item.id
                }
            });
            return value;
        }
    }

    await db.playerData.create({
        data: {
            playerId: player.id,
            code: key,
            data: value
        }
    });

    return value;
}
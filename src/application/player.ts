import { Organisation } from "@prisma/client";
import { db } from "../prisma";
import { tryCreateUser } from "./users";


export async function findOrCreatePlayer(organisation: Organisation, name: string, playerId: string, playerDataKeys: string[] = null) {
    let query: any = {
        where: {
            organisationId: organisation.id,
            User: {
                playerId: playerId
            }
        }
    };


    let player: any = await db.player.findFirst(query);

    if (player != null) {
        if ((playerDataKeys ?? []).length > 0) {
            var playerData = await db.playerData.findMany({
                where: {
                    playerId: player.id,
                    code: {
                        in: playerDataKeys
                    }
                }
            });
            player.PlayerData = playerData;
        }

        console.log(player);

        return player;
    }

    let user = await tryCreateUser(name, playerId);
    player = await db.player.create({
        data: {
            data: {},
            userId: user.id,
            organisationId: organisation.id
        }
    });

    return player;
}

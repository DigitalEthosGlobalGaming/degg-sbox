import { db } from "../prisma";


export async function tryCreateUser(name: string, steamId: string) {
    let user = await db.user.findFirst({
        where: {
            playerId: steamId
        }
    });

    if (user != null) {
        if (name != null && user.name != name) {
            user = await db.user.update({
                data: {
                    name: name
                },
                where: {
                    id: user.id
                }
            });
        }
    } else {
        user = await db.user.create({
            data: {
                playerId: steamId,
                name: name
            }
        });
    }

    return user;
}

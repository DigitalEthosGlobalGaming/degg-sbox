import { Organisation } from "@prisma/client";
import { CustomWebsocket } from "../server";

export type EventPayload = {
    ws: CustomWebsocket;
    organisation?: Organisation;
    CallbackId: string;
    Data: any;
    Type: any;
};


export type GameEventFunc = (data: any, payload: EventPayload) => Promise<any | void>;

export type EventOrganisation = Organisation & {

}
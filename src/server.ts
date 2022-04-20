import { Organisation } from "@prisma/client";
import { WebSocket, WebSocketServer } from "ws";
import { HandleEvent } from "./eventHandler";
import { Uuid, uuidV4 } from "./helpers/uuid";
import { fireEvent, subscribe, unsubscribe } from "./subscriptions/subscription";
import { EventPayload } from "./types/event";

const server = require('http').createServer();
const express = require('express');
const app = express();
const appPort = process?.env?.PORT ?? 8080;

export type WebServer = {
    wss: WebSocketServer;
    connections: { [key: Uuid]: WebSocket }
}

export type CustomWebsocket = WebSocket & {
    server: WebServer;
    connectionId: string;
    organisation: Organisation;
    subscriptions: {},
    fire: (topic: string, data: any) => void;
    subscribe: (topic: string, id?: string) => void;
    unSubscribe: (topic: string, id?: string) => void;
    unSubscribeAll: () => void;
    sendData: (data: any) => void
    event: (type: string, message?: any, callbackId?: any) => void
    error: (message: string, callbackId: any) => void
    sendFunc: (callback: () => Promise<any>) => void
}




export async function startServer() {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    const webServer: WebServer = {
        connections: {},
        wss: new WebSocketServer({
            server: server,
        }),
    }

    webServer.wss.on('connection', function connection(ws: CustomWebsocket) {
        ws.server = webServer;

        ws.connectionId = uuidV4();
        webServer.connections[ws.connectionId] = ws;
        ws.organisation = null;

        ws.fire = (topic: string, data: any) => {
            var organisationId = ws?.organisation?.id;
            if (organisationId != null) {
                console.log(topic, data);
                fireEvent(`${organisationId}.${topic}`, data);
            }
        }

        ws.subscribe = (topic: string, id: string = null) => {
            var organisationId = ws?.organisation?.id;
            if (organisationId != null) {
                var id = subscribe(`${organisationId}.${topic}`, (data) => {
                    ws.event(topic, data);
                }, id);

                if (ws.subscriptions == null) {
                    ws.subscriptions = [];
                }

                if (ws.subscriptions[topic] == null) {
                    ws.subscriptions[topic] = [];
                }

                ws.subscriptions[topic].push(id);
            }
        }

        ws.unSubscribe = (topic: string, id: string = null) => {
            var organisationId = ws?.organisation?.id;
            if (organisationId != null) {
                unsubscribe(id);
                if (ws.subscriptions?.[topic] != null) {
                    for (var i = 0; i < ws.subscriptions[topic].length; i++) {

                        if (ws.subscriptions[topic][i] === id) {
                            ws.subscriptions[topic].splice(i, 1);
                        }
                    }
                }

                ws.subscriptions[topic].push(id);
            }
        }

        ws.unSubscribeAll = () => {
            for (var i in ws.subscriptions) {
                for (var b in ws.subscriptions[i]) {
                    unsubscribe(ws.subscriptions[i][b]);
                }
            }
            ws.subscriptions = {};
        }

        if (ws.sendData == null) {
            ws.sendData = (data) => {
                ws.binaryType = "arraybuffer";
                let payload = JSON.stringify(data);
                ws.send(payload);
            }
        }

        if (ws.event == null) {
            ws.event = (type: string, data: any, callbackId: any) => {
                ws.sendData({
                    Id: "",
                    CallbackId: callbackId,
                    Data: JSON.stringify(data),
                    Type: type,
                });
            }
        }

        if (ws.error == null) {
            ws.error = (message: string, callbackId: any) => {
                ws.event("ERROR", message, callbackId);
            }
        }

        if (ws.sendFunc == null) {
            ws.sendFunc = async (func) => {
                if (func == null) {
                    return null;
                }

                try {
                    ws.sendData(await func());
                } catch (e) {
                    console.error(e);
                }
            }
        }

        ws.on('message', async function incoming(messageRaw: any) {
            let message: EventPayload = JSON.parse(messageRaw.toString());
            let eventType = message?.Type;
            if (eventType == null) {
                return;
            }
            try {
                message.Data = JSON.parse(message.Data);
            } catch (e) {

            }
            console.log(message);


            message.ws = ws;
            message.organisation = ws.organisation;
            let result = await HandleEvent(message);
            result.Data = JSON.stringify(result.Data);

            if (result.CallbackId != null && result.CallbackId != "") {
                ws.sendData(result);
            }
        });

        ws.on("close", () => {
            ws.unSubscribeAll();
            delete webServer.connections[ws.connectionId];
        })

    });

    server.on('request', app);

    server.listen(appPort, function () {
        console.log(`http/ws server listening on ${appPort}`);
    });


}


startServer();

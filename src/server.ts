import { WebSocket, WebSocketServer } from "ws";
import { uuid } from "./helpers/uuid";



export type WebServer = {
    wss: WebSocketServer;
}

export type CustomWebsocket = WebSocket & {
    playerId: string | null;
    sendData: (data: any) => void
    event: (type: string, message?: any, callbackId?: any) => void
    error: (message: string, callbackId: any) => void
    sendFunc: (callback: () => Promise<any>) => void
}

const serverId = uuid();

export function startServer() {
    let port = 8080;

    const webServer: WebServer = {
        wss: new WebSocketServer({
            port: port,
            perMessageDeflate: {
                zlibDeflateOptions: {
                    // See zlib defaults.
                    chunkSize: 1024,
                    memLevel: 7,
                    level: 3
                },
                zlibInflateOptions: {
                    chunkSize: 10 * 1024
                },
                // Other options settable:
                clientNoContextTakeover: true, // Defaults to negotiated value.
                serverNoContextTakeover: true, // Defaults to negotiated value.
                serverMaxWindowBits: 10, // Defaults to negotiated value.
                // Below options specified as default values.
                concurrencyLimit: 10, // Limits zlib concurrency for perf.
                threshold: 1024 // Size (in bytes) below which messages
                // should not be compressed if context takeover is disabled.
            }
        }),

    }


    webServer.wss.on("listening", () => {
        console.log(`Websocket listening on port ${port}`);
    });


    webServer.wss.on('connection', function connection(ws: CustomWebsocket) {
        console.log("Connect");
        if (ws.sendData == null) {
            ws.sendData = (data) => {
                let payload = JSON.stringify(data);
                ws.send(payload);
            }
        }

        if (ws.event == null) {
            ws.event = (type: string, message: any, callbackId: any) => {
                ws.sendData({
                    type: type,
                    message: message,
                    callbackId: callbackId
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
            console.log("Here");
            let message = JSON.parse(messageRaw.toString());
            console.log(message);
            let eventType = message?.type;
            let messageData = message?.data;
            let callbackId = message?.callbackId;
            

            if (eventType == null) {
                return;
            }

            let playerId = ws?.playerId;

        });

        ws.on("close", () => {
            let playerId: any = ws.playerId;

        })
        // let player = createPlayer(webServer, ws);
    });
}

startServer();
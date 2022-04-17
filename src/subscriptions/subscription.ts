import { Uuid, uuidV4 } from "../helpers/uuid";

const SUBSCRIPTIONS: any = {
    children: {},
    subscriptions: {}
};

const idMappings = {};


function getSubscribers(topic: string) {
    var parts = topic.split(".");
    var current = SUBSCRIPTIONS;
    var subs = [];
    for (var i in parts) {
        var part = parts[i];

        if (current.children[part] == null) {
            break;
        }

        subs.push(...(Object.values(current.children[part]?.subscriptions ?? [])));

        current = current.children[part];
    }
    return subs;
}

export function fireEvent(topic: string, data: any) {
    var subscribers = getSubscribers(topic);
    console.log(subscribers.length);


    for (var i in subscribers) {
        var sub = subscribers[i];
        if (sub != null) {
            sub(data);
        }
    }
}

export type subscribeFunction = (data: any) => void | Promise<void>

export function subscribe(topic: string, callback: subscribeFunction, id: string = null): Uuid {
    id = id ?? uuidV4();

    let parts = topic.split(".");
    let current = SUBSCRIPTIONS;
    for (var i in parts) {
        let part = parts[i];
        if (i?.toString() == (parts.length - 1)?.toString()) {
            current.subscriptions[id] = callback;
        } else {
            let previous = current;
            current = current?.children?.[part];

            if (current == null) {
                current = {
                    children: {},
                    subscriptions: {}
                }
                previous.children[part] = current;
            }
        }
    }
    idMappings[id] = current.subscriptions;
    return id;
}

export function unsubscribe(id: Uuid) {
    if (idMappings[id] != null) {
        delete idMappings[id][id];
    }
}

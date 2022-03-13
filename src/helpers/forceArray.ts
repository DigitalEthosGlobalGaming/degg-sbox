import { isArray } from "./isArray";

export function forceArray(item) {
    if (!isArray(item)) {
        return [item];
    }
    return item;
}
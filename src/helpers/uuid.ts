export type Uuid = string;
import { v4 } from "uuid";
export function uuidV4(): Uuid {
    return v4();
}

export function uuid(): Uuid {
    return v4();
}
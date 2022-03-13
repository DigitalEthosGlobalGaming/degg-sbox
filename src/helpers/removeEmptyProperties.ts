import filterObject from "./filterObject";
import { isNonEmptyArray } from "./inNonEmptyArray";
import { isArray } from "./isArray";

export function removeEmptyProperties(obj) {
    return filterObject(obj, (obj) => {
        if (isArray(obj)) {
            return isNonEmptyArray(obj);
        }
        return true;
    })
}
import filterObject from "./filterObject";

export function removeUndefinedProperties(obj) {
    return filterObject(obj, (obj) => {
        return obj === undefined
    })
}
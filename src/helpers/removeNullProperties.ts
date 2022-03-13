import filterObject from "./filterObject";

export function removeNullProperties(obj) {
    return filterObject(obj, (obj) => {
        return obj != null
    })
}
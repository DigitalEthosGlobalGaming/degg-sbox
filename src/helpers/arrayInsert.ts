export function arrayInsert(arr: any[], index: number, value: any) {
    if (arr == null) {
        return null;
    }
    if (index > arr.length) {
        return [...arr, value];
    }
    if (index < 0) {
        return [value, ...arr];
    }
    return [
        ...arr.slice(0, index),
        value,
        ...arr.slice(index)
    ];
}
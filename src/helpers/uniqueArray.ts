export function uniqueArray(arr: any[], key: any = null) {
    let unique = {};
    for (let i in arr) {
        let item = arr[i];
        let itemKey = null;
        if (key != null) {
            itemKey = item?.[key];
        } else {
            itemKey = item;
        }
        unique[itemKey] = item;

    }

    return Object.values(unique);
}
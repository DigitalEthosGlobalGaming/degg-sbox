
export default function filterObject(obj, filterFunc: (value: any, field?: string) => boolean) {
    if (typeof filterFunc !== 'function') {
        return obj;
    }
    let result = {}
    Object.keys(obj).forEach((field) => {
        if (filterFunc(obj[field], field)) {
            result[field] = obj[field];
        }
    });
    return result;
}
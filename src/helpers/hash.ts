import { isString } from "./isString";


export const quickHash = (str: any): number => {
    if (!isString(str)) {
        try {
            str = JSON.stringify(str);
        } catch (e) {
            return null;
        }
    }
    var hash = 0;
    if (str == null) {
        return 0;
    }
    if (str.length === 0) {
        return hash;
    }
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

export const hashCheck = (obj1: any, obj2: any): boolean => {
    let hash1 = quickHash(obj1);
    let hash2 = quickHash(obj2);
    return hash1 != hash2;
};
import { isString } from "./isString";



export const replaceString = (original: string, find: string | string[], replace: string): string => {
    if (!isString(original)) {
        return original;
    }

    if (Array.isArray(find)) {
        find.forEach((subFind) => {
            original = replaceString(original, subFind, replace);
        });
    } else {
        original = original.split(find).join(replace);
    }
    return original;
};

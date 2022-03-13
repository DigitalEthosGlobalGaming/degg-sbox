import { isString } from "./isString";

export function toBoolean(item: any): boolean {
    if (item == true) {
        return true;
    }
    if (isString(item)) {
        switch (item?.toLowerCase() ?? "") {
            case 'true':
            case '1':
            case 'on':
            case 'yes':
                return true
            default:
                return false
        }
    }
    return false;
}
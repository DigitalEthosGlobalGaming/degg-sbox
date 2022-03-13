export function objectHasKeys(obj: Object): boolean {
    return Object.keys(obj ?? {}).length > 0;
}
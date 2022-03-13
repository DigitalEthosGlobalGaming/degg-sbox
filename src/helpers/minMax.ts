export function minMax(item: number, minItem: number = null, maxItem: number = null): number {
    if (minItem != null && item < minItem) {
        return minItem;
    }

    if (maxItem != null && item > maxItem) {
        return maxItem;
    }

    return item;
}

export function max(item: number, maxItem: number): number {
    if (maxItem > item) {
        return maxItem;
    }
    return item;
}
export function min(item: number, minItem: number): number {
    if (minItem < item) {
        return minItem;
    }
    return item;
}
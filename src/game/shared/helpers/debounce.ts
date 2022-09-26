import _debounce from "lodash/debounce";

export default function debounce(func: (...args: any) => any, wait: number | undefined) {
    return _debounce(func, wait);
}

import cloneDeep from "lodash/cloneDeep";

export default function clone<T>(value: T) {
    return cloneDeep<T>(value);
}

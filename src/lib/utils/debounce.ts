
export const debouncer = (fn: (...rest: any[]) => void, timer?: number) => {
    timer = timer || 500;
    let handle: NodeJS.Timeout;
    function out (...rest: any[]) {
        clearTimeout(handle);
        const self = this
        handle = setTimeout(() => {
            fn.apply(self, rest);
        }, timer);
    };
    return out;
};

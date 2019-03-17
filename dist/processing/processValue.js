"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO [RM]: process value also for `normal` sql mode without noPrepared (no wrapping/escaping needed)
const noWrap = (value) => ({
    value: value,
    wrapString: false,
});
const withWrap = (value) => ({
    value: value,
    wrapString: true,
});
const processString = (value) => {
    return withWrap(value);
};
const processNumber = (value) => {
    if (Number.isFinite(value)) {
        return noWrap(value.toString());
    }
    if (value === Number.POSITIVE_INFINITY) {
        return withWrap("Infinity");
    }
    if (value === Number.NEGATIVE_INFINITY) {
        return withWrap("-Infinity");
    }
    return withWrap("NaN");
};
const processBoolean = (value) => {
    return noWrap(value ? "true" : "false");
};
const processNull = (value) => {
    return noWrap("null");
};
exports.processValue = (value, customProcessors) => {
    const processFunctions = [
        ...customProcessors,
        { predicate: (v) => typeof v === "string", process: processString },
        { predicate: (v) => typeof v === "number", process: processNumber },
        { predicate: (v) => typeof v === "boolean", process: processBoolean },
        { predicate: (v) => v === null, process: processNull },
    ];
    const process = processFunctions.find(p => p.predicate(value));
    if (!process) {
        throw new Error(`Unsupported value of type '${typeof value}'.`);
    }
    return process.process(value);
};
//# sourceMappingURL=processValue.js.map
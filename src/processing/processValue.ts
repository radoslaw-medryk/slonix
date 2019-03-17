import { ValueProcessor } from "../types/ValueProcessor";
import { ProcessedValue } from "../types/ProcessedValue";

// TODO [RM]: process value also for `normal` sql mode without noPrepared (no wrapping/escaping needed)

const noWrap = (value: string): ProcessedValue => ({
    value: value,
    wrapString: false,
});

const withWrap = (value: string): ProcessedValue => ({
    value: value,
    wrapString: true,
});

const processString = (value: string): ProcessedValue => {
    return withWrap(value);
};

const processNumber = (value: number) => {
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

const processBoolean = (value: boolean) => {
    return noWrap(value ? "true" : "false");
};

const processNull = (value: null) => {
    return noWrap("null");
};

export const processValue = (value: any, customProcessors: ValueProcessor[]): ProcessedValue => {
    const processFunctions: ValueProcessor[] = [
        ...customProcessors,
        { predicate: (v: any) => typeof v === "string", process: processString },
        { predicate: (v: any) => typeof v === "number", process: processNumber },
        { predicate: (v: any) => typeof v === "boolean", process: processBoolean },
        { predicate: (v: any) => v === null, process: processNull },
    ];

    const process = processFunctions.find(p => p.predicate(value));
    if (!process) {
        throw new Error(`Unsupported value of type '${typeof value}'.`);
    }

    return process.process(value);
};

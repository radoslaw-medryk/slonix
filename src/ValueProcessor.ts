import { ProcessedValue } from "./ProcessedValue";

export type ValueProcessor = {
    predicate: (value: any) => boolean;
    process: (value: any) => ProcessedValue;
};

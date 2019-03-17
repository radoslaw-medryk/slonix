import { ProcessedValue } from "./ProcessedValue";
export declare type ValueProcessor = {
    predicate: (value: any) => boolean;
    process: (value: any) => ProcessedValue;
};
//# sourceMappingURL=ValueProcessor.d.ts.map
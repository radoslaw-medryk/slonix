import { ValueProcessor } from "./types/ValueProcessor";

export class SqlxStatic {
    public static _processors: ValueProcessor[] = [];

    public static registerProcessor = (processor: ValueProcessor) => {
        if (!processor) {
            throw new Error("!processor");
        }

        SqlxStatic._processors = [...SqlxStatic._processors, processor];
    };
}

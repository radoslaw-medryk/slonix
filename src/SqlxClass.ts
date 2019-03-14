import { ValueProcessor } from "./ValueProcessor";

export class Sqlx {
    public static _processors: ValueProcessor[] = [];

    public static registerProcessor = (processor: ValueProcessor) => {
        if (!processor) {
            throw new Error("!processor");
        }

        Sqlx._processors = [...Sqlx._processors, processor];
    };
}

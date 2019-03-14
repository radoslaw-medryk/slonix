import { IdentifierTokenType, sql } from "slonik";

type SimpleConstructor<T> = new () => T;

export type PropsDefinition<T> = { [key in keyof T]: IdentifierTokenType };

export const propsDefinition = <T>(modelConstructorOrInstance: SimpleConstructor<T> | T): PropsDefinition<T> => {
    const model =
        typeof modelConstructorOrInstance === "function"
            ? new (modelConstructorOrInstance as SimpleConstructor<T>)()
            : modelConstructorOrInstance;

    const result: Partial<PropsDefinition<T>> = {};
    // tslint:disable-next-line:forin
    for (const key in model) {
        result[key] = sql.identifier([key]);
    }

    return result as PropsDefinition<T>;
};

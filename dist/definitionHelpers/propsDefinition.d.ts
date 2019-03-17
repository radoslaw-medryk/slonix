import { IdentifierTokenType } from "slonik";
declare type SimpleConstructor<T> = new () => T;
export declare type PropsDefinition<T> = {
    [key in keyof T]: IdentifierTokenType;
};
export declare const propsDefinition: <T>(modelConstructorOrInstance: T | SimpleConstructor<T>) => PropsDefinition<T>;
export {};
//# sourceMappingURL=propsDefinition.d.ts.map
import { CommonQueryMethodsType, QueryResultRowType, QueryResultRowColumnType } from "slonik";
import { SqlxQuery } from "./SqlxQuery";
import { SqlxQueryOptions } from "./SqlxQueryOptions";
import { ValueProcessor } from "./ValueProcessor";

export type SqlxQueryMethod<T> = (
    target: CommonQueryMethodsType,
    sql: SqlxQuery,
    options?: SqlxQueryOptions
) => Promise<T>;

export type SqlxQueryMethods = {
    any: SqlxQueryMethod<QueryResultRowType[]>;
    anyFirst: SqlxQueryMethod<QueryResultRowColumnType[]>;
    many: SqlxQueryMethod<QueryResultRowType[]>;
    manyFirst: SqlxQueryMethod<QueryResultRowColumnType[]>;
    maybeOne: SqlxQueryMethod<QueryResultRowType | null>;
    maybeOneFirst: SqlxQueryMethod<QueryResultRowColumnType>;
    one: SqlxQueryMethod<QueryResultRowType>;
    oneFirst: SqlxQueryMethod<QueryResultRowColumnType>;
    query: SqlxQueryMethod<QueryResultRowType>;
};

export type Sqlx = SqlxQueryMethods & {
    (template: TemplateStringsArray, ...values: any[]): SqlxQuery;
    registerProcessor: (processor: ValueProcessor) => void;
};

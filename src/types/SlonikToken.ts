import {
    IdentifierTokenType,
    RawSqlTokenType,
    SqlSqlTokenType,
    TupleListSqlTokenType,
    TupleSqlTokenType,
    UnnestSqlTokenType,
    ValueListSqlTokenType,
} from "slonik";

export type SlonikToken =
    | IdentifierTokenType
    | RawSqlTokenType
    | SqlSqlTokenType
    | TupleListSqlTokenType
    | TupleSqlTokenType
    | UnnestSqlTokenType
    | ValueListSqlTokenType;

export const isSlonikToken = (value: any): value is SlonikToken => {
    // TODO [RM]: hacky
    return value && typeof value.type === "symbol" && value.type.toString().startsWith("Symbol(SLONIK");
};

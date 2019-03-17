import {
    IdentifierTokenType,
    RawSqlTokenType,
    SqlSqlTokenType,
    TupleListSqlTokenType,
    TupleSqlTokenType,
    UnnestSqlTokenType,
    ValueListSqlTokenType,
} from "slonik";
import {
    SqlTokenSymbol,
    RawSqlTokenSymbol,
    IdentifierTokenSymbol,
    ValueListTokenSymbol,
    TupleTokenSymbol,
    TupleListTokenSymbol,
    UnnestTokenSymbol,
} from "slonik/symbols";

const slonikSymbols = [
    SqlTokenSymbol,
    RawSqlTokenSymbol,
    IdentifierTokenSymbol,
    ValueListTokenSymbol,
    TupleTokenSymbol,
    TupleListTokenSymbol,
    UnnestTokenSymbol,
];

export type SlonikToken =
    | IdentifierTokenType
    | RawSqlTokenType
    | SqlSqlTokenType
    | TupleListSqlTokenType
    | TupleSqlTokenType
    | UnnestSqlTokenType
    | ValueListSqlTokenType;

export const isSlonikToken = (value: any): value is SlonikToken => {
    return slonikSymbols.some(q => q === value);
};

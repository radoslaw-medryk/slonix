import { IdentifierTokenType, RawSqlTokenType, SqlSqlTokenType, TupleListSqlTokenType, TupleSqlTokenType, UnnestSqlTokenType, ValueListSqlTokenType } from "slonik";
export declare type SlonikToken = IdentifierTokenType | RawSqlTokenType | SqlSqlTokenType | TupleListSqlTokenType | TupleSqlTokenType | UnnestSqlTokenType | ValueListSqlTokenType;
export declare const isSlonikToken: (value: any) => value is SlonikToken;
//# sourceMappingURL=SlonikToken.d.ts.map
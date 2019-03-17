import { IdentifierTokenType, sql } from "slonik";

export const tableDefinition = (tableName: string): IdentifierTokenType => {
    return sql.identifier([tableName]);
};

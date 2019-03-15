import { SqlxQuery, sqlxQuerySymbol } from "../types/SqlxQuery";
import { ValueExpressionType, sql, SqlSqlTokenType } from "slonik";
import { isSlonikToken } from "../types/SlonikToken";
import { SqlxQueryOptions } from "../types/SqlxQueryOptions";
import { SqlxStatic } from "../SqlxStatic";
import { processValue } from "./processValue";
import { wrapString } from "./wrapString";
import { escapeString } from "./escapeString";
import { ProcessedValue } from "../types/ProcessedValue";

const wrapStringIfNeeded = (processedValue: ProcessedValue): string => {
    return processedValue.wrapString ? wrapString(escapeString(processedValue.value)) : processedValue.value;
};

const isSqlxQuery = (value: any): value is SqlxQuery => {
    return !!value && value.type === sqlxQuerySymbol;
};

const handleValue = (value: any, options: SqlxQueryOptions): ValueExpressionType => {
    if (isSlonikToken(value)) {
        return value;
    }

    if (isSqlxQuery(value)) {
        return translateQuery(value, options);
    }

    const processedValue = processValue(value, SqlxStatic._processors);
    return options.usePreparedStatement ? processedValue.value : sql.raw(wrapStringIfNeeded(processedValue));
};

export const translateQuery = (query: SqlxQuery, options: SqlxQueryOptions): SqlSqlTokenType => {
    const handledValues = query.values.map(q => handleValue(q, options));
    return sql(query.template, ...handledValues);
};

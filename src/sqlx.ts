import { SqlSqlTokenType, ValueExpressionType, sql } from "slonik";
import { processValue } from "./processValue";
import { Sqlx } from "./SqlxClass";
import { escapeString } from "./escapeString";
import { wrapString } from "./wrapString";
import { ProcessedValue } from "./ProcessedValue";
import { isSlonikToken } from "./SlonikToken";

export type SqlxTemplateFunc = (template: TemplateStringsArray, ...values: any[]) => SqlSqlTokenType;

export type SqlxFunc = SqlxTemplateFunc & {
    noPrepared: SqlxTemplateFunc;
};

type SqlxOptions = {
    prepared: boolean;
};

const intoRaw = (options: SqlxOptions, processedValue: ProcessedValue) => {
    if (options.prepared) {
        return sql.raw(processedValue.value);
    }

    const value = processedValue.wrapString ? wrapString(escapeString(processedValue.value)) : processedValue.value;

    return sql.raw(value);
};

const handleValue = (options: SqlxOptions, value: any): ValueExpressionType => {
    if (isSlonikToken(value)) {
        return value;
    }

    const processedValue = processValue(value, Sqlx._processors);
    return intoRaw(options, processedValue);
};

const internalSqlx = (options: SqlxOptions, template: TemplateStringsArray, ...values: any[]): SqlSqlTokenType => {
    const handledValues = values.map(q => handleValue(options, q));
    return sql(template, ...handledValues);
};

const _sqlx: SqlxFunc = (template: TemplateStringsArray, ...values: any[]) => {
    const options: SqlxOptions = { prepared: true };
    return internalSqlx(options, template, ...values);
};

const noPrepared: SqlxTemplateFunc = (template: TemplateStringsArray, ...values: any[]) => {
    const options: SqlxOptions = { prepared: false };
    return internalSqlx(options, template, ...values);
};

_sqlx.noPrepared = noPrepared;
export const sqlx = _sqlx;

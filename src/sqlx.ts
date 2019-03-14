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

const intoRaw = (processedValue: ProcessedValue) => {
    const value = processedValue.wrapString ? wrapString(escapeString(processedValue.value)) : processedValue.value;

    return sql.raw(value);
};

const handleValue = (value: any): ValueExpressionType => {
    if (isSlonikToken(value)) {
        return value;
    }

    return intoRaw(processValue(value, Sqlx._processors));
};

const internalSqlx = (options: SqlxOptions, template: TemplateStringsArray, ...values: any[]): SqlSqlTokenType => {
    if (options.prepared !== false) {
        return sql(template, ...values);
    }

    const handledValues = values.map(value => handleValue(value));
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

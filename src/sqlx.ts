import { SqlxQuery, sqlxQuerySymbol } from "./types/SqlxQuery";
import { CommonQueryMethodsType, TaggedTemplateLiteralInvocationType } from "slonik";
import { translateQuery } from "./processing/translateQuery";
import { SqlxStatic } from "./SqlxStatic";
import { SqlxQueryMethod, Sqlx } from "./types/Sqlx";

type TargetFunc<T> = (sql: TaggedTemplateLiteralInvocationType) => Promise<T>;
type TargetSelectFunc<T> = (target: CommonQueryMethodsType) => TargetFunc<T>;

const wrapper = <T>(targetSelectFunc: TargetSelectFunc<T>): SqlxQueryMethod<T> => {
    return (target, query, options) => {
        options = options || {
            usePreparedStatement: true,
        };

        const translatedQuery = translateQuery(query, options);
        const targetFunc = targetSelectFunc(target);
        return targetFunc(translatedQuery);
    };
};

const _sqlx: Partial<Sqlx> = (template: TemplateStringsArray, ...values: any[]): SqlxQuery => {
    return {
        type: sqlxQuerySymbol,
        template: template,
        values: values,
    };
};

_sqlx.registerProcessor = SqlxStatic.registerProcessor;
_sqlx.any = wrapper(target => target.any);
_sqlx.anyFirst = wrapper(target => target.anyFirst);
_sqlx.many = wrapper(target => target.many);
_sqlx.manyFirst = wrapper(target => target.manyFirst);
_sqlx.maybeOne = wrapper(target => target.maybeOne);
_sqlx.maybeOneFirst = wrapper(target => target.maybeOneFirst);
_sqlx.oneFirst = wrapper(target => target.oneFirst);
_sqlx.query = wrapper(target => target.query);

export const sqlx = _sqlx as Sqlx;

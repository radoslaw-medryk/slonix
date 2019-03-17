"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SqlxQuery_1 = require("./types/SqlxQuery");
const translateQuery_1 = require("./processing/translateQuery");
const SqlxStatic_1 = require("./SqlxStatic");
const wrapper = (targetSelectFunc) => {
    return (target, query, options) => {
        options = options || {
            usePreparedStatement: true,
        };
        const translatedQuery = translateQuery_1.translateQuery(query, options);
        const targetFunc = targetSelectFunc(target);
        return targetFunc(translatedQuery);
    };
};
const _sqlx = (template, ...values) => {
    return {
        type: SqlxQuery_1.sqlxQuerySymbol,
        template: template,
        values: values,
    };
};
_sqlx.registerProcessor = SqlxStatic_1.SqlxStatic.registerProcessor;
_sqlx.any = wrapper(target => target.any);
_sqlx.anyFirst = wrapper(target => target.anyFirst);
_sqlx.many = wrapper(target => target.many);
_sqlx.manyFirst = wrapper(target => target.manyFirst);
_sqlx.maybeOne = wrapper(target => target.maybeOne);
_sqlx.maybeOneFirst = wrapper(target => target.maybeOneFirst);
_sqlx.oneFirst = wrapper(target => target.oneFirst);
_sqlx.query = wrapper(target => target.query);
exports.sqlx = _sqlx;
//# sourceMappingURL=sqlx.js.map
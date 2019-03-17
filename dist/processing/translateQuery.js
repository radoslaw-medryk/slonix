"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SqlxQuery_1 = require("../types/SqlxQuery");
const slonik_1 = require("slonik");
const SlonikToken_1 = require("../types/SlonikToken");
const SqlxStatic_1 = require("../SqlxStatic");
const processValue_1 = require("./processValue");
const wrapString_1 = require("./wrapString");
const escapeString_1 = require("./escapeString");
const wrapStringIfNeeded = (processedValue) => {
    return processedValue.wrapString ? wrapString_1.wrapString(escapeString_1.escapeString(processedValue.value)) : processedValue.value;
};
const isSqlxQuery = (value) => {
    return !!value && value.type === SqlxQuery_1.sqlxQuerySymbol;
};
const handleValue = (value, options) => {
    if (SlonikToken_1.isSlonikToken(value)) {
        return value;
    }
    if (isSqlxQuery(value)) {
        return exports.translateQuery(value, options);
    }
    const processedValue = processValue_1.processValue(value, SqlxStatic_1.SqlxStatic._processors);
    return options.usePreparedStatement ? processedValue.value : slonik_1.sql.raw(wrapStringIfNeeded(processedValue));
};
exports.translateQuery = (query, options) => {
    const handledValues = query.values.map(q => handleValue(q, options));
    return slonik_1.sql(query.template, ...handledValues);
};
//# sourceMappingURL=translateQuery.js.map
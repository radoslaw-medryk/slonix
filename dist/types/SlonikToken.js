"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("slonik/symbols");
const slonikSymbols = [
    symbols_1.SqlTokenSymbol,
    symbols_1.RawSqlTokenSymbol,
    symbols_1.IdentifierTokenSymbol,
    symbols_1.ValueListTokenSymbol,
    symbols_1.TupleTokenSymbol,
    symbols_1.TupleListTokenSymbol,
    symbols_1.UnnestTokenSymbol,
];
exports.isSlonikToken = (value) => {
    return slonikSymbols.some(q => q === value);
};
//# sourceMappingURL=SlonikToken.js.map
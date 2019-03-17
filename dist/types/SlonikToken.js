"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSlonikToken = (value) => {
    // TODO [RM]: hacky
    return value && value.type instanceof Symbol && value.type.toString().startsWith("Symbol(SLONIK");
};
//# sourceMappingURL=SlonikToken.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSlonikToken = (value) => {
    // TODO [RM]: hacky
    return value && value instanceof Symbol && value.toString().startsWith("Symbol(SLONIK");
};
//# sourceMappingURL=SlonikToken.js.map
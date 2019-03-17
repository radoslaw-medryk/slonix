"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSlonikToken = (value) => {
    // TODO [RM]: hacky
    return value && typeof value.type === "symbol" && value.type.toString().startsWith("Symbol(SLONIK");
};
//# sourceMappingURL=SlonikToken.js.map
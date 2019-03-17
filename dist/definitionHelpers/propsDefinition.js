"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slonik_1 = require("slonik");
exports.propsDefinition = (modelConstructorOrInstance) => {
    const model = typeof modelConstructorOrInstance === "function"
        ? new modelConstructorOrInstance()
        : modelConstructorOrInstance;
    const result = {};
    // tslint:disable-next-line:forin
    for (const key in model) {
        result[key] = slonik_1.sql.identifier([key]);
    }
    return result;
};
//# sourceMappingURL=propsDefinition.js.map
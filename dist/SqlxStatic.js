"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SqlxStatic {
}
SqlxStatic._processors = [];
SqlxStatic.registerProcessor = (processor) => {
    if (!processor) {
        throw new Error("!processor");
    }
    SqlxStatic._processors = [...SqlxStatic._processors, processor];
};
exports.SqlxStatic = SqlxStatic;
//# sourceMappingURL=SqlxStatic.js.map
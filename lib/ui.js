"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fatal = void 0;
function fatal(message) {
    console.error(message);
    process.exit(42);
}
exports.fatal = fatal;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDisconnectable = exports.isConnectable = void 0;
function isConnectable(object) {
    return "connect" in object;
}
exports.isConnectable = isConnectable;
function isDisconnectable(object) {
    return "disconnect" in object;
}
exports.isDisconnectable = isDisconnectable;
//# sourceMappingURL=utilities.js.map
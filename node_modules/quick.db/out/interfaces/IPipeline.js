"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCachedPipeline = void 0;
function isCachedPipeline(pipeline) {
    return "getCacheValue" in pipeline && "setCacheValue" in pipeline;
}
exports.isCachedPipeline = isCachedPipeline;
//# sourceMappingURL=IPipeline.js.map
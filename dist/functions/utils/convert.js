"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToRgb = void 0;
function hexToRgb(color) {
    if (color.startsWith("#")) {
        return parseInt(color.slice(1), 16);
    }
    return parseInt(color, 16);
}
exports.hexToRgb = hexToRgb;

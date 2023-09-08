"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brBuilder = exports.zeroPad = void 0;
function zeroPad(number) {
    return number < 10 ? String(number) : `0${number}`;
}
exports.zeroPad = zeroPad;
function brBuilder(...text) {
    return text.join("\n");
}
exports.brBuilder = brBuilder;

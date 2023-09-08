"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCrash = void 0;
const chalk_1 = require("chalk");
function onCrash(...errors) {
    console.error((0, chalk_1.gray)("[Anti Crash] "), (0, chalk_1.red)(errors.join("\n")));
}
exports.onCrash = onCrash;

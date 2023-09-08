"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const functions_1 = require("../../functions");
const base_1 = require("../base");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
exports.default = new base_1.Event({
    name: "ready",
    once: true,
    async run(client) {
        await (0, functions_1.sleep)(2000);
        console.log(chalk_1.default.greenBright.underline("\n✓ Everything is working correctly!"));
    },
});

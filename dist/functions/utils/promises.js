"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
var promises_1 = require("node:timers/promises");
Object.defineProperty(exports, "sleep", { enumerable: true, get: function () { return promises_1.setTimeout; } });

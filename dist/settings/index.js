"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEnv = exports.settings = void 0;
const tslib_1 = require("tslib");
const settings_json_1 = tslib_1.__importDefault(require("./settings.json"));
exports.settings = settings_json_1.default;
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const fs_1 = require("fs");
const path_1 = require("path");
const rootDir = process.cwd();
const developmentEnvPath = (0, path_1.resolve)(rootDir, ".env.development");
const { parsed: parsedEnv } = dotenv_1.default.config({
    path: (0, fs_1.existsSync)(developmentEnvPath) ? developmentEnvPath : (0, path_1.resolve)(rootDir, ".env")
});
const processEnv = parsedEnv;
exports.processEnv = processEnv;

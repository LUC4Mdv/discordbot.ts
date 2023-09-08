"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./discord/base");
const functions_1 = require("./functions");
const client = new base_1.ExtendedClient();
client.start();
process.on("uncaughtException", functions_1.onCrash);
process.on("unhandledRejection", functions_1.onCrash);

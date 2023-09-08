"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModalInput = exports.createLinkButton = exports.createRow = void 0;
const discord_js_1 = require("discord.js");
function createRow(...components) {
    return new discord_js_1.ActionRowBuilder({ components });
}
exports.createRow = createRow;
function createLinkButton(data) {
    return new discord_js_1.ButtonBuilder({ style: discord_js_1.ButtonStyle.Link, ...data });
}
exports.createLinkButton = createLinkButton;
function createModalInput(input) {
    return new discord_js_1.ActionRowBuilder({ components: [new discord_js_1.TextInputBuilder(input)] });
}
exports.createModalInput = createModalInput;

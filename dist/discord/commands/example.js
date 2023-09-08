"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
const discord_js_1 = require("discord.js");
exports.default = new base_1.Command({
    name: "example",
    description: "Example command",
    dmPermission: false,
    type: discord_js_1.ApplicationCommandType.ChatInput,
    async run({ interaction }) {
        interaction.reply({ ephemeral: true, content: "This is a example command!" });
    }
});

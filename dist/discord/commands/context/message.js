"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const discord_js_1 = require("discord.js");
exports.default = new base_1.Command({
    name: "uppercase",
    dmPermission: false,
    type: discord_js_1.ApplicationCommandType.Message,
    async run({ interaction }) {
        const { targetMessage } = interaction;
        interaction.reply({ ephemeral: true,
            content: targetMessage.content.toUpperCase()
        });
    }
});

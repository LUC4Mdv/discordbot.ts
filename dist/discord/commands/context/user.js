"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const functions_1 = require("../../../functions");
const settings_1 = require("../../../settings");
const discord_js_1 = require("discord.js");
exports.default = new base_1.Command({
    name: "avatar",
    dmPermission: false,
    type: discord_js_1.ApplicationCommandType.User,
    async run({ interaction }) {
        const { targetMember } = interaction;
        interaction.reply({ ephemeral: true,
            embeds: [new discord_js_1.EmbedBuilder({
                    author: { name: `Avatar de ${targetMember.displayName}` },
                    image: { url: targetMember.displayAvatarURL({ size: 1024 }) },
                    color: (0, functions_1.hexToRgb)(settings_1.settings.colors.theme.primary)
                })]
        });
    }
});

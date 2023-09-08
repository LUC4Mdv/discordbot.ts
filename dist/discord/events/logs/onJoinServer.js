"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const functions_1 = require("../../../functions");
const settings_1 = require("../../../settings");
const discord_js_1 = require("discord.js");
const channelId = "1149522372102205441";
exports.default = new base_1.Event({
    name: "guildMemberAdd",
    run(client, member) {
        const channel = member.guild.channels.cache.get(channelId);
        const memberAvatarUrl = member.displayAvatarURL({ size: 512 });
        channel.send({
            embeds: [new discord_js_1.EmbedBuilder({
                    color: (0, functions_1.hexToRgb)(settings_1.settings.colors.theme.success),
                    author: {
                        name: `${member.displayName} entrou no servidor!`,
                        iconURL: memberAvatarUrl
                    },
                    thumbnail: { url: memberAvatarUrl },
                    description: (0, functions_1.brBuilder)(`💚 ${member} acabou de entrar no servidor`, (0, discord_js_1.time)(new Date(), "f"))
                })]
        });
    },
});

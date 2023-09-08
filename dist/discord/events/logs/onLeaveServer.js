"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const functions_1 = require("../../../functions");
const settings_1 = require("../../../settings");
const discord_js_1 = require("discord.js");
const channelId = "1148466995872931860";
exports.default = new base_1.Event({
    name: "guildMemberRemove",
    run(client, member) {
        const channel = member.guild.channels.cache.get(channelId);
        const memberAvatarUrl = member.displayAvatarURL({ size: 512 });
        channel.send({
            embeds: [new discord_js_1.EmbedBuilder({
                    color: (0, functions_1.hexToRgb)(settings_1.settings.colors.theme.danger),
                    author: {
                        name: `${member.displayName} saiu do servidor!`,
                        iconURL: memberAvatarUrl
                    },
                    thumbnail: { url: memberAvatarUrl },
                    description: (0, functions_1.brBuilder)(`💔 ${member} acabou de sair do servidor`, (0, discord_js_1.time)(new Date(), "f"))
                })]
        });
    },
});

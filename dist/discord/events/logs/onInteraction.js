"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const discord_js_1 = require("discord.js");
const logsChannelId = "1141944937361977438";
exports.default = new base_1.Event({
    name: "interactionCreate",
    async run(client, interaction) {
        if (!interaction.inCachedGuild())
            return;
        if (interaction.isCommand()) {
            const logsChannel = interaction.guild.channels.cache.get(logsChannelId);
            if (!logsChannel?.isTextBased())
                return;
            const { channel, user, commandName, createdAt, commandType } = interaction;
            const emoji = ["⌨️", "👤", "✉️"];
            const text = [
                "usou o comando",
                "usou o contexto de usuário",
                "usou o contexto de mensagem"
            ];
            let content = `${emoji[commandType - 1]} ${(0, discord_js_1.time)(createdAt, "R")}`;
            content += `**@${user.username}** `;
            content += `__${text[commandType - 1]}__ `;
            content += `\`${commandName}\` `;
            if (channel)
                content += `em ${channel.url}`;
            logsChannel.send({ content });
            return;
        }
    },
});

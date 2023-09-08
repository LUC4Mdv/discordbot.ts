"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const discord_js_1 = require("discord.js");
exports.default = new base_1.Command({
    name: "say",
    description: "say command",
    dmPermission: false,
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "text",
            description: "some text",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        }
    ],
    async run({ interaction }) {
        const { options, channel } = interaction;
        await interaction.deferReply({ ephemeral: true });
        if (!channel?.isTextBased()) {
            interaction.editReply({ content: "Não é possível enviar mensagens neste canal!" });
            return;
        }
        const content = options.getString("text", true);
        channel.send({ content });
        interaction.editReply({ content: "Mensagem enviada! " });
    },
});

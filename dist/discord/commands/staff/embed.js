"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const functions_1 = require("../../functions");
const functions_2 = require("../../../functions");
const settings_1 = require("../../../settings");
const discord_js_1 = require("discord.js");
exports.default = new base_1.Command({
    name: "embed",
    description: "Cria um embed",
    dmPermission: false,
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "título",
            description: "Título do embed",
            type: discord_js_1.ApplicationCommandOptionType.String,
        },
        {
            name: "descrição",
            description: "Descrição do embed",
            type: discord_js_1.ApplicationCommandOptionType.String,
        },
        {
            name: "cor",
            description: "Cor da embed. (Ex: #22c55e)",
            type: discord_js_1.ApplicationCommandOptionType.String,
        },
        {
            name: "autor",
            description: "Autor do embed",
            type: discord_js_1.ApplicationCommandOptionType.User,
        }
    ],
    async run({ interaction }) {
        const { options, channel } = interaction;
        await interaction.deferReply({ ephemeral: true, fetchReply: true });
        if (!channel?.isTextBased()) {
            interaction.editReply({ content: "Não é possível utilizar este comando nesse canal!" });
            return;
        }
        const title = options.getString("título");
        const description = options.getString("descrição");
        const color = options.getString("cor");
        const mention = options.getUser("autor");
        const author = mention ? { name: mention.username, iconURL: mention.displayAvatarURL() } : undefined;
        if (!title && !description) {
            interaction.editReply({
                content: "É necessário pelo menos especificar o título ou a descrição do embed!"
            });
            return;
        }
        if (title && title.length > 256) {
            interaction.editReply({
                content: (0, functions_2.brBuilder)("O título do embed deve ter no máximo 256 caracters!", `O título que você enviou tem ${title.length} caracteres!`)
            });
            return;
        }
        if (description && description.length > 4096) {
            interaction.editReply({
                content: (0, functions_2.brBuilder)("A descrição do embed deve ter no máximo 4096 caracters!", `A descrição que você enviou tem ${description.length} caracteres!`)
            });
            return;
        }
        const embed = new discord_js_1.EmbedBuilder({ author, color: (0, functions_2.hexToRgb)(settings_1.settings.colors.theme.default) });
        try {
            embed
                .setTitle(title)
                .setDescription(description);
            (color) && embed.setColor(color);
        }
        catch (err) {
            interaction.editReply({
                content: (0, functions_2.brBuilder)("Não foi possível criar o embed", (0, discord_js_1.codeBlock)("ts", err))
            });
            return;
        }
        const message = await interaction.editReply({
            embeds: [embed, new discord_js_1.EmbedBuilder({
                    description: "Deseja enviar a mensagem nesse canal?",
                    color: (0, functions_2.hexToRgb)(settings_1.settings.colors.theme.default)
                })],
            components: [(0, functions_1.createRow)(new discord_js_1.ButtonBuilder({ customId: "embed-confirm-button", label: "Confirmar", style: discord_js_1.ButtonStyle.Success }), new discord_js_1.ButtonBuilder({ customId: "embed-cancel-button", label: "Cancelar", style: discord_js_1.ButtonStyle.Danger }))]
        });
        const collector = message.createMessageComponentCollector({ componentType: discord_js_1.ComponentType.Button });
        collector.on("collect", async (subInteraction) => {
            collector.stop();
            const clearData = { components: [], embeds: [], };
            if (subInteraction.customId == "embed-cancel-button") {
                subInteraction.update({ ...clearData,
                    embeds: [new discord_js_1.EmbedBuilder({
                            description: "Você cancelou a ação!",
                            color: (0, functions_2.hexToRgb)(settings_1.settings.colors.theme.default)
                        })]
                });
                return;
            }
            channel.send({ embeds: [embed] })
                .then(msg => subInteraction.update({ ...clearData,
                content: `Mensagem enviada: ${msg.url}`
            }))
                .catch(err => subInteraction.update({ ...clearData,
                content: (0, functions_2.brBuilder)("Não foi possível enviar a mensagem com o embed", (0, discord_js_1.codeBlock)(err))
            }));
        });
    }
});

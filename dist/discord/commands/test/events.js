"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../base");
const discord_js_1 = require("discord.js");
exports.default = new base_1.Command({
    name: "events",
    description: "Emit a discord.js event",
    dmPermission: false,
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: discord_js_1.Events.GuildMemberAdd.toLowerCase(),
            description: `Emit a ${discord_js_1.Events.GuildMemberAdd} event`,
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "Select a member",
                    type: discord_js_1.ApplicationCommandOptionType.User,
                    required: true,
                }
            ]
        },
        {
            name: discord_js_1.Events.GuildMemberRemove.toLowerCase(),
            description: `Emit a ${discord_js_1.Events.GuildMemberRemove} event`,
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "member",
                    description: "Select a member",
                    type: discord_js_1.ApplicationCommandOptionType.User,
                    required: true,
                }
            ]
        }
    ],
    async run({ interaction, client }) {
        const { options } = interaction;
        const selectedEvent = options.getSubcommand(true);
        switch (selectedEvent) {
            case discord_js_1.Events.GuildMemberAdd.toLocaleLowerCase(): {
                const mention = options.getMember("member");
                client.emit("guildMemberAdd", mention);
                interaction.reply({ ephemeral: true,
                    content: "guildMemberAdd event emited"
                });
                return;
            }
            case discord_js_1.Events.GuildMemberRemove.toLowerCase(): {
                const mention = options.getMember("member");
                client.emit("guildMemberRemove", mention);
                interaction.reply({ ephemeral: true,
                    content: "$guildMemberRemove event emited"
                });
                return;
            }
        }
    }
});

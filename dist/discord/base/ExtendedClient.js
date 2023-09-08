"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const glob_1 = require("glob");
const path_1 = require("path");
const Command_1 = require("./Command");
const Components_1 = require("./Components");
const Event_1 = require("./Event");
const settings_1 = require("../../settings");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const functions_1 = require("../../functions");
class ExtendedClient extends discord_js_1.Client {
    Commands = new discord_js_1.Collection();
    Buttons = new discord_js_1.Collection();
    StringSelects = new discord_js_1.Collection();
    RoleSelect = new discord_js_1.Collection();
    ChannelSelects = new discord_js_1.Collection();
    UserSelects = new discord_js_1.Collection();
    MentionableSelects = new discord_js_1.Collection();
    Modals = new discord_js_1.Collection();
    constructor() {
        super({
            intents: Object.keys(discord_js_1.IntentsBitField.Flags),
            partials: [discord_js_1.Partials.Channel, discord_js_1.Partials.GuildMember, discord_js_1.Partials.Message, discord_js_1.Partials.User, discord_js_1.Partials.ThreadMember],
            failIfNotExists: false,
        });
        const { BOT_TOKEN } = settings_1.processEnv;
        if (!BOT_TOKEN) {
            throw new Error("TOKEN is undefined!");
        }
    }
    async start() {
        await this.loadEvents();
        await this.loadComponents();
        await this.loadCommands();
        this.login(process.env.BOT_TOKEN);
        this.on("interactionCreate", this.registerListeners);
        this.once("ready", this.whenReady);
    }
    async loadCommands() {
        const commandsDir = (0, path_1.join)(__dirname, "../commands");
        const paths = await getFiles(commandsDir);
        const messages = [chalk_1.default.bgBlue(" Commands ")];
        for (const path of paths) {
            const { default: command } = await Promise.resolve(`${(0, path_1.join)(commandsDir, path)}`).then(s => tslib_1.__importStar(require(s)));
            if (!(command instanceof Command_1.Command)) {
                messages.push(chalk_1.default.italic.yellow(`! "${path}" file is not exporting a`, chalk_1.default.green("Command")));
                continue;
            }
            this.Commands.set(command.data.name, command.data);
            messages.push(`${chalk_1.default.green("✓")} ${chalk_1.default.blue.underline(path)} ${chalk_1.default.green(`registered as ${chalk_1.default.cyan(command.data.name)}`)}`);
            if (command.data.components) {
                command.data.components.forEach(c => this.saveComponent(c));
            }
        }
        console.log(messages.join("\n"));
    }
    async loadEvents() {
        const eventsDir = (0, path_1.join)(__dirname, "../events");
        const paths = await getFiles(eventsDir);
        const messages = [chalk_1.default.bgYellow.black(" Events ")];
        for (const path of paths) {
            const { default: event } = await Promise.resolve(`${(0, path_1.join)(eventsDir, path)}`).then(s => tslib_1.__importStar(require(s)));
            if (!(event instanceof Event_1.Event)) {
                messages.push(chalk_1.default.italic.yellow(`! "${path}" file is not exporting a`, chalk_1.default.green("Event")));
                continue;
            }
            const client = this;
            const { name, run, once } = event.data;
            if (once) {
                this.once(name, (...args) => run(client, ...args));
            }
            else {
                this.on(name, (...args) => run(client, ...args));
            }
            messages.push(`${chalk_1.default.green("✓")} ${chalk_1.default.yellow.underline(path)} ${chalk_1.default.green(`registered as ${chalk_1.default.cyan(event.data.name)}`)}`);
        }
        console.log(messages.join("\n"));
    }
    async loadComponents() {
        const componentsDir = (0, path_1.join)(__dirname, "../components");
        const paths = await getFiles(componentsDir);
        const messages = [chalk_1.default.bgGreenBright.black(" Components ")];
        for (const path of paths) {
            const { default: component } = await Promise.resolve(`${(0, path_1.join)(componentsDir, path)}`).then(s => tslib_1.__importStar(require(s)));
            if (!(component instanceof Components_1.Component)) {
                messages.push(chalk_1.default.italic.yellow(`! "${path}" file is not exporting a`, chalk_1.default.green("Component")));
                continue;
            }
            this.saveComponent(component);
            messages.push(`${chalk_1.default.green("✓")} ${chalk_1.default.greenBright.underline(path)} ${chalk_1.default.green(`registered as ${chalk_1.default.cyan(component.data.customId)}`)}`);
        }
        console.log(messages.join("\n"));
    }
    async saveComponent({ data: component }) {
        switch (component.type) {
            case "Button":
                this.Buttons.set(component.customId, component);
                break;
            case "StringSelect":
                this.StringSelects.set(component.customId, component);
                break;
            case "RoleSelect":
                this.RoleSelect.set(component.customId, component);
                break;
            case "ChannelSelect":
                this.ChannelSelects.set(component.customId, component);
                break;
            case "UserSelect":
                this.UserSelects.set(component.customId, component);
                break;
            case "MentionableSelect":
                this.MentionableSelects.set(component.customId, component);
                break;
            case "Modal":
                this.Modals.set(component.customId, component);
                break;
        }
    }
    async registerListeners(interaction) {
        if (interaction.isCommand())
            this.onCommand(interaction);
        if (interaction.isAutocomplete())
            this.onAutoComplete(interaction);
        if (interaction.isModalSubmit()) {
            this.Modals.get(interaction.customId)?.run(interaction);
            return;
        }
        if (interaction.isMessageComponent()) {
            switch (interaction.componentType) {
                case discord_js_1.ComponentType.Button:
                    this.Buttons.get(interaction.customId)?.run(interaction);
                    break;
                case discord_js_1.ComponentType.StringSelect:
                    this.StringSelects.get(interaction.customId)?.run(interaction);
                    break;
                case discord_js_1.ComponentType.UserSelect:
                    this.UserSelects.get(interaction.customId)?.run(interaction);
                    break;
                case discord_js_1.ComponentType.RoleSelect:
                    this.RoleSelect.get(interaction.customId)?.run(interaction);
                    break;
                case discord_js_1.ComponentType.MentionableSelect:
                    this.MentionableSelects.get(interaction.customId)?.run(interaction);
                    break;
                case discord_js_1.ComponentType.ChannelSelect:
                    this.ChannelSelects.get(interaction.customId)?.run(interaction);
                    break;
            }
            return;
        }
    }
    onAutoComplete(autoCompleteInteraction) {
        const command = this.Commands.get(autoCompleteInteraction.commandName);
        const client = this;
        const interaction = autoCompleteInteraction;
        if (command?.type == discord_js_1.ApplicationCommandType.ChatInput && command.autoComplete) {
            command.autoComplete({ client, interaction });
        }
    }
    async onCommand(commandInteraction) {
        const command = this.Commands.get(commandInteraction.commandName);
        const client = this;
        switch (command?.type) {
            case discord_js_1.ApplicationCommandType.ChatInput: {
                const interaction = commandInteraction;
                command.run({ interaction, client });
                return;
            }
            case discord_js_1.ApplicationCommandType.Message: {
                const interaction = commandInteraction;
                command.run({ interaction, client });
                return;
            }
            case discord_js_1.ApplicationCommandType.User: {
                const interaction = commandInteraction;
                command.run({ interaction, client });
                return;
            }
        }
    }
    async whenReady(client) {
        const messages = [];
        messages.push(`${chalk_1.default.green("✓ Bot online")} ${chalk_1.default.blue.underline("discord.js")} 📦 ${chalk_1.default.yellow(discord_js_1.version)}`, `${chalk_1.default.greenBright(`➝ Connected with ${chalk_1.default.underline(client.user.username)}`)}`);
        await client.application.commands.set(Array.from(this.Commands.values()))
            .then((c) => messages.push(`${chalk_1.default.cyan("⟨ / ⟩")} ${chalk_1.default.green(`${c.size} commands defined successfully!`)}`))
            .catch(({ message }) => messages.push((0, functions_1.brBuilder)("", chalk_1.default.bgRed.white(" ✗ An error occurred while trying to set the commands "), chalk_1.default.red("Message:", message))));
        console.log((0, functions_1.brBuilder)("", ...messages));
    }
}
exports.ExtendedClient = ExtendedClient;
async function getFiles(filesDirectory) {
    return await (0, glob_1.glob)("**/*.{ts,js}", { cwd: filesDirectory });
}

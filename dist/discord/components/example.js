"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../base");
exports.default = new base_1.Component({
    customId: "example-component-button",
    type: "Button", cache: "cached",
    async run(interaction) {
        interaction.reply({ ephemeral: true, content: "This is a button component!" });
    },
});

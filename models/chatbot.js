const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatBotSchema = new Schema({
    greeting: Array,
    letsWrite: Array,
    whichTag: Array,
    otherThings: Array,
    inspireMe: Array,
    inspireQuotes: Array,
    positiveM: Array,
    goodbye: Array,

}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const chatBot = mongoose.model("chatBot", chatBotSchema);

module.exports = chatBot;
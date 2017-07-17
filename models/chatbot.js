const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatBotSchema = new Schema({
    greeting: Array,
    messages: Array

}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const chatBot = mongoose.model("chatBot", chatBotSchema);

module.exports = chatBot;
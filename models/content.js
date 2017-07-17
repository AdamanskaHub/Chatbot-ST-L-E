const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
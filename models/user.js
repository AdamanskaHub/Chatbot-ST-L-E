const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    name: String,
    password: String,
    firstTime: { type: Boolean, default: true },
    // CHANGE DEFAULT TO TRUE !!!!!!
    selfTalkMessages: Array
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
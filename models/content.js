const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    ChatbotMessages: String,
    UserAnswers: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    // role: {
    // 	type: String,
    // 	enum : ['EDITOR', 'ADMIN'],
    // 	default : 'ADMIN'
    // }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
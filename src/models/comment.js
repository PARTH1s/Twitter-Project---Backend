import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        // The text content of the comment
        content: {
            type: String,
            required: true,
        },
        // Reference to the user who made the comment
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // The model type this comment is associated with (e.g., Tweet or Comment for nested comments)
        onModel: {
            type: String,
            required: true,
            enum: ["Tweet", "Comment"],
        },
        // The ID of the document (Tweet or Comment) this comment is attached to
        commentable: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "onModel",
            required: true,
        },
        // Array of replies (nested comments) referencing other Comment documents
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

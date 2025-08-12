import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    // Reference to the liked document (Tweet or Comment)
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    // The model type of the liked document
    onModel: {
      type: String,
      required: true,
      enum: ["Tweet", "Comment"],
    },
    // Reference to the user who liked the document
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

export default Like;

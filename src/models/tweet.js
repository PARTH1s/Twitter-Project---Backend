import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    // Text content of the tweet (max 250 chars)
    content: {
      type: String,
      required: true,
      maxlength: [250, "Tweet cannot be more than 250 characters."],
      trim: true,
    },
    // Array of references to likes on this tweet
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;

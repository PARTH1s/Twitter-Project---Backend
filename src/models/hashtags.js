import mongoose from "mongoose";

const hashtagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, 
      trim: true 
    },
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
  },
  { timestamps: true }
);

// Removed faulty pre-save hook and used built-in lowercase option instead

const Hashtag = mongoose.model('Hashtag', hashtagSchema);

export default Hashtag;

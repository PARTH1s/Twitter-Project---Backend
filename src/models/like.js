import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    likeable: {                     // <- the thing being liked
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {                      // <- type of the liked model
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },
    user: {                         // <- user who liked it
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);
export default Like;

import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    onModel: {
        type: String,
        required: true,
        enum:['Tweet','Comment']
    },
    userEmail : {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        req:'User',
        required:true
    }
}, {timestamps: true});

const Like = mongoose.model('Like', likeSchema); 
export default Like;

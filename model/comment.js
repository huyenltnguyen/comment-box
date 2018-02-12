import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: String,
  text: String
});

export default mongoose.model('Comment', commentSchema);
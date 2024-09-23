import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:String,
    description: String,
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
});


const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

module.exports = Blog;
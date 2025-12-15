import Post from "../models/post.model.js"

//get all posts
export const getAllPosts=async(req,res)=>{
    try {
      const posts=await Post.find().sort({createdAt:-1})
      if(!posts){
        return res.status(404).json({message:"No posts found"})
      }
      return res.status(200).json({posts})  
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}
//create post

export const createPost=async(req,res)=>{
const { title, content } = req.body;

if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
}

const post = await Post.create({ title, content });

return res.status(201).json({ post });
}

// Search Posts
export const searchPosts=async(req,res)=>{
  const { query } = req.query;

  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};



// get single post

export const getSinglePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        return res.status(200).json({post})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}
//update post
export const updatePost=async(req,res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true},{runValidators:true})
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        return res.status(200).json({post})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}

//delete post
export const deletePost=async(req,res)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        return res.status(200).json({message:"Post deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
}
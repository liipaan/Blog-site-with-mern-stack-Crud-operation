import{Router} from "express"
import { getAllPosts ,createPost,getSinglePost, updatePost, deletePost, searchPosts} from "../controllers/post.controller.js"

const router=Router()
router.get("/",getAllPosts)
router.post("/create",createPost)
router.get("/:id",getSinglePost)
router.put("/:id",updatePost)
router.delete("/:id",deletePost)
router.get("/search",searchPosts)
export default router
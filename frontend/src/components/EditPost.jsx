import { Check, ChevronLeft, Save, X } from "lucide-react"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { editPost, getPost } from "../../redux/postSlice"

const EditPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
const [errors, setErrors] = useState({
    title: "",
    content: "",
  });
  const post = useSelector((state) => state.posts.post)

  const [postEdit, setPostEdit] = useState({
    title: "",
    content: "",
  })
  useEffect(() => {
    dispatch(getPost(id))
  }, [dispatch, id])

  useEffect(() => {
    if (post) {
      setPostEdit({
        title: post.title || "",
        content: post.content || "",
      })
    }
  }, [post])
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(editPost({ id, data: postEdit }))
    navigate("/")
  }

  return (
    <div className="container max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-2xl font-medium text-slate-500 mb-4">
        Edit your Post
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm text-slate-500 mb-2">
              Title *
            </label>
            <input
              value={postEdit.title}
              onChange={(e) =>
                setPostEdit({ ...postEdit, title: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm text-slate-500 mb-2">
              Content *
            </label>
            <textarea
              value={postEdit.content}
              onChange={(e) =>
                setPostEdit({ ...postEdit, content: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md h-40"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>

          <div  className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
                 className="w-full sm:w-auto px-4 py-2 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-300"
            >
              <span className="flex items-center">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Cancel
              </span>
            </button>

            <button
              type="submit"
             className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <span className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Save
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost

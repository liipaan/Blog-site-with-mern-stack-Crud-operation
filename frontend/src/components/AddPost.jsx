import { ChevronLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../redux/postSlice";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [posts, setPosts] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      title: posts.title.trim() ? "" : "Title is required",
      content: posts.content.trim() ? "" : "Content is required",
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.content) return;

    dispatch(addPost(posts));
    navigate("/");
  };

  return (
    <div className="container max-w-2xl mx-auto px-6 py-20">
      <div className="flex flex-col mb-6 text-center">
        <h1 className="text-2xl font-medium text-slate-500 mb-2">
          Add New Post
        </h1>
        <p className="text-sm text-slate-500">
          Share your thoughts and experiences
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <form onSubmit={handleSubmit}>
          {/* TITLE */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-500 mb-2">
              Title *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your title"
              value={posts.title}
              onChange={(e) =>
                setPosts({ ...posts, title: e.target.value })
              }
            />
            {errors.title && (
              <p className="text-red-500 mt-2">{errors.title}</p>
            )}
          </div>

          {/* CONTENT */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-500 mb-2">
              Content *
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your content"
              value={posts.content}
              onChange={(e) =>
                setPosts({ ...posts, content: e.target.value })
              }
            />
            {errors.content && (
              <p className="text-red-500 mt-2">{errors.content}</p>
            )}
          </div>

          <hr className="my-6 text-slate-300" />

          {/* BUTTONS */}
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
                <Plus className="w-5 h-5 mr-2" />
                Add Post
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;

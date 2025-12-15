import {  ArrowRightIcon, LucideTrash2 } from "lucide-react"
import { Link } from "react-router-dom"
import moment from "moment"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getPost, fetchPosts, deletePost } from "../../redux/postSlice";
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
const HomeCard = ({post}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPost(post._id))
    dispatch(fetchPosts())
  }, [dispatch])

  const handleDelete = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this post?",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deletePost(post._id))
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    })
  }
  return (
  
           <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 mb-4 overflow-hidden">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
        <button 
          className="text-gray-400 hover:text-red-500 transition"
          onClick={handleDelete}
        >
        <LucideTrash2 size={20} /> 
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">{moment(post.createdAt).format("MMMM DD, YYYY")}</p>
      
  <p className="text-gray-600 mt-3 line-clamp-2">{post.content}</p>
      
      <Link to={`/posts/${post._id}`}>

      <button className="text-blue-600 hover:text-blue-800 font-medium mt-3 inline-block">
       <span className="flex items-center gap-1">
        Read More
        <ArrowRightIcon size={16} />
       </span>
      </button> 
      </Link>
       
    </div>
  );
};


export default HomeCard
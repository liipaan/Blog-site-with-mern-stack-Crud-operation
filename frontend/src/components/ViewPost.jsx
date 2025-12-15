import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Edit3, BookOpen, ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getPost, fetchPosts } from '../../redux/postSlice';
const ViewPost = () => {
  const post = useSelector((state) => state.posts.post);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPost(id));
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <Link to="/">
        <button className="text-2xl font-medium text-slate-500 flex items-center gap-1 mb-6 mt-6">
         <span className="flex items-center gap-1">
           <ChevronLeft className="w-5 h-5" />
          Back
         </span>
        </button>
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-md p-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          {post?.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Calendar className="w-4 h-4" />
          {post?.createdAt && moment(post.createdAt).format('MMMM DD, YYYY')}
        </div>

        <div className="prose prose-slate max-w-none">
          <p>{post?.content}</p>
        </div>

        <div className=" items-center justify-between mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:justify-between gap-3" >
          <Link to="/" className="w-full sm:w-auto px-4 py-2 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-300">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              View All Posts
            </span>
          </Link >
           <Link to={`/posts-edit/${post?._id}`} className="flex items-center gap-2 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
             <Edit3 className="w-4 h-4" />
            Edit Post     
          </Link>
        </div>
      </motion.article>
    </main>
  );
};

export default ViewPost;

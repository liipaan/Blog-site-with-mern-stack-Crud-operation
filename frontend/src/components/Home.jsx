import HomeCard from "./HomeCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "../../redux/postSlice"
import { Search } from "lucide-react"
const Home = () => {
 const dispatch = useDispatch()
 const {posts, loading, error} = useSelector((state) => state.posts)
 const [search, setSearch] = useState("")
 useEffect(() => {
    dispatch(fetchPosts())
 }, [dispatch])
 if (loading) {
    return <div>Loading...</div>
 }
 if (error) {
    return <div>Error: {error}</div>
 }
 const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="container mx-auto p-8 max-w-4xl">
         <h1 className="text-3xl font-bold mb-6">All Blog Posts</h1>
     <div className="mb-6 relative w-full">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  <input
    type="text"
    placeholder="Search posts..."
    className="w-full pl-10 border rounded-lg py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
     <div className="space-y-6">
       {filteredPosts.map((post) => (
        <HomeCard key={post._id} post={post} />
       ))}
     </div>
        
      </div>
    
  )
}

export default Home
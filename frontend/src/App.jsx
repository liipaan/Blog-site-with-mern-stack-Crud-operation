import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./Pages/HomePage"
import AddPostPage from "./Pages/AddPostPage"
import ViewPostPage from "./components/ViewPost"
import EditPostPage from "./Pages/EditPostPage"
import NotFormPage from "./pages/NotFormPage"
const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addPost" element={<AddPostPage />} />
      <Route path="/posts/:id" element={<ViewPostPage />} />
      <Route path="/posts-edit/:id" element={<EditPostPage />} />
       <Route path="/*" element={<NotFormPage />} />
    </Routes>
    </div>
  )
}

export default App
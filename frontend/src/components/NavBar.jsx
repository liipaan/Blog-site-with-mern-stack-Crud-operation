import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links=({isActive})=>{
    return isActive ? "bg-indigo-200 text-blue-600 px-4 py-2 rounded item-center" : "text-gray-900"
  }
  return (

    <div className="bg-white fixed top-0 left-0 right-0 z-50  text-gray-900 p-4 shadow-lg px-4">

      <div className="flex justify-between container mx-auto max-w-6xl  items-center">
        <div className="text-2xl font-bold">
          <img src="public/logo.png" alt="" className="w-10 h-10 mr-2 inline-block" />
          <Link to="/" className="text-slate-600">
            Blo<span className="text-blue-600">g</span>
         </Link>
         </div>
         {/* Desktop Navigation */}
        <div className=" gap-4 text-slate-600 space-x-4 items-center font-medium md:flex hidden">
          <NavLink to="/" className={links} ><span className="text-slate-600">Home</span></NavLink>
          <NavLink to="/addPost" className={links}><span className="text-slate-600">AddPost</span></NavLink>
        </div>
         {/* mobile menu */}
        <div className="md:hidden">

        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-blue-600 focus:outline-none">
        {
          isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />
        }
        </button>
        {isOpen &&  (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
            <NavLink to="/" className={links} ><span className="text-slate-600">Home</span></NavLink>
            <NavLink to="/addPost" className={links}><span className="text-slate-600">AddPost</span></NavLink>
          </div>
        )}
      </div>

    </div>
    </div>
  )
}

export default NavBar
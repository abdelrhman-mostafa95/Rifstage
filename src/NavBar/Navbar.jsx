import { Sun, X, Menu } from "lucide-react";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-[#080808] text-white">
        <div>
          <img
            src="rifstage-logo.png"
            alt="Rifstage Logo"
            className="h-10 w-30"
          />
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-yellow-400">
            Home
          </a>
          <a href="#" className="hover:text-yellow-400">
            Music
          </a>
          <a href="#" className="hover:text-yellow-400">
            News
          </a>
          <a href="#" className="hover:text-yellow-400">
            Videos
          </a>
        </div>
        <div className="space-x-4 flex items-center">
          <button
            className="hidden md:block px-6 py-2 rounded-full 
             bg-yellow-600 text-white font-medium shadow-md 
             hover:bg-yellow-700 hover:shadow-lg hover:scale-105 
             transition duration-300 ease-in-out"
          >
            Login
          </button>
          <Sun
            className="w-6 h-6 text-yellow-500 
                transition-transform duration-300 
                hover:rotate-45 hover:scale-125 hover:text-yellow-400"
          />
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 " /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isOpen && (
          <div
            className="absolute top-16 left-0 w-full bg-[#080808] text-white flex flex-col items-center 
    space-y-4 p-4 md:hidden transition-all duration-500 ease-in-out 
    animate-slideDown"
          >
            <a href="#" className="hover:text-yellow-400">
              Home
            </a>
            <a href="#" className="hover:text-yellow-400">
              Music
            </a>
            <a href="#" className="hover:text-yellow-400">
              News
            </a>
            <a href="#" className="hover:text-yellow-400">
              Videos
            </a>
            <button>Login</button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;

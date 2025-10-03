import { Sun, X, Menu } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="container mx-auto p-4 flex justify-between items-center  bg-gray-800 text-white">
        <div>
          <img
            src="rifstage-logo.png"
            alt="Rifstage Logo"
            className="h-10 w-30"
          />
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#">Home</a>
          <a href="#">Music</a>
          <a href="#">News</a>
          <a href="#">Videos</a>
        </div>
        <div className="space-x-4 flex items-center">
          <button className="hidden md:block">Login</button>
          <Sun className="w-6 h-6 text-yellow-500" />
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 p-4 md:hidden">
            <a href="#">Home</a>
            <a href="#">Music</a>
            <a href="#">News</a>
            <a href="#">Videos</a>
            <button>Login</button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;

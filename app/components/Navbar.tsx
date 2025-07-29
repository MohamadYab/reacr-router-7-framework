import { useState } from "react";
import { NavLink } from "react-router";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-blue-300">
          The Friendly Developer
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4 text-sm text-gray-300">
            <NavLinks />
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            className="cursor-pointer text-blue-400 text-2xl"
            title="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            { isMenuOpen ? "x" : "=" }
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="bd:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
          <NavLinks onClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </nav>
  )
}

const baseLink = "transition hover:text-blue-400";
const activeLink = "text-blue-400 font-semibold";
const navClass = ({ isActive }) => isActive ? activeLink : baseLink;

function NavLinks({ onClick }) {
  return (
    <>
      <NavLink to="/" className={navClass} onClick={onClick}>Home</NavLink>
      <NavLink to="/projects" className={navClass} onClick={onClick}>Projects</NavLink>
      <NavLink to="/blog" className={navClass} onClick={onClick}>Blog</NavLink>
      <NavLink to="/about" className={navClass} onClick={onClick}>About</NavLink>
      <NavLink to="/contact" className={navClass} onClick={onClick}>Contact</NavLink>
    </>
  );
}

export default Navbar
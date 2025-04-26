"use client";

export default function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-sky-500 to-emerald-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">MyApp</div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-white hover:text-gray-200">
            Home
          </a>
          <a href="#about" className="text-white hover:text-gray-200">
            About
          </a>
          <a href="#services" className="text-white hover:text-gray-200">
            Services
          </a>
          <a href="#contact" className="text-white hover:text-gray-200">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              if (menu) menu.classList.toggle("hidden");
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="hidden md:hidden flex flex-col space-y-4 mt-4"
      >
        <a href="#home" className="text-white hover:text-gray-200">
          Home
        </a>
        <a href="#about" className="text-white hover:text-gray-200">
          About
        </a>
        <a href="#services" className="text-white hover:text-gray-200">
          Services
        </a>
        <a href="#contact" className="text-white hover:text-gray-200">
          Contact
        </a>
      </div>
    </nav>
  );
}

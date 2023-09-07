const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center"></div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
            >
              Sign In
            </a>
            <a
              href="#"
              className="bg-blue-500 text-white px-3 py-2 text-sm font-medium"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

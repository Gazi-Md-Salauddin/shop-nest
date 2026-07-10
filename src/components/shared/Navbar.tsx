import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold">
          <span className="text-blue-600">Shop</span>
          <span className="text-slate-900 dark:text-white">Nest</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-300"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-300"
          >
            All Products
          </Link>
        </nav>

        {/* Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl border border-blue-600 px-5 py-2 font-medium text-blue-600 transition hover:bg-blue-50 dark:hover:bg-slate-900"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-slate-800 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
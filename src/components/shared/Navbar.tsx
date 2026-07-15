"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { signOut } from "@/lib/auth-client";

const Navbar = (): React.JSX.Element => {
  const userData = authClient.useSession();
    const user = userData?.data?.user;
  
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeMenu = (): void => {
    setIsOpen(false);
  };


  const handleSignOut = async() => {
      await signOut();
    }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold"
          onClick={closeMenu}
        >
          <span className="text-blue-600">Shop</span>
          <span className="text-slate-900 dark:text-white">Nest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-300"
          >
            Home
          </Link>

          <Link
            href="/all-products"
            className="font-medium text-slate-700 transition hover:text-blue-600 dark:text-slate-300"
          >
            All Products
          </Link>
          {user && (
  (user as any).role === "admin" ? (
    <Link href="/dashboard/admin">Dashboard</Link>
  ) : (
    <Link href="/my-orders">My Orders</Link>
  )
)}
        </nav>

        {/* Desktop Buttons */}
        {user ? (
      <div className="hidden md:flex gap-2">
                    <h2>
                        Hi, {user?.name}
                    </h2>
        <button onClick={handleSignOut} className="bg-red-500 text-white p-2 rounded-full">Logout</button>
                </div>
        ) : (
          
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/login"
            className="rounded-xl border border-blue-600 px-5 py-2 font-medium text-blue-600 transition hover:bg-blue-50 dark:hover:bg-slate-900"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
         ) 
        }

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white px-4 py-6 shadow-lg dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <nav className="flex flex-col gap-5">
            <Link
              href="/"
              onClick={closeMenu}
              className="font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300"
            >
              Home
            </Link>

            <Link
              href="/all-products"
              onClick={closeMenu}
              className="font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300"
            >
              All Products
            </Link>
            {user && (
  user.role === "admin" ? (
    <Link className="font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300" href="/dashboard/admin">Dashboard</Link>
  ) : (
    <Link className="font-medium text-slate-700 hover:text-blue-600 dark:text-slate-300" href="/my-orders">My Orders</Link>
  )
)}

            <hr className="my-2" />

            {user ? (<div className="flex items-center gap-2">
                    <h2>
                        Hi, {user?.name}
                    </h2>
        <button onClick={handleSignOut} className="bg-red-500 text-white p-2 rounded-md">Logout</button>
                </div>) : (
          <ul className="flex gap-2">
          <li>
            <Link
              href="/auth/login"
              onClick={closeMenu}
              className="rounded-xl border border-blue-600 px-4 py-3 text-center font-medium text-blue-600"
            >
              Login
            </Link>
            </li>

          <li>
            <Link
              href="/auth/register"
              onClick={closeMenu}
              className="rounded-xl bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700"
            >
              Register
            </Link>
          </li>
            </ul>
         ) 
          }
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
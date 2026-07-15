"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  SquarePlus,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/Button";
import { signOut } from "@/lib/auth-client";


const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Add Product",
    href: "/dashboard/admin/add-product",
    icon: SquarePlus,
  },
  {
    title: "Manage Products",
    href: "/dashboard/admin/manage-products",
    icon: Package,
  },
  {
    title: "Manage Order",
    href: "/dashboard/admin/manage-order",
    icon: ShoppingCart,
  },
  
];

function SidebarContent() {
  const pathname = usePathname();


  const handleSignOut = async() => {
      await signOut();
    }
  
  return (
    <div className="flex flex-col bg-white">
      

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <Button
          onClick={handleSignOut}
          className="w-full justify-start bg-red-500 text-white"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  return (
    <>
      {/* Mobile Navbar */}
      <div className="flex justify-between p-4 md:hidden">       

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              ☰
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-72 border-r md:block">
        <SidebarContent />
      </aside>
    </>
  );
}
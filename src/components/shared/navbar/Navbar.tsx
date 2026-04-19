"use client";

import Link from "next/link";
import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { navItems } from "./navData";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-600">Logo</h1>

      {/* Desktop Menu */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link href={item.path}>
                  <NavigationMenuLink className="px-4 py-2">
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/*  Mobile Menu (Sheet Drawer) */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">☰</Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-65">
            <div className="flex flex-col gap-4 mt-6">
              {navItems.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.path}
                    className={`px-4 py-2 transition ${
                      pathname === item.path
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
              <div className="md:hidden space-x-3">
                <AuthButtons />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden space-x-3">
        <AuthButtons />
      </div>
    </nav>
  );
};

export default Navbar;

const AuthButtons = () => (
  <div className="space-x-3">
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>

    <Button variant="outline" asChild>
      <Link href="/register">Register</Link>
    </Button>
  </div>
);

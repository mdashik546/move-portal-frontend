/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { menuItems } from "./navData";
import UserDropdown from "@/components/modules/Dashboard/UserDropdown";

function Navbar({ userInfo }: any) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-linear-to-b from-black/80 to-black/20 backdrop-blur-sm">
      <div className="app-container px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-3xl font-black text-primary">
            MovieVault
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Icons */}
            <div className="md:block hidden">
              <Auth userInfo={userInfo} />
            </div>
            {/* Mobile Menu (Sheet) */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-60 bg-linear-to-b from-black/90 to-black/70 backdrop-blur-md text-white pl-5"
              >
                <div className="mt-6 flex flex-col gap-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-gray-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="md:hidden block">
                  <Auth userInfo={userInfo} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

const Auth = ({ userInfo }: any) => {
  return (
    <div>
      {!userInfo ? (
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button className="bg-white text-black hover:bg-gray-200">
            <Link href={"/register"}> Register</Link>
          </Button>
        </div>
      ) : (
        <UserDropdown userInfo={userInfo}/>
      )}
    </div>
  );
};

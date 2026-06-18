"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Input,
} from "@heroui/react";

import { Bars, Xmark, Magnifier, ChevronDown } from "@gravity-ui/icons";

export default function NavBar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Replace with actual auth data
  // const user = {
  //   name: "John Doe",
  //   role: "lawyer", // client | lawyer | admin
  // };

  const activeClass = (href) =>
    pathname === href
      ? "text-primary font-semibold"
      : "text-default-600 hover:text-primary";

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Browse Lawyers",
      href: "/lawyers",
    },
  ];

  const NavItems = (
    <>
      {navLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={activeClass(item.href)}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          LegalEase
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {NavItems}

          {/* {user && (
            <Dropdown>
              <DropdownTrigger>
                <div>Dashboard</div>
              </DropdownTrigger>

              <DropdownMenu aria-label="Dashboard Menu">
                {user.role === "client" && (
                  <DropdownItem key="client" href="/dashboard/client">
                    Client Dashboard
                  </DropdownItem>
                )}

                {user.role === "lawyer" && (
                  <DropdownItem key="lawyer" href="/dashboard/lawyer">
                    Lawyer Dashboard
                  </DropdownItem>
                )}

                {user.role === "admin" && (
                  <DropdownItem key="admin" href="/dashboard/admin">
                    Admin Dashboard
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          )} */}
        </nav>

        {/* Search */}
        <div className="hidden md:block w-80">
          <Input placeholder="Search lawyers..." />
          {/* startContent={<Magnifier />} */}
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/signin">
            <Button color="primary">Login</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <Button
          isIconOnly
          variant="light"
          className="lg:hidden"
          onPress={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <Xmark /> : <Bars />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t lg:hidden">
          <div className="space-y-4 p-4">
            <Input placeholder="Search lawyers..." />
            {/* startContent={<Magnifier />} */}

            {NavItems}

            {/* {user && (
              <Link href={`/dashboard/`} className="block">
                Dashboard
              </Link>
            )} */}

            {/* {!user ? (
              <Button
                as={Link}
                href="/login"
                color="primary"
                className="w-full"
              >
                Login
              </Button>
            ) : (
              <Button color="danger" variant="flat" className="w-full">
                Logout
              </Button>
            )} */}
          </div>
        </div>
      )}
    </header>
  );
}

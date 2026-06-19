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

// import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useSession, signOut } from "@/lib/auth-client";

export default function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);

  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  // Replace with actual auth data
  // const user = {
  //   name: "John Doe",
  //   role: "lawyer", // client | lawyer | admin
  // };

  const handleSignOut = async () => {
    await signOut();
  };

  const activeClass = (href) =>
    pathname === href
      ? "text-primary font-semibold"
      : "text-default-600 hover:text-primary";

  const links = (
    <>
      <li className="text-lg font-medium">
        <Link href="/">Home</Link>
      </li>
      <li className="text-lg font-medium">
        <Link href="/lawyers">Browse Lawyers</Link>
      </li>
    </>
  );
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Browse Lawyers",
      href: "/lawyers",
    },
  ];
  // const navLinks = [
  //   {
  //     label: "Home",
  //     href: "/",
  //   },
  //   {
  //     label: "Browse Lawyers",
  //     href: "/lawyers",
  //   },
  // ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          LegalEase
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="menu menu-horizontal lg:flex items-center  px-1 gap-3">
            {navLinks.map((link) => (
              <li className="text-lg font-medium" key={link.name}>
                <Link
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium  transition hover:bg-white/10 text-black"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

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
          {user ? (
            <>
              <Image
                src={user?.image}
                width={45}
                height={45}
                alt="user"
                className="rounded-full border-2 border-blue-500 object-cover"
              />

              <Button
                onClick={handleSignOut}
                color="danger"
                variant="flat"
                className="w-full btn"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/signin">
              <Button color="primary" className="w-full">
                Login
              </Button>
            </Link>
          )}
          {/* <Link href="/signin">
            <Button color="primary">Login</Button>
          </Link> */}
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
            {/* <div>{links}</div> */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-2xl z-[1] mt-3 w-56 p-3 shadow-2xl border border-gray-200"
            >
              {navLinks.map((link) => (
                <li className="text-lg font-medium" key={link.name}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium  transition hover:bg-white/10 text-black"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>{" "}
            {/* {user && (
              <Link href={`/dashboard/`} className="block">
                Dashboard
              </Link>
            )} */}
            <div>
              {user ? (
                <Button color="danger" variant="flat" className="w-full">
                  Logout
                </Button>
              ) : (
                <Button
                  as={Link}
                  href="/login"
                  color="primary"
                  className="w-full"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";
import { useSession } from "@/lib/auth-client";
import {
  LayoutSideContentLeft,
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Bookmark,
  Magnifier,
  Person,
  FileText,
  CreditCard,
  Bars,
  Clock,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export function DashboardSidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const clientNavLinks = [
    { icon: House, href: "/dashboard/lawyer", label: "Home" },
    { icon: Magnifier, href: "/dashboard/lawyer", label: "Search" },
    { icon: Bell, href: "/dashboard/lawyer", label: "Notifications" },
    { icon: Envelope, href: "/dashboard/lawyer", label: "Messages" },
    { icon: Person, href: "/dashboard/lawyer", label: "Profile" },
    { icon: Gear, href: "/dashboard/lawyer", label: "Settings" },
  ];
  const lawyerNavLinks = [
    {
      icon: House,

      label: "Dashboard",
      href: "/dashboard/lawyer",
    },
    {
      icon: Clock,

      label: "Hiring Requests",
      href: "/dashboard/lawyer/hiring-history",
    },
    {
      icon: Person,

      label: "Manage Profile",
      href: "/dashboard/lawyers/manageLegalProfile",
    },
    {
      icon: Gear,

      label: "Settings",
      href: "/settings",
    },
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Person, href: "/dashboard/admin/users", label: "Users" },
    { icon: Bell, href: "/admin/companies", label: "Companies" },
    { icon: Briefcase, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: CreditCard, href: "/dashboard/admin/payments", label: "Payments" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
  ];
  const navLinksMap = {
    client: clientNavLinks,
    lawyer: lawyerNavLinks,
    admin: adminNavLinks,
  };
  const navItems = navLinksMap[user?.role || "client"];

  const navContent = (
    <nav className="flex flex-col gap-1 border rounded-full border-white/5">
      <div className="mt-5 ">
        {" "}
        <Image
          className="ml-20 border-2 border-black rounded-full"
          src={user?.image}
          alt=""
          width={50}
          height={50}
        ></Image>
        <div className="space-y-2">
          <h1 className="text-center">{user?.role}</h1>
          <p className="text-center">{user?.name}</p>
          <p className="text-center">{user?.email}</p>
        </div>
      </div>
      <div className="divider"></div>
      {navItems?.map((item) => (
        <Link
          key={item?.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item?.href}
        >
          <item.icon className="size-5 text-muted" />
          {item?.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <Bars />
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <div>{navContent}</div>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}

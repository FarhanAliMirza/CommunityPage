"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import {
  BlocksIcon,
  CirclePlus,
  Frown,
  Layers3,
  LayoutDashboard,
  LogIn,
  SquareArrowOutUpRight,
  SquareArrowUpRight,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { ModeToggle } from "../layout/Mode-Toggle";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SearchInput from "../SearchInput/SearchInput";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Create Profile",
    href: "/profile/new",
    description: "create a new profile",
  },
  {
    title: "My Profiles",
    href: "/",
    description: "View all your profiles",
  },
  // {
  //   title: "Third Tab",
  //   href: "/",
  //   description: "Write some wavy here to get them to click.",
  // },
];

const NavBar = () => {
  const pathname = usePathname();
  const isCommunityPage = pathname.includes("/community");

  return (
    <div className="flex max-w-2xl fixed top-0 left-0 min-w-full justify-between px-5 py-3 border-b z-40 dark:bg-black/50 backdrop-blur-lg bg-white ">
      <div className="flex justify-between w-full min-[825px]:hidden">
        <Link href="/" className="pl-2 flex items-center justify-center">
          <Image
            src="/logo/devcommune.png"
            alt="logo"
            width={45}
            height={45}
            className=""
          />
        </Link>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link
            href="/sign-in"
            className="w-9 h-9 bg-slate-50/20 rounded-full flex items-center justify-center"
          >
            <LogIn className="w-4 h-4 stroke-slate-300 mr-1 lg:hidden" />
          </Link>
          <Dialog>
            <SheetTrigger className="p-2 transition">
              <GiHamburgerMenu />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>{/* <SheetTitle></SheetTitle> */}</SheetHeader>
              <div className="flex flex-col space-y-3 mt-[1rem]">
                <DialogClose asChild>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Home
                    </Button>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link href={`/profile/`}>
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link
                    href="/sign-in"
                    legacyBehavior
                    passHref
                    className="cursor-pointer"
                  >
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </DialogClose>
                <DialogClose>
                  <DialogClose asChild>
                    <Link href="/community">
                      <Button variant="outline" className="w-full">
                        Community
                      </Button>
                    </Link>
                  </DialogClose>
                </DialogClose>
              </div>
            </SheetContent>
          </Dialog>
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <div className="max-[825px]:hidden flex gap-3 w-[100%] justify-between">
          <Link href="/" className="pl-2 flex items-center justify-center">
            <Image
              src="/logo/devcommune.png"
              alt="logo"
              width={70}
              height={70}
              className=""
            />
          </Link>
        </div>
        <div className="pl-5 flex flex-row gap-4 items-center">
          <Link
            href="/community"
            target="blank"
            className="max-[825px]:hidden flex items-center gap-1"
          >
            <p className="pl-1">Community</p>
            <SquareArrowOutUpRight size={16} className="text-gray-500 mt-1" />
          </Link>
          <Link
            href="/projects"
            target="blank"
            className="max-[825px]:hidden flex items-center gap-1"
          >
            <p className="pl-1">Projects</p>
            <SquareArrowOutUpRight size={16} className="text-gray-500 mt-1" />
          </Link>
        </div>
      </div>

      <div className="lg:flex items-center gap-5 hidden">
        {isCommunityPage && <SearchInput />}
              <Link
                href={`/profile`}
                className="max-[825px]:hidden"
              >
                <Button size="sm" className="rounded-lg" variant="outline">
                  <p className="pl-1">Dashboard</p>
                </Button>
              </Link>

            
          <Link href="/sign-in" className="max-[825px]:hidden">
            <Button size="sm" className="rounded-lg" variant="outline">
              <LogIn className="w-4 h-4" />
              <p className="pl-1">Sign In</p>
            </Button>
          </Link>

        <ModeToggle />
      </div>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;

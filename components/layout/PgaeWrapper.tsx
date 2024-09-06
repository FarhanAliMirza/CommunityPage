"use client";
import React, { useEffect, useRef, useState } from "react";

import { Spotlight } from "../HeroSection/Spotlight";
import DotPattern from "../magicui/dot-pattern";
import { cn } from "@/lib/utils";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/Navbar";
import StarsCanvas from "../StarCanvas/StarCanvas";
import Cursor from "../Sticky-Cursor/cursor";
import { AnimatePresence } from "framer-motion";
import Loader from "../Loader/loader";
import CrispChat from "../CrispContact/crisp";
import { usePathname } from "next/navigation";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const stickyElement = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  const isNotCommunitypage = pathname.includes("/community");
  const isProjectsPage = pathname.includes("/projects");

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2300);
    })();
  }, []);

  return (
    <>
      <NavBar />
      <div className="hidden" ref={stickyElement}></div>
      <main className="flex max-w-screen-2xl min-w-screen flex-col  dark:bg-black bg-white justify-between dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        {/* <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence> */}
        {children}
      </main>
      <Footer />
      {/* {!isNotCommunitypage && <Spotlight />} */}
      {/* {!isNotCommunitypage && <Cursor stickyElement={stickyElement} />} */}
      {!isNotCommunitypage && !isProjectsPage && <StarsCanvas />}
      <CrispChat />
    </>
  );
}

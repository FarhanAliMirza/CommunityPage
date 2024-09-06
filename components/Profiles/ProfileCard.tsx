"use client";
import { motion } from "framer-motion";

import React from "react";
import { ProfileWithProjects } from "../Forms/AddProfileForm";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Badge, badgeVariants } from "../ui/badge";
import {
  FaCode,
  FaGithub,
  FaInstagram,
  FaJava,
  FaLinkedin,
  FaNodeJs,
  FaPython,
  FaShieldAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiMiniGlobeAlt } from "react-icons/hi2";
import { Bot, Globe, Terminal } from "lucide-react";
import {
  MdArrowOutward,
  MdCloudUpload,
  MdOutlineAppShortcut,
} from "react-icons/md";
import { TbBrandCpp } from "react-icons/tb";
import { RiNextjsFill, RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLogoJavascript, IoLogoWhatsapp, IoSettings } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { GiFrozenBlock } from "react-icons/gi";
import { Button } from "../ui/button";
import ToolTipItem from "../layout/Tool-tip-item";
const ProfileCard = ({ profile }: { profile: ProfileWithProjects }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { userId } = useAuth();

  const isMyProfile = userId === profile.userId;

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        bounce: 0.7,
      }}
      className={cn("col-span-1 shadow-md ")}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 w-full justify-between">
            <div className="flex gap-1 items-center">
              <Avatar className="w-12 h-12 p-1 bg-gray-500/30">
                <AvatarImage
                  className="cursor-pointer"
                  src={profile.image}
                  alt={profile.name}
                />
                <AvatarFallback>
                  <Skeleton className="w-8 h-8 rounded-full bg-slate-200/50" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-md font-semibold">
                  {profile.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  @ {profile.userName}
                </p>
              </div>
            </div>
            {profile.verified && (
              <div className="flex items-center gap-2">
                <ToolTipItem text="Developer">
                  <FaShieldAlt size={23} className="text-[#f97316]" />
                </ToolTipItem>
                {/* TODO: Fixed that based on role */}
                <ToolTipItem text="verified member">
                  <RiVerifiedBadgeFill size={27} className="text-blue-700" />
                </ToolTipItem>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="-mt-4">
          <CardDescription>{profile.about}</CardDescription>
          <div className="pt-1 flex items-center gap-2 mb-1">
            <p className="text-md underline">Skills: </p>
            <div className="flex items-center gap-1.5">
              {profile.webdev && (
                <span className="text-sm">
                  <FaCode
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.appdev && (
                <span className="text-sm">
                  <MdOutlineAppShortcut
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.uiux && (
                <span className="text-sm">
                  <CgWebsite
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.ai && (
                <span className="text-sm">
                  <Bot
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.ml && (
                <span className="text-sm">
                  <IoSettings
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.blockchain && (
                <span className="text-sm">
                  <GiFrozenBlock
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.cloud && (
                <span className="text-sm">
                  <MdCloudUpload
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.coding && (
                <span className="text-sm">
                  <Terminal
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
            </div>
          </div>
          <div className="pt-1 flex items-center gap-2 mb-1.5">
            <p className="text-md underline">Coding Languages: </p>
            <div className="flex items-center gap-1.5">
              {profile.c && <span className="text-sm">C</span>}
              {profile.cpp && (
                <span className="text-sm">
                  <TbBrandCpp
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.java && (
                <span className="text-sm">
                  <FaJava
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.javascript && (
                <span className="text-sm">
                  <IoLogoJavascript
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.nextjs && (
                <span className="text-sm">
                  <RiNextjsFill
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.python && (
                <span className="text-sm">
                  <FaPython
                    size={18}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
              {profile.nodejs && (
                <span className="text-sm">
                  <FaNodeJs
                    size={17}
                    className="text-gray-600 dark:text-slate-200"
                  />
                </span>
              )}
            </div>
          </div>
          <div className="pt-2 flex w-full justify-between items-center">
            <div className="flex gap-3 items-center">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-gray-400/50 flex items-center justify-center"
                >
                  <FaGithub size={20} className="" />
                </a>
              )}
              {profile.linkedIn && (
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  className="w-8 h-8 rounded-full shadow-lg bg-white-200/70 dark:bg-blue-600/80 flex items-center justify-center"
                >
                  <FaLinkedin
                    size={20}
                    className="text-blue-700 dark:text-white"
                  />
                </a>
              )}
              {profile.instagram && (
                <a
                  href={profile.instagram}
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#fb3a5d] via-[#cd5f11] to-[#ea089b] flex items-center justify-center"
                >
                  <FaInstagram size={20} className="text-white" />
                </a>
              )}
              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-black dark:bg-gray-600/80 flex items-center justify-center"
                >
                  <FaXTwitter size={20} className="text-white" />
                </a>
              )}
              {profile.portfolio && (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-[#bfdbfe] to-[#a5f3fc] flex items-center justify-center"
                >
                  <Globe size={20} className="text-gray-700" />
                </a>
              )}
            </div>
          </div>
          <div className="pt-3 flex items-center gap-2 pb-2">
            {profile.whatsapp && (
              <a
                href={`https://wa.me/+91${profile.whatsapp}`}
                target="_blank"
                className="w-8 h-8 rounded-full bg-slate-100/10 flex items-center justify-center"
              >
                <IoLogoWhatsapp size={20} className="text-emerald-500" />
              </a>
            )}
            <a
              href={`/profile-details/${profile.id}`}
              className="text-md underline flex items-center"
            >
              view profile
              <span>
                <MdArrowOutward size={17} className="ml-[1px]" />
              </span>
            </a>
          </div>
          {isMyProfile && (
            <div className="mt-3">
              <Button type="button" size="sm">
                <Link href={`/profile/${profile.id}`}>Edit Profile</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;

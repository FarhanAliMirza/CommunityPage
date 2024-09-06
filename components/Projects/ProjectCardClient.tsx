import { Project } from "@prisma/client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getProfileById } from "@/actions/getProfileById";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { GrReactjs } from "react-icons/gr";
import { RiNextjsFill } from "react-icons/ri";
import { FaGithub, FaHtml5 } from "react-icons/fa";
import { SiShadcnui } from "react-icons/si";
import Link from "next/link";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";

interface ProjectsProps {
  project: Project;
}

const ProjectCardClient = ({ project }: ProjectsProps) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        bounce: 0.7,
      }}
      className={cn("col-span-1 shadow-md")}
    >
      <Card className="shadow-md z-10">
        <CardHeader className="-mt-3">
          <CardTitle className="underline text-md md:text-lg">
            {project.title}
          </CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="-mt-4">
          <div className="aspect-square overflow-hidden relative w-full h-[100px] rounded-lg">
            <Image
              src={project.banner}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
        <CardFooter className="-mt-3 -mb-3">
          <div className="flex flex-row gap-0 justify-between w-full">
            <div className="flex">
              <Avatar>
                <AvatarImage
                  src={project.authorProfileImage}
                  alt={project.authorName}
                  className="w-8 h-8"
                />
                <AvatarFallback>
                  <Skeleton className="h-8 w-8 rounded-full bg-gray-400/40 " />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-[9px] text-muted-foreground">created by</p>
                <a
                  className="text-[12px] underline cursor-pointer"
                  href={`/profile-details/${project.profileId}`}
                  target="_blank"
                >
                  {project.authorName}
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <a
                // href={`/project-details/${project.id}`}
                target="_blank"
                className="text-sm underline cursor-pointer"
              >
                View Project
              </a>
            </div>
          </div>
        </CardFooter>
        <CardContent className="-mb-3">
          <div className="flex gap-3 w-full justify-between">
            <Link href={project.githubLink} target="blank">
              <Button type="button" size="sm" className="w-[110px]">
                <FaGithub size={20} className="stroke-white mr-1" />
                GitHub
              </Button>
            </Link>
            {!!project.demoLink && (
              <Link href={project.demoLink} target="blank">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="w-[110px]"
                >
                  <Globe
                    size={20}
                    className="stroke-black dark:stroke-white mr-1"
                  />
                  Visit
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCardClient;

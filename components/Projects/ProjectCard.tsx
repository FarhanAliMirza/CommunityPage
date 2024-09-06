import { Profile, Project, Purchase } from "@prisma/client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import { Globe, Linkedin, Loader2, PencilRuler, Trash } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { GrReactjs } from "react-icons/gr";
import { RiNextjsFill } from "react-icons/ri";
import { FaGithub, FaHtml5 } from "react-icons/fa";
import { SiShadcnui } from "react-icons/si";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddProjectForm from "./AddProjectForm";
import axios from "axios";
import { toast } from "sonner";

interface ProjectCardProps {
  profile?: Profile & {
    projects: Project[];
  };
  project: Project;
  purchased?: Purchase[];
}

const ProjectCard = ({
  profile,
  project,
  purchased = [],
}: ProjectCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [ConfirmDialogue, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete thsi project."
  );

  const router = useRouter();

  const pathname = usePathname();
  const isProfileDetailsPage = pathname.includes("/profile-details");

  const handleDialogueOpen = () => {
    setOpenDialog((prev) => !prev);
  };

  const handleProjectDelete = async (project: Project) => {
    setIsLoading(true);
    const imageKey = project.banner.substring(
      project.banner.lastIndexOf("/") + 1
    );

    const ok = await confirm();

    if (ok) {
      axios
        .post("/api/uploadthing/delete", { imageKey })
        .then(() => {
          axios
            .delete(`/api/project/${project.id}`)
            .then(() => {
              router.refresh();
              toast("Project Deleted Successfully");
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
              toast("Something Went Wrong");
            });
        })
        .catch(() => {
          setIsLoading(false);
          toast("Something Went Wrong");
        });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ConfirmDialogue />
      <Card className="shadow-md z-10">
        <CardHeader>
          <CardTitle className="underline text-md md:text-lg">
            {" "}
            {project.title}
          </CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-square overflow-hidden relative w-full h-[300px] rounded-lg">
            <Image
              src={project.banner}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          {/* <div className="flex flex-row items-center  justify-between">
          <div className="flex gap-2 items-center">
            {profile?.image ? (
              <Avatar>
                <AvatarImage src={profile?.image} alt={profile?.name} />
              </Avatar>
            ) : (
              <Skeleton className="h-9 w-9 rounded-full bg-white" />
            )}
            <div className="flex flex-col justify-end gap-1">
              {profile?.name}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              {profile?.linkedIn && (
                <Link href={profile?.linkedIn}>
                  <Linkedin size={15} />
                </Link>
              )}
            </div>
          </div>
        </div> */}
          <Separator />
          <div className="my-2">
            <CardTitle className="underline  text-md md:text-lg">
              TechStack Used
            </CardTitle>
            <div className="flex flex-wrap items-center  w-full gap-6 my-3">
              {!!project.react && (
                <GrReactjs
                  size={20}
                  className="text-gray-800 dark:text-slate-200"
                />
              )}
              {!!project.nextjs && (
                <RiNextjsFill
                  size={20}
                  className="text-gray-800 dark:text-slate-200"
                />
              )}
              {!!project.html && (
                <FaHtml5
                  size={20}
                  className="text-gray-800 dark:text-slate-200"
                />
              )}
              {!!project.shadcn && (
                <SiShadcnui
                  size={20}
                  className="text-gray-800 dark:text-slate-200 "
                />
              )}
            </div>
          </div>
          <Separator />
          <div className="flex gap-3 mt-3">
            <Link href={project.githubLink} target="blank">
              <Button type="button" variant="outline">
                <FaGithub size={20} className="stroke-white mr-1" />
                GitHub Link
              </Button>
            </Link>
            {project.demoLink && (
              <Link href={project.demoLink} target="blank">
                <Button type="button">
                  <Globe
                    size={20}
                    className="stroke-white dark:stroke-black mr-1"
                  />
                  Visit Site
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-4 flex gap-3">
            {isProfileDetailsPage ? (
              <></>
            ) : (
              <>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger>
                    <Button type="button" className="w-[200px]">
                      <PencilRuler className="w-4 h-4 mr-2" />
                      Update Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[900px] w-[90%]">
                    <DialogHeader className="px-2">
                      <DialogTitle>Update Project</DialogTitle>
                      <DialogDescription>
                        Make changes to the project Details
                      </DialogDescription>
                    </DialogHeader>
                    <AddProjectForm
                      profile={profile}
                      project={project}
                      handleDialogOpen={handleDialogueOpen}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleProjectDelete(project)}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-1 animate-spin h-4 w-4" />
                      Deleting
                    </>
                  ) : (
                    <>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Project
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectCard;

"use client";
import { addNewProjectsSchema } from "@/schemas/addNewProjectsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile, Project } from "@prisma/client";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CustomFormFieldCheckBoxProject,
  CustomFormFieldProject,
  CustomFormFieldTextareaProject,
} from "./CustomFormField";
import Image from "next/image";
import { Button } from "../ui/button";
import { UploadButton } from "@/hooks/uploadthing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BetweenHorizonalStart,
  Loader2,
  PackagePlus,
  PencilLine,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface AddProjectFormProps {
  profile?: Profile & {
    projects: Project[];
  };
  project?: Project;
  handleDialogOpen: () => void;
}

const AddProjectForm = ({
  profile,
  project,
  handleDialogOpen,
}: AddProjectFormProps) => {
  const [image, setImage] = useState<string | undefined>(project?.banner);
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projectType, setProjectType] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof addNewProjectsSchema>>({
    resolver: zodResolver(addNewProjectsSchema),
    defaultValues: project || {
      title: "",
      description: "",
      banner: "",
      githubLink: "",
      demoLink: "",
      price: 0,
      techStack: "",
      react: false,
      reactnative: false,
      flutter: false,
      nextjs: false,
      mongodb: false,
      express: false,
      nodejs: false,
      firebase: false,
      mysql: false,
      postgresql: false,
      graphql: false,
      html: false,
      css: false,
      javascript: false,
      typescript: false,
      shadcn: false,
      free: false,
      java: false,
      python: false,
    },
  });

  //manage the image state on load
  useEffect(() => {
    if (typeof image === "string" && image.length > 0) {
      form.setValue("banner", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image]);

  // handle image delete function
  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", {
        imageKey,
      })
      .then((res) => {
        if (res.data.success) {
          setImage("");
          toast("Image deleted successfully");
        }
      })
      .catch((error) => {
        toast(`ERROR! ${error.message}`);
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  //handle form submit function

  function onSubmit(values: z.infer<typeof addNewProjectsSchema>) {
    setIsLoading(true);

    if (profile && project) {
      // update project
      axios
        .patch(`/api/project/${project.id}`, values)
        .then((res) => {
          toast("Project updated successfully");
          router.refresh();
          setIsLoading(false);
          handleDialogOpen();
        })
        .catch((error) => {
          console.log(error);
          toast(`Error while updating profile`);
          setIsLoading(false);
        });
    } else {
      // create project

      if (!profile) return null;

      axios
        .post("/api/project", {
          ...values,
          profileId: profile.id,
          authorName: profile.name,
          authorProfileImage: profile.image,
          projectType: projectType,
          projectCount: profile.projects.length + 1,
        })
        .then((res) => {
          toast("Project created successfully 🎉");
          router.refresh();
          setIsLoading(false);
          handleDialogOpen();
        })
        .catch((error) => {
          console.log(error);
          toast(`Error while creating project`);
          setIsLoading(false);
        });
    }
  }

  return (
    <ScrollArea className="max-h-[75vh]">
      <div className="px-2 pb-6 pt-2">
        <Form {...form}>
          <form className="space-y-5">
            <div className="flex flex-col md:flex-row gap-7">
              <div className="flex-1 flex flex-col gap-5">
                <CustomFormFieldProject
                  control={form.control}
                  name="title"
                  description="The title of your project"
                  label="Project Title *"
                  placeholder="MERN Stack Restaurant App"
                />
                <CustomFormFieldTextareaProject
                  control={form.control}
                  name="description"
                  description="describe your project"
                  label="Project Description *"
                  placeholder="Craft a vibrant real-time messaging platform with Socket.io 🚀."
                />
                <FormField
                  control={form.control}
                  name="banner"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2 mt-4">
                      <FormLabel>Upload a Banner *</FormLabel>
                      <FormDescription>
                        Upload a banner image for your project
                      </FormDescription>
                      <FormControl>
                        {image ? (
                          <>
                            <div className="relative max-w-[900px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 border-2 border-dotted border-gray-400 rounded-sm">
                              <Image
                                src={image}
                                alt="room banner"
                                fill
                                className="object-contain p-2"
                              />
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="absolute right-0 top-0 "
                                onClick={() => handleImageDelete(image)}
                              >
                                {imageIsDeleting ? (
                                  <Loader2 className="animate-spin" size={20} />
                                ) : (
                                  <XCircle size={20} />
                                )}
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col items-center max-w-[4000px] border-2 border-dotted border-primary/50 justify-center pt-6 pb-3  rounded-sm">
                              <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  setImage(res[0].url);
                                  toast("Image uploaded successfully");
                                }}
                                onUploadError={(error: Error) => {
                                  toast("Soemthing went wrong");
                                }}
                              />
                            </div>
                          </>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CustomFormFieldProject
                  control={form.control}
                  name="githubLink"
                  description="enter github repo link"
                  label="Github Repository Link *"
                  placeholder="https://github.com/reponame"
                />
                <CustomFormFieldProject
                  control={form.control}
                  name="demoLink"
                  description="enter deployed url"
                  label="Deployed Project Link"
                  placeholder="https://project.vercel.app/"
                />
                {/* <CustomFormFieldProject
                control={form.control}
                name="price"
                description="state the price of your project source code"
                label="Room Price in INR "
                placeholder="699"
                type="number"
              />

              <CustomFormFieldCheckBoxProject
                control={form.control}
                name="free"
                description="select to make the project source code available for free"
                placeholder="Set Source Code Free"
                label="Mark as Free"
              /> */}
              </div>
              <div className="flex-1 flex flex-col gap-5">
                <FormLabel className="text-lg">
                  Select Your Project Type
                </FormLabel>
                <Tabs
                  defaultValue="website"
                  className="w-[280px] md:w-[300px] lg:w-full -mt-3"
                >
                  <TabsList className="mb-2 w-[70px]">
                    <ScrollArea className="w-full whitespace-nowrap rounded-md">
                      <TabsTrigger
                        value="website"
                        onClick={() => {
                          setProjectType("website");
                        }}
                      >
                        Website
                      </TabsTrigger>
                      <TabsTrigger
                        value="app"
                        onClick={() => {
                          setProjectType("app");
                        }}
                      >
                        App
                      </TabsTrigger>

                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </TabsList>

                  <TabsContent value="website" className="flex flex-col gap-3">
                    <div className="-mt-2">
                      <FormLabel className="text-lg">For Frontend</FormLabel>
                      <FormDescription>tech used for Database</FormDescription>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="react"
                          label="React"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="nextjs"
                          label="Next Js"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="html"
                          label="HTML"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="css"
                          label="CSS"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="javascript"
                          label="Java Script"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="shadcn"
                          label="Shadcn UI"
                        />
                      </div>
                    </div>
                    <div>
                      <FormLabel className="text-lg">For Database</FormLabel>
                      <FormDescription>tech used for Database</FormDescription>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="mongodb"
                          label="Mongo DB"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="postgresql"
                          label="Postgre SQL"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="mysql"
                          label="My SQL"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="firebase"
                          label="Firebase"
                        />
                      </div>
                    </div>
                    <div>
                      <FormLabel className="text-lg">For Backend</FormLabel>
                      <FormDescription>
                        tech used for dev backend
                      </FormDescription>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="express"
                          label="Express Js"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="nodejs"
                          label="Node Js"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="graphql"
                          label="Graphql"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="typescript"
                          label="Typescript"
                        />
                      </div>
                    </div>
                  </TabsContent>


                  <TabsContent value="app" className="flex flex-col gap-3">
                    <div className="-mt-2">
                      <FormLabel className="text-lg">For Frontend</FormLabel>
                      <FormDescription>tech used for Database</FormDescription>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="reactnative"
                          label="React Native"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="flutter"
                          label="Flutter"
                        />
                        <CustomFormFieldCheckBoxProject
                          control={form.control}
                          name="java"
                          label="Java"
                        />
                      </div>
                    </div>
                 
                  </TabsContent>


                </Tabs>
                <CustomFormFieldTextareaProject
                  control={form.control}
                  name="techStack"
                  description="describe technologies used in the project"
                  label="Describe TechStack *"
                  placeholder="MERN Stack with Redux for state management"
                />
                <div className="pt-3 pb-2">
                  {project ? (
                    <Button
                      type="button"
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin h-4 w-4" />
                          Updating
                        </>
                      ) : (
                        <>
                          <PencilLine className="mr-2 h-4 w-4" />
                          Update Project
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={form.handleSubmit(onSubmit)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin h-4 w-4" />
                          Creating
                        </>
                      ) : (
                        <>
                          <BetweenHorizonalStart className="mr-2 h-4 w-4" />
                          Create Project
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default AddProjectForm;

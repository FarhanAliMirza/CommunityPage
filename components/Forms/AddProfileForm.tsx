"use client";

import { addNewProfileFormSchema } from "@/schemas/addNewProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Profile, Project } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Input } from "@/components/ui/input";
import {
  CustomFormField,
  CustomFormFieldCheckBox,
  CustomFormFieldTextarea,
} from "./FormField";
import Image from "next/image";
import { UploadButton } from "@/hooks/uploadthing";
import {
  CirclePlus,
  DraftingCompass,
  Eye,
  Loader2,
  PackagePlus,
  PencilLine,
  ShieldCheck,
  Terminal,
  Trash,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { ICity, IState } from "country-state-city";
import useLocation from "@/hooks/useLocation";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useConfirm } from "@/hooks/use-confirm";
import AddProjectForm from "../Projects/AddProjectForm";
import { Separator } from "../ui/separator";
import ProjectCard from "../Projects/ProjectCard";
import AdminDrawerModal from "../AdminDrawer/AdminDrawer";

interface AddProfileFormProps {
  profile: ProfileWithProjects | null;
}

export type ProfileWithProjects = Profile & {
  projects: Project[];
};

const AddProfileForm = ({ profile }: AddProfileFormProps) => {
  const [image, setImage] = useState<string | undefined>(profile?.image);
  const [coverImage, setCoverImage] = useState<string | undefined>(
    profile?.coverImage
  );
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [covserImaageIsDeleting, setCoverImageIsDeleting] = useState(false);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileDeleting, setIsProfileDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [ConfirmDialogue, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete thsi profile."
  );

  const {
    getAllCountries,
    getCountryByCode,
    getStateByCode,
    getCountryStates,
    getStateCities,
  } = useLocation();

  const router = useRouter();
  const countries = getAllCountries();

  const form = useForm<z.infer<typeof addNewProfileFormSchema>>({
    resolver: zodResolver(addNewProfileFormSchema),
    defaultValues: profile || {
      name: "",
      email: "",
      about: "",
      image: "",
      coverImage: "",
      country: "",
      state: "",
      city: "",
      address: "",
      collegeName: "",
      degree: "",
      branch: "",
      presentYear: "",
      graduationYear: "",
      contact: "",
      whatsapp: "",
      linkedIn: "",
      github: "",
      twitter: "",
      instagram: "",
      portfolio: "",
      webdev: false,
      appdev: false,
      ml: false,
      ai: false,
      blockchain: false,
      cloud: false,
      uiux: false,
      coding: false,
      c: false,
      cpp: false,
      java: false,
      python: false,
      javascript: false,
      nextjs: false,
      nodejs: false,
      techStack: "",
      experience: "",
    },
  });

  const SendEmail = async () => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: form.getValues("email") }),
      });
      if (!response.ok) {
        toast("Failed to send Email");
      } else {
        toast("Email sent successfully");
      }
    } catch (error) {
      toast("Failed to send Email");
      console.log(error);
    }
  };

  //manage the image state on load
  useEffect(() => {
    if (typeof image === "string" && image.length > 0) {
      form.setValue("image", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [image]);

  //manage the image state on load
  useEffect(() => {
    if (typeof coverImage === "string" && coverImage.length > 0) {
      form.setValue("coverImage", coverImage, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [coverImage]);

  //handle state state
  useEffect(() => {
    const selectedCountry = form.watch("country");
    const countryStates = getCountryStates(selectedCountry);
    if (countryStates) {
      setStates(countryStates);
    }
  }, [form.watch("country")]);

  //change the cities based on the state
  useEffect(() => {
    const selectedState = form.watch("state");
    const selectedCountry = form.watch("country");
    const stateCities = getStateCities(selectedCountry, selectedState);
    if (stateCities) {
      setCities(stateCities);
    }
  }, [form.watch("state")]);

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
  // handle image delete function
  const handleCoverImageDelete = (coverImage: string) => {
    setImageIsDeleting(true);
    const imageKey = coverImage.substring(coverImage.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", {
        imageKey,
      })
      .then((res) => {
        if (res.data.success) {
          setCoverImage("");
          toast("Cover Image deleted successfully");
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

  function onSubmit(values: z.infer<typeof addNewProfileFormSchema>) {
    setIsLoading(true);

    if (profile) {
      // update profile
      axios
        .patch(`/api/profile/${profile.id}`, values)
        .then((res) => {
          toast("Profile updated successfully");
          SendEmail();
          router.push(`/profile/${profile.id}`);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast(`Error while updating profile`);
          setIsLoading(false);
        });
    } else {
      // create profile
      axios
        .post("/api/profile", values)
        .then((res) => {
          toast("Profile created successfully 🎉");
          SendEmail();
          router.push(`/profile/${res.data.id}`);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast(`Error while creating profile`);
          setIsLoading(false);
        });
    }
  }

  const deleteImageWhileDeletingProfile = (image: string) => {
    setImageIsDeleting(true);
    const imageKey = image.substring(image.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", {
        imageKey,
      })
      .then((res) => {
        if (res.data.success) {
          setImage("");
        }
      })
      .catch((error) => {
        toast("Something went wrong");
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };
  const deleteCoverImageWhileDeletingProfile = (coverImage: string) => {
    setCoverImageIsDeleting(true);
    const imageKey = coverImage.substring(coverImage.lastIndexOf("/") + 1);
    axios
      .post("/api/uploadthing/delete", {
        imageKey,
      })
      .then((res) => {
        if (res.data.success) {
          setCoverImage("");
        }
      })
      .catch((error) => {
        toast("Something went wrong");
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  const handleDeleteProfile = async (profile: ProfileWithProjects) => {
    setIsProfileDeleting(true);

    const ok = await confirm();

    if (ok) {
      try {
        deleteImageWhileDeletingProfile(profile.image);
        deleteCoverImageWhileDeletingProfile(profile.coverImage);
        await axios.delete(`/api/profile/${profile.id}`);
        router.push("/profile/new");
        setIsProfileDeleting(false);
        toast("Profile deleted successfully");
      } catch (error: any) {
        console.log(error);

        setIsProfileDeleting(false);
        toast(`Something went wrong`);
      }
    } else {
      setIsProfileDeleting(false);
    }
  };

  const handleDialogueOpen = () => {
    setOpenDialog((prev) => !prev);
  };

  return (
    <>
      <ConfirmDialogue />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 z-20">
          <h3 className="text-2xl font-semibold flex items-center justify-center lg:inline-block underline">
            {profile ? "Update Profile" : "Create Your Profile On Dev Commune"}
          </h3>
          <div className="flex flex-col md:flex-row gap-7">
            <div className="flex-1 flex flex-col gap-5">
              <CustomFormField
                control={form.control}
                name="name"
                description="provide your name"
                label="Profile Name *"
                placeholder="John Doe"
                type="text"
              />
              <CustomFormField
                control={form.control}
                name="email"
                description="provide your email address"
                label="Email Address *"
                placeholder="john@gmail.com"
                type="text"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  control={form.control}
                  name="contact"
                  description="enter mobile number "
                  label="Contact Number *"
                  placeholder="9832804761"
                  type="number"
                />
                <CustomFormField
                  control={form.control}
                  name="whatsapp"
                  description="enter whatsapp number "
                  label="Whatsapp Number"
                  placeholder="9832804761"
                  type="number"
                />
              </div>

              {/* uploadthing button */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2 mt-4">
                    <FormLabel>Upload a Profile *</FormLabel>
                    <FormDescription>
                      Upload a beautiful profile image
                    </FormDescription>
                    <FormControl>
                      {image ? (
                        <>
                          <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 border-2 border-dotted border-gray-400 rounded-sm">
                            <Image
                              src={image}
                              alt="hotel banner"
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
                                setImage((res[0] as any).url);

                                toast("Image uploaded successfully");
                              }}
                              onUploadError={(error: Error) => {
                                toast(`ERROR! ${error.message}`);
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
              <CustomFormFieldTextarea
                control={form.control}
                name="about"
                description="describe yourself"
                label="Profile description *"
                placeholder="Hi I am John Doe, B. Tech Student at UEMk"
              />
              <CustomFormField
                control={form.control}
                name="collegeName"
                description="enter your college name"
                label="College Name *"
                placeholder="UEMk"
                type="text"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  control={form.control}
                  name="degree"
                  description="enter your psersuing degree at short form"
                  label="Your degree *"
                  placeholder="B.Tech"
                  type="text"
                />
                <CustomFormField
                  control={form.control}
                  name="branch"
                  description="enter your stream"
                  label="Your stream *"
                  placeholder="Computer Science"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  control={form.control}
                  name="presentYear"
                  description="enter present year of your study"
                  label="Education year *"
                  placeholder="3rd year"
                  type="text"
                />
                <CustomFormField
                  control={form.control}
                  name="graduationYear"
                  description="enter your graduation year"
                  label="Passing out year"
                  placeholder="YYYY"
                  type="text"
                />
              </div>
              <div>
                <FormLabel className="text-lg">Technologies Acquired</FormLabel>
                <FormDescription>technologies you have learn</FormDescription>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="webdev"
                    label="Web Dev"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="appdev"
                    label="App Dev"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="ml"
                    label="Mechine Learning"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="ai"
                    label="AI"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="blockchain"
                    label="Blockchain"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="cloud"
                    label="Cloud Computing"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="uiux"
                    label="UI / UX"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="coding"
                    label="Coding"
                  />
                </div>
              </div>
              {/* uploadthing button */}
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2 mt-4">
                    <FormLabel>Upload a Cover Image *</FormLabel>
                    <FormDescription>
                      Upload a image for your psofile banner
                    </FormDescription>
                    <FormControl>
                      {coverImage ? (
                        <>
                          <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4 border-2 border-dotted border-gray-400 rounded-sm">
                            <Image
                              src={coverImage}
                              alt="hotel banner"
                              fill
                              className="object-contain p-2"
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="absolute right-0 top-0 "
                              onClick={() => handleCoverImageDelete(coverImage)}
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
                                setCoverImage((res[0] as any).url);

                                toast("Cover Image uploaded successfully");
                              }}
                              onUploadError={(error: Error) => {
                                toast(`ERROR! ${error.message}`);
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
            </div>
            <div className="flex-1 flex flex-col gap-5 -mt-1.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  control={form.control}
                  name="github"
                  description="enter github profile"
                  label="Github ID"
                  placeholder="https://github.com/"
                  type="text"
                />
                <CustomFormField
                  control={form.control}
                  name="instagram"
                  description="enter instagram profile"
                  label="Instagram ID"
                  placeholder="https://www.instagram.com/"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CustomFormField
                  control={form.control}
                  name="linkedIn"
                  description="enter linkedin profile"
                  label="Linkedin ID"
                  placeholder="https://www.linkedin.com/in/"
                  type="text"
                />
                <CustomFormField
                  control={form.control}
                  name="twitter"
                  description="enter twitter profile"
                  label="Twitter ID"
                  placeholder="https://twitter.com/username"
                  type="text"
                />
              </div>
              <CustomFormField
                control={form.control}
                name="portfolio"
                description="enter portfolio website link"
                label="Portfolio Website"
                placeholder="https://portfolio.app/"
                type="text"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Country *</FormLabel>
                      <FormDescription className="text-[12px]">
                        select yout country
                      </FormDescription>
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select Your Country"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem
                              key={country.isoCode}
                              value={country.isoCode}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your State *</FormLabel>
                      <FormDescription className="text-[12px]">
                        select your state
                      </FormDescription>
                      <Select
                        disabled={isLoading || states.length < 1}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select Your State"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem
                              key={state.isoCode}
                              value={state.isoCode}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select City </FormLabel>
                    <FormDescription className="text-[12px]">
                      select your city name
                    </FormDescription>
                    <Select
                      disabled={isLoading || cities.length < 1}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Your City"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <CustomFormFieldTextarea
                control={form.control}
                name="address"
                description="enter your nearby location with PIN code"
                label="Proper Location *"
                placeholder="M.G.Road, PIN-700004"
              />
              <div className="mb-1">
                <FormLabel className="text-lg">Programming Languages</FormLabel>
                <FormDescription>you're proficient in</FormDescription>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="c"
                    label="C"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="cpp"
                    label="C++"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="java"
                    label="JAVA"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="python"
                    label="Python"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="javascript"
                    label="Java Script"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="nextjs"
                    label="Next Js"
                  />
                  <CustomFormFieldCheckBox
                    control={form.control}
                    name="nodejs"
                    label="Node Js"
                  />
                </div>
              </div>
              <CustomFormFieldTextarea
                control={form.control}
                name="techStack"
                description="other languages you know"
                label="Your Favourite TechStack / Other languages"
                placeholder="Primarily Passionate About MERN Stack Projects and have a basic knowledge of Flutter"
              />
              <CustomFormFieldTextarea
                control={form.control}
                name="experience"
                description="detail Your Tech Field Experiences or Completed Projects"
                label="Experience in the field / Projects"
                placeholder=""
              />

              <div className="flex justify-between gap-2 flex-wrap">
                {profile ? (
                  <Button disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 animate-spin h-4 w-4" />
                        Updating
                      </>
                    ) : (
                      <>
                        <PencilLine className="mr-2 h-4 w-4" />
                        Update Details
                      </>
                    )}
                  </Button>
                ) : (
                  <>
                    <Button disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin h-4 w-4" />
                          Creating
                        </>
                      ) : (
                        <>
                          <PackagePlus className="mr-2 h-4 w-4" />
                          Create Profile
                        </>
                      )}
                    </Button>
                  </>
                )}

                {profile && (
                  <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger>
                      <Button type="button" className="w-[150px]">
                        <CirclePlus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[950px] w-[90%]">
                      <DialogHeader className="px-2">
                        <DialogTitle>Add A Project</DialogTitle>
                        <DialogDescription>
                          Add your projects to showcase
                        </DialogDescription>
                        <Separator />
                      </DialogHeader>
                      <AddProjectForm
                        profile={profile}
                        handleDialogOpen={handleDialogueOpen}
                      />
                    </DialogContent>
                  </Dialog>
                )}

                {profile && (
                  <Button
                    variant="outline"
                    type="button"
                    className="w-[150px]"
                    disabled={isProfileDeleting || isLoading}
                    onClick={() => handleDeleteProfile(profile)}
                  >
                    {isProfileDeleting ? (
                      <>
                        <Loader2 className="mr-1 animate-spin h-4 w-4" />
                        Deleting
                      </>
                    ) : (
                      <>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Profile
                      </>
                    )}
                  </Button>
                )}
              </div>
              {profile && (
                <Alert className="bg-gradient-to-r from-[#fa8cff] via-[#9182ff] to-[#0476ff]  dark:text-white mt-1 lg:mt-3 text-black">
                  <Terminal className="h-4 w-4 stroke-white dark:stroke-black" />
                  <AlertTitle>Add Your Projects</AlertTitle>
                  <div className="flex flex-row gap-8 mt-2 items-center">
                    <AlertDescription>
                      Your profile Created Successfully 🔥
                      <div>
                        Please add some projects to rank up your profile
                      </div>
                    </AlertDescription>
                    {profile && (
                      <Button
                        type="button"
                        className="w-[120px]"
                        onClick={() =>
                          router.push(`/profile-details/${profile.id}`)
                        }
                      >
                        <Eye className="mr-2 h-4 w-4" /> Preview
                      </Button>
                    )}
                  </div>
                </Alert>
              )}
              {profile && profile.verified && (
                <Alert className="bg-gradient-to-r from-[#fb3a5d] via-[#f97316] to-[#eab308]  dark:text-white mt-1 lg:mt-3 text-black">
                  <ShieldCheck className="h-5 w-5 stroke-black dark:stroke-white" />
                  <AlertTitle>Add Your Projects</AlertTitle>
                  <div className="flex flex-row gap-8 mt-2 items-center">
                    <AlertDescription>
                      Congratulation 🎉 Your profile is verified
                      <div>Extra fetaures are unlocked for you</div>
                    </AlertDescription>
                    {profile && (
                      <AdminDrawerModal profile={profile}>
                        <Button type="button" className="w-[120px]">
                          <DraftingCompass className="mr-2 h-5 w-5" />
                          Manage
                        </Button>
                      </AdminDrawerModal>
                    )}
                  </div>
                </Alert>
              )}
            </div>
          </div>
        </form>
      </Form>
      {profile && profile.projects.length > 0 && (
        <div className="mt-5">
          <Separator />
          <h3 className="text-2xl underline font-semibold my-2 mb-4">
            Your Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {profile.projects.map((project) => (
              <ProjectCard
                key={project.id}
                profile={profile}
                project={project}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AddProfileForm;

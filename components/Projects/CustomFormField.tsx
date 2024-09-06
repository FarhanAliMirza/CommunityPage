import { addNewProfileFormSchema } from "@/schemas/addNewProfileSchema";
import { IoLogoJavascript, IoSettings } from "react-icons/io5";
import { RiNextjsFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineCode } from "react-icons/ai";
import { GrReactjs } from "react-icons/gr";
import {
  SiExpress,
  SiFirebase,
  SiGraphql,
  SiMongodb,
  SiMysql,
  SiShadcnui,
  SiTypescript,
  SiFlutter,
} from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandCpp } from "react-icons/tb";
import { IoLogoCss3 } from "react-icons/io";
import React from "react";
import { Control, FieldPath, useController } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { Textarea, TextareaProps } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Bot, CodeXml, Dumbbell, Terminal } from "lucide-react";
import { MdCloudUpload, MdOutlineAppShortcut } from "react-icons/md";
import { GiFrozenBlock } from "react-icons/gi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaHtml5, FaJava, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { addNewProjectsSchema } from "@/schemas/addNewProjectsSchema";

interface CustomInputFormFieldPropsProject {
  control: Control<z.infer<typeof addNewProjectsSchema>>;
  label: string;
  name: FieldPath<z.infer<typeof addNewProjectsSchema>>;
  placeholder?: string;
  type?: string;
  description?: string;
  data?: any;
  disableState?: any;
}

export const CustomFormFieldProject = ({
  control,
  name,
  label,
  placeholder,
  type,
  description,
}: CustomInputFormFieldPropsProject) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <div className="form-item">
          <FormLabel className="form-label text-[1rem]">{label}</FormLabel>
          <FormDescription className="pb-2">{description}</FormDescription>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type}
                {...(field as unknown as InputProps)}
              />
            </FormControl>
            {error && (
              <FormMessage className="form-message mt-2 ml-[2px]">
                {error.message}
              </FormMessage>
            )}
          </div>
        </div>
      )}
    />
  );
};

export const CustomFormFieldTextareaProject = ({
  control,
  name,
  label,
  placeholder,
  description,
}: CustomInputFormFieldPropsProject) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <div className="form-item">
          <FormLabel className="form-label text-[1rem]">{label}</FormLabel>
          <FormDescription className="pb-2">{description}</FormDescription>
          <div className="flex w-full flex-col">
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className="input-class resize-none h-[100px]"
                {...(field as unknown as TextareaProps)}
              />
            </FormControl>
            {error && (
              <FormMessage className="form-message mt-2 ml-[2px]">
                {error.message}
              </FormMessage>
            )}
          </div>
        </div>
      )}
    />
  );
};

export const CustomFormFieldCheckBoxProject = ({
  control,
  name,
  label,
  placeholder,
  description,
}: CustomInputFormFieldPropsProject) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="form-label text-[1rem]">
            {placeholder}
          </FormLabel>
          <FormDescription className="">{description}</FormDescription>
          <div className="flex items-center gap-2 border p-2 rounded-md border-gray-600 dark:border-slate-400">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <span className="flex items-center gap-2">
              {name === "mongodb" ? (
                <SiMongodb
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "react" ? (
                <GrReactjs
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "nextjs" ? (
                <RiNextjsFill
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "html" ? (
                <FaHtml5
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "css" ? (
                <IoLogoCss3
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "javascript" ? (
                <IoLogoJavascript
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "typescript" ? (
                <SiTypescript
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "nodejs" ? (
                <FaNodeJs
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "shadcn" ? (
                <SiShadcnui
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "postgresql" ? (
                <BiLogoPostgresql
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "mysql" ? (
                <SiMysql
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "firebase" ? (
                <SiFirebase
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "graphql" ? (
                <SiGraphql
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "express" ? (
                <SiExpress
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : name === "flutter" ? (
                <SiFlutter
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : name === "java" ? (
                <FaJava
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : name === "reactnative" ? (
                <FaReact
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : (
                ""
              )}
              <FormLabel>{label}</FormLabel>
            </span>
          </div>
        </FormItem>
      )}
    />
  );
};

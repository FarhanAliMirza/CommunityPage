import { addNewProfileFormSchema } from "@/schemas/addNewProfileSchema";
import { IoLogoJavascript, IoSettings } from "react-icons/io5";
import { RiNextjsFill } from "react-icons/ri";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineCode } from "react-icons/ai";
import { TbBrandCpp } from "react-icons/tb";
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
import { FaJava, FaNodeJs, FaPython } from "react-icons/fa";

interface CustomInputFormFieldProps {
  control: Control<z.infer<typeof addNewProfileFormSchema>>;
  label: string;
  name: FieldPath<z.infer<typeof addNewProfileFormSchema>>;
  placeholder?: string;
  type?: string;
  description?: string;
  data?: any;
  disableState?: any;
}

export const CustomFormField = ({
  control,
  name,
  label,
  placeholder,
  type,
  description,
}: CustomInputFormFieldProps) => {
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

export const CustomFormFieldTextarea = ({
  control,
  name,
  label,
  placeholder,
  description,
}: CustomInputFormFieldProps) => {
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
// export const CustomFormFieldSelectModal = ({
//   control,
//   name,
//   label,
//   placeholder,
//   description,
//   data,
//   disableState,
// }: CustomInputFormFieldProps) => {
//   const {
//     field,
//     fieldState: { error },
//   } = useController({
//     name,
//     control,
//   });

//   return (
//     <FormField
//       control={control}
//       name="country"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <FormDescription className="text-[12px]">
//             {description}
//           </FormDescription>
//           <Select
//             disabled={disableState}
//             onValueChange={field.onChange}
//             value={field.value}
//             defaultValue={field.value}
//           >
//             <SelectTrigger className="bg-background">
//               <SelectValue
//                 defaultValue={field.value}
//                 placeholder="Select Your Country"
//               />
//             </SelectTrigger>
//             <SelectContent>
//               {data.map((country: any) => (
//                 <SelectItem key={country.isoCode} value={country.isoCode}>
//                   {country.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </FormItem>
//       )}
//     />
//   );
// };

export const CustomFormFieldCheckBox = ({
  control,
  name,
  label,
  placeholder,
  description,
}: CustomInputFormFieldProps) => {
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
          <div className="flex items-center gap-2 border p-2 rounded-md border-gray-600 dark:border-slate-400">
            <FormControl>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <span className="flex items-center gap-2">
              {name === "webdev" ? (
                <CodeXml
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "appdev" ? (
                <MdOutlineAppShortcut
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "cloud" ? (
                <MdCloudUpload
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "ml" ? (
                <IoSettings
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "ai" ? (
                <Bot size={16} className="text-gray-600 dark:text-slate-200 hidden lg:block" />
              ) : name === "uiux" ? (
                <CgWebsite
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "blockchain" ? (
                <GiFrozenBlock
                  size={16}
                  className="text-gray-600 dark:text-slate-200 hidden lg:block"
                />
              ) : name === "java" ? (
                <FaJava
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : name === "c" ? (
                <Terminal
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : name === "javascript" ? (
                <IoLogoJavascript
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : name === "python" ? (
                <FaPython
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : name === "cpp" ? (
                <TbBrandCpp
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : name === "nodejs" ? (
                <FaNodeJs
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : name === "nextjs" ? (
                <RiNextjsFill
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              ) : (
                <AiOutlineCode
                  size={16}
                  className="text-gray-600 dark:text-slate-200"
                />
              )}
              <FormLabel>{label}</FormLabel>
            </span>
          </div>
        </FormItem>
      )}
    />
  );
};

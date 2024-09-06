"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { ProfileWithProjects } from "../Forms/AddProfileForm";
import IconToggle from "./ToggleButton";

const AdminDrawerModal = ({
  children,
  profile,
}: {
  children: any;
  profile: any;
}) => {
  const [verifiedButton, setVerifiedButton] = useState(true);
  return (
    <div className="">
      <Drawer>
        <DrawerTrigger>{children}</DrawerTrigger>
        <DrawerContent className="max-h-[80vh] lg:max-h-[60vh] h-full w-full px-8 py-4">
          <div className="flex flex-col md:flex-row gap-7">
            <div className="flex-1 flex flex-col gap-5">
              <div>
                <DrawerTitle>Enhance your profile</DrawerTitle>
                <DrawerDescription>
                  Change your profile visibility and other settings
                </DrawerDescription>
              </div>
              <div className="flex flex-row gap-3">
                <h1>Verified Badge</h1>
                <IconToggle />
              </div>
              {/* <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter> */}
            </div>
            <div className="flex-1 flex flex-col gap-5">part 2</div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AdminDrawerModal;

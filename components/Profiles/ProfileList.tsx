import { Profile, Project } from "@prisma/client";
import React from "react";
import { ProfileWithProjects } from "../Forms/AddProfileForm";
import ProfileCard from "./ProfileCard";
import { Separator } from "../ui/separator";

const ProfileList = ({ profiles }: { profiles: ProfileWithProjects[] }) => {
  return (
    <div className="">
      <h3 className="text-2xl underline mb-2 ">Members</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3 mb-6">
        {profiles.map((profile) => {
          return (
            <div key={profile.id}>
              <ProfileCard profile={profile} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileList;

{
  /* <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div> */
}

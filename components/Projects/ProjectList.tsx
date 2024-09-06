"use client"
import { Project } from "@prisma/client";
import React from "react";
import ProjectCardClient from "./ProjectCardClient";

interface ProjectsProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectsProps) => {
  
  return (
    <div className="">
      <h3 className="text-2xl underline mb-2">Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-3 ">
       {projects.map((project,) => (
        <div key={project.id}>
            <ProjectCardClient project={project} />
        </div>
       ))}
      </div>
    </div>
  );
};

export default ProjectList;

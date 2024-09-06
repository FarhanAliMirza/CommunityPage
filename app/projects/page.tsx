
// import ProjectCard from "@/components/Projects/ProjectCard";
// import ProjectCardClient from "@/components/Projects/ProjectCardClient";
// import ProjectList from "@/components/Projects/ProjectList";
// import PageWrapper from "@/components/layout/PgaeWrapper";
// import React from "react";

// interface ProjectProps {
//   searchParams: {
//     title: string;
//     description: string;
//     techStack: string;
//   };
// }
// const Projects = async ({ searchParams }: ProjectProps) => {
//   const projects = await getProjects(searchParams);
  

//   if(!projects) return <div>Projects not found...</div>
//   return (
//     <PageWrapper>
//       <div className="mt-[4rem] pt-6 min-h-screen h-full w-full px-8 bg-slate-400/20 dark:bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:30px_30px]">
//         <ProjectList projects={projects} />
//       </div>
//     </PageWrapper>
//   );
// };

// export default Projects;
import React from 'react'

const page = () => {
  return (
    <div>
      Projects Page
    </div>
  )
}

export default page

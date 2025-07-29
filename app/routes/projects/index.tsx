import { useState } from "react"; 
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Project } from '~/types';
import Pagination from "~/components/Pagination";

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const response = await fetch("http://localhost:5000/projects");
  const data = await response.json();

  return { projects: data };
}

function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData as { projects: Project[] };
  
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 2;
  const totalPages = Math.ceil(projects.length / perPage);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  const currentProjects = projects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className='text-3xl font-bold text-white mb-8'>My Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  )
}

export default ProjectsPage
import { useState } from "react"; 
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Project } from '~/types';

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

  const renderPagination = () => (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({length: totalPages}, (_, index) => (
        <button
          key={index + 1}
          className={`px-3 py-1 cursor-pointer rounded ${
            currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <h2 className='text-3xl font-bold text-white mb-8'>My Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      { totalPages > 1 && renderPagination()}
    </>
  )
}

export default ProjectsPage
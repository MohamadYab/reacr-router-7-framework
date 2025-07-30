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
  const perPage = 4;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category))
  ]

  const filteredProjects = selectedCategory === "All" ? projects
    : projects.filter((project) => project.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / perPage);

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className='text-3xl font-bold text-white mb-8'>My Projects</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${
              selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

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
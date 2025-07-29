// Client Side loader for demo purposes
import { Link } from "react-router";
import type { Route } from "./+types/ProjectDetails";
import type { Project } from "~/types";

export async function clientLoader({ request, params }: Route.ClientLoaderArgs): Promise<Project> {
  const response = await fetch(`http://localhost:5000/projects/${params.id}`);
  if (!response.ok) throw new Response("Project not found", { status: 404 });
  const project: Project = await response.json();
  return project;
}

export function HydrateFallback() {
  return <div>Loading...</div>
}

function ProjectDetailsPage({ loaderData }: Route.ComponentProps) {
  const project: Project = loaderData;

  return (
    <>
      <Link
        to="/projects"
        className="block text-blue-400 hover:text-blue-500 transition mb-6"
      >
        Back To Projects
      </Link>
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            {project.title}
          </h1>
          <p className="text-gray-300 text-sm mb-4">
            {new Date(project.date).toLocaleDateString()} - {project.category}
          </p>
          <p className="text-gray-200 mb-6">
            {project.description}
          </p>
        </div>
      </div>
    </>
  )
}

export default ProjectDetailsPage
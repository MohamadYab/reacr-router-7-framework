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
  console.log(projects);

  return (
    <>
      <h2 className='text-3xl font-bold text-white mb-8'>My Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  )
}

export default ProjectsPage
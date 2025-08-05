import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL("/posts-meta.json", request.url);

  const response = await fetch(url.href);
  if (!response.ok) throw new Error("Failed to fetch data");

  const data = await response.json();

  // get slug from the parameters
  const { slug } = params;

  // Checking if the URL has a matching slug in JSON file
  const postMeta = data.find((post: PostMeta) => post.slug === slug);
  if (!postMeta) throw new Response("Not Found", {status: 404});

  // Dynamically import raw markdown
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default
  }
}
type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  }
}

function BlogPostDetailsPage({ loaderData }: BlogPostDetailsPageProps) {
  const { postMeta, markdown } = loaderData;

  return (
    <div
      className="max-w-3xl mx-auto px-6 py-12 bg-gray-900"
    >
      <h1 className="text-3xl-font-bold text-blue-400 mb-2">
        {postMeta.title}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(postMeta.date).toLocaleDateString()}
      </p>

      <div className="max-w-none mb-12">
        <ReactMarkdown>
          {markdown}
        </ReactMarkdown>
      </div>

      <Link
        to="/blogs"
        className="cursor-pointer text-blue-300 text-sm hover:underline"
      >
        Back to Posts
      </Link>
    </div>
  )
}

export default BlogPostDetailsPage
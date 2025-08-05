import { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import { Link } from "react-router";
import Pagination from "~/components/Pagination";

export async function loader({request}: Route.LoaderArgs): Promise<{posts: PostMeta[]}> {
  // Create a URL we can use to fetch from
  const url = new URL("/posts-meta.json", request.url);

  const response = await fetch(url.href);
  if (!response.ok) throw new Error("Failed to fetch data");

  const data = await response.json();
  return { posts: data };
}

function BlogPage({loaderData}: Route.ComponentProps) {
  const { posts } = loaderData;
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(posts.length / perPage);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;

  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  return (
   <div
    className="mx-w-3xl mx-auto mt-10 p-6 bg-gray-900"
   >
      <h2 className='text-3xl font-bold text-white mb-8'>Blog Page</h2>
      {currentPosts.map((post) => (
        <article
          key={post.slug}
          className="bg-gray-800 p-6 rounded-lg shadow mb-4"
        >
          <h3 className="text-2xl font-semibold text-blue-400">
            {post.title}
          </h3>
          <Link
            to={`/blog/${post.slug}`}
            className="cursor-pointer text-blue-300 text-sm hover:underline"
          >
            Read More
          </Link>
        </article>
      ))}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default BlogPage
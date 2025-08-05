import { Link } from "react-router"

function NotFoundPage() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 text-center px-6 min-h-[70vh]"
    >
      <h1 className="text-6xl font-extrabold text-blue-400">
        404
      </h1>
      <h2 className="text-2xl font-semi-bold text-gray-100">
        Page Not Found
      </h2>
      <p className="text-gray-400">
        Sorry, the page you are looking for does not exist
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFoundPage
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Go Home
      </Link>
    </section>
  );
}
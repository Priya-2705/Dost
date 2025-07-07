import { connectDB } from '@/lib/mongodb';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  await connectDB();

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/uploads/dost-bg.jpg')" }}
    >
      <Sidebar />

<main className="flex-1 px-8 pb-12 flex flex-col items-center pt-16 backdrop-blur-sm bg-white/70">
        {/* Hero Section */}
        <section className="max-w-4xl text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
            Welcome to Dost <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl">
            A space where developers connect, share knowledge, and grow together. Start sharing your ideas today.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/create">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                ✍ Start Writing
              </button>
            </Link>
            <Link href="/posts">
              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">
                🔍 Explore Posts
              </button>
            </Link>
          </div>
        </section>

        {/* Hero Illustration */}
        <section className="w-full max-w-4xl mb-10">
          <Image
            src="/uploads/dost-hero.png" // ✅ updated path
            alt="Developer Community"
            width={900}
            height={500}
            className="rounded-xl shadow-md object-cover mx-auto"
          />
        </section>

        {/* Feature Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mt-10">
          <div className="bg-white/90 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">💬 Share Dev Thoughts</h3>
            <p className="text-gray-600 text-sm">
              Express your coding journey, write tutorials, and share insights with fellow developers.
            </p>
          </div>

          <div className="bg-white/90 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">📚 Learn from Others</h3>
            <p className="text-gray-600 text-sm">
              Read posts, discover tips, and level up your knowledge through real-world experiences.
            </p>
          </div>

          <div className="bg-white/90 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">🌍 Grow Your Network</h3>
            <p className="text-gray-600 text-sm">
              Follow creators, comment on posts, and build meaningful developer connections.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
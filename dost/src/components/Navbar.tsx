export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-blue-600">Dost</div>
      <div className="space-x-4">
        <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
        <a href="/explore" className="text-gray-700 hover:text-blue-600">Explore</a>
        <a href="/create" className="text-gray-700 hover:text-blue-600">Create</a>
        <a href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
      </div>
    </nav>
  );
}
"use client";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBDE] px-4">
      <div className="max-w-md w-full bg-white border border-[#90D1CA] rounded-xl shadow p-8 space-y-6">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-[#096B68]">Create a Dost Account</h2>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="mt-1 block w-full px-4 py-2 border border-[#90D1CA] rounded-md shadow-sm focus:ring-[#129990] focus:border-[#129990]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-[#90D1CA] rounded-md shadow-sm focus:ring-[#129990] focus:border-[#129990]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-1 block w-full px-4 py-2 border border-[#90D1CA] rounded-md shadow-sm focus:ring-[#129990] focus:border-[#129990]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#129990] text-white py-2 px-4 rounded hover:bg-[#096B68] transition"
          >
            Register
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-sm text-center text-gray-500 pt-2">
          Already have an account?{" "}
          <a href="/signin" className="text-[#129990] hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
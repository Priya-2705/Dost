// dost/src/app/about/page.tsx
import Image from 'next/image';

const team = [
  {
    name: 'Priya Pillarisetty',
    role: 'Lead Frontend Developer — Architecture, UI/UX, Feature Integration',
    location: 'Toronto, CA',
    avatar: '/uploads/1752519288488-ironman.jpeg',
  },
  {
    name: 'Harshini',
    role: 'Frontend Developer — Tagging System & Micro-Idea Flow',
    location: 'Chennai, IN',
    avatar: '/uploads/1751835949665-snowwhite.jpeg',
  },
  {
    name: 'Sai',
    role: 'Frontend Developer — Homepage Styling & Component Layouts',
    location: 'Hyderabad, IN',
    avatar: '/uploads/1751858219832-Mickey17.jpeg',
  },
  {
    name: 'Sadhana',
    role: 'Frontend Developer — Bookmarking UI & Emoji Reactions',
    location: 'Vancouver, CA',
    avatar: '/uploads/1751834475822-CaptainAmerica.jpeg',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">For devs, by devs</h1>
      <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto mb-12">
        Dost is a community-driven platform designed for developers, testers, and creators to share insights. Built by a frontend-focused team, it brings together structure and creativity for modern dev storytelling.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((member, i) => (
          <div key={i} className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 shadow">
              <Image
                src={member.avatar}
                alt={member.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-600 text-sm">{member.role}</p>
            <p className="text-gray-500 text-xs">{member.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
import PostCard from "@/components/PostCard";
import TagFilter from "@/components/TagFilter";
import SearchBar from "@/components/SearchBar";

type Post = {
  id: string;
  title: string;
  type: "markdown" | "micro";
  tags: string[];
  reactions: {
    clap: number;
    idea: number;
    mindblown: number;
  };
};

const dummyPosts: Post[] = [
  {
    id: "1",
    title: "How to Use React Hooks",
    type: "markdown",
    tags: ["React", "Frontend"],
    reactions: { clap: 5, idea: 2, mindblown: 1 },
  },
  {
    id: "2",
    title: "Dark mode toggle is a must 💡",
    type: "micro",
    tags: ["UI", "UX"],
    reactions: { clap: 3, idea: 4, mindblown: 0 },
  },
];

export default function ExplorePage() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Explore Posts</h1>
      <SearchBar />
      <TagFilter tags={["React", "UI", "DevOps", "AI"]} />
      <div className="grid gap-4 mt-6">
        {dummyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
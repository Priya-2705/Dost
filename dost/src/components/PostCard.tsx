import Link from "next/link";

interface PostCardProps {
  _id?: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  onDelete?: () => void;
  onEdit?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  _id,
  title,
  content,
  author,
  date,
  tags,
  onDelete,
  onEdit,
}) => {
  return (
    <Link href={`/post/${_id}`} className="block">
      <div className="bg-[#FFFBDE] border border-[#90D1CA] rounded-xl p-6 shadow transition hover:shadow-md space-y-4 hover:cursor-pointer">
        <h2 className="text-2xl font-bold text-[#096B68]">{title}</h2>
        <p className="text-gray-700 leading-relaxed">
          {content.length > 250 ? content.slice(0, 250) + "..." : content}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="bg-[#129990] text-white text-xs px-3 py-1 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center pt-2 text-sm text-gray-600 border-t border-[#90D1CA] mt-2 pt-4">
          <span>By <span className="font-semibold text-[#096B68]">{author}</span></span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
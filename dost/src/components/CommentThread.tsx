// components/CommentThread.tsx
import React from "react";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  replies?: Comment[];
}

interface CommentThreadProps {
  comments: Comment[];
}

const formatContent = (content: string) => {
  const lines = content.split("\n");
  return lines.map((line, index) => {
    if (line.startsWith("```")) {
      return <pre key={index} className="bg-[#FFFBDE] border-l-4 border-[#129990] p-3 my-2 text-sm font-mono overflow-x-auto rounded-md">{line.replace("```", "")}</pre>;
    }
    if (line.startsWith("#")) {
      return <span key={index} className="text-[#129990] font-medium mr-1">{line}</span>;
    }
    return <p key={index} className="text-gray-800">{line}</p>;
  });
};

const CommentThread: React.FC<CommentThreadProps> = ({ comments }) => {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="border border-[#90D1CA] p-4 rounded-lg bg-white shadow-sm">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-[#096B68]">{comment.author}</span>
            <span className="text-sm text-gray-500">{comment.date}</span>
          </div>
          <div className="space-y-2">{formatContent(comment.content)}</div>

          {comment.replies && (
            <div className="ml-6 mt-4 border-l-2 border-dashed border-[#90D1CA] pl-4">
              <CommentThread comments={comment.replies} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentThread;
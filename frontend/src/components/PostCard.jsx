import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">
        {post.title}
      </h2>

      <p className="mt-2 text-gray-600">
        {post.content.slice(0, 100)}...
      </p>

      <p className="mt-3 text-sm">
        By {post.author?.name}
      </p>

      <Link
        to={`/posts/${post._id}`}
        className="inline-block mt-4"
      >
        Read More
      </Link>
    </div>
  );
}

export default PostCard;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../components/Loading";
import postService from "../services/postService";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    try {
      setError(null);

      const data = await postService.getPost(id);

      setPost(data.post);

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <h2 className="text-red-500">
        {error}
      </h2>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <h1 className="text-4xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="text-gray-500 mb-6">
        By {post.author?.name}
      </p>

      <div className="leading-7">
        {post.content}
      </div>

    </div>
  );
}

export default PostDetails;
import { useEffect, useState } from "react";
import postService from "../services/postService";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    getPostHandle();
  }, []);

  async function getPostHandle() {
    try {
      setError(null);
      const data = await postService.getPosts();
      setPosts(data.posts);

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  }

  if(loading) {
    return <Loading/>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          BlogNest
        </h1>

        <p className="mt-3 text-gray-600">
          Share your thoughts with the world.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Latest Posts
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <div>
          {posts.map((post)=>{
            return <PostCard key={post._id} post={post}/>
          })}
        </div>
      </section>

    </div>
  );
}

export default Home;
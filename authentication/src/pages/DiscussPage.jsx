import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DiscussPage = () => {
  const { authUser } = useAuthStore();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Load posts
  useEffect(() => {
    fetch("/api/discuss", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setPosts(data.reverse()))
      .catch((err) => console.error("Failed to load posts", err));
  }, []);

  // Create post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await fetch("/api/discuss", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setContent("");
    } else {
      console.error("Post creation failed");
    }
  };

  // Like a post
  const handleLike = async (postId) => {
    const res = await fetch(`/api/discuss/${postId}/like`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) =>
        prev.map((post) => (post._id === updated._id ? updated : post))
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-10 lg:px-32 xl:px-48">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
        💬 DebugMe Discuss
      </h1>

      {/* Create Post */}
      <div className="bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-700 mb-10">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full bg-black border border-zinc-700 p-3 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows={4}
            placeholder="What’s on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="text-right mt-3">
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 font-semibold rounded-md transition"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-zinc-400">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-zinc-900 border border-zinc-700 p-5 rounded-lg shadow-sm"
            >
              <p
                className="font-semibold text-cyan-400 cursor-pointer hover:underline w-fit"
                onClick={() => navigate(`/profile/${post.user?._id}`)}
              >
                {post.user?.fullname}
              </p>
              <p className="text-zinc-300 mt-1">{post.content}</p>

              <button
                onClick={() => handleLike(post._id)}
                className="flex items-center gap-1 mt-3 text-sm text-zinc-400 hover:text-cyan-400 transition"
              >
                <ThumbsUp size={16} />
                <span>{post.likes.length}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DiscussPage;

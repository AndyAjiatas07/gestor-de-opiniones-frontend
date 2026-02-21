import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostsByUserRequest } from "../api/postService";

function UserPosts() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-GT", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await getPostsByUserRequest(userId);
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [userId]);

  if (loading) {
    return <div className="container mt-5">Cargando publicaciones...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Publicaciones de {posts[0]?.author?.username}</h2>

      {posts.length === 0 && (
        <div className="alert alert-info">
          Este usuario no tiene publicaciones.
        </div>
      )}

      {posts.map((post) => (
        <div
          key={post._id}
          className="card mb-3 shadow-sm"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          <div className="card-body">
            <h5>{post.title}</h5>

            <span className="badge bg-secondary mb-2">{post.category}</span>

            <p className="mt-3">{post.content}</p>

            <div className="text-end">
              <small className="text-muted">
                Publicado: {formatDate(post.createdAt)}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;

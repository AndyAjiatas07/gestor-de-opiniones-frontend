import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPostsRequest, deletePostRequest } from "../api/postService";
import { useAuth } from "../context/useAuth";

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await getAllPostsRequest();
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar publicaciones");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePostRequest(id);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-GT", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return <div className="container mt-5">Cargando publicaciones...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>Publicaciones</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/posts/new")}
        >
          + Nueva publicación
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {posts.length === 0 && (
        <div className="alert alert-info">
          No hay publicaciones aún. ¡Sé el primero en crear una!
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
            <p>{post.content}</p>

            <div className="d-flex justify-content-between align-items-start mt-3">
              <div>
                <small className="text-muted d-block mb-2">
                  Autor:{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/users/${post.author?._id}/posts`);
                    }}
                  >
                    {post.author?.username}
                  </span>
                </small>

                {user && post.author?._id === user._id && (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/posts/edit/${post._id}`);
                      }}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post._id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>

              <div className="text-end">
                <small className="text-muted d-block">
                  Publicado: {formatDate(post.createdAt)}
                </small>

                {post.updatedAt !== post.createdAt && (
                  <small className="text-muted d-block">
                    Editado: {formatDate(post.updatedAt)}
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;

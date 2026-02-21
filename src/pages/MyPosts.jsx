import { useEffect, useState } from "react";
import { getMyPostsRequest, deletePostRequest } from "../api/postService";
import { useNavigate } from "react-router-dom";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-GT", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  useEffect(() => {
    const loadMyPosts = async () => {
      try {
        const res = await getMyPostsRequest();
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar tus publicaciones");
      } finally {
        setLoading(false);
      }
    };

    loadMyPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePostRequest(id);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (error) {
      console.error(error);
      setError("No se pudo eliminar la publicación");
    }
  };

  if (loading) {
    return <div className="container mt-5">Cargando publicaciones...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mis publicaciones</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {posts.length === 0 && (
        <div className="alert alert-info">
          Aún no tienes publicaciones. ¡Crea la primera!
        </div>
      )}

      {posts.map((post) => (
        <div
          key={post._id}
          className="card mb-3 shadow-sm"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          {" "}
          <div className="card-body">
            <h5>{post.title}</h5>

            <span className="badge bg-secondary mb-2">{post.category}</span>

            <p className="mt-3">{post.content}</p>

            <div className="d-flex justify-content-between align-items-start mt-4">
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

export default MyPosts;

import { useEffect, useState } from "react";
import {
  getMyCommentsRequest,
  deleteCommentRequest
} from "../api/commentService";
import { useNavigate } from "react-router-dom";

function MyComments() {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-GT", {
      dateStyle: "medium",
      timeStyle: "short"
    });
  };

  useEffect(() => {
    const loadMyComments = async () => {
      try {
        const res = await getMyCommentsRequest();
        setComments(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar tus comentarios");
      } finally {
        setLoading(false);
      }
    };

    loadMyComments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCommentRequest(id);
      setComments((prev) =>
        prev.filter((comment) => comment._id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el comentario");
    }
  };

  if (loading) {
    return <div className="container mt-5">Cargando comentarios...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mis comentarios</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {comments.length === 0 && (
        <div className="alert alert-info">
          Aún no tienes comentarios. ¡Participa en las publicaciones!
        </div>
      )}

      {comments.map((comment) => (
<div key={comment._id} className="card mb-3 shadow-sm">
  <div className="card-body">

    {/* CONTENIDO */}
    <p className="mb-3">{comment.content}</p>

    <div className="d-flex justify-content-between align-items-start">

      {/* IZQUIERDA */}
      <div>
        <small className="text-muted d-block">
          Publicación: {comment.post?.title || "Desconocido"}
        </small>

        <div className="mt-2 d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() =>
              navigate(`/comments/edit/${comment._id}`)
            }
          >
            Editar
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() =>
              handleDelete(comment._id)
            }
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* DERECHA */}
      <div className="text-end">
        <small className="text-muted d-block">
          Publicado: {formatDate(comment.createdAt)}
        </small>

        {comment.updatedAt !== comment.createdAt && (
          <small className="text-muted d-block">
            Editado: {formatDate(comment.updatedAt)}
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

export default MyComments;
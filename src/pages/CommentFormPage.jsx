import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateCommentRequest,
  getCommentByIdRequest,
} from "../api/commentService";

function CommentFormPage() {
  const { commentId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [postId, setPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadComment = async () => {
      try {
        const res = await getCommentByIdRequest(commentId);

        setContent(res.data.content);
        setPostId(res.data.post?._id);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el comentario");
      }
    };

    loadComment();
  }, [commentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postId) return;

    setLoading(true);
    setError(null);

    try {
      await updateCommentRequest(commentId, { content });

      navigate(`/posts/${postId}`);
    } catch (err) {
      console.error(err);
      setError("Error al actualizar el comentario");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (postId) {
      navigate(`/posts/${postId}`);
    }
  };

  if (!postId && !error) {
    return <div className="container mt-5">Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <h4>Editar comentario</h4>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control mb-3"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button
          className="btn btn-dark me-2"
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar"}
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default CommentFormPage;
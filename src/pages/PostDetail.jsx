import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostByIdRequest } from "../api/postService";
import {
  getCommentsByPostRequest,
  createCommentRequest,
  deleteCommentRequest,
} from "../api/commentService";
import { useAuth } from "../context/useAuth";

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const formatDate = (date) => {
    return new Date(date).toLocaleString("es-GT", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const postRes = await getPostByIdRequest(id);
        setPost(postRes.data);

        const commentsRes = await getCommentsByPostRequest(id);
        setComments(commentsRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [id]);

  const handleCreateComment = async (e) => {
    e.preventDefault();

    try {
      const res = await createCommentRequest({
        content: newComment,
        postId: id,
      });

      setComments([res.data.comment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentRequest(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) {
    return <div className="container mt-5">Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h3>{post.title}</h3>

          <span className="badge bg-secondary mb-2">{post.category}</span>

          <p className="mt-3">{post.content}</p>

          <div className="d-flex justify-content-between align-items-start mt-4">
            <div>
              <small className="text-muted d-block">
                Autor:{" "}
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/users/${post.author?._id}/posts`)}
                >
                  {post.author?.username}
                </span>
              </small>
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

      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h5>Comentarios</h5>

          <form onSubmit={handleCreateComment} className="mb-3">
            <textarea
              className="form-control mb-2"
              rows="2"
              placeholder="Escribe un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button className="btn btn-dark btn-sm">Comentar</button>
          </form>

          {comments.length === 0 && (
            <div className="alert alert-info">
              No hay comentarios aún. ¡Sé el primero en comentar!
            </div>
          )}

          {comments.map((comment) => (
            <div key={comment._id} className="border rounded p-3 mb-3">
              <p className="mb-2">{comment.content}</p>

              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="text-muted d-block">
                    Autor:{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/users/${comment.author?._id}/posts`)
                      }
                    >
                      {comment.author?.username}
                    </span>
                  </small>
                </div>

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

              {user && comment.author?._id === user._id && (
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/comments/edit/${comment._id}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;

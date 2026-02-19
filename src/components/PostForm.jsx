import { useState, useEffect } from "react";
import { createPostRequest, updatePostRequest } from "../api/postService";

function PostForm({ onPostCreated, editingPost, onPostUpdated, cancelEdit }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPost) {
      setForm({
        title: editingPost.title,
        category: editingPost.category,
        content: editingPost.content,
      });
    }
  }, [editingPost]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let res;

      if (editingPost) {
        res = await updatePostRequest(editingPost._id, form);

        if (onPostUpdated) {
          onPostUpdated(res.data.post); // 🔥 importante usar el objeto correcto
        }
      } else {
        res = await createPostRequest(form);

        if (onPostCreated) {
          onPostCreated(res.data.post); // 🔥 importante usar el objeto correcto
        }
      }

      setForm({ title: "", category: "", content: "" });
    } catch (error) {
      console.log(error.response?.data);
      setError(error.response?.data?.message || "Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({ title: "", category: "", content: "" });
    if (cancelEdit) cancelEdit();
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">
          {editingPost ? "Editar publicación" : "Nueva publicación"}
        </h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            className="form-control mb-2"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Categoría"
            className="form-control mb-2"
            value={form.category}
            onChange={handleChange}
            required
          />

          <textarea
            name="content"
            placeholder="Contenido"
            className="form-control mb-2"
            rows="3"
            value={form.content}
            onChange={handleChange}
            required
          />

          <button className="btn btn-dark me-2" disabled={loading}>
            {loading
              ? "Procesando..."
              : editingPost
              ? "Actualizar"
              : "Publicar"}
          </button>

          {editingPost && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostForm;
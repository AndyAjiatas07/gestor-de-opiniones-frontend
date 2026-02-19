import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { updateProfileRequest, getProfileRequest } from "../api/authService";

function EditProfilePage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos actuales del usuario
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await getProfileRequest();
        setForm({
          username: res.data.username || "",
          email: res.data.email || "",
          oldPassword: "",
          newPassword: "",
        });
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos del perfil");
      }
    };

    loadUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const payload = {};
    if (form.username && form.username !== user.username) payload.username = form.username;
    if (form.email && form.email !== user.email) payload.email = form.email;
    if (form.newPassword) {
      if (!form.oldPassword) {
        setError("Debe ingresar la contraseña actual para cambiarla");
        setLoading(false);
        return;
      }
      payload.oldPassword = form.oldPassword;
      payload.newPassword = form.newPassword;
    }

    if (Object.keys(payload).length === 0) {
      navigate("/profile"); // nada que actualizar
      return;
    }

    // 🔥 Usar el retorno del backend
    const res = await updateProfileRequest(payload);

    setUser(res.data.user); // actualizar contexto con los nuevos datos

    setLoading(false);
    navigate("/profile"); // redirigir al perfil con datos actualizados
  } catch (err) {
    console.error(err.response?.data);
    setError(err.response?.data?.message || "Error al actualizar perfil");
    setLoading(false);
  }
};

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="container mt-5">
      <h2>Editar Perfil</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={form.username}
            onChange={handleChange}
            placeholder="Dejar igual para no cambiar"
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="Dejar igual para no cambiar"
          />
        </div>

        <hr />

        <h5>Cambiar contraseña</h5>
        <div className="mb-3">
          <label>Contraseña actual</label>
          <input
            type="password"
            name="oldPassword"
            className="form-control"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="Requerido solo si cambia contraseña"
          />
        </div>

        <div className="mb-3">
          <label>Nueva contraseña</label>
          <input
            type="password"
            name="newPassword"
            className="form-control"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Dejar en blanco para no cambiar"
          />
        </div>

        <button className="btn btn-primary me-2" disabled={loading}>
          Guardar cambios
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

export default EditProfilePage;
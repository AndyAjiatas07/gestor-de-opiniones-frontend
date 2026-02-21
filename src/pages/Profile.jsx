import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Perfil</h2>

      <p>
        <strong>Nombre:</strong> {user?.username}
      </p>

      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <button
        className="btn btn-outline-primary mt-3"
        onClick={() => navigate("/profile/edit")}
      >
        Editar perfil
      </button>
    </div>
  );
}

export default Profile;

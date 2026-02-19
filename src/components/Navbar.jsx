import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        OpinaNet
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">

          {isAuthenticated ? (
            <>
              <li className="nav-item me-3 mt-2 text-white">
                {user?.name}
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Perfil
                </Link>
              </li>

              <li className="nav-item">
  <Link className="nav-link" to="/users">
    Usuarios
  </Link>
</li>

              <li className="nav-item">
                <Link className="nav-link" to="/my-posts">
                  Mis publicaciones
                </Link>
              </li>

              <li className="nav-item">
  <Link className="nav-link" to="/my-comments">
    Mis comentarios
  </Link>
</li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Registro
                </Link>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
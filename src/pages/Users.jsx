import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Usuarios</h2>

      {users.map((user) => (
        <div
          key={user._id}
          className="card mb-2 p-3 shadow-sm"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/users/${user._id}/posts`)}
        >
          <strong>{user.name}</strong>
          <small className="text-muted d-block">{user.email}</small>
        </div>
      ))}
    </div>
  );
}

export default Users;

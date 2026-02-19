import api from "./axios";

// Obtener todos los posts
export const getAllPostsRequest = () => {
  return api.get("/posts");
};

// Obtener mis posts
export const getMyPostsRequest = () => {
  return api.get("/posts/me");
};

// Crear post
export const createPostRequest = (data) => {
  return api.post("/posts", data);
};

// Actualizar post
export const updatePostRequest = (id, data) => {
  return api.put(`/posts/${id}`, data);
};

// Eliminar post
export const deletePostRequest = (id) => {
  return api.delete(`/posts/${id}`);
};

// Obtener un post por ID
export const getPostByIdRequest = (id) => {
  return api.get(`/posts/${id}`);
};

// Obtener posts por usuario específico
export const getPostsByUserRequest = (userId) => {
  return api.get(`/posts/user/${userId}`);
};
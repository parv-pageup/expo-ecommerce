import { api } from "./reqResInterceptors";

export const signinapi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await api.post("/users/login", { email, password });
};
export const signupapi = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  return await api.post("/users/register", {
    username,
    email,
    password,
  });
};
export const fetchproductsapi = async ({
  page,
  category,
  sortOrder,
  sortBy,
  searchQuery,
}: any) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (category) params.append("category", category);
  if (sortBy) params.append("sortBy", sortBy);
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (searchQuery) params.append("search", searchQuery);

  return await api.get(`/products/products?${params.toString()}`);
};

export const fetchsingleproductapi = async ({
  id,
}: {
  id: string | string[];
}) => {
  return await api.get(`/products/${id}`);
};
export const logout = async () => {
  return await api.post("/users/logout");
};

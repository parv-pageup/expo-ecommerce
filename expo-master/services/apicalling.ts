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
export const fetchproductsapi = async () => {
  return await api.get(`/products/products`);
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

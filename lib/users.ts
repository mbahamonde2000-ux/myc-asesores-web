export type UserRole = "admin" | "usuario" | "cliente";

export type AppUser = {
  id: number;
  nombre: string;
  username: string;
  password: string;
  role: UserRole;
};

export const users: AppUser[] = [
  {
    id: 1,
    nombre: "Administrador MyC",
    username: "admin",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    nombre: "Usuario Interno",
    username: "usuario",
    password: "usuario123",
    role: "usuario",
  },
  {
    id: 3,
    nombre: "Cliente Demo",
    username: "cliente",
    password: "cliente123",
    role: "cliente",
  },
];
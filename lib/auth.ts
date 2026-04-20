import { users, AppUser } from "./users";

export function validateUser(username: string, password: string): AppUser | null {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  return user ?? null;
}

export function getDashboardByRole(role: AppUser["role"]) {
  switch (role) {
    case "admin":
      return "/dashboard/admin";
    case "usuario":
      return "/dashboard/usuario";
    case "cliente":
      return "/dashboard/cliente";
    default:
      return "/login";
  }
}
export function getSession() {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem("myc_session");
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("myc_session");
}
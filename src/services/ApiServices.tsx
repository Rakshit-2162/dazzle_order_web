import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "/api" // local dev proxy
      : import.meta.env.VITE_API_URL, // production
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const login = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("admin_email", email);
  formData.append("admin_password", password);

  const response = await API.post("/admin/login.php", formData);

  const { success, adminRecord } = response.data;

  if (!success) {
    throw new Error("Invalid email or password");
  }

  return { user: adminRecord };
};

export const signup = async () => {};

import axios from "axios";

const API = axios.create({
  baseURL: "https://dazzle-order.store/api_dazzle_order",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const login = async (email: string, password: string) => {
  // format as x-www-form-urlencoded
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

// models/User.ts
export interface User {
  id?: string;         // optional, when creating new user
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user"; // optional, based on your app
  createdAt?: string;  // backend will set
  updatedAt?: string;  // backend will set
}

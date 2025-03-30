export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  avatar: string;
}

export interface UserTokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
  userId: string | null;
  role: string | null;
}

export interface RegisteredUser {
  message: string | null;
  userId: string | null;
  userEmail: string | null;
}

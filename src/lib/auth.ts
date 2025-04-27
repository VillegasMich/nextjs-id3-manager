import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  username: string;
  exp: number;
}

export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const getUserFromToken = (): JwtPayload | null => {
  const token = getToken();
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

export const isLoggedIn = (): boolean => {
  const user = getUserFromToken();
  if (!user) return false;
  const now = Date.now() / 1000;
  return user.exp > now;
};

export const logout = () => {
  localStorage.removeItem('token');
};

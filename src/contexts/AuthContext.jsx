import { createContext, useContext, useEffect, useState } from 'react';

// Local, browser-only auth (no backend). Accounts live in localStorage.
const USERS_KEY = 'localUsers';
const SESSION_KEY = 'localSession';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
};

const publicUser = u => (u ? { email: u.email, displayName: u.displayName } : null);

const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = read(SESSION_KEY, null);
    const found = read(USERS_KEY, []).find(u => u.email === email);
    setUserState(publicUser(found));
    setLoading(false);
  }, []);

  const setUser = next => {
    setUserState(next);
    if (next) {
      const users = read(USERS_KEY, []).map(u =>
        u.email === next.email ? { ...u, displayName: next.displayName } : u,
      );
      write(USERS_KEY, users);
    }
  };

  const signup = async (email, password, name) => {
    const users = read(USERS_KEY, []);
    if (users.some(u => u.email === email)) {
      throw new Error('An account with this email already exists');
    }
    users.push({ email, password, displayName: name });
    write(USERS_KEY, users);
    return { user: { email, displayName: name } };
  };

  const login = async (email, password) => {
    const found = read(USERS_KEY, []).find(
      u => u.email === email && u.password === password,
    );
    if (!found) throw new Error('Invalid email or password');
    write(SESSION_KEY, found.email);
    setUserState(publicUser(found));
    return { user: publicUser(found) };
  };

  const logout = async () => {
    write(SESSION_KEY, null);
    setUserState(null);
  };

  // Used by MyAccount to change the password
  const changePassword = async (currentPassword, newPassword) => {
    const users = read(USERS_KEY, []);
    const idx = users.findIndex(u => u.email === user?.email);
    if (idx === -1 || users[idx].password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }
    users[idx].password = newPassword;
    write(USERS_KEY, users);
  };

  const value = { user, setUser, signup, login, logout, changePassword, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

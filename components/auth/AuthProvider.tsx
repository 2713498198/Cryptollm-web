"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AuthUser = {
  userId: string;
  username: string;
  phone: string;
  registeredAt: string;
  email: string;
  balance: number;
};

type LoginResult = {
  user: AuthUser;
  isNewUser: boolean;
};

type AuthContextValue = {
  user: AuthUser | null;
  isReady: boolean;
  loginWithPhone: (phone: string) => LoginResult;
  logout: () => void;
};

const CURRENT_USER_KEY = "cryptollm.auth.current-user";
const REGISTERED_USERS_KEY = "cryptollm.auth.registered-users";

const AuthContext = createContext<AuthContextValue | null>(null);

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<AuthUser>;
  return (
    typeof candidate.userId === "string" &&
    typeof candidate.username === "string" &&
    typeof candidate.phone === "string" &&
    typeof candidate.registeredAt === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.balance === "number"
  );
}

function readCurrentUser(): AuthUser | null {
  try {
    const value = window.localStorage.getItem(CURRENT_USER_KEY);
    if (!value) {
      return null;
    }
    const parsed: unknown = JSON.parse(value);
    return isAuthUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function readRegisteredUsers(): Record<string, AuthUser> {
  try {
    const value = window.localStorage.getItem(REGISTERED_USERS_KEY);
    if (!value) {
      return {};
    }
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, AuthUser] =>
        isAuthUser(entry[1]),
      ),
    );
  } catch {
    return {};
  }
}

function createAccountId(phone: string) {
  let hash = 0;
  for (const character of phone) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  const phonePart = phone.slice(-4).padStart(4, "0");
  const hashPart = String(hash).padStart(10, "0").slice(-10);
  return `6241${phonePart}${hashPart}`;
}

function createUser(phone: string): AuthUser {
  return {
    userId: createAccountId(phone),
    username: `crypto_${phone.slice(-4)}`,
    phone,
    registeredAt: new Date().toISOString(),
    email: "",
    balance: 0,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const syncAuthState = () => {
      setUser(readCurrentUser());
      setIsReady(true);
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  const loginWithPhone = useCallback((phone: string): LoginResult => {
    const users = readRegisteredUsers();
    const existingUser = users[phone];
    const authenticatedUser = existingUser ?? createUser(phone);

    if (!existingUser) {
      users[phone] = authenticatedUser;
      window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    }

    window.localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(authenticatedUser),
    );
    setUser(authenticatedUser);

    return {
      user: authenticatedUser,
      isNewUser: !existingUser,
    };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isReady, loginWithPhone, logout }),
    [isReady, loginWithPhone, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

import { AxiosResponse } from "axios";
import React, { createContext, useContext, FunctionComponent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { apiClient } from "../utils/apiClient";

const AuthContext = createContext({} as any);

export const useAuth = () => {
  return useContext(AuthContext);
};

export interface AccessTokenPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  sub: number;
  tokenVersion: number;
  iat: number;
  exp: number;
}

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<AccessTokenPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const history = useHistory();

  const signUp = async (email: string, password: string): Promise<AxiosResponse<{ message: string }>> => {
    return await apiClient.post("/auth/signup", { email, password });
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    const res = await apiClient.post<{ accessToken: string }>("/auth/signin", {
      email,
      password
    });
    const accessToken = res.data.accessToken;
    setAccessToken(accessToken);
    setCurrentUser(jwt_decode<AccessTokenPayload>(accessToken));
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    history.push("/");
  };

  const logout = async (): Promise<void> => {
    await apiClient.get<boolean>("/auth/logout");
    setAccessToken(null);
    setCurrentUser(null);
    history.push("/signin");
    window.localStorage.setItem("logout", Date.now().toString());
  };

  const verifyCurrentUser = async (): Promise<boolean> => {
    const res = await apiClient.get<boolean>("/auth/verify_user");
    return res.data;
  };

  useEffect(() => {
    const refreshToken = async () => {
      const refreshTokenExists = await verifyCurrentUser();

      if (refreshTokenExists) {
        try {
          const res = await apiClient.post<{ accessToken: string }>("/auth/refresh_token");
          const newAccessToken = res.data.accessToken;
          apiClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

          setTimeout(async () => {
            await refreshToken();
          }, 900 * 1000 - 500);

          setAccessToken(newAccessToken);
          setCurrentUser(jwt_decode<AccessTokenPayload>(newAccessToken));
        } catch (error) {
          console.log("Couldn't refresh");
        }
      }
      setLoading(false);
    };

    refreshToken();
  }, []);

  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === "logout") {
        console.log("Logged out from storage");
        history.push("/signin");
      }
    };

    window.addEventListener("storage", syncLogout);

    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [history]);

  const value = {
    currentUser,
    accessToken,
    signUp,
    signIn,
    logout
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

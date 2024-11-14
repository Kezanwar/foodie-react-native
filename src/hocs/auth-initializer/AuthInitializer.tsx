import React, { FC, ReactNode, useCallback, useEffect } from "react";

import LocalStorage from "lib/storage";
import { useAppSelector } from "hooks/useAppSelector";
import { authLogin, setIsInitialized } from "store/auth/auth.slice";

import { initializeJWT, postStats } from "lib/api";
import { setSession } from "lib/axios";

import { LoadingScreen } from "components/loading-screen";
import useAppDispatch from "hooks/useAppDispatch";

type Props = {
  children: ReactNode;
};

const AuthInitializer: FC<Props> = ({ children }) => {
  const authState = useAppSelector((state) => state.auth);
  const { isInitialized, isAuthenticated } = authState;

  const dispatch = useAppDispatch();

  const initialize = useCallback(async () => {
    try {
      const accessToken = LocalStorage.getAccessToken();
      if (!accessToken) {
        throw new Error("no token");
      }
      setSession(accessToken);
      const res = await initializeJWT();
      const {
        data: { user },
      } = res;
      dispatch(authLogin(user));
    } catch (error) {
      //axios will handle invalid token
      dispatch(setIsInitialized(true));
    }
  }, []);

  useEffect(() => {
    if (!isInitialized && !isAuthenticated) {
      initialize();
      postStats();
    }
  }, [isInitialized]);

  return isInitialized ? (
    //render children whether the above initialize has authenticated user or not
    children
  ) : (
    //loading screen if user has bad connection and initialize is taking time
    <LoadingScreen />
  );
};

export default AuthInitializer;

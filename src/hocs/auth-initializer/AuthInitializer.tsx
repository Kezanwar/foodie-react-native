import React, { FC, ReactNode, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import ls from "lib/storage/storage";
import { useAppSelector } from "hooks/useAppSelector";
import { authLogin, authLogout } from "store/auth/auth.slice";

import { initializeJWT } from "lib/api/api";
import { setSession } from "lib/axios/axios";

import { LoadingScreen } from "components/loading-screen";

type Props = {
  children: ReactNode;
};

const AuthInitializer: FC<Props> = ({ children }) => {
  const authState = useAppSelector((state) => state.auth);
  const { isInitialized, isAuthenticated } = authState;

  const dispatch = useDispatch();

  const initialize = useCallback(async () => {
    try {
      const accessToken = ls.getAccessToken();
      if (!accessToken) throw new Error("no token");
      setSession(accessToken);
      const res = await initializeJWT();
      const {
        data: { user },
      } = res;
      dispatch(authLogin(user));
    } catch (error) {
      dispatch(authLogout());
      ls.clearAccessToken();
    }
  }, []);

  useEffect(() => {
    if (!isInitialized && !isAuthenticated) {
      initialize();
    }
  }, [isInitialized]);

  return isInitialized ? (
    //* render children whether the above initialize has authenticated user or not
    children
  ) : (
    //* loading screen if user has bad connection and initialize is taking time
    <LoadingScreen />
  );
};

export default AuthInitializer;

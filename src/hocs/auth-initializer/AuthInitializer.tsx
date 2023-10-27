import React, { FC, ReactNode, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Text } from "react-native";
import { View } from "react-native-ui-lib";

import { useAppSelector } from "hooks/useAppSelector";
import { authLogin, initializeFailed } from "store/auth/auth.slice";

import { initializeJWT } from "lib/api/api";
import { setSession } from "lib/axios/axios";
import { getAccessToken } from "lib/storage/storage";

type Props = {
  children: ReactNode;
};

const AuthInitializer: FC<Props> = ({ children }) => {
  const authState = useAppSelector((state) => state.auth);
  const { isInitialized, isAuthenticated } = authState;

  const dispatch = useDispatch();

  const initialize = useCallback(async () => {
    const accessToken = getAccessToken();
    if (!accessToken) return;
    if (accessToken) {
      try {
        setSession(accessToken);
        const res = await initializeJWT();
        const {
          data: { user },
        } = res;
        dispatch(authLogin(user));
      } catch (error) {
        dispatch(initializeFailed());
      }
    }
  }, []);

  useEffect(() => {
    if (!isInitialized && !isAuthenticated) {
      initialize();
    }
  }, [isInitialized]);

  return isInitialized ? (
    children
  ) : (
    <View>
      <Text>is initializing</Text>
    </View>
  );
};

export default AuthInitializer;

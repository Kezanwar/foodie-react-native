import { Text, TouchableOpacity } from "react-native";
import React from "react";
import ScreenWrapper from "components/screen-wrapper/ScrollScreenWrapper";
import { clearAccessToken } from "lib/storage/storage";
import { authLogout } from "store/auth/auth.slice";
import useAppDispatch from "hooks/useAppDispatch";

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(authLogout());
    clearAccessToken();
  };
  return (
    <ScreenWrapper>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default Home;

import { View } from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "theme/tailwind";

type Props = { children: ReactNode; style?: string };

const HeaderContainer: FC<Props> = ({ children, style = "" }) => {
  return (
    <View
      style={tw`px-6 border-b-[0.5px]  border-b-grey-250 pt-3 pb-4 ${style}`}
    >
      {children}
    </View>
  );
};

export default HeaderContainer;

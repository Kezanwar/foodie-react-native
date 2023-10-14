import { useAppSelector } from "hooks/useAppSelector";
import React, { FC } from "react";
import { View } from "react-native";
import tw from "theme/tailwind";
import SnackbarItem from "./SnackbarItem";

type Props = {};

const Snackbar: FC<Props> = () => {
  const messages = useAppSelector((state) => state.snackbar.messages);

  return messages?.length ? (
    <View style={tw`absolute top-0 px-3   z-10 w-full`}>
      <View style={tw`gap-3 mt-12`}>
        {messages.map((msg) => (
          <SnackbarItem message={msg} />
        ))}
      </View>
    </View>
  ) : null;
};

export default Snackbar;

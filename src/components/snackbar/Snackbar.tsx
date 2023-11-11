import { useAppSelector } from "hooks/useAppSelector";
import React, { FC } from "react";
import { View } from "react-native";
import tw from "theme/tailwind";
import SnackbarItem from "./SnackbarItem";

type Props = {};

const Snackbar: FC<Props> = () => {
  const messages = useAppSelector((state) => state.snackbar.messages);

  return messages?.length ? (
    <View style={tw`absolute bottom-24 px-5 z-10 w-full`}>
      <View style={tw`gap-1 mt-11`}>
        {messages.map((msg) => (
          <SnackbarItem key={msg.id} message={msg} />
        ))}
      </View>
    </View>
  ) : null;
};

export default Snackbar;

import React, { FC } from "react";
import tw from "theme/tailwind";
import { Text, TouchableOpacity } from "react-native";

import useSnackbar from "hooks/useSnackbar";

const TestThree: FC = () => {
  const enqeueSnackbar = useSnackbar();

  const onPress = () => {
    enqeueSnackbar({
      message: "Restaurant added to favourites",
      variant: "success",
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={tw`font-black text-3xl mt-2 dark:text-white`}>
        popup snackbar
      </Text>
    </TouchableOpacity>
  );
};

export default TestThree;

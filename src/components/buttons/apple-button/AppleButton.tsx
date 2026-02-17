import AntDesign from "@expo/vector-icons/AntDesign";
import Typography, { LEADING_TIGHT } from "components/typography";

import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  variant: "login" | "register";
  loading?: boolean;
};

const AppleButton: React.FC<Props> = ({ variant, loading, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={tw`w-full p-3 flex-row gap-2 justify-center bg-white border border-grey-300 rounded-lg items-center`}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <AntDesign
            name="apple"
            size={22}
            color={tw.color("grey-500")}
            style={tw`-ml-2`}
          />
          <Typography
            variant="h6"
            color="text.primary"
            style={`text-[3.75] leading-none text-center font-bold ${LEADING_TIGHT}`}
          >
            {variant === "login" ? "Sign in with Apple" : "Register with Apple"}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
};

export default AppleButton;

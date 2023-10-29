import GoogleIcon from "components/svgs/google-icon";
import { Typography } from "components/typography";
import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  variant: "login" | "register";
  loading: boolean;
};

const GoogleButton: React.FC<Props> = ({ variant, loading, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={tw`w-full p-3 flex-row gap-2 justify-center bg-white border-[0.25] border-grey-300 rounded-md items-center`}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <GoogleIcon />
          <Typography
            variant="h6"
            color="text.primary"
            style="text-[3.75] leading-[0] font-semi-bold"
          >
            {variant === "login"
              ? "Sign in with Google"
              : "Register with Google"}
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
};

export default GoogleButton;

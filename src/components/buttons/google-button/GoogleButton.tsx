import GoogleIcon from "components/svgs/google-icon";
import { Typography } from "components/typography";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "theme/tailwind";

type Props = {
  variant: "login" | "register";
};

const GoogleButton: React.FC<Props> = ({ variant }) => {
  return (
    <TouchableOpacity
      style={tw`w-full p-3 flex-row gap-2 justify-center bg-white border-[0.25] border-grey-300 rounded-md items-center`}
    >
      <GoogleIcon />
      <Typography
        variant="h6"
        color="text.primary"
        style="text-[3.75] leading-[0] font-semi-bold"
      >
        {variant === "login" ? "Sign in with Google" : "Register with Google"}
      </Typography>
    </TouchableOpacity>
  );
};

export default GoogleButton;

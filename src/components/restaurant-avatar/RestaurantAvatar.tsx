import React, { FC } from "react";
import { Image, ImageProps } from "expo-image";
import tw from "theme/tailwind";

type Props = ImageProps & {
  size?: "lg" | "md" | "sm";
};

const RestaurantAvatar: FC<Props> = ({ size = "lg", ...rest }) => {
  return (
    <Image
      {...rest}
      style={tw`${
        size === "lg" ? "w-18  h-18" : size === "sm" ? "h-10 w-10" : "h-12 w-12"
      } rounded-full border border-grey-200`}
    />
  );
};

export default RestaurantAvatar;

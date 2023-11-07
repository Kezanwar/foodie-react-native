import React, { FC, ReactElement } from "react";
import { Text, View } from "react-native";
import tw from "theme/tailwind";
import variantStyles from "theme/variant-styles";

import { IColVariants } from "types/colors";

type Props = {
  style?: string;
  variant: IColVariants;
  title?: string;
  align?: "center" | "left";
  content?: string;
  icon?: ReactElement;
};

const Alert: FC<Props> = ({
  variant = "primary",
  title,
  align = "left",
  icon,
  style = "",
  content,
}) => {
  const isLight = !tw.prefixMatch("dark");

  return (
    <View
      style={tw`px-3 py-2 ${
        align === "center" ? "justify-center" : ""
      } flex-row rounded-md gap-2 w-full  ${
        variantStyles[variant].bg
      } ${style}`}
    >
      {React.cloneElement(icon ? icon : variantStyles[variant]?.icon, {
        color: tw.color(`${variant}-${isLight ? "main" : "light"}`),
      })}
      <View style={tw`${align === "left" ? "flex-1" : ""} flex-wrap`}>
        {title && (
          <Text
            style={tw`font-semi-bold text-base  ${variantStyles[variant].text}`}
          >
            {title}
          </Text>
        )}
        <Text
          style={tw`font-regular w-full text-sm mt-[3] ${variantStyles[variant].text}`}
        >
          {content}
        </Text>
      </View>
    </View>
  );
};

export default Alert;

import React, { FC, ReactElement } from "react";
import { Text, View } from "react-native";
import tw from "theme/tailwind";
import variantStyles from "theme/variant-styles";

import { IColVariants } from "types/colors";

type Props = {
  style?: string;
  variant: IColVariants;
  title?: string;
  content?: string;
  icon?: ReactElement;
};

const Alert: FC<Props> = ({
  variant = "primary",
  title,
  icon,
  style = "",
  content,
}) => {
  const isLight = !tw.prefixMatch("dark");

  return (
    <View
      style={tw`p-3 pt-[10] flex-row rounded-md gap-3 w-full ${variantStyles[variant].bg} ${style}`}
    >
      {React.cloneElement(icon ? icon : variantStyles[variant]?.icon, {
        color: tw.color(`${variant}-${isLight ? "main" : "light"}`),
      })}
      <View style={tw`flex-1 flex-wrap`}>
        {title && (
          <Text
            style={tw`font-semi-bold text-base  mb-1 ${variantStyles[variant].text}`}
          >
            {title}
          </Text>
        )}
        <Text
          style={tw`font-regular w-full text-sm ${variantStyles[variant].text}`}
        >
          {content}
        </Text>
      </View>
    </View>
  );
};

export default Alert;

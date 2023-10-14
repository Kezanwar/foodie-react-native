import React, { FC, ReactElement } from "react";
import { Text, View } from "react-native";
import tw from "theme/tailwind";

import { IColVariants } from "types/colors";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

type Props = {
  style?: string;
  variant: IColVariants;
  title?: string;
  content?: string;
  icon?: ReactElement;
};

const alertStyles = {
  primary: {
    bg: "bg-primary-lighter dark:bg-primary-darker",
    text: "text-primary-dark dark:text-primary-lighter",
    icon: <MaterialCommunityIcons name="thumb-up-outline" size={24} />,
  },
  secondary: {
    bg: "bg-secondary-lighter dark:bg-secondary-darker",
    text: "text-secondary-dark dark:text-secondary-lighter",
    icon: <MaterialCommunityIcons name="thumb-up-outline" size={24} />,
  },
  success: {
    bg: "bg-success-lighter dark:bg-success-darker",
    text: "text-success-dark dark:text-success-lighter",
    icon: <Ionicons name="md-checkmark-circle" size={24} />,
  },
  warning: {
    bg: "bg-warning-lighter dark:bg-warning-darker",
    text: "text-warning-dark dark:text-warning-lighter",
    icon: (
      <MaterialIcons
        name="announcement"
        size={21.5}
        style={tw`mt-[3]`}
        color="black"
      />
    ),
  },
  info: {
    bg: "bg-info-lighter dark:bg-info-darker",
    text: "text-info-dark dark:text-info-lighter",
    icon: <AntDesign name="infocirlce" style={tw`mt-1`} size={20} />,
  },
  error: {
    bg: "bg-error-lighter dark:bg-error-darker",
    text: "text-error-main dark:text-error-lighter",
    icon: <Ionicons name="md-warning" size={24} />,
  },
  grey: {
    bg: "bg-grey-400",
    text: "text-grey-900",
    icon: <MaterialCommunityIcons name="thumb-up-outline" size={24} />,
  },
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
      style={tw`p-3 pt-[10] flex-row rounded-md gap-3 w-full ${alertStyles[variant].bg} ${style}`}
    >
      {React.cloneElement(icon ? icon : alertStyles[variant]?.icon, {
        color: tw.color(`${variant}-${isLight ? "main" : "lighter"}`),
      })}
      <View style={tw`flex-1 flex-wrap`}>
        {title && (
          <Text
            style={tw`font-semi-bold text-[4]  mb-1 ${alertStyles[variant].text}`}
          >
            {title}
          </Text>
        )}
        <Text style={tw`font-regular w-full ${alertStyles[variant].text}`}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default Alert;

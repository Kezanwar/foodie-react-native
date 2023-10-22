import React, { ReactNode } from "react";
import { Text } from "react-native";
import tw from "theme/tailwind";

const TEXT_COLORS = {
  "text.primary": "text-type-light-primary dark:text-type-dark-primary",
  "text.secondary": "text-type-light-secondary dark:text-type-dark-secondary",
  white: "text-white dark:text-type-dark-primary",
  "primary.main": "text-primary-main",
};

const VARIANTS = {
  h1: "font-bold text-8xl leading-[1.1] tracking-tight",
  h3: "font-bold text-6xl leading-[1.1] tracking-tight ",
  h4: "font-bold text-5xl leading-[1.1] tracking-tight",
  h5: "font-bold text-4xl leading-[1.1] tracking-tight",
  h6: "font-bold text-3xl leading-[1.1] tracking-tight",
  body1: "font-light text-base ",
  body2: "font-light text-sm",
};

type Props = {
  color?: keyof typeof TEXT_COLORS;
  variant?: keyof typeof VARIANTS;
  children: ReactNode;
  style?: string;
};

const Typography: React.FC<Props> = ({
  color = "text.primary",
  children,
  variant = "h1",
  style = "",
}) => {
  return (
    <Text style={tw`${TEXT_COLORS[color]} ${VARIANTS[variant]} ${style}`}>
      {children}
    </Text>
  );
};

export default Typography;

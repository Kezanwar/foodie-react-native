import React, { ReactNode } from "react";
import { Text } from "react-native";
import tw from "theme/tailwind";

const TEXT_COLORS = {
  "text.primary": "text-type-light-primary dark:text-type-dark-primary",
  "text.secondary": "text-type-light-secondary dark:text-type-dark-secondary",
  white: "text-white dark:text-grey-950",
  "primary.main": "text-primary-main",
  "primary.dark": "text-primary-dark",
  "error.main": "text-error-main",
  "success.dark": "text-success-dark",
  "success.main": "text-success-main",
  "warning.main": "text-warning-main",
  "info.dark": "text-info-dark",
};

const VARIANTS = {
  h1: "font-semi-bold text-6xl leading-[1.1] ",
  h3: "font-semi-bold text-5xl leading-[1.1]  ",
  h4: "font-semi-bold text-4xl leading-[1.1] ",
  h5: "font-semi-bold text-3xl leading-[1.1] ",
  h6: "font-semi-bold text-2xl leading-[1.1] ",
  subheader: "font-semi-bold text-xl leading-[1.1]  ",
  body1: "font-light text-base ",
  body2: "font-light text-sm",
};

export type TypographyTextColors = keyof typeof TEXT_COLORS;

export type TypgraphyProps = {
  color?: TypographyTextColors;
  variant?: keyof typeof VARIANTS;
  children: ReactNode;
  style?: string;
  numberOfLines?: number;
};

const Typography: React.FC<TypgraphyProps> = ({
  color = "text.primary",
  children,
  variant = "h1",
  style = "",
  numberOfLines,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={tw`${TEXT_COLORS[color]} ${VARIANTS[variant]} ${style}`}
    >
      {children}
    </Text>
  );
};

export default Typography;

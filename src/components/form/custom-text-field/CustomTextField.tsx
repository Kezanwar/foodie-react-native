import { Typography } from "components/typography";
import { useAppSelector } from "hooks/useAppSelector";
import React, { useEffect, useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import tw from "theme/tailwind";

type Props = TextInputProps & {
  placeholder: string;
  error?: string;
};

const DEFAULT_B_COL = tw.color("grey-200") || "";
const DEFAULT_P_COL = tw.color("grey-500") || "";
const DEFAULT_P_TOP = 42;
const DEFAULT_P_FSIZE = 16;

const ANIM_DURATION = 150;

const CustomTextField: React.FC<Props> = ({
  placeholder,
  value = "",
  error,
  ...rest
}) => {
  const borderColor = useSharedValue(DEFAULT_B_COL);
  const placeholderColor = useSharedValue(DEFAULT_P_COL);
  const placeholderTop = useSharedValue(DEFAULT_P_TOP);
  const placeholderFontSize = useSharedValue(DEFAULT_P_FSIZE);

  const theme = useAppSelector((state) => state.theme.theme);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = () => {
    setIsFocused(true);
  };
  useEffect(() => {
    if (isFocused) {
      const col =
        theme === "light" ? tw.color("grey-800") : tw.color("grey-500");
      borderColor.value = col || "";
      placeholderColor.value = col || "";
      placeholderTop.value = 20;
      placeholderFontSize.value = 12;
    }

    if (!isFocused) {
      borderColor.value = DEFAULT_B_COL;
      placeholderColor.value = DEFAULT_P_COL;

      if (!value) {
        placeholderTop.value = DEFAULT_P_TOP;
        placeholderFontSize.value = DEFAULT_P_FSIZE;
      }
    }
  }, [isFocused, value]);

  useEffect(() => {
    if (error) {
      const errorCol = tw.color("error-main");
      borderColor.value = errorCol || "";
      placeholderColor.value = errorCol || "";
    }
  }, [error]);

  const onBlur = () => {
    setIsFocused(false);
  };

  const animatedBorderStyles = useAnimatedStyle(() => ({
    borderColor: withTiming(borderColor.value, { duration: ANIM_DURATION }),
  }));

  const animatedTextStyles = useAnimatedStyle(() => ({
    top: withTiming(`${placeholderTop.value}%`, { duration: ANIM_DURATION }),
    fontSize: withTiming(placeholderFontSize.value, {
      duration: ANIM_DURATION,
    }),
    color: withTiming(placeholderColor.value, { duration: ANIM_DURATION }),
  }));

  return (
    <View>
      <View style={tw` rounded-md bg-grey-100    dark:bg-grey-950 `}>
        <Animated.View
          style={[
            tw`border-[0.15]  pt-[15] pb-1 px-2   rounded-md relative`,
            animatedBorderStyles,
          ]}
        >
          <Animated.Text
            style={[
              tw`absolute  left-2  font-light text-[4] text-type-light-primary `,
              animatedTextStyles,
            ]}
          >
            {placeholder}
          </Animated.Text>
          <TextInput
            onBlur={onBlur}
            onFocus={onFocus}
            {...rest}
            style={tw`font-medium text-lg  text-type-light-secondary`}
          />
        </Animated.View>
      </View>
      {error && (
        <Typography variant="body2" style="text-[3] mt-1" color="error.main">
          {error}
        </Typography>
      )}
    </View>
  );
};

export default CustomTextField;

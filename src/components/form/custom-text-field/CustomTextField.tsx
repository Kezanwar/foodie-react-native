import { useAppSelector } from "hooks/useAppSelector";
import React, { useEffect, useState } from "react";
import { View, TextInput, TextInputProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import tw from "theme/tailwind";

// import { TextFieldProps, TextField } from "react-native-ui-lib";

type Props = TextInputProps & {
  placeholder: string;
};

const DEFAULT_B_COL = tw.color("grey-800") || "";
const DEFAULT_P_TOP = 50;
const DEFAULT_P_FSIZE = 14;

const ANIM_DURATION = 150;

const CustomTextField: React.FC<Props> = ({
  placeholder,
  value = "",
  ...rest
}) => {
  const borderColor = useSharedValue(DEFAULT_B_COL);
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
        theme === "light" ? tw.color("grey-950") : tw.color("grey-500");
      borderColor.value = col || "";
      placeholderTop.value = 20;
      placeholderFontSize.value = 12;
    }

    if (!isFocused && !value) {
      borderColor.value = DEFAULT_B_COL;

      if (!value) {
        placeholderTop.value = DEFAULT_P_TOP;
        placeholderFontSize.value = DEFAULT_P_FSIZE;
      }
    }
  }, [isFocused, value]);

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
    color: withTiming(borderColor.value, { duration: ANIM_DURATION }),
  }));

  return (
    <View style={tw` rounded-md bg-grey-100    dark:bg-grey-950 `}>
      <Animated.View
        style={[
          tw`  pt-[15] pb-2 px-2   rounded-md relative`,
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
  );
};

export default CustomTextField;

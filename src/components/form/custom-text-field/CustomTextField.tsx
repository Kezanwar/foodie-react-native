import { Typography } from "components/typography";
import { useAppSelector } from "hooks/useAppSelector";
import React, {
  ForwardedRef,
  ReactNode,
  Ref,
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import tw from "theme/tailwind";
import { TailwindFn } from "twrnc";

type Props = TextInputProps & {
  placeholder: string;
  error?: string;
  actionOnPress?: () => void;
  actionIcon?: ReactNode;
  containerStyle?: ReturnType<TailwindFn>;
  disabled?: boolean;
};

export type CustomTextFieldRef = {
  blur: () => void;
  isFocused: boolean;
  focus: () => void;
} | null;

const DEFAULT_B_COL = tw.color("grey-200") || "";
const DEFAULT_P_COL = tw.color("grey-500") || "";
const DEFAULT_P_TOP = 26;
const DEFAULT_P_FSIZE = 16;

const ANIM_DURATION = 150;

const CustomTextField = forwardRef<CustomTextFieldRef, Props>(
  (
    {
      placeholder,
      value,
      containerStyle,
      error,
      actionIcon,
      actionOnPress,
      disabled,
      onFocus,
      onBlur: onPropBlur,
      ...rest
    },
    ref
  ) => {
    const borderColor = useSharedValue(DEFAULT_B_COL);
    const placeholderColor = useSharedValue(DEFAULT_P_COL);
    const placeholderTop = useSharedValue(DEFAULT_P_TOP);
    const placeholderFontSize = useSharedValue(DEFAULT_P_FSIZE);

    const inputRef = createRef<TextInput>();

    const theme = useAppSelector((state) => state.theme.theme);

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };
    useEffect(() => {
      if (isFocused || value || disabled) {
        const col =
          theme === "light" ? tw.color("grey-800") : tw.color("grey-500");
        borderColor.value = col || "";
        placeholderColor.value = col || "";
        placeholderTop.value = 13;
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

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (onPropBlur) onPropBlur(e);
      setIsFocused(false);
    };

    useImperativeHandle(
      ref,
      () => ({
        blur: () => {
          inputRef.current?.blur();
        },
        focus: () => {
          inputRef.current?.focus();
        },
        isFocused,
      }),
      [isFocused]
    );

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
      <View style={containerStyle}>
        <View style={tw` rounded-md bg-grey-100    dark:bg-grey-900 `}>
          <Animated.View
            style={[
              tw`border-[0.15]  flex-row items-center  px-2   rounded-md relative`,
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
            {disabled ? (
              <Typography
                style={"font-medium text-4 flex-1 pb-1 pt-[24]  text-grey-500"}
              >
                {value}
              </Typography>
            ) : (
              <TextInput
                ref={inputRef}
                onBlur={onBlur}
                onFocus={handleFocus}
                value={value}
                {...rest}
                style={tw`font-medium text-lg flex-1 pb-1 pt-[15]  text-type-light-secondary`}
              />
            )}
            {actionOnPress && (
              <TouchableOpacity style={tw`w-6`} onPress={actionOnPress}>
                {actionIcon || ""}
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
        {error && (
          <Typography
            variant="body2"
            style="text-[3] mt-1 ml-1"
            color="error.main"
          >
            {error}
          </Typography>
        )}
      </View>
    );
  }
);

export default CustomTextField;

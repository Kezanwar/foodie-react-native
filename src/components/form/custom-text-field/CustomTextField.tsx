import Typography from "components/typography";
import React, {
  ReactNode,
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
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

// Colors
const DEFAULT_B_COL = tw.color("grey-200");
const ACTIVE_B_COL = tw.color("grey-700");

const DEFAULT_P_COL = tw.color("grey-500");

const ERROR_COL = tw.color("error-main");

const DEFAULT_P_OPACITY = 1;
const ACTIVE_P_OPACITY = 0;

// Animation duration
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
    const placeholderOpacity = useSharedValue(DEFAULT_P_OPACITY);

    const inputRef = createRef<TextInput>();
    const [isFocused, setIsFocused] = useState<boolean>(false);

    // Handle focus state
    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    };

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (onPropBlur) onPropBlur(e);
      setIsFocused(false);
    };

    // Update animations based on focus, value, or error state
    useEffect(() => {
      if (isFocused) {
        borderColor.set(ACTIVE_B_COL);
      }
      if (disabled || !isFocused) {
        borderColor.set(DEFAULT_B_COL);
      }

      if (value) {
        placeholderOpacity.set(ACTIVE_P_OPACITY);
      } else {
        placeholderOpacity.set(DEFAULT_P_OPACITY);
      }
    }, [isFocused, value, disabled]);

    useEffect(() => {
      if (error) {
        borderColor.set(ERROR_COL);
        placeholderColor.set(ERROR_COL);
      }
    }, [error]);

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
      borderColor: withTiming(borderColor.value || "", {
        duration: ANIM_DURATION,
      }),
    }));

    const animatedTextStyles = useAnimatedStyle(() => ({
      color: withTiming(placeholderColor.value || "", {
        duration: ANIM_DURATION,
      }),
      opacity: withTiming(placeholderOpacity.value, {
        duration: ANIM_DURATION,
      }),
    }));

    return (
      <View style={containerStyle}>
        <View style={tw`rounded-md bg-grey-100 dark:bg-grey-900`}>
          <Animated.View
            style={[
              tw`border flex-row items-center px-2 rounded-md relative`,
              animatedBorderStyles,
            ]}
          >
            <Animated.Text
              style={[
                tw`absolute left-2 font-regular  leading-0 text-4.25 text-type-light-primary`,
                animatedTextStyles,
              ]}
            >
              {placeholder}
            </Animated.Text>
            {disabled ? (
              <Typography
                style={
                  "font-medium text-4.25 flex-1 py-3 leading-0 text-grey-500"
                }
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
                style={tw`font-medium text-4.25 flex-1 py-3 leading-0 text-grey-700`}
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

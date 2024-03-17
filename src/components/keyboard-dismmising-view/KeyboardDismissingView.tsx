import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  ViewProps,
  Keyboard,
  ViewStyle,
  StyleProp,
} from "react-native";

type Props = ViewProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

const KeyboardDismissingView: React.FC<Props> = ({
  containerStyle,
  children,
  ...rest
}) => {
  return (
    <TouchableWithoutFeedback
      style={containerStyle}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View {...rest}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardDismissingView;

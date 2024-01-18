import React, { FC } from "react";
import { SelectChipFormObj } from "types/form";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Typography } from "components/typography";
import tw from "theme/tailwind";
import { Feather } from "@expo/vector-icons";

// import Animated from "react-native-reanimated";

// const AnimatedText: FC<{ active: boolean; text: string }> = ({
//   active,
//   text,
// }) => {
//   return <Animated.Text>{text}</Animated.Text>;
// };

type Props = SelectChipFormObj & {
  onItemPress: (index: number) => void;
  index: number;
};

const OptionItem: FC<Props> = React.memo(
  ({ name, onItemPress, selected, index }) => {
    const onPress = () => {
      onItemPress(index);
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={tw`py-3 border-b border-grey-200 flex-row items-center justify-between gap-2 rounded-sm`}
      >
        <Typography
          color={selected ? "primary.main" : "text.primary"}
          variant="body1"
        >
          {name}
        </Typography>
        {selected && (
          <Feather name="check" size={16} color={tw.color("success-main")} />
        )}
      </TouchableOpacity>
    );
  }
);

export default OptionItem;

import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import tw from "./tailwind";

const variantStyles = {
  primary: {
    bg: "bg-primary-main-04",
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

export default variantStyles;

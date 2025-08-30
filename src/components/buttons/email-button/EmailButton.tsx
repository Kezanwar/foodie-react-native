import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Typography, { LEADING_TIGHT } from "components/typography";

import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  loading?: boolean;
};

const EmailButton: React.FC<Props> = ({ loading, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={tw`w-full p-3 flex-row gap-2 justify-center bg-white border border-grey-300 rounded-lg items-center`}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <MaterialIcons
            name="alternate-email"
            size={22}
            color={tw.color("primary-main")}
            style={tw`-ml-3`}
          />
          <Typography
            variant="h6"
            color="text.primary"
            style={`text-[3.75] text-center font-bold ${LEADING_TIGHT}`}
          >
            Register with Email
          </Typography>
        </>
      )}
    </TouchableOpacity>
  );
};

export default EmailButton;

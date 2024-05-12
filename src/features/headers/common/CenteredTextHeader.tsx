import { View } from "react-native";
import React, { FC } from "react";

import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";
import { Typography } from "components/typography";
import { TouchableOpacity } from "react-native-gesture-handler";

const iconCol = tw.color("primary-main");

type Props = { goBack: any; title: string; subtitle?: string };

const flexOne = { true: tw`flex-0.3 mt-1.15`, false: tw`flex-0.3` };

const CenteredTextHeader: FC<Props> = ({ goBack, title, subtitle }) => {
  const hasSub = !!subtitle;
  return (
    <View
      style={tw`flex-row ${
        !hasSub ? "items-center" : ""
      } justify-between px-5 pb-3 pt-1 border-b-[0.5px] border-b-grey-250`}
    >
      <View style={flexOne[`${hasSub}`]}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={18} color={iconCol} />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 items-center`}>
        <Typography
          style={`font-semi-bold leading-[0] ${
            hasSub ? "mb-0.5" : ""
          } text-4.5`}
          variant="h6"
        >
          {title}
        </Typography>
        {hasSub && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </View>

      <View style={flexOne[`${hasSub}`]}></View>
    </View>
  );
};

export default CenteredTextHeader;

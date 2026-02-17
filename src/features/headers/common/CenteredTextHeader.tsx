import { TouchableOpacity, View } from "react-native";
import React, { FC } from "react";

import Feather from "@expo/vector-icons/Feather";
import tw from "theme/tailwind";
import Typography, { LEADING_TIGHT } from "components/typography";

const iconCol = tw.color("primary-main");

type Props = { goBack: any; title: string; subtitle?: string };

const flexOne = { true: tw`flex-0.2 mt-1.15`, false: tw`flex-0.2` };

const CenteredTextHeader: FC<Props> = ({ goBack, title, subtitle }) => {
  const hasSub = !!subtitle;
  return (
    <View
      style={tw`flex-row ${
        !hasSub ? "items-center" : ""
      } justify-between px-5 pb-3 pt-0.5 border-b-[0.5px] border-b-grey-250`}
    >
      <View style={flexOne[`${hasSub}`]}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" size={18} color={iconCol} />
        </TouchableOpacity>
      </View>
      <View style={tw`flex-1 items-center`}>
        <Typography
          style={`font-bold text-center ${LEADING_TIGHT} ${
            hasSub ? "mb-0.5" : ""
          } text-4.5`}
          variant="h6"
        >
          {title}
        </Typography>
        {hasSub && (
          <Typography
            variant="body2"
            style={"text-center"}
            color="text.secondary"
          >
            {subtitle}
          </Typography>
        )}
      </View>

      <View style={flexOne[`${hasSub}`]}></View>
    </View>
  );
};

export default CenteredTextHeader;

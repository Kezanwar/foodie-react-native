import { View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";

import { Typography } from "components/typography";

import { capitalize } from "util/string";

import { ISingleLocation } from "types/single-deal";
import { IOpeningDay } from "types/opening-times";

type Props = {
  location: ISingleLocation;
  containerStyle?: string;
};

const OpeningTimes: FC<Props> = React.memo(
  ({ location, containerStyle = "" }) => {
    if (!location) return null;

    const { opening_times } = location;

    return (
      <View
        style={tw`gap-2 m-6 border rounded-lg border-grey-200 p-3 mt-5 ${containerStyle}`}
      >
        {Object.entries(opening_times).map(([day, val]) => {
          return <Item key={day} day={day} val={val} />;
        })}
      </View>
    );
  }
);

export default OpeningTimes;

const Item: FC<{ day: string; val: IOpeningDay }> = ({ day, val }) => {
  return (
    <View key={day} style={tw`flex-row `}>
      <Typography style={"w-13 text-3.25"} variant="body2">
        {capitalize(day)}
      </Typography>
      <Typography
        variant="body2"
        style="font-medium text-3.15"
        color={val.is_open ? "success.main" : "warning.main"}
      >
        {val.is_open ? `${val.open} - ${val.close}` : "CLOSED"}
      </Typography>
    </View>
  );
};

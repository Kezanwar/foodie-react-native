import { View } from "react-native";
import React, { FC, useMemo } from "react";
import tw from "theme/tailwind";
import { Ionicons } from "@expo/vector-icons";

import TitleBadgeCounter from "components/title-badge-counter";
import IconButton from "components/buttons/icon-button";
import { Typography } from "components/typography";
import TextButton from "components/buttons/text-button";

import { SelectChipFormObj } from "types/form";

type Props = {
  onNav: () => void;
  filters: SelectChipFormObj[];
  onClear: () => void;
  title: string;
};

const FilterNavAction: FC<Props> = ({ onNav, filters, onClear, title }) => {
  const selectedFilters = useMemo(() => {
    const selected = filters.reduce((acc, curr) => {
      if (curr.selected) {
        acc.push(curr.name);
      }
      return acc;
    }, [] as string[]);
    return selected;
  }, [filters]);

  const text: string | string[] = selectedFilters?.length
    ? selectedFilters.join(", ")
    : "All";

  return (
    <View>
      <View style={tw`flex-row items-center justify-between `}>
        <TitleBadgeCounter
          mb={false}
          title={title}
          count={selectedFilters?.length ? `${selectedFilters.length}` : ""}
        />
        <View style={tw`flex-row items-center gap-3 -mt-2`}>
          {selectedFilters.length ? (
            <TextButton label="Clear" onPress={onClear} />
          ) : (
            ""
          )}
          <IconButton onPress={onNav}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={tw.color("grey-950")}
            />
          </IconButton>
        </View>
      </View>
      <Typography
        variant="body2"
        style="mt-2 text-3.5 max-w-[80%]"
        color="text.secondary"
      >
        {text}
      </Typography>
    </View>
  );
};

export default FilterNavAction;

import React, { forwardRef, useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FilterStackNavigator from "./navigator/FilterStackNavigator";
import tw from "theme/tailwind";

type Props = { onDismissedModal: () => void };

const FilterSheet = forwardRef<BottomSheetModal, Props>(
  ({ onDismissedModal }, ref) => {
    const snapPoints = useMemo(() => ["40%", "95%"], []);

    return (
      <BottomSheetModal
        ref={ref}
        handleStyle={tw`border-b border-grey-200 `}
        index={0}
        backgroundStyle={tw`shadow-xl`}
        snapPoints={snapPoints}
        onDismiss={onDismissedModal}
      >
        <FilterStackNavigator />
      </BottomSheetModal>
    );
  }
);

export default FilterSheet;

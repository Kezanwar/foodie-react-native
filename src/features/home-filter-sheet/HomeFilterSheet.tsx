import React, { forwardRef, useCallback, useMemo } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import FilterStackNavigator from "./navigator/FilterStackNavigator";
import tw from "theme/tailwind";

type Props = { onDismissedModal: () => void };

const FilterSheet = forwardRef<BottomSheetModal, Props>(
  ({ onDismissedModal }, ref) => {
    const snapPoints = useMemo(() => ["40%", "95%"], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          animatedIndex={{
            value: 1,
          }}
          opacity={0.3}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        handleStyle={tw`border-b border-grey-200 `}
        index={0}
        snapPoints={snapPoints}
        onDismiss={onDismissedModal}
        backdropComponent={renderBackdrop}
      >
        <FilterStackNavigator />
      </BottomSheetModal>
    );
  }
);

export default FilterSheet;

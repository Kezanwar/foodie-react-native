import React, { forwardRef, useMemo } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FilterStackNavigator from "./navigator/FilterStackNavigator";
import { renderBackdrop } from "components/sheet";

type Props = { onDismissedSheet: () => void };

const FilterSheet = forwardRef<BottomSheetModal, Props>(
  ({ onDismissedSheet }, ref) => {
    const snapPoints = useMemo(() => ["40%", "95%"], []);

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        onDismiss={onDismissedSheet}
        backdropComponent={renderBackdrop}
      >
        <FilterStackNavigator />
      </BottomSheetModal>
    );
  }
);

export default React.memo(FilterSheet);

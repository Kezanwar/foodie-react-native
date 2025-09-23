import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React from "react";

const animatedIndex = {
  value: 1,
};

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop {...props} animatedIndex={animatedIndex} opacity={0.3} />
);

export default renderBackdrop;

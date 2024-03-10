import React, { FC, useCallback, useMemo, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import tw from "theme/tailwind";

import { DynamicStack } from "constants/routes";
import { Typography } from "components/typography";

type Props = {
  location_id: string;
  stack: DynamicStack;
  navigation: any;
};

const SingleRestaurantModal = React.forwardRef<BottomSheetModal, Props>(
  (props, ref) => {
    const snapPoints = useMemo(() => ["40%", "90%"], []);

    return (
      <BottomSheetModal
        ref={ref}
        handleStyle={tw`border-b border-grey-200 `}
        index={0}
        backgroundStyle={tw`shadow-xl`}
        snapPoints={snapPoints}
      >
        <Typography>hello</Typography>
      </BottomSheetModal>
    );
  }
);

export default SingleRestaurantModal;

export const useRestaurantModal = () => {
  const restaurantModalRef = useRef<BottomSheetModal>(null);

  const open = useCallback(() => {
    restaurantModalRef?.current?.present();
  }, []);

  const dismiss = useCallback(() => {
    restaurantModalRef?.current?.dismiss();
  }, []);

  return { restaurantModalRef, open, dismiss };
};

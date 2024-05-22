import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import tw from "theme/tailwind";

import SingleDealModalScreen from "screens/common/single-deal";
import { useAppSelector } from "hooks/useAppSelector";

const SingleDealModal: FC = () => {
  const snapPoints = useMemo(() => ["55%"], []);
  const modalRef = useRef<BottomSheetModal>(null);

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

  const close = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef.current]);

  const state = useAppSelector((state) => state.singleDeal.deal);

  useEffect(() => {
    if (state) {
      modalRef?.current?.present();
    }
    if (!state) {
      close();
    }
  }, [state]);

  return (
    <BottomSheetModal
      ref={modalRef}
      handleStyle={tw`border-b border-grey-200 `}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      {state && (
        <SingleDealModalScreen
          linkRestaurant={state.linkRestaurant}
          close={close}
          deal_id={state?.deal_id}
          location_id={state?.location_id}
          stack={state?.stack}
        />
      )}
    </BottomSheetModal>
  );
};

export default SingleDealModal;

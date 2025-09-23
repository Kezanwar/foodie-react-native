import React, { FC, useCallback, useEffect, useMemo, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import tw from "theme/tailwind";
import SingleDealModalScreen from "screens/common/single-deal";
import { useAppSelector } from "hooks/useAppSelector";
import { renderBackdrop } from "components/sheet";

const snapPoints = ["55%"];

const SingleDealModal: FC = () => {
  const modalRef = useRef<BottomSheetModal>(null);

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

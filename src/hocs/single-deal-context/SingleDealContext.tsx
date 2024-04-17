import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import tw from "theme/tailwind";
import { DynamicStack } from "constants/routes";
import SingleDealModalScreen from "screens/common/single-deal";

type SingleDealContextValue = {
  open: (state: SingleDealState) => void;
  close: () => void;
};

export type SingleDealState = {
  deal_id: string;
  location_id: string;
  stack: DynamicStack;
  linkRestaurant: boolean;
} | null;

const Context = createContext<SingleDealContextValue>({
  open: (state) => {},
  close: () => {},
});

export const useSingleDealContext = () => {
  const ctx = useContext(Context);
  return ctx;
};

type Props = {
  children: ReactNode;
};

const SingleDealContext: FC<Props> = ({ children }) => {
  const snapPoints = useMemo(() => ["55%"], []);
  const modalRef = useRef<BottomSheetModal>(null);

  const [state, setState] = useState<SingleDealState>(null);

  const value: SingleDealContextValue = useMemo(
    () => ({
      open: (deal: SingleDealState) => {
        setState(deal);
        modalRef.current?.present();
      },
      close: () => {
        modalRef.current?.close();
      },
    }),
    []
  );

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
    <Context.Provider value={value}>
      {children}
      <BottomSheetModal
        ref={modalRef}
        handleStyle={tw`border-b border-grey-200 `}
        index={0}
        backgroundStyle={tw`shadow-xl`}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        {state && (
          <SingleDealModalScreen
            linkRestaurant={state.linkRestaurant}
            close={value.close}
            deal_id={state?.deal_id}
            location_id={state?.location_id}
            stack={state?.stack}
          />
        )}
      </BottomSheetModal>
    </Context.Provider>
  );
};

export default SingleDealContext;

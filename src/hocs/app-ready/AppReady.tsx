import React, { FC, ReactNode } from "react";
import "react-native-get-random-values";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { useDeviceContext } from "twrnc";
import tw from "theme/tailwind";

import Navigation from "hocs/app-ready/providers/navigation";
import FontLoadGestureHandler from "hocs/app-ready/providers/font-load-gesture-handler";
import ReactQuery from "hocs/app-ready/providers/react-query";
import Redux from "hocs/app-ready/providers/redux";

import SingleDealModal from "features/single-deal-modal";

import { enableFreeze } from "react-native-screens";
import Notifications from "./providers/notifications";

enableFreeze(true);

type Props = {
  children: ReactNode;
};

const AppReady: FC<Props> = ({ children }) => {
  useDeviceContext(tw, { withDeviceColorScheme: false });

  return (
    <ReactQuery>
      <Redux>
        <Notifications>
          <FontLoadGestureHandler>
            <BottomSheetModalProvider>
              <Navigation>{children}</Navigation>
              <SingleDealModal />
            </BottomSheetModalProvider>
          </FontLoadGestureHandler>
        </Notifications>
      </Redux>
    </ReactQuery>
  );
};

export default AppReady;

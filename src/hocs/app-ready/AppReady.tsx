import React, { FC, ReactNode } from "react";
import "react-native-get-random-values";
import "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { useDeviceContext } from "twrnc";
import tw from "theme/tailwind";

import Navigation from "hocs/app-ready/providers/navigation";
import FontLoadGestureHandler from "hocs/app-ready/providers/font-load-gesture-handler";
import ReactQuery from "hocs/app-ready/providers/react-query";
import Redux from "hocs/app-ready/providers/redux";

import SingleDealModal from "features/single-deal-modal";

import { enableFreeze } from "react-native-screens";

import useRegisterTasks from "./tasks";
import Snackbar from "components/snackbar/Snackbar";

import DebugMenu from "components/debug-nav";

enableFreeze(true);

type Props = {
  children: ReactNode;
};

const AppReady: FC<Props> = ({ children }) => {
  useDeviceContext(tw, { withDeviceColorScheme: false });

  useRegisterTasks();

  return (
    <ReactQuery>
      <Redux>
        <FontLoadGestureHandler>
          <BottomSheetModalProvider>
            <Snackbar />
            <Navigation>
              <DebugMenu />
              {children}
            </Navigation>
            <SingleDealModal />
          </BottomSheetModalProvider>
        </FontLoadGestureHandler>
      </Redux>
    </ReactQuery>
  );
};

export default AppReady;

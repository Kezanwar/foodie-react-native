import React, { FC, ReactNode } from "react";
import {
  LinkingOptions,
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { HOME_STACK } from "constants/routes";

type Props = {
  children: ReactNode;
};

const navigationRef = React.createRef<NavigationContainerRef<{}>>();

export function external_navigate(name: string, params?: any) {
  //@ts-ignore
  navigationRef.current?.navigate(name, params);
}

const linking: LinkingOptions<{}> = {
  prefixes: ["https://thefoodiestaging.app", "https://thefoodie.app"],
  config: {
    screens: {
      [HOME_STACK.SINGLE_RESTAURANT]: "single-restaurant/:location_id", // Deep link with dynamic params
    },
  },
};

const Navigation: FC<Props> = ({ children }) => {
  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      {children}
    </NavigationContainer>
  );
};

export default Navigation;

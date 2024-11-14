import React, { FC, ReactNode } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";

type Props = {
  children: ReactNode;
};

const navigationRef = React.createRef<NavigationContainerRef<{}>>();

export function external_navigate(name: string, params?: any) {
  //@ts-ignore
  navigationRef.current?.navigate(name, params);
}

const Navigation: FC<Props> = ({ children }) => {
  return (
    <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
  );
};

export default Navigation;

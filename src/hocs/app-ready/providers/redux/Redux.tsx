import React, { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "store/store";

type Props = { children: ReactNode };

const Redux: FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Redux;

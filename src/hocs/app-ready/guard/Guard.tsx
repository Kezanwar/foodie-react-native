import React, { FC, ReactNode } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import MaintenanceMode from "screens/common/maintenance-mode";
import UpdateRequired from "screens/common/update-required";

type Props = {
  children: ReactNode;
};

const Guard: FC<Props> = ({ children }) => {
  const authState = useAppSelector((state) => state.auth);
  const { maintenanceMode, updateRequired } = authState;
  if (maintenanceMode) {
    return <MaintenanceMode />;
  }
  if (updateRequired) {
    return <UpdateRequired />;
  }
  return children;
};

export default Guard;

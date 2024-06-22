import { useEffect } from "react";
import { registerSyncViewsTaskAsync } from "./sync-recent-views";

const useRegisterBackgroundTasks = () => {
  useEffect(() => {
    (async () => {
      await registerSyncViewsTaskAsync();
    })();
  }, []);
};

export default useRegisterBackgroundTasks;

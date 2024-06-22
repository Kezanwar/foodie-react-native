import { useEffect } from "react";
import { postRecentlyViewedStats } from "lib/api";

const useRegisterTasks = () => {
  useEffect(() => {
    const syncViewsInterval = setInterval(async () => {
      await postRecentlyViewedStats();
    }, 1000 * 60);

    return () => {
      clearInterval(syncViewsInterval);
    };
  }, []);
};

export default useRegisterTasks;

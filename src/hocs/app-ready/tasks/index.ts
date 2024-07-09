import { useEffect } from "react";
import { postStats } from "lib/api";

const useRegisterTasks = () => {
  useEffect(() => {
    const syncStats = setInterval(async () => {
      await postStats();
    }, 1000 * 60);

    return () => {
      clearInterval(syncStats);
    };
  }, []);
};

export default useRegisterTasks;

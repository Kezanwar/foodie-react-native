import { useEffect } from "react";
import { postStats } from "lib/api";
import { seconds } from "utils/time";

const useRegisterTasks = () => {
  useEffect(() => {
    const syncStats = setInterval(async () => {
      await postStats();
    }, seconds(20));

    return () => {
      clearInterval(syncStats);
    };
  }, []);
};

export default useRegisterTasks;

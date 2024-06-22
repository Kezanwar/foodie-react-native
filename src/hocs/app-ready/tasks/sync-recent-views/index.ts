import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";

import { postRecentlyViewedStats } from "lib/api";

const SYNC_RECENT_VIEWS = "SYNC_RECENT_VIEWS";

TaskManager.defineTask(SYNC_RECENT_VIEWS, async () => {
  await postRecentlyViewedStats();
  return BackgroundFetch.BackgroundFetchResult.NoData;
});

function isSyncViewsTaskRegistered() {
  return TaskManager.isTaskRegisteredAsync(SYNC_RECENT_VIEWS);
}

export async function registerSyncViewsTaskAsync() {
  const isRegistered = await isSyncViewsTaskRegistered();

  if (!isRegistered) {
    await BackgroundFetch.registerTaskAsync(SYNC_RECENT_VIEWS, {
      minimumInterval: 60 * 2, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }
}

export async function unregisterSyncViewsTaskAsync() {
  return BackgroundFetch.unregisterTaskAsync(SYNC_RECENT_VIEWS);
}

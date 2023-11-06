import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPreferences } from "lib/api/api";
import { PREFERENCES_QUERY } from "constants/react-query";
import { AxiosResponse } from "axios";
import { IPreferences } from "types/preferences";
import { useCallback } from "react";

const usePreferencesQuery = () => {
  const query = useQuery({
    queryKey: [PREFERENCES_QUERY],
    queryFn: getPreferences,
    enabled: true,
    staleTime: 20 * (60 * 1000),
  });

  return query;
};

export const useUpdatePreferences = () => {
  const client = useQueryClient();
  const update = useCallback(
    (data: AxiosResponse<IPreferences>) =>
      client.setQueryData([PREFERENCES_QUERY], () => {
        return data;
      }),
    []
  );
  return update;
};

export default usePreferencesQuery;

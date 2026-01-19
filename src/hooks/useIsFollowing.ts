import { useAppSelector } from "./useAppSelector";

const useIsFollowing = (location_id: string) => {
  const favourited = useAppSelector(
    (s) => !!s.datasources.location_follows[location_id],
  );
  return favourited;
};

export default useIsFollowing;

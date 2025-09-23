import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { COMMON_ROUTES } from "constants/routes";
import useAppDispatch from "hooks/useAppDispatch";
import { useCallback, useRef } from "react";
import { onSaveFilterForm } from "store/filters";

const useFilterSheet = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();
  const filterSheetRef = useRef<BottomSheetModal>(null);

  const isFilterSheetOpen = useRef<boolean>(false);

  const presentModal = useCallback(() => {
    filterSheetRef?.current?.present();
    isFilterSheetOpen.current = true;
  }, []);

  const dismissModal = useCallback(() => {
    filterSheetRef?.current?.dismiss();
    dispatch(onSaveFilterForm());
    isFilterSheetOpen.current = false;
  }, []);

  //@ts-ignore
  const handleLocationPress = () => nav.navigate(COMMON_ROUTES.LOCATION);

  const toggleFilterSheet = useCallback(() => {
    isFilterSheetOpen.current ? dismissModal() : presentModal();
  }, [isFilterSheetOpen.current]);

  const onFilterSheetDismissed = useCallback(() => {
    isFilterSheetOpen.current = false;
    dispatch(onSaveFilterForm());
  }, [isFilterSheetOpen.current]);

  return {
    filterSheetRef,
    isFilterSheetOpen,
    toggleFilterSheet,
    onFilterSheetDismissed,
    handleLocationPress,
  };
};

export default useFilterSheet;

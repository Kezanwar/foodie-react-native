import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";

const usePromptSignInSheet = () => {
  const promptSignInRef = useRef<BottomSheetModal>(null);

  const isPromptSignInSheetOpen = useRef<boolean>(false);

  const presentModal = useCallback(() => {
    promptSignInRef?.current?.present();
    isPromptSignInSheetOpen.current = true;
  }, []);

  const dismissModal = useCallback(() => {
    promptSignInRef?.current?.dismiss();
    isPromptSignInSheetOpen.current = false;
  }, []);

  const togglePromptSignInSheet = useCallback(() => {
    isPromptSignInSheetOpen.current ? dismissModal() : presentModal();
  }, [isPromptSignInSheetOpen.current]);

  const onPromptSignInSheetDismissed = useCallback(() => {
    isPromptSignInSheetOpen.current = false;
  }, [isPromptSignInSheetOpen.current]);

  return {
    promptSignInRef,
    isPromptSignInSheetOpen,
    togglePromptSignInSheet,
    onPromptSignInSheetDismissed,
  };
};

export default usePromptSignInSheet;

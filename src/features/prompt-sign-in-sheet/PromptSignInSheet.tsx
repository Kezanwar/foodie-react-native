import { View } from "react-native";
import React, { forwardRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import tw from "theme/tailwind";
import Typography from "components/typography";
import { renderBackdrop } from "components/sheet";
import { FullWidthButton } from "components/buttons/full-width-button";
import { Or } from "components/separators/or";
import TextButton from "components/buttons/text-button";
import { useNavigation } from "@react-navigation/native";
import { AUTH_ROUTES } from "constants/routes";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";

type Props = {
  onDismiss: () => void;
  toggleSheet: () => void;
};

const snapPoints = ["45%"];

const PromptSignInSheet = forwardRef<BottomSheetModal, Props>(
  ({ onDismiss, toggleSheet }, ref) => {
    const nav = useNavigation();

    const createAcc = () => {
      toggleSheet();
      //@ts-ignore
      setTimeout(() => nav.navigate(AUTH_ROUTES.SIGN_UP), 250);
    };

    const signIn = () => {
      toggleSheet();
      //@ts-ignore
      setTimeout(() => nav.navigate(AUTH_ROUTES.SIGN_IN), 250);
    };
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        onDismiss={onDismiss}
        backdropComponent={renderBackdrop}
      >
        <View style={tw`p-5`}>
          <Typography variant="h7" style={"text-center mb-1"}>
            Want to see more?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={"mt-2 text-center"}
          >
            Free forever. No hidden costs.
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            style={"mt-2 mb-8 text-center"}
          >
            Explore your neighborhood’s best restaurants and food deals.
          </Typography>
          <View style={tw`gap-3`}>
            <FullWidthButton
              onPress={createAcc}
              subtle
              text="Create An Account"
              icon={
                <Octicons
                  name="person-add"
                  size={22}
                  color={tw.color("primary-main")}
                />
                // <Ionicons
                //   name="create-outline"
                //   size={22}
                //   color={tw.color("primary-main")}
                // />
              }
            />
            <Or />
            <TextButton onPress={signIn} label="Sign In" />
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

export default React.memo(PromptSignInSheet);

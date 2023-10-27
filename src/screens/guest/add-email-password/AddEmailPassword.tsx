import React from "react";
import tw from "theme/tailwind";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { LoadingButton } from "components/buttons/loading-button";
import { CustomTextField } from "components/form/custom-text-field";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import { StaticScreenWrapper } from "components/screen-wrapper";
import { Typography } from "components/typography";

import { useAppSelector } from "hooks/useAppSelector";

import useSnackbar from "hooks/useSnackbar";

const AddEmailPassword: React.FC = (props: any) => {
  useAppSelector((state) => state.theme.theme);

  const onGoBack = () => props.navigation.goBack();

  const enqeueSnackbar = useSnackbar();

  const onDone = () => {
    props.navigation.navigate("AddPassword");
    // enqeueSnackbar({
    //   message: "Successfully added your Email  🚀",
    //   variant: "success",
    // });
  };

  return (
    <StaticScreenWrapper>
      <KeyboardDismissingView
        containerStyle={tw`flex-1`}
        style={tw`flex-1 gap-10`}
      >
        <View style={tw`flex-1 py-2  px-7   bg-white dark:bg-grey-800`}>
          <Typography variant="h6" style={" font-semi-bold mb-2 "}>
            Welcome, Kez!
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={"max-w-[70]  mb-12 "}
          >
            Please provide your Email Address and create a Password...
          </Typography>

          <View style={tw`gap-4  flex-1`}>
            <CustomTextField
              autoComplete="email"
              placeholder={"Email address"}
            />
            <CustomTextField autoComplete="off" placeholder={"Password"} />
            <CustomTextField
              autoComplete="off"
              placeholder={"Confirm Password"}
            />
          </View>

          <View style={tw`flex-1 justify-end`}>
            <LoadingButton onPress={onDone} text="Done" />
            <TouchableOpacity style={tw`mt-4`} onPress={onGoBack}>
              <Typography
                variant="body2"
                color="primary.main"
                style="text-center font-semi-bold "
              >
                Go back
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardDismissingView>
    </StaticScreenWrapper>
  );
};

export default AddEmailPassword;

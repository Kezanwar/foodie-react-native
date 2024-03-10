import React from "react";
import tw from "theme/tailwind";
import { View } from "react-native";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";

import { FullWidthButton } from "components/buttons/full-width-button";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import RHFTextField from "components/form/RHF/RHFTextField";
import { StaticScreenWrapper } from "components/screen-wrapper";
import { Typography } from "components/typography";

import { yupResolver } from "@hookform/resolvers/yup";

import useAppDispatch from "hooks/useAppDispatch";
import { addRegisterDetails } from "store/create-account/create-account.slice";
import { RegisterUserDetailsSchema } from "lib/validation/auth";
import { AUTH_ROUTES } from "constants/routes";
import TextButton from "components/buttons/text-button";

type FormValues = {
  first_name: string;
  last_name: string;
};

const AddDetails: React.FC = (props: any) => {
  // useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const onDone: SubmitHandler<FormValues> = (data) => {
    dispatch(addRegisterDetails({ ...data }));
    props.navigation.navigate(AUTH_ROUTES.ADD_EMAIL_PASSWORD);
  };

  const defaultValues: DefaultValues<FormValues> = {
    first_name: "",
    last_name: "",
  };

  const { handleSubmit, control } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(RegisterUserDetailsSchema),
    defaultValues,
  });

  return (
    <StaticScreenWrapper>
      <KeyboardDismissingView
        containerStyle={tw`flex-1`}
        style={tw`flex-1 gap-10`}
      >
        <View style={tw`flex-1 py-2  px-7   bg-white dark:bg-grey-800`}>
          <Typography variant="h6" style={" font-semi-bold mb-2 "}>
            Hello!
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={"max-w-[70]  mb-12 "}
          >
            Let's get started, we just need a few details from you...
          </Typography>

          <View style={tw`gap-4  flex-1`}>
            <RHFTextField
              control={control}
              name="first_name"
              autoComplete="given-name"
              placeholder={"First name"}
            />
            <RHFTextField
              control={control}
              name="last_name"
              autoComplete="family-name"
              placeholder={"Last name"}
            />
          </View>
          <View style={tw`flex-1 justify-end`}>
            <FullWidthButton onPress={handleSubmit(onDone)} text="Done" />
            <TextButton
              label="Go back"
              style={tw`mt-4`}
              onPress={props.navigation.goBack}
            />
          </View>
        </View>
      </KeyboardDismissingView>
    </StaticScreenWrapper>
  );
};

export default AddDetails;

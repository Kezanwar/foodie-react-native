import React, { useState } from "react";
import tw from "theme/tailwind";
import { View } from "react-native";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FullWidthButton } from "components/buttons/full-width-button";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import { StaticScreenWrapper } from "components/screen-wrapper";
import { Typography } from "components/typography";
import { ForgotPasswordSchema } from "lib/validation/auth";
import RHFTextField from "components/form/RHF/RHFTextField";
import Alert from "components/alert/Alert";
import TextButton from "components/buttons/text-button";

import useSnackbar from "hooks/useSnackbar";

import { catchErrorHandler } from "util/error";

import { changePassword } from "lib/api/api";

type FormValues = {
  email: string;
};

const ForgotPassword: React.FC = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const onGoBack = () => props.navigation.goBack();

  const defaultValues: DefaultValues<FormValues> = {
    email: "",
  };

  const enqSnack = useSnackbar();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const onDone: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      await changePassword(data.email);
      setIsLoading(false);
      enqSnack({ message: `Email sent to ${data.email}.`, variant: "success" });
      onGoBack();
    } catch (error) {
      catchErrorHandler(error, (error) => {
        setError("root.afterSubmit", error);
      });
      setIsLoading(false);
    }
  };

  return (
    <StaticScreenWrapper>
      <KeyboardDismissingView
        containerStyle={tw`flex-1`}
        style={tw`flex-1 gap-10`}
      >
        <View style={tw`flex-1 py-2  px-7   bg-white dark:bg-grey-800`}>
          <Typography variant="h6" style={" font-semi-bold mb-2 "}>
            Forgot your password?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={"max-w-[80]  mb-12 "}
          >
            Simply enter your email address associated with your account, and
            we'll send you a link to reset your password.
          </Typography>

          <View style={tw`gap-4  flex-1`}>
            <RHFTextField
              control={control}
              name="email"
              autoComplete="email"
              placeholder={"Email address"}
            />

            {errors?.root?.afterSubmit && (
              <Alert
                style="mt-2"
                variant="error"
                content={errors?.root?.afterSubmit?.message}
              />
            )}
          </View>

          <View style={tw`flex-1 justify-end`}>
            <FullWidthButton
              isLoading={isLoading}
              onPress={handleSubmit(onDone)}
              text="Submit"
            />
            <TextButton label="Go back" style={tw`mt-4`} onPress={onGoBack} />
          </View>
        </View>
      </KeyboardDismissingView>
    </StaticScreenWrapper>
  );
};

export default ForgotPassword;

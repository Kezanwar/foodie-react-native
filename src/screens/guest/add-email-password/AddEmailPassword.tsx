import React, { useState } from "react";
import tw from "theme/tailwind";
import { TouchableOpacity, View } from "react-native";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoadingButton } from "components/buttons/loading-button";

import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import { StaticScreenWrapper } from "components/screen-wrapper";
import { Typography } from "components/typography";

import { useAppSelector } from "hooks/useAppSelector";
import { RegisterEmailPasswordSchema } from "lib/validation/auth";
import RHFTextField from "components/form/RHF/RHFTextField";

import useAppDispatch from "hooks/useAppDispatch";
import useSnackbar from "hooks/useSnackbar";
import { registerJWT } from "lib/api/api";
import { authLogin } from "store/auth/auth.slice";
import { setSession } from "lib/axios/axios";
import { catchErrorHandler } from "util/error";
import Alert from "components/alert/Alert";

type FormValues = {
  email: string;
  password: string;
  confirm_password: string;
};

const AddEmailPassword: React.FC = (props: any) => {
  useAppSelector((state) => state.theme.theme);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const register = useAppSelector((state) => state.createAccount);

  const { first_name, last_name } = register;

  const enqueueSnack = useSnackbar();

  const onGoBack = () => props.navigation.goBack();

  const defaultValues: DefaultValues<FormValues> = {
    email: "",
    password: "",
    confirm_password: "",
  };

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(RegisterEmailPasswordSchema),
    defaultValues,
  });

  const onDone: SubmitHandler<FormValues> = async (data) => {
    if (!first_name || !last_name) {
      enqueueSnack({
        message: "You must provide a First and Last name",
        variant: "error",
      });
      props.navigation.goBack();
      return;
    }

    try {
      setIsLoading(true);
      const res = await registerJWT({ ...data, first_name, last_name });
      const { user, accessToken } = res?.data;
      setIsLoading(false);
      dispatch(authLogin(user));
      setSession(accessToken);
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
            Welcome, {first_name}!
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={"max-w-[70]  mb-12 "}
          >
            Please provide your Email Address and create a Password...
          </Typography>

          <View style={tw`gap-4  flex-1`}>
            <RHFTextField
              control={control}
              name="email"
              autoComplete="email"
              placeholder={"Email address"}
            />
            <RHFTextField
              control={control}
              name="password"
              autoComplete="off"
              placeholder={"Password"}
            />
            <RHFTextField
              control={control}
              name="confirm_password"
              autoComplete="off"
              placeholder={"Confirm Password"}
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
            <LoadingButton
              isLoading={isLoading}
              onPress={handleSubmit(onDone)}
              text="Done"
            />
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

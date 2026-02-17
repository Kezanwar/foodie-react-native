import { View, Alert as SystemAlert } from "react-native";
import React, { FC, useRef } from "react";
import { StaticScreenWrapper } from "components/screen-wrapper";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "lib/validation/profile";
import RHFTextField from "components/form/RHF/RHFTextField";
import tw from "theme/tailwind";
import { TextActionHeader } from "features/headers/common";
import { useAppSelector } from "hooks/useAppSelector";
import Typography from "components/typography";

import { CustomTextField } from "components/form/custom-text-field";
import TextButton from "components/buttons/text-button";
import useSnackbar from "hooks/useSnackbar";
import Spacer from "components/separators/spacer";
import { changePassword, deleteAccount, patchProfile } from "lib/api";
import { catchErrorHandler } from "utils/error";
import Alert from "components/alert";
import useAppDispatch from "hooks/useAppDispatch";
import { updateUser } from "store/auth";
import { onLogout } from "store/global-actions";
import { endSession } from "lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { isAuthSocialMedia } from "utils/auth";

type FormValues = {
  first_name: string;
  last_name: string;
};

const Profile: FC = (props: any) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const defaultValues: DefaultValues<FormValues> = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  };

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isDirty },
    getValues,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(editProfileSchema),
    defaultValues,
  });

  const snack = useSnackbar();
  const client = useQueryClient();
  const goBack = () => props.navigation.goBack();

  const isSocialMedia = isAuthSocialMedia(user!);

  const onDone: SubmitHandler<FormValues> = async (data) => {
    if (!isSocialMedia && !isDirty) {
      try {
        const res = await patchProfile(data);
        dispatch(updateUser(res.data));
        snack({ message: "Profile updated!", variant: "success" });
        goBack();
      } catch (error) {
        catchErrorHandler(error, (error) => {
          setError("root.afterSubmit", error);
        });
      }
    } else goBack();
  };

  const onResetPassword = async () => {
    if (user)
      try {
        await changePassword(user.email);
        snack({ message: "Reset password email sent!", variant: "success" });
      } catch (error) {
        catchErrorHandler(error, (error) => {
          setError("root.afterSubmit", error);
        });
      }
  };

  const handleDelete = async () => {
    try {
      await deleteAccount();
      dispatch(onLogout());
      endSession();
      client.clear();

      //log user out and clear all device cache
    } catch (error: any) {
      SystemAlert.alert(error.message);
    }
  };

  const onDeleteAcc = async () => {
    SystemAlert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => handleDelete(), style: "destructive" },
      ],
    );
  };

  return (
    <StaticScreenWrapper>
      <View style={tw`px-5 flex-1`}>
        <TextActionHeader
          headerText="Your Profile"
          rightActionText="Done"
          rightActionOnPress={isSocialMedia ? goBack : handleSubmit(onDone)}
        />
        <Typography
          variant="body2"
          style="mb-6 leading-[1.6]"
          color="text.secondary"
        >
          You can update your profile details here. If you signed up with a
          social account, some information may not be editable. This is in line
          with your chosen social media sign up method.
        </Typography>

        <View style={tw`gap-3`}>
          {user!.first_name && (
            <RHFTextField
              control={control}
              name="first_name"
              autoComplete="given-name"
              placeholder={"First name"}
              disabled={isSocialMedia}
            />
          )}
          {user!.last_name && (
            <RHFTextField
              control={control}
              name="last_name"
              autoComplete="family-name"
              placeholder={"Last name"}
              disabled={isSocialMedia}
            />
          )}
          <CustomTextField placeholder="Email" value={user?.email} disabled />
          {errors?.root?.afterSubmit && (
            <Alert
              style="mt-2"
              variant="error"
              content={errors?.root?.afterSubmit?.message}
            />
          )}
        </View>
        {!isSocialMedia && (
          <>
            <Spacer flex="flex-1" />
            <TextButton label="Change Password" onPress={onResetPassword} />
          </>
        )}
        <Spacer flex="flex-1" />
        <TextButton label="Delete Account" onPress={onDeleteAcc} />
      </View>
    </StaticScreenWrapper>
  );
};

export default Profile;

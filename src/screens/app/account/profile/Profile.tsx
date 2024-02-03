import { View } from "react-native";
import React, { FC, useState } from "react";
import { StaticScreenWrapper } from "components/screen-wrapper";
import { DefaultValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "lib/validation/profile";
import RHFTextField from "components/form/RHF/RHFTextField";
import tw from "theme/tailwind";
import { TextActionHeader } from "features/headers/common";
import { useAppSelector } from "hooks/useAppSelector";
import { Typography } from "components/typography";
import { Feather } from "@expo/vector-icons";
import { CustomTextField } from "components/form/custom-text-field";

const iconColor = tw.color("grey-700");

type FormValues = {
  first_name: string;
  last_name: string;

  password: string;
  confirm_password: string;
};

const Profile: FC = (props: any) => {
  const { user } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const defaultValues: DefaultValues<FormValues> = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    password: "",
    confirm_password: "",
  };

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(editProfileSchema),
    defaultValues,
  });

  const goBack = () => props.navigation.goBack();

  const printVals = () => {
    console.log(getValues());
  };

  const isGoogle = user?.auth_method === "google";

  return (
    <StaticScreenWrapper>
      <View style={tw`px-6`}>
        <TextActionHeader
          headerText="Your Profile"
          rightActionText="Done"
          rightActionOnPress={goBack}
        />
        <Typography
          variant="body2"
          style="mb-6 leading-[1.6]"
          color="text.secondary"
        >
          View and edit your profile details here, if you signed in with Google
          these can't be changed.
        </Typography>
        <View style={tw`gap-3`}>
          <RHFTextField
            control={control}
            name="first_name"
            autoComplete="given-name"
            placeholder={"First name"}
            disabled={isGoogle}
          />
          <RHFTextField
            control={control}
            name="last_name"
            autoComplete="family-name"
            placeholder={"Last name"}
            disabled={isGoogle}
          />
          <CustomTextField placeholder="Email" value={user?.email} disabled />

          {!isGoogle && (
            <>
              {" "}
              <RHFTextField
                control={control}
                name="password"
                autoComplete="off"
                placeholder={"Password"}
                secureTextEntry={showPassword}
                actionOnPress={toggleShowPassword}
                actionIcon={
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={18}
                    color={iconColor}
                  />
                }
              />
              <RHFTextField
                control={control}
                name="confirm_password"
                autoComplete="off"
                placeholder={"Confirm Password"}
                secureTextEntry={showPassword}
                actionOnPress={toggleShowPassword}
                actionIcon={
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={18}
                    color={iconColor}
                  />
                }
              />
            </>
          )}
          {/* <TextButton label="print" onPress={printVals} /> */}
        </View>
      </View>
    </StaticScreenWrapper>
  );
};

export default Profile;

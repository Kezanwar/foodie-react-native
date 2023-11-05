import { Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { OtpInput, OtpInputRef, Theme } from "react-native-otp-entry";
import tw from "theme/tailwind";

import { StaticScreenWrapper } from "components/screen-wrapper";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import { Typography } from "components/typography";
import Alert from "components/alert/Alert";

import useAppDispatch from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import useSnackbar from "hooks/useSnackbar";

import { authLogin } from "store/auth/auth.slice";
import { catchErrorHandler } from "util/error";
import { confirmEmailOTP, initializeJWT, resendEmailOTP } from "lib/api/api";

const OTP_THEME: Theme = {
  pinCodeTextStyle: tw`font-light text-xl`,
  focusStickStyle: tw`h-5 w-[1px] bg-grey-900`,
  containerStyle: tw`mb-12`,
};

const ConfirmEmail: React.FC = () => {
  useAppSelector((state) => state.theme.theme);
  const user = useAppSelector((state) => state.auth.user);
  const [error, setError] = useState("");

  const otpRef = useRef<OtpInputRef>(null);

  const dispatch = useAppDispatch();

  const enqueueSnack = useSnackbar();

  const onComplete = async (v: string) => {
    try {
      await confirmEmailOTP(v);
      const res = await initializeJWT();
      const {
        data: { user },
      } = res;
      dispatch(authLogin(user));
    } catch (error) {
      catchErrorHandler(error, (err) =>
        setError(err?.message || "An unexpected error occured")
      );
    }
  };

  const onResend = async () => {
    otpRef?.current?.clear();

    if (error) setError("");

    try {
      await resendEmailOTP();
      enqueueSnack({
        message: `New OTP sent to your email.`,
        variant: "success",
      });
    } catch (error) {
      catchErrorHandler(error, (err) =>
        setError(err?.message || "An unexpected error occured")
      );
    } finally {
    }
  };

  const onTextChange = () => {
    if (error) {
      setError("");
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
            Confirm your email
          </Typography>

          <Typography variant="body2" style="mb-2" color="text.secondary">
            Hi {user?.first_name}, before using foodie you must confirm your
            idenitity.
          </Typography>
          <Text style={tw`max-w-[70] mb-12`}>
            <Typography variant="body2" color="text.secondary">
              Please enter the 6 digit OTP sent to{" "}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={"font-bold"}
            >
              {user?.email}.
            </Typography>
          </Text>

          <OtpInput
            numberOfDigits={6}
            onTextChange={onTextChange}
            focusColor={tw.color("grey-900")}
            focusStickBlinkingDuration={400}
            onFilled={onComplete}
            ref={otpRef}
            theme={OTP_THEME}
          />
          {error && <Alert align="center" variant="error" content={error} />}

          <View style={tw`flex-1 justify-end`}>
            <Text
              style={tw`font-light text-center text-sm mt-12 mb-2   text-type-light-secondary`}
            >
              Didn't receive an email?
            </Text>
            <TouchableOpacity onPress={onResend}>
              <Typography
                variant="body2"
                color="primary.main"
                style="text-center font-semi-bold"
              >
                Resend OTP
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardDismissingView>
    </StaticScreenWrapper>
  );
};

export default ConfirmEmail;

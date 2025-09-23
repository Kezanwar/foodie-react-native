import { Linking, View } from "react-native";
import tw from "theme/tailwind";
import React, { FC } from "react";

import Alert from "components/alert/Alert";
import Typography from "components/typography";
import TextButton from "components/buttons/text-button";
import useRequestLocation from "hooks/useRequestLocation";

type Props = {
  error?: string;
};

const LocationsPermissionsError: FC<Props> = ({ error }) => {
  const openSettings = () => Linking.openSettings();
  const requestLocation = useRequestLocation();

  return (
    <View style={tw`px-5 py-6 items-center justify-center flex-1 bg-white`}>
      {error && (
        <>
          <Alert variant="error" align="center" content={error} />
          <Typography
            style="mt-8 text-center"
            color="text.secondary"
            variant="body2"
          >
            Sorry, we can't show you any Deals until you enable Location
            Permissions for Foodie, please go to settings and enable this, then
            come back and click refresh permissions.
          </Typography>
        </>
      )}
      <TextButton
        label="Open Settings"
        style={tw`mt-12`}
        onPress={openSettings}
      />
      <TextButton
        label="Refresh Permissions"
        style={tw`mt-4`}
        onPress={() => requestLocation(true)}
      />
    </View>
  );
};

export default LocationsPermissionsError;

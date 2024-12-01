import { Linking, View } from "react-native";
import React, { useCallback } from "react";

import tw from "theme/tailwind";
import { Ionicons } from "@expo/vector-icons";

import { StaticScreenWrapper } from "components/screen-wrapper";
import Typography from "components/typography";
import TextActionHeader from "features/headers/common/TextActionHeader";
import { FullWidthButton } from "components/buttons/full-width-button";
import TextButton from "components/buttons/text-button";
import { Or } from "components/separators/or";

import { useAppSelector } from "hooks/useAppSelector";
import useRequestLocation from "hooks/useRequestLocation";

import { reverseGeocodedMainText } from "utils/text";
import { COMMON_ROUTES } from "constants/routes";
import { useFocusEffect } from "@react-navigation/native";
import LocationStatus from "components/location-status/LocationStatus";

const Location = (props: any) => {
  const { reverseGeocode, error, location } = useAppSelector(
    (state) => state.location
  );

  const requestLocation = useRequestLocation();

  const onAddCustomLocation = () =>
    props.navigation.navigate(COMMON_ROUTES.ADD_CUSTOM_LOCATION);

  const openSettings = () => Linking.openSettings();

  useFocusEffect(
    useCallback(() => {
      if (error) {
        requestLocation();
      }
    }, [error])
  );

  return (
    <StaticScreenWrapper>
      <View style={tw`flex-1 px-5`}>
        <TextActionHeader
          loading={false}
          headerText="Location"
          rightActionText="Done"
          rightActionOnPress={props.navigation.goBack}
        />
        <LocationStatus />
        {location && (
          <>
            <Typography
              variant="body2"
              style="mb-20 leading-[1.6]"
              color="text.secondary"
            >
              Choose a location to browse from, you can use your current
              location or specify one.
            </Typography>

            <View style={tw`items-center`}>
              <Ionicons
                name="map-outline"
                size={32}
                color={tw.color("primary-main")}
              />
              <Typography
                variant="h7"
                color="text.primary"
                style={" mt-5 font-medium text-center"}
              >
                {reverseGeocode
                  ? reverseGeocodedMainText(reverseGeocode)
                  : "No Location"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                style={"mt-2 -ml-1 text-center "}
              >
                {reverseGeocode
                  ? reverseGeocode?.subregion
                  : "User denied Location Permissions..."}
              </Typography>
              {reverseGeocode && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={"mt-2 -ml-1 text-center "}
                >
                  {reverseGeocode?.country}
                </Typography>
              )}
            </View>
          </>
        )}

        <View style={tw`flex-1 gap-4 justify-end`}>
          {!error && (
            <>
              <FullWidthButton
                onPress={() => requestLocation()}
                text="Use your Current Location"
              />
              <Or />
              <TextButton
                label="Use a Different Location"
                onPress={onAddCustomLocation}
              />
            </>
          )}
        </View>
      </View>
    </StaticScreenWrapper>
  );
};

export default Location;

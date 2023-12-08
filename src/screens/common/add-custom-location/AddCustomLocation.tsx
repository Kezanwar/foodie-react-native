import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { StaticScreenWrapper } from "components/screen-wrapper";
import tw from "theme/tailwind";
import { CustomTextField } from "components/form/custom-text-field";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import Alert from "components/alert/Alert";
import { LoadingButton } from "components/buttons/loading-button";
import TextButton from "components/buttons/text-button";
import { Typography } from "components/typography";
import { AntDesign } from "@expo/vector-icons";
import {
  LocationGeocodedAddress,
  LocationGeocodedLocation,
  geocodeAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { catchErrorHandler } from "util/error";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";
import useAppDispatch from "hooks/useAppDispatch";
import { setLocationObject } from "store/location/location.slice";
import { setShouldUseCurrentLocation } from "lib/storage/storage";

const PRIM = tw.color("primary-main");

const AddCustomLocation = (props: any) => {
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<
    (LocationGeocodedAddress & LocationGeocodedLocation) | null
  >(null);

  const dispatch = useAppDispatch();

  const onGoBack = () => props.navigation.goBack();

  const handleSetSearchText = (value: string) => {
    if (error) setError("");
    if (result) setResult(null);
    setSearchText(value);
  };

  const onSearch = async () => {
    if (!searchText) return;
    setResult(null);
    try {
      setLoading(true);
      const res = await geocodeAsync(searchText);
      if (res[0]) {
        const loc = await reverseGeocodeAsync(res[0]);
        setResult({ ...loc[0], ...res[0] });
      } else {
        setError(
          `We couldn't find a location for '${searchText}', please try again.`
        );
      }
    } catch (error) {
      catchErrorHandler(error, (err) => setError(err.message));
    }
    setLoading(false);
  };

  const onUseResult = () => {
    if (result) {
      const {
        longitude,
        latitude,
        city,
        country,
        region,
        district,
        isoCountryCode,
        name,
        postalCode,
        street,
        streetNumber,
        subregion,
        timezone,
      } = result;

      dispatch(
        setLocationObject({
          location: {
            mocked: false,
            timestamp: Math.floor(new Date("2012.08.10").getTime() / 1000),
            coords: {
              longitude,
              latitude,
              accuracy: 5,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
            },
          },
          reverseGeocode: {
            city,
            country,
            region,
            district,
            isoCountryCode,
            name,
            postalCode,
            street,
            streetNumber,
            subregion,
            timezone,
          },
        })
      );
      setShouldUseCurrentLocation(false);
      props.navigation.navigate("Home");
    }
  };

  return (
    <StaticScreenWrapper>
      <KeyboardDismissingView
        containerStyle={tw`flex-1`}
        style={tw`flex-1 px-6`}
      >
        <Typography variant="h6" style={" font-semi-bold mb-2 "}>
          Search for a Location
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          style={"max-w-[70]  mb-12 "}
        >
          Use the input below to set a location to be used for your feed.
        </Typography>
        <View style={tw`flex-row items-center gap-2`}>
          <CustomTextField
            containerStyle={tw`flex-1`}
            value={searchText}
            onChangeText={handleSetSearchText}
            placeholder="Search for a Location"
          />
          {loading ? (
            <ActivityIndicator size={"small"} color={PRIM} />
          ) : (
            <TouchableOpacity onPress={onSearch}>
              <AntDesign name="search1" size={26} color={PRIM} />
            </TouchableOpacity>
          )}
        </View>

        {error && <Alert style="mt-4" variant="error" content={error} />}
        {result && (
          <>
            {/* <Typography
              color="text.secondary"
              style="text-[4] mt-6 font-medium"
              variant="subheader"
            >
              Results
            </Typography> */}

            <Animated.View
              entering={FadeInUp}
              style={tw`border-[0.4px] border-grey-400 bg-white p-4 mt-6 rounded-md`}
            >
              <Typography
                color="text.primary"
                style="text-[4.5]"
                variant="subheader"
              >
                {result.district}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {result.city}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {result.region}
              </Typography>

              <TouchableOpacity
                onPress={onUseResult}
                style={tw`flex-row gap-1 bg-primary-main-04 mt-4 justify-between rounded-md px-2 py-1.5 w-40 items-center `}
              >
                {/* <AntDesign
                  name="find"
                  size={20}
                  color={tw.color("primary-main")}
                /> */}
                <Entypo
                  name="direction"
                  size={20}
                  color={tw.color("primary-main")}
                />
                <Typography
                  color="primary.main"
                  style="font-semi-bold text-[3.35] "
                  variant="body2"
                >
                  Use This Location
                </Typography>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
        <View style={tw`flex-1 gap-4 justify-end`}>
          {/* {result && <LoadingButton onPress={() => {}} text="Done" />} */}
          <TextButton label="Cancel" onPress={onGoBack} />
        </View>
      </KeyboardDismissingView>
    </StaticScreenWrapper>
  );
};

export default AddCustomLocation;

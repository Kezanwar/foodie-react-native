import { Platform, TouchableOpacity, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { ISingleLocation, ISingleRestaurant } from "types/single-deal";
import { Typography } from "components/typography";
import tw from "theme/tailwind";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Linking } from "react-native";

type Props = {
  restuarant: ISingleRestaurant;
  location: ISingleLocation;
};

const BookingInfo: FC<Props> = ({ location, restuarant }) => {
  const { geometry } = location;

  const onDirectionsPress = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${geometry.coordinates[1]},${geometry.coordinates[0]}`;
    const label = restuarant.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) Linking.openURL(url);
  };

  const onPhonePress = () => {
    Linking.openURL(`tel:${location.phone_number}`);
  };

  const onEmailPress = () => {
    Linking.openURL(`mailto:${location.email}`);
  };

  const onBookOnline = () => {
    if (!restuarant.booking_link) return;
    Linking.openURL(restuarant.booking_link);
  };

  return (
    <View style={tw`m-6 mt-5 mb-8 gap-3`}>
      <GreyBtn onPress={onDirectionsPress}>
        <IconAndText
          text={Object.values(location.address).filter((el) => el)}
          icon={
            <SimpleLineIcons
              name="directions"
              size={21}
              color={tw.color("success-main")}
            />
          }
        />
      </GreyBtn>
      {restuarant.booking_link && (
        <GreyBtn onPress={onEmailPress}>
          <IconAndText
            text={"Make a booking online"}
            icon={
              <MaterialCommunityIcons
                name="web"
                size={19.5}
                color={tw.color("info-main")}
              />
            }
          />
        </GreyBtn>
      )}

      <GreyBtn onPress={onPhonePress}>
        <IconAndText
          text={location.phone_number}
          icon={
            <Feather
              name="smartphone"
              size={20.5}
              color={tw.color("secondary-main")}
            />
          }
        />
      </GreyBtn>

      <GreyBtn onPress={onEmailPress}>
        <IconAndText
          text={location.email}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={19}
              color={tw.color("warning-main")}
            />
          }
        />
      </GreyBtn>
    </View>
  );
};

export default BookingInfo;

const IconAndText: FC<{ text: string | string[]; icon: ReactNode }> = ({
  icon,
  text,
}) => {
  const isStr = typeof text === "string";
  return (
    <View style={tw`flex-row gap-3 ${isStr ? "items-center" : ""}`}>
      {icon}
      {isStr ? (
        <Text>{text}</Text>
      ) : (
        <View style={tw`-mt-1`}>
          {text.map((s) => (
            <Text>{s}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const Text: FC<{ children: string }> = ({ children }) => {
  return (
    <Typography color="text.primary" variant="body2" style="text-3.2">
      {children}
    </Typography>
  );
};

const GreyBtn: FC<{ children: ReactNode; onPress: () => void }> = ({
  children,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={tw` bg-grey-200 rounded-lg p-3 `}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

import { Platform, TouchableOpacity, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { Typography } from "components/typography";
import tw from "theme/tailwind";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Linking } from "react-native";
import { Geometry } from "types/geometry";
import { Address } from "types/address";

type Props = {
  name: string;
  booking_link?: string;
  geometry: Geometry;
  address: Address;
  email: string;
  phone_number: string;
};

const BookingInfo: FC<Props> = ({
  geometry,
  name,
  booking_link,
  address,
  phone_number,
  email,
}) => {
  const onDirectionsPress = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${geometry.coordinates[1]},${geometry.coordinates[0]}`;
    const label = name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) Linking.openURL(url);
  };

  const onPhonePress = () => {
    Linking.openURL(`tel:${phone_number}`);
  };

  const onEmailPress = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const onBookOnline = () => {
    if (!booking_link) return;
    Linking.openURL(booking_link);
  };

  return (
    <View style={tw`m-6 mt-5 gap-3`}>
      <GreyBtn onPress={onDirectionsPress}>
        <IconAndText
          text={Object.values(address).filter((el) => el)}
          icon={
            <SimpleLineIcons
              name="directions"
              size={21}
              color={tw.color("success-main")}
            />
          }
        />
      </GreyBtn>
      {booking_link && (
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
          text={phone_number}
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
          text={email}
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
            <Text key={s}>{s}</Text>
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

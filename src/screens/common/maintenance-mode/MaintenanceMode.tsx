import { Text, View } from "react-native";
import React, { FC } from "react";
import { StaticScreenWrapper } from "components/screen-wrapper";
import tw from "theme/tailwind";
import Typography from "components/typography";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {};

const MaintenanceMode: FC<Props> = ({}) => {
  return (
    <StaticScreenWrapper>
      <View
        style={tw`flex-1 py-2 justify-center items-center  px-5   bg-white dark:bg-grey-800`}
      >
        <Ionicons
          name="hammer-outline"
          size={24}
          color={tw.color("primary-main")}
        />
        <Typography variant="h6" style={" font-bold text-center mb-6 mt-8  "}>
          Maintenance
        </Typography>
        <Typography variant="body2" style={" text-center mt-4 text-grey-600  "}>
          The Foodie App is currently down for scheduled maintenance to improve
          your experience. We're working hard to make things even better for you
          and expect to be back online shortly.
        </Typography>
        <Typography variant="body2" style="text-center mt-4 text-grey-600">
          Thank you for your patience and understanding! If you have any
          questions or need assistance, feel free to reach out to us at{" "}
          <Typography variant="body2" style="text-primary-main ">
            admin@thefoodie.app
          </Typography>
        </Typography>
      </View>
    </StaticScreenWrapper>
  );
};

export default MaintenanceMode;

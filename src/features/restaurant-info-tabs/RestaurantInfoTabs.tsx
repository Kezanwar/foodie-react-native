import React, { FC, useMemo } from "react";
import { TabController, TabControllerItemProps } from "react-native-ui-lib";
import tw from "theme/tailwind";

import { Coordinates } from "types/geometry";
import BookingInfo from "components/booking-info";
import { Address } from "types/address";
import OpeningTimes from "components/opening-times/OpeningTimes";
import { IOpeningTimes } from "types/opening-times";
import { MapViewRegion } from "screens/common/map-view/MapView";
import { GoToMapImage } from "components/map";

const map_style = tw`h-70 m-5 mt-5 rounded-md`;

const indicator_style = tw`h-[1.5px] bg-primary-main `;

type Props = {
  name: string;
  booking_link?: string;
  coordinates: Coordinates;
  address: Address;
  email: string;
  phone_number: string;
  opening_times: IOpeningTimes;
  initialIndex?: number;
  location_id: string;
  navToMap: (region: MapViewRegion) => void;
};

const bookingInfoTab = {
  label: "Booking Info",
  labelColor: tw.color("grey-500"),
  selectedLabelStyle: tw`font-medium`,
  backgroundColor: "#00000000",
  labelStyle: tw`font-medium`,
  selectedLabelColor: tw.color("primary-main"),
};

const openingTimesTab = {
  label: "Opening Times",
  labelColor: tw.color("grey-500"),
  selectedLabelStyle: tw`font-medium`,
  labelStyle: tw`font-medium`,
  backgroundColor: "#00000000",
  selectedLabelColor: tw.color("primary-main"),
};

const RestaurantInfoTabs: FC<Props> = React.memo(
  ({
    coordinates,
    address,
    email,
    name,
    phone_number,
    booking_link,
    opening_times,
    initialIndex = 0,
    location_id,
    navToMap,
  }) => {
    const region = useMemo(() => {
      return {
        latitude: coordinates[1],
        longitude: coordinates[0],
      };
    }, [coordinates[1], coordinates[0]]);

    const tabControllerItems: TabControllerItemProps[] = useMemo(() => {
      return [
        {
          label: "Map View",
          labelColor: tw.color("grey-500"),
          selectedLabelStyle: tw`font-medium`,
          backgroundColor: "#00000000",
          labelStyle: tw`font-medium`,
          selectedLabelColor: tw.color("primary-main"),
          ignore: true,
          onPress: () => navToMap(region),
        },
        bookingInfoTab,
        openingTimesTab,
      ];
    }, [region]);

    return (
      <TabController
        asCarousel
        initialIndex={initialIndex}
        items={tabControllerItems}
      >
        <TabController.TabBar
          indicatorStyle={indicator_style}
          height={32}
          spreadItems={false}
          backgroundColor="transparent"
          containerStyle={tw`mx-1`}
          items={tabControllerItems}
        />
        <TabController.PageCarousel>
          <TabController.TabPage lazy index={0}>
            <GoToMapImage onPress={() => navToMap(region)} />
          </TabController.TabPage>
          <TabController.TabPage lazy index={1}>
            <BookingInfo
              address={address}
              email={email}
              coordinates={coordinates}
              name={name}
              phone_number={phone_number}
              booking_link={booking_link}
              location_id={location_id}
            />
          </TabController.TabPage>
          <TabController.TabPage lazy index={2}>
            <OpeningTimes opening_times={opening_times} />
          </TabController.TabPage>
        </TabController.PageCarousel>
      </TabController>
    );
  }
);

export default RestaurantInfoTabs;

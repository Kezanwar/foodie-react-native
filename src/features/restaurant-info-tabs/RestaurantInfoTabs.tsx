import React, { FC } from "react";
import { TabController, TabControllerItemProps } from "react-native-ui-lib";
import tw from "theme/tailwind";
import MapView, { Marker, Region } from "react-native-maps";
import { Geometry } from "types/geometry";
import BookingInfo from "components/booking-info";
import { Address } from "types/address";
import OpeningTimes from "components/opening-times/OpeningTimes";
import { IOpeningTimes } from "types/opening-times";

const tabControllerItems: TabControllerItemProps[] = [
  {
    label: "Map View",
    labelColor: tw.color("grey-500"),
    selectedLabelStyle: tw`font-medium`,
    backgroundColor: "#00000000",
    labelStyle: tw`font-medium`,
    selectedLabelColor: tw.color("primary-main"),
  },
  {
    label: "Booking Info",
    labelColor: tw.color("grey-500"),
    selectedLabelStyle: tw`font-medium`,
    backgroundColor: "#00000000",
    labelStyle: tw`font-medium`,
    selectedLabelColor: tw.color("primary-main"),
  },
  {
    label: "Opening Times",
    labelColor: tw.color("grey-500"),
    selectedLabelStyle: tw`font-medium`,
    labelStyle: tw`font-medium`,
    backgroundColor: "#00000000",
    selectedLabelColor: tw.color("primary-main"),
  },
];

type Props = {
  name: string;
  booking_link?: string;
  geometry: Geometry;
  address: Address;
  email: string;
  phone_number: string;
  opening_times: IOpeningTimes;
  initialIndex?: number;
};

const RestaurantInfoTabs: FC<Props> = React.memo(
  ({
    geometry,
    address,
    email,
    name,
    phone_number,
    booking_link,
    opening_times,
    initialIndex = 0,
  }) => {
    return (
      <TabController
        asCarousel
        initialIndex={initialIndex}
        items={tabControllerItems}
      >
        <TabController.TabBar
          //   indicatorStyle={tw`h-[px] bg-primary-main `}
          height={32}
          spreadItems={false}
          backgroundColor="transparent"
          containerStyle={tw`mx-2 bg-[#00000000]`}
          items={tabControllerItems}
        />
        <TabController.PageCarousel>
          <TabController.TabPage lazy index={0}>
            <MapView
              minZoomLevel={10}
              showsUserLocation
              mapType="terrain"
              showsPointsOfInterest
              region={
                {
                  latitude: geometry.coordinates[1],
                  longitude: geometry.coordinates[0],
                } as Region
              }
              style={tw`h-50 m-6 mt-5 rounded-md`}
            >
              <Marker
                coordinate={{
                  latitude: geometry.coordinates[1],
                  longitude: geometry.coordinates[0],
                }}
                pinColor={tabControllerItems[0].selectedLabelColor}
              />
            </MapView>
          </TabController.TabPage>
          <TabController.TabPage lazy index={1}>
            <BookingInfo
              address={address}
              email={email}
              geometry={geometry}
              name={name}
              phone_number={phone_number}
              booking_link={booking_link}
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

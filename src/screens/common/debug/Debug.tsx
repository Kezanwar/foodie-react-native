import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ScrollScreenWrapper } from "components/screen-wrapper";
import Typography from "components/typography";
import tw from "theme/tailwind";
import { useAppSelector } from "hooks/useAppSelector";

import { TextActionHeader } from "features/headers/common";
import LocalStorage from "lib/storage";
import RoundedButton from "components/buttons/rounded-button/RoundedButton";
import useAppDispatch from "hooks/useAppDispatch";
import { deactivate, setDebugAPIEndpoint } from "store/debug/debug.slice";
import { CustomTextField } from "components/form/custom-text-field";

import { AntDesign } from "@expo/vector-icons";

const PRIM = tw.color("primary-main");

const Debug = (props: any) => {
  const debug = useAppSelector((s) => s.debug);
  const authStore = useAppSelector((s) => s.auth);
  const stats = LocalStorage.getStats();
  const token = LocalStorage.getAccessToken();
  const lastKnowLocation = LocalStorage.getLastKnownLocation();
  const dispatch = useAppDispatch();

  const [showEditEndpoint, setShowEditEndpoint] = useState<boolean>(false);
  const [newEditEndpoint, setNewEditEndpoint] = useState<string>("");

  const handleEditEndpointClick = () => {
    if (!showEditEndpoint) {
      setNewEditEndpoint(debug.debugAPIEndpoint);
    } else {
      setNewEditEndpoint("");
    }

    setShowEditEndpoint((p) => !p);
  };

  const handleOnChangeEditEndpoint = (v: string) => {
    setNewEditEndpoint(v);
  };

  const handleSubmitChangeEditEndpoint = () => {
    dispatch(setDebugAPIEndpoint(newEditEndpoint));
  };

  return (
    <ScrollScreenWrapper
      header={
        <View style={tw`px-4`}>
          <TextActionHeader
            fontSize="medium"
            mb={true}
            headerText="Debug Menu"
            rightActionText="Done"
            rightActionOnPress={props.navigation.goBack}
          />
        </View>
      }
    >
      <View style={tw`px-4 gap-4 pt-2`}>
        <TouchableOpacity
          onPress={handleEditEndpointClick}
          style={tw` bg-grey-200 rounded-lg p-3 gap-1`}
        >
          <Typography variant="h7">API Endpoint</Typography>
          <Typography variant="body1">{debug.debugAPIEndpoint}</Typography>
          {showEditEndpoint && (
            <View style={tw`flex-row gap-2 items-center mt-2`}>
              <CustomTextField
                containerStyle={tw`flex-1`}
                placeholder=""
                onChangeText={handleOnChangeEditEndpoint}
                value={newEditEndpoint}
              />
              <TouchableOpacity onPress={handleSubmitChangeEditEndpoint}>
                <AntDesign name="arrowup" size={23} color={PRIM} />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
        <View style={tw` bg-grey-200 rounded-lg p-3 gap-1`}>
          <Typography variant="h7">Access Token</Typography>
          <Typography variant="body1">{token || "undefined"}</Typography>
        </View>
        <View style={tw` bg-grey-200 rounded-lg p-3 gap-1`}>
          <Typography variant="h7">Auth Store</Typography>
          <Typography variant="body1">{JSON.stringify(authStore)}</Typography>
        </View>
        <View style={tw` bg-grey-200 rounded-lg p-3 gap-1`}>
          <Typography variant="h7">Last Known Location</Typography>
          <Typography variant="body1">
            {lastKnowLocation ? JSON.stringify(lastKnowLocation) : "undefined"}
          </Typography>
        </View>
        <View style={tw` bg-grey-200 rounded-lg p-3 gap-1`}>
          <Typography variant="h7">Stats</Typography>
          <Typography variant="body1">
            {stats ? JSON.stringify(stats) : "undefined"}
          </Typography>
        </View>
        <RoundedButton
          onPress={() => dispatch(deactivate())}
          text="Disable Debug Mode"
        />
      </View>
    </ScrollScreenWrapper>
  );
};
export default Debug;

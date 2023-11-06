import { View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import tw from "theme/tailwind";

import { useAppSelector } from "hooks/useAppSelector";
import TextActionHeader from "components/header/TextActionHeader";
import { StaticScreenWrapper } from "components/screen-wrapper";
import { LoadingScreen } from "components/loading-screen";
import { Typography } from "components/typography";

import TitleBadgeCounter from "components/title-badge-counter";

import useOptionsQuery from "hooks/queries/useOptionsQuery";
import usePreferencesQuery, {
  useUpdatePreferences,
} from "hooks/queries/usePreferencesQuery";
import CuisinesSelectForm from "features/cuisines-select-form/CuisinesSelectForm";
import DietarySelectForm from "features/dietary-select-form";

import useAppDispatch from "hooks/useAppDispatch";
import {
  initializeCuisines,
  initializeDietary,
  toggleCuisine,
  toggleDietary,
} from "store/preferences/preferences.slice";
import useSnackbar from "hooks/useSnackbar";
import { addPreferences } from "lib/api/api";
import { catchErrorHandler } from "util/error";
import { HOME_STACK } from "constants/routes";

const Preferences = (props: any) => {
  useAppSelector((state) => state.theme.theme);
  const [apiLoading, setApiLoading] = useState(false);

  const dispatch = useAppDispatch();
  const updatePreferences = useUpdatePreferences();
  const enqeueSnackbar = useSnackbar();

  const cuisines = useAppSelector((state) => state.preferences.cuisines);
  const dietary_requirements = useAppSelector(
    (state) => state.preferences.dietary_requirements
  );

  const preferences = usePreferencesQuery();
  const { isLoading, data } = useOptionsQuery();

  const initialCuisines = useMemo(() => {
    return data?.data?.cuisines
      ? data?.data?.cuisines.map((d) => ({
          ...d,
          selected: Boolean(
            preferences.data?.data?.preferences?.cuisines.find(
              (p) => p.slug === d.slug
            )
          ),
        }))
      : [];
  }, [data?.data?.cuisines]);

  const initialDietary = useMemo(() => {
    return data?.data?.dietary_requirements
      ? data?.data?.dietary_requirements.map((d) => ({
          ...d,
          selected: Boolean(
            preferences.data?.data?.preferences?.dietary_requirements.find(
              (p) => p.slug === d.slug
            )
          ),
        }))
      : [];
  }, [data?.data?.dietary_requirements]);

  useEffect(() => {
    if (initialCuisines.length) dispatch(initializeCuisines(initialCuisines));
  }, [initialCuisines]);

  useEffect(() => {
    if (initialDietary.length) dispatch(initializeDietary(initialDietary));
  }, [initialCuisines]);

  const cuisineCount = useMemo(() => {
    return cuisines.reduce((acc, curr) => {
      if (curr.selected) acc++;
      return acc;
    }, 0);
  }, [cuisines]);

  const dietaryCount = useMemo(() => {
    return dietary_requirements.reduce((acc, curr) => {
      if (curr.selected) acc++;
      return acc;
    }, 0);
  }, [dietary_requirements]);

  const onCuisineSelect = useCallback((slug: string) => {
    dispatch(toggleCuisine(slug));
  }, []);

  const onDietarySelect = useCallback((slug: string) => {
    dispatch(toggleDietary(slug));
  }, []);

  const onDone = useCallback(async () => {
    if (cuisineCount === 0) {
      enqeueSnackbar({
        message: "You must choose atleast 1 cuisine",
        variant: "error",
      });
      return;
    }

    try {
      setApiLoading(true);
      const res = await addPreferences({
        cuisines: cuisines
          .filter(({ selected }) => selected)
          .map(({ name, slug }) => ({ name, slug })),
        dietary_requirements: dietary_requirements
          .filter(({ selected }) => selected)
          .map(({ name, slug }) => ({ name, slug })),
      });
      updatePreferences(res);
      props.navigation.navigate(HOME_STACK.ROOT);
    } catch (error) {
      catchErrorHandler(error, (err) => {
        enqeueSnackbar({ message: err.message, variant: "error" });
      });
    } finally {
      setApiLoading(false);
    }
  }, [cuisineCount, dietaryCount]);

  return isLoading || preferences?.isLoading ? (
    <LoadingScreen />
  ) : (
    <StaticScreenWrapper>
      <View style={tw`px-6`}>
        <TextActionHeader
          loading={apiLoading}
          headerText="Preferences"
          rightActionText="Done"
          rightActionOnPress={onDone}
        />
        <Typography variant="body2" style="mb-6" color="text.secondary">
          To help us organize your feed better, select your preferred cuisine
          types (minimum 1) and let us know your preferred dietary requirements.
        </Typography>

        <View style={tw`flex-row gap-6 mb-5`}></View>
        <View style={tw`gap-8`}>
          <View>
            <TitleBadgeCounter
              error={cuisineCount === 0}
              title="Cuisines"
              count={`${cuisineCount}`}
            />
            <CuisinesSelectForm
              onCuisineSelect={onCuisineSelect}
              cuisines={cuisines}
            />
          </View>
          <View>
            <TitleBadgeCounter
              title="Dietary Requirements"
              count={`${dietaryCount}`}
            />
            <DietarySelectForm
              dietary_requirements={dietary_requirements}
              onDietarySelect={onDietarySelect}
            />
          </View>
        </View>
      </View>
    </StaticScreenWrapper>
  );
};

export default Preferences;

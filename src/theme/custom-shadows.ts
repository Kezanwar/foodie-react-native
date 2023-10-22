import { StyleSheet } from "react-native";

export const SECTION_SHADOWS = StyleSheet.create({
  topShadowSection: {
    shadowOffset: { width: 1, height: -6 },
    shadowColor: `#000`,
    shadowRadius: 5,
    shadowOpacity: 0.05,
    elevation: 2,
  },
});

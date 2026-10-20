import { colors } from "@/logic/logic";
import { StyleSheet, Text, View } from "react-native";
import ColorBall from "./ColorBall";

type activityCardProp = {
  label: string;
  colorBall?: string;
  subtitle: string;
  highlight?: boolean;
  padding?: number;
};

export default function ActivityCard({
  label,
  colorBall = "",
  subtitle,
  highlight = false,
  padding = 16,
}: activityCardProp) {
  return (
    <View
      style={[
        styles.container,
        { padding: padding },
        highlight && {
          backgroundColor: "yellow",
        },
      ]}
    >
      {colorBall && <ColorBall color={colorBall} />}
      <Text numberOfLines={1} style={[styles.labelText]}>
        {label}
      </Text>
      <Text
        style={subtitle === "→" ? styles.listItemArrow : styles.labelSubtitle}
      >
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",

    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 16,

    gap: 10,
  },
  labelText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },

  labelSubtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "grey",
  },
  listItemArrow: {
    color: "lightgrey",
    fontWeight: "800",
    fontSize: 24,
  },

  colorBall: {
    borderRadius: 10,
    height: 10,
    width: 10,
  },
});

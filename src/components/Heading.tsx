import { colors } from "@/logic/logic";
import { Text, View } from "react-native";

type headingProp = {
  header: string;
  subtitle?: string;
  size?: number;
};

export default function Heading({
  header,
  subtitle = "",
  size = 34,
}: headingProp) {
  return (
    <View style={{}}>
      <Text style={{ fontSize: size, fontWeight: "bold", color: colors.text }}>
        {header}
      </Text>
      {subtitle !== "" && (
        <Text
          style={{
            fontSize: size / 2,
            lineHeight: (size / 1.5) * 1.4,
            color: "grey",
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}

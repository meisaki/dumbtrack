import { StyleSheet, View } from "react-native";
type ColorBallProp = {
  size?: number;
  color: string;
};

export default function ColorBall({ size = 10, color }: ColorBallProp) {
  return (
    <View
      style={{
        backgroundColor: color,
        height: size,
        width: size,
        borderRadius: 999,
      }}
    />
  );
}

const styles = StyleSheet.create({});

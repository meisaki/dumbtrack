import { useState } from "react";
import { Pressable } from "react-native";
import Svg, { Ellipse, G, Rect, Text } from "react-native-svg";

type TimerProp = {
  onPress?: () => void;
  size?: number;
};

export default function TimerButton({ onPress, size = 100 }: TimerProp) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      style={{ width: size, height: size }}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
    >
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        {/* Base  */}
        <Ellipse cx="50" cy="80" rx="40" ry="10" fill="#222222" />
        <Rect x="10" y="54" width="80" height="25" fill="#222222" />
        <Ellipse cx="50" cy="54" rx="40" ry="10" fill="#333333" />

        {/* Button */}
        <Ellipse cx="50" cy="50" rx="30" ry="8" fill="#DD0000" />
        <G translateY={pressed ? 8 : 0}>
          <Rect
            x="20"
            y="30"
            width="60"
            height={pressed ? "12" : "20"}
            fill="#DD0000"
          />
          <Ellipse
            cx="50"
            cy="30"
            rx="30"
            ry="10"
            fill="#FF0000"
            stroke="black"
            strokeWidth="0.2"
          />
          <Text fontSize="8" x="50" y="33" fill="white" textAnchor="middle">
            PRESS ME
          </Text>
        </G>
      </Svg>
    </Pressable>
  );
}

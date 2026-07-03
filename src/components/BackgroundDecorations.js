import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

const decorations = [
  // Large Glow Circles
  {
    type: "circle",
    size: 500,
    color: "#2563EB",
    opacity: 0.12,
    top: -220,
    right: -200,
  },

  {
    type: "circle",
    size: 380,
    color: "#7C3AED",
    opacity: 0.1,
    bottom: -150,
    left: -150,
  },

  {
    type: "circle",
    size: 250,
    color: "#06B6D4",
    opacity: 0.08,
    top: 280,
    left: -80,
  },

  // Rings
  {
    type: "ring",
    size: 220,
    top: 30,
    left: -60,
  },

  {
    type: "ring",
    size: 150,
    bottom: 150,
    right: 40,
  },

  {
    type: "ring",
    size: 100,
    top: 380,
    right: 250,
  },

  {
    type: "ring",
    size: 180,
    top: 60,
    right: 80,
  },

  {
    type: "ring",
    size: 130,
    bottom: 100,
    left: 200,
  },

  {
    type: "ring",
    size: 90,
    top: 280,
    left: 120,
  },

  // Dots
  {
    type: "dot",
    size: 12,
    color: "#FFFFFF",
    top: 120,
    left: 180,
  },

  {
    type: "dot",
    size: 10,
    color: "#D4AF37",
    top: 200,
    right: 180,
  },

  {
    type: "dot",
    size: 8,
    color: "#06B6D4",
    bottom: 200,
    left: 250,
  },

  {
    type: "dot",
    size: 14,
    color: "#FFFFFF",
    bottom: 120,
    right: 150,
  },

  {
    type: "dot",
    size: 8,
    color: "#FFFFFF",
    top: 500,
    left: 80,
  },

  {
    type: "dot",
    size: 10,
    color: "#FFFFFF",
    top: 90,
    left: 320,
  },

  {
    type: "dot",
    size: 14,
    color: "#D4AF37",
    top: 350,
    left: 250,
  },

  {
    type: "dot",
    size: 8,
    color: "#FFFFFF",
    top: 500,
    right: 200,
  },

  {
    type: "dot",
    size: 12,
    color: "#06B6D4",
    bottom: 250,
    left: 80,
  },

  {
    type: "dot",
    size: 10,
    color: "#FFFFFF",
    bottom: 150,
    right: 320,
  },

  {
    type: "dot",
    size: 16,
    color: "#EC4899",
    bottom: 60,
    left: 300,
  },

  // Extra Medium Circles

  {
    type: "circle",
    size: 180,
    color: "#38BDF8",
    opacity: 0.08,
    top: 100,
    left: 60,
  },

  {
    type: "circle",
    size: 140,
    color: "#EC4899",
    opacity: 0.07,
    top: 220,
    right: 150,
  },

  {
    type: "circle",
    size: 120,
    color: "#14B8A6",
    opacity: 0.08,
    bottom: 180,
    right: 80,
  },

  {
    type: "circle",
    size: 160,
    color: "#60A5FA",
    opacity: 0.06,
    bottom: 220,
    left: 120,
  },

  {
    type: "circle",
    size: 100,
    color: "#D4AF37",
    opacity: 0.08,
    top: 420,
    left: 40,
  },

  {
    type: "circle",
    size: 90,
    color: "#A855F7",
    opacity: 0.07,
    bottom: 80,
    right: 280,
  },
];

export default function BackgroundDecorations() {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 35,
          duration: 3000,
          useNativeDriver: true,
        }),

        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <>
      {decorations.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            {
              position: "absolute",

              width: item.size,
              height: item.size,

              borderRadius: item.size / 2,

              ...item,

              transform: [
                {
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 35],
                    outputRange: [0, ((index % 7) - 3) * 10],
                  }),
                },

                {
                  translateX: floatAnim.interpolate({
                    inputRange: [0, 35],
                    outputRange: [0, ((index % 5) - 2) * 6],
                  }),
                },
              ],
            },

            item.type === "circle" && {
              backgroundColor: item.color,
              opacity: item.opacity,
            },

            item.type === "ring" && {
              borderWidth: 1.5,
              borderColor: "rgba(255,255,255,0.08)",
            },

            item.type === "dot" && {
              backgroundColor: item.color,
              opacity: 0.4,
            },
          ]}
        />
      ))}
    </>
  );
}

import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

export default function KioskButton({ title, subtitle, icon, color, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, borderLeftWidth: 6, borderLeftColor: color },
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>{icon}</View>

      <View>
        <Text style={styles.text}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "85%",
    maxWidth: 700,
    minWidth: 350,

    height: 60,

    backgroundColor: "#1A2238",

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 20,

    marginVertical: 4,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 8,
  },

  iconContainer: {
    width: 50,
    alignItems: "center",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 15,
  },

  subtitle: {
    color: "#FFFFFF",
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
  },
});

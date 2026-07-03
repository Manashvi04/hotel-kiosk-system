import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Header({ title, subtitle }) {
  return (
    <View style={styles.header}>
      <Image source={require("../../assets/logo.webp")} style={styles.logo} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>{subtitle}</Text>

      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 10,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },

  subtitle: {
    color: "#D4AF37",
    fontSize: 16,
    marginTop: 1,
    textAlign: "center",
    letterSpacing: 2,
  },

  divider: {
    width: 120,
    height: 3,
    backgroundColor: "#D4AF37",
    borderRadius: 10,
    marginTop: 12,
  },
});

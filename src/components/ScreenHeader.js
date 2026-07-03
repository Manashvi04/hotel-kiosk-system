import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function ScreenHeader({ title, step, totalSteps }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.step}>
        {t.step} {step} / {totalSteps}
      </Text>

      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  step: {
    color: "#D4AF37",
    fontSize: 18,
    marginTop: 10,
  },

  line: {
    width: 130,
    height: 3,
    backgroundColor: "#D4AF37",
    borderRadius: 10,
    marginTop: 15,
  },
});

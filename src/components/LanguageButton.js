import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { LanguageContext } from "../context/LanguageContext";

export default function LanguageButton() {
  const { language, setLanguage } = useContext(LanguageContext);

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "gu", label: "ગુજરાતી" },
    { code: "ar", label: "العربية" },
  ];

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[styles.button, language === lang.code && styles.activeButton]}
          onPress={() => setLanguage(lang.code)}
        >
          <Text
            style={[styles.text, language === lang.code && styles.activeText]}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },

  button: {
    minWidth: 95,
    height: 42,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 21,

    marginHorizontal: 5,

    backgroundColor: "rgba(255,255,255,0.06)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  activeButton: {
    backgroundColor: "#D4AF37",
  },

  text: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  activeText: {
    color: "#081120",
    fontWeight: "bold",
  },
});

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SupportScreen({ navigation, route }) {
  const {
    title = "SYSTEM ERROR",
    message = "An unexpected problem occurred. Please contact reception.",
    icon = "support-agent",
  } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.headerText}>SUPPORT REQUIRED</Text>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.iconBox}>
          <MaterialIcons name={icon} size={80} color="#EF4444" />
        </View>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{message}</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Please contact hotel staff for assistance.
          </Text>

          <Text style={styles.infoText}>Reception: Ext. 100</Text>

          <Text style={styles.infoText}>
            Staff assistance is available 24/7.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>TRY AGAIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          }
        >
          <Text style={styles.homeText}>RETURN HOME</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#081120",
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 30,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  headerText: {
    color: "#EF4444",
    fontSize: 12,
    letterSpacing: 1,
  },

  mainCard: {
    flex: 1,
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    padding: 35,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.2)",
    alignItems: "center",
  },

  iconBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(239,68,68,0.08)",
  },

  title: {
    color: "#EF4444",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 25,
    letterSpacing: 2,
    textAlign: "center",
  },

  subtitle: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 26,
    marginBottom: 30,
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#020817",
    borderRadius: 20,
    padding: 25,
    marginBottom: 40,
  },

  infoText: {
    color: "#94A3B8",
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },

  retryButton: {
    width: "100%",
    height: 55,
    borderRadius: 15,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  retryText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  homeButton: {
    width: "100%",
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  homeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

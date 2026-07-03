import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function PaymentFailedScreen({ navigation, route }) {
  const reason = route.params?.reason || "Transaction could not be completed.";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>PAYMENT ERROR</Text>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.iconBox}>
          <MaterialIcons name="error-outline" size={70} color="#EF4444" />
        </View>

        <Text style={styles.title}>PAYMENT FAILED</Text>

        <Text style={styles.subtitle}>
          Unfortunately your transaction could not be completed.
        </Text>

        <View style={styles.reasonCard}>
          <Text style={styles.reasonLabel}>REASON</Text>

          <Text style={styles.reasonText}>{reason}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>• Insufficient funds</Text>

          <Text style={styles.infoText}>• Bank declined transaction</Text>

          <Text style={styles.infoText}>• Network connection issue</Text>
        </View>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryText}>RETRY PAYMENT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.changeButton}
          onPress={() => navigation.navigate("Payment", route.params)}
        >
          <Text style={styles.changeText}>CHANGE METHOD</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            })
          }
        >
          <Text style={styles.cancelText}>CANCEL PROCESS</Text>
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

  stepText: {
    color: "#EF4444",
    fontSize: 13,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(239,68,68,0.08)",
  },

  title: {
    color: "#EF4444",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 20,
    letterSpacing: 2,
  },

  subtitle: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 24,
    marginBottom: 30,
  },

  reasonCard: {
    width: "100%",
    backgroundColor: "#020817",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  reasonLabel: {
    color: "#64748B",
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 10,
  },

  reasonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#020817",
    borderRadius: 18,
    padding: 20,
    marginBottom: 35,
  },

  infoText: {
    color: "#94A3B8",
    marginBottom: 10,
    fontSize: 15,
  },

  retryButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#D4AF37",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  retryText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  changeButton: {
    width: "100%",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 15,
  },

  changeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  cancelButton: {
    marginTop: 10,
  },

  cancelText: {
    color: "#94A3B8",
    letterSpacing: 1,
  },
});

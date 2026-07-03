import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import BackgroundDecorations from "../components/BackgroundDecorations";
import ScreenHeader from "../components/ScreenHeader";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function PayLaterScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const { amount } = route.params;

  const handlePayment = () => {
    setPaid(true);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>
          STEP{" "}
          {route.params?.from === "extension"
            ? "04 / 05"
            : route.params?.checkout
              ? "04 / 05"
              : "04 / 06"}
        </Text>
      </View>

      <View style={styles.mainCard}>
        <MaterialIcons name="schedule" size={80} color="#D4AF37" />

        <Text style={styles.title}>PAY LATER</Text>

        <Text style={styles.subtitle}>
          Complete your payment during checkout.
        </Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>PENDING AMOUNT</Text>

          <Text style={styles.amount}>₹{amount.toLocaleString()}</Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialIcons name="info-outline" size={22} color="#D4AF37" />

          <Text style={styles.description}>{t.payLaterMessage}</Text>
        </View>

        <View style={styles.statusCard}>
          <MaterialIcons name="pending-actions" size={26} color="#F59E0B" />

          <Text style={styles.statusText}>Payment Status: Pending</Text>
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              const updatedParams = {
                ...route.params,
                paymentMethod: "Pay Later",
                paymentStatus: "pending",
              };

              if (
                route.params?.from === "checkin" ||
                route.params?.from === "reservation" ||
                !route.params?.from
              ) {
                navigation.navigate("Confirmation", {
                  ...route.params,
                  paymentStatus: "Paid",
                });
              } else if (route.params?.from === "checkout") {
                navigation.navigate("CheckOutComplete", route.params);
              } else if (route.params?.from === "extension") {
                navigation.navigate("ExtensionComplete", route.params);
              }
            }}
          >
            <Text style={styles.continueText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 15,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  stepText: {
    color: "#D4AF37",
    fontSize: 14,
    fontWeight: "600",
  },

  mainCard: {
    flex: 1,
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    padding: 30,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
    alignItems: "center",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 34,
    letterSpacing: 2,
    marginTop: 20,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },

  amountCard: {
    width: "100%",
    backgroundColor: "#020817",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    marginTop: 35,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.1)",
  },

  amountLabel: {
    color: "#94A3B8",
    letterSpacing: 2,
    marginBottom: 10,
  },

  amount: {
    color: "#D4AF37",
    fontSize: 42,
    fontWeight: "bold",
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#020817",
    padding: 20,
    borderRadius: 20,
    marginTop: 25,
    alignItems: "center",
  },

  description: {
    flex: 1,
    color: "#FFFFFF",
    marginLeft: 12,
    lineHeight: 22,
  },

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    backgroundColor: "rgba(245,158,11,0.1)",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(245,158,11,0.3)",
  },

  statusText: {
    color: "#F59E0B",
    fontWeight: "600",
    marginLeft: 10,
  },

  bottomRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  backText: {
    color: "#94A3B8",
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
    backgroundColor: "red",
  },

  continueButton: {
    width: 180,
    height: 55,
    backgroundColor: "#D4AF37",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  continueText: {
    color: "#081120",
    fontWeight: "bold",
    fontSize: 15,
  },
});

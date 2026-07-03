import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import BackgroundDecorations from "../components/BackgroundDecorations";
import ScreenHeader from "../components/ScreenHeader";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function CashPaymentScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const { amount } = route.params;

  const [paid, setPaid] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handleCashPayment = () => {
    setTimeout(() => {
      setPaid(true);
      setModalVisible(true);
    }, 2000);
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
        <MaterialIcons name="payments" size={80} color="#D4AF37" />

        <Text style={styles.title}>CASH PAYMENT</Text>

        <Text style={styles.subtitle}>
          Please insert cash into the payment machine.
        </Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>TOTAL AMOUNT</Text>

          <Text style={styles.amount}>₹{amount.toLocaleString()}</Text>
        </View>

        <View style={styles.infoBox}>
          <MaterialIcons name="info-outline" size={22} color="#D4AF37" />

          <Text style={styles.description}>{t.cashMachineMessage}</Text>
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← BACK</Text>
          </TouchableOpacity>

          {!paid ? (
            <TouchableOpacity
              style={styles.payButton}
              onPress={handleCashPayment}
            >
              <Text style={styles.payText}>INSERT CASH →</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                setModalVisible(false);

                setTimeout(() => {
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
                }, 200);
              }}
            >
              <Text style={styles.okText}>CONTINUE</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <MaterialIcons name="check-circle" size={70} color="#22C55E" />

            <Text style={styles.successText}>PAYMENT SUCCESSFUL</Text>

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.okText}>CONTINUE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: 35,
    alignItems: "center",
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

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020817",
    padding: 20,
    borderRadius: 20,
    marginTop: 25,
  },

  description: {
    color: "#FFFFFF",
    flex: 1,
    marginLeft: 12,
    lineHeight: 22,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "auto",
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  backText: {
    color: "#94A3B8",
    fontSize: 16,
  },

  payButton: {
    width: 220,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  payText: {
    color: "#081120",
    fontWeight: "bold",
    fontSize: 15,
  },

  continueButton: {
    width: 220,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },

  continueText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: 340,
    backgroundColor: "#111827",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  successText: {
    color: "#22C55E",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },

  okButton: {
    marginTop: 25,
    backgroundColor: "#D4AF37",
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 12,
  },

  okText: {
    color: "#081120",
    fontWeight: "bold",
    fontSize: 16,
  },
});

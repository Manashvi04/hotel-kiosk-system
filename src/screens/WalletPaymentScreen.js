import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import BackgroundDecorations from "../components/BackgroundDecorations";
import ScreenHeader from "../components/ScreenHeader";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function WalletPaymentScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const { amount } = route.params;

  const [wallet, setWallet] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const handlePayment = () => {
    if (!walletNumber.trim()) {
      Alert.alert("Error", "Please enter wallet number.");
      return;
    }

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
        <Text style={styles.title}>DIGITAL WALLET</Text>

        <Text style={styles.subtitle}>Select your preferred wallet.</Text>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>TOTAL AMOUNT</Text>

          <Text style={styles.amount}>₹{amount.toLocaleString()}</Text>
        </View>

        <View style={styles.walletContainer}>
          <TouchableOpacity
            style={[
              styles.walletCard,
              wallet === "phonepe" && styles.selectedCard,
            ]}
            onPress={() => setWallet("phonepe")}
          >
            <MaterialIcons
              name="account-balance-wallet"
              size={28}
              color="#D4AF37"
            />

            <Text style={styles.walletText}>PhonePe</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.walletCard,
              wallet === "paytm" && styles.selectedCard,
            ]}
            onPress={() => setWallet("paytm")}
          >
            <MaterialIcons
              name="account-balance-wallet"
              size={28}
              color="#D4AF37"
            />

            <Text style={styles.walletText}>Paytm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.walletCard,
              wallet === "amazon" && styles.selectedCard,
            ]}
            onPress={() => setWallet("amazon")}
          >
            <MaterialIcons
              name="account-balance-wallet"
              size={28}
              color="#D4AF37"
            />

            <Text style={styles.walletText}>Amazon Pay</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.payButton, !wallet && { opacity: 0.5 }]}
            disabled={!wallet}
            onPress={handlePayment}
          >
            <Text style={styles.payText}>PAY NOW →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <MaterialIcons name="check-circle" size={70} color="#22C55E" />

            <Text style={styles.successText}>PAYMENT SUCCESSFUL</Text>

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
  },

  title: {
    color: "#F8E7C8",
    fontSize: 34,
    letterSpacing: 2,
    marginBottom: 10,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    marginBottom: 30,
  },

  amountCard: {
    backgroundColor: "#020817",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    marginBottom: 30,
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
    fontSize: 40,
    fontWeight: "bold",
  },

  walletContainer: {
    marginBottom: 20,
  },

  walletCard: {
    height: 80,
    borderRadius: 20,
    backgroundColor: "#020817",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.08)",
  },

  walletText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 18,
  },

  bottomRow: {
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

  payButton: {
    width: 220,
    height: 55,
    backgroundColor: "#D4AF37",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  payText: {
    color: "#081120",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1,
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
    marginTop: 15,
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

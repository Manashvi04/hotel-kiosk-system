import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function PaymentScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const [selectedPayment, setSelectedPayment] = useState(null);

  const [processing, setProcessing] = useState(false);

  const [paid, setPaid] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const roomPrices = {
    1: "₹4,500",
    2: "₹7,500",
    3: "₹9,500",
    4: "₹15,000",
  };

  const amount = route.params?.totalPrice || route.params?.amount || 0;

  const handlePayment = () => {
    if (!selectedPayment) {
      return;
    }

    if (selectedPayment === "credit" || selectedPayment === "debit") {
      navigation.navigate("CardPayment", {
        ...route.params,
        paymentType: selectedPayment,
        amount,
      });
      return;
    }

    if (selectedPayment === "upi") {
      navigation.navigate("UpiPayment", {
        ...route.params,
        amount,
      });
      return;
    }

    if (selectedPayment === "wallet") {
      navigation.navigate("WalletPayment", {
        ...route.params,
        amount,
      });
      return;
    }

    if (selectedPayment === "cash") {
      navigation.navigate("CashPayment", {
        ...route.params,
        amount,
      });
      return;
    }

    if (selectedPayment === "later") {
      navigation.navigate("PayLater", {
        ...route.params,
        amount,
      });
      return;
    }
  };

  const flow = route.params?.from;

  const payments = [
    {
      id: "credit",
      title: t.creditCard,
      icon: "credit-card",
    },
    {
      id: "debit",
      title: t.debitCard,
      icon: "payment",
    },
    {
      id: "upi",
      title: t.upi,
      icon: "qr-code",
    },
    {
      id: "wallet",
      title: t.wallet,
      icon: "account-balance-wallet",
    },
    {
      id: "cash",
      title: t.cash,
      icon: "payments",
    },
  ];

  if (flow !== "checkout") {
    payments.push({
      id: "later",
      title: t.payLater,
      icon: "schedule",
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>
          STEP{" "}
          {route.params?.from === "extension"
            ? "03 / 05"
            : route.params?.checkout
              ? "03 / 04"
              : route.params?.from === "reservation"
                ? "04 / 06"
                : "05 / 07"}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainCard}>
          <Text style={styles.title}>SELECT PAYMENT METHOD</Text>

          <Text style={styles.subtitle}>
            Choose your preferred payment option.
          </Text>

          <View style={styles.paymentGrid}>
            {payments.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.paymentCard,
                  selectedPayment === item.id && styles.selectedCard,
                ]}
                onPress={() => setSelectedPayment(item.id)}
              >
                <MaterialIcons
                  name={item.icon}
                  size={28}
                  color={selectedPayment === item.id ? "#D4AF37" : "#94A3B8"}
                />

                <Text style={styles.paymentTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>PAYMENT SUMMARY</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Total Amount</Text>

              <Text style={styles.totalAmount}>₹{amount.toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>← BACK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.payButton,
                !selectedPayment && {
                  opacity: 0.5,
                },
              ]}
              disabled={!selectedPayment}
              onPress={handlePayment}
            >
              <Text style={styles.payText}>CONFIRM PAYMENT →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <MaterialIcons name="check-circle" size={60} color="#22C55E" />

            <Text style={styles.modalTitle}>{t.paymentSuccess}</Text>

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.okText}>{t.ok}</Text>
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
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
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

  scrollContent: {
    padding: 20,
  },

  mainCard: {
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
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

  paymentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  paymentCard: {
    width: "31%",
    height: 110,
    borderRadius: 18,
    backgroundColor: "#020817",
    justifyContent: "center",
    paddingLeft: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.08)",
  },

  paymentTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },

  summaryCard: {
    marginTop: 20,
    backgroundColor: "#020817",
    borderRadius: 20,
    padding: 25,
  },

  summaryTitle: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryText: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  totalAmount: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  backText: {
    color: "#94A3B8",
    fontSize: 16,
  },

  payButton: {
    width: 240,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  payText: {
    color: "#081120",
    fontSize: 15,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: 330,
    backgroundColor: "#111827",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  modalTitle: {
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
    fontSize: 16,
    fontWeight: "bold",
  },
});

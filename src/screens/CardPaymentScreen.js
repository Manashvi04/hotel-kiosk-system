import React, { useState, useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";

import BackgroundDecorations from "../components/BackgroundDecorations";
import ScreenHeader from "../components/ScreenHeader";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function CardPaymentScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const { amount } = route.params;

  const [cardNumber, setCardNumber] = useState("");

  const [cardHolder, setCardHolder] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvv, setCvv] = useState("");

  const [paid, setPaid] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const handlePayment = () => {
    if (cardNumber.length !== 16) {
      Alert.alert(t.error, t.enterCardNumber);
      return;
    }

    if (!cardHolder.trim()) {
      Alert.alert(t.error, t.enterCardHolder);
      return;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
      Alert.alert(t.error, t.enterExpiry);
      return;
    }

    if (cvv.length !== 3) {
      Alert.alert(t.error, t.enterCvv);
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
        <Text style={styles.title}>CARD PAYMENT</Text>

        <Text style={styles.subtitle}>Complete your payment securely.</Text>

        <View style={styles.cardPreview}>
          <Text style={styles.cardAmount}>₹{amount.toLocaleString()}</Text>

          <Text style={styles.cardLabel}>TOTAL AMOUNT</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder={t.cardNumber}
          placeholderTextColor="#64748B"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="number-pad"
          maxLength={16}
        />

        <TextInput
          style={styles.input}
          placeholder={t.cardHolder}
          placeholderTextColor="#64748B"
          value={cardHolder}
          onChangeText={setCardHolder}
        />

        <View style={styles.row}>
          <TextInput
            style={styles.halfInput}
            placeholder="MM/YY"
            placeholderTextColor="#64748B"
            value={expiry}
            onChangeText={setExpiry}
            maxLength={5}
          />

          <TextInput
            style={styles.halfInput}
            placeholder="CVV"
            placeholderTextColor="#64748B"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="number-pad"
            maxLength={3}
          />
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payText}>PAY NOW →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.success}>✓</Text>

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
    padding: 28,
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
    marginBottom: 30,
    fontSize: 16,
  },

  cardPreview: {
    height: 140,
    borderRadius: 25,
    backgroundColor: "#020817",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  cardAmount: {
    color: "#D4AF37",
    fontSize: 36,
    fontWeight: "bold",
  },

  cardLabel: {
    color: "#94A3B8",
    marginTop: 10,
    letterSpacing: 2,
  },

  input: {
    height: 55,
    backgroundColor: "#020817",
    borderRadius: 15,
    paddingHorizontal: 18,
    color: "#FFFFFF",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  halfInput: {
    width: "48%",
    height: 55,
    backgroundColor: "#020817",
    borderRadius: 15,
    paddingHorizontal: 18,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
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

  success: {
    fontSize: 70,
    color: "#22C55E",
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
    fontSize: 16,
    fontWeight: "bold",
  },
});

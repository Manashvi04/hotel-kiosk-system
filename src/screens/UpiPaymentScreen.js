import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Alert,
} from "react-native";
import { createPayment } from "../services/paymentapi";
import { MaterialIcons } from "@expo/vector-icons";

import BackgroundDecorations from "../components/BackgroundDecorations";
import ScreenHeader from "../components/ScreenHeader";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function UpiPaymentScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const { amount } = route.params;

  const [paymentMode, setPaymentMode] = useState("qr");

  const [upiId, setUpiId] = useState("");

  const [selectedApp, setSelectedApp] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const handlePayment = async () => {
    if (paymentMode === "upi" && !upiId.trim()) {
      Alert.alert(t.error, t.enterUpiId);
      return;
    }

    if (paymentMode === "app" && !selectedApp) {
      Alert.alert(t.error, t.selectUpiApp);
      return;
    }

    try {
      const response = await createPayment(
        route.params.reservation.booking_id,
        Number(amount),
        "UPI",
        "TXN" + Date.now(),
      );

      console.log(response);

      setModalVisible(true);
    } catch (error) {
      console.log(error.response?.data || error.message);

      Alert.alert(
        "Payment Failed",
        error.response?.data?.message || "Unable to process payment.",
      );
    }
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
        <Text style={styles.amountLabel}>{t.totalAmount}</Text>

        <Text style={styles.amount}>{amount}</Text>

        <Text style={styles.title}>{t.selectPaymentMethod}</Text>

        <View style={styles.methodContainer}>
          <TouchableOpacity
            style={[
              styles.methodCard,
              paymentMode === "qr" && styles.selectedCard,
            ]}
            onPress={() => setPaymentMode("qr")}
          >
            <Text style={styles.methodText}>QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              paymentMode === "upi" && styles.selectedCard,
            ]}
            onPress={() => setPaymentMode("upi")}
          >
            <Text style={styles.methodText}>UPI ID</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodCard,
              paymentMode === "app" && styles.selectedCard,
            ]}
            onPress={() => setPaymentMode("app")}
          >
            <Text style={styles.methodText}>UPI App</Text>
          </TouchableOpacity>
        </View>

        {paymentMode === "qr" && (
          <View style={styles.paymentBox}>
            <Image
              source={require("../../assets/payment/upi-qr.png")}
              style={styles.qrImage}
            />

            <Text style={styles.scanText}>{t.scanQr}</Text>
          </View>
        )}

        {paymentMode === "upi" && (
          <View style={styles.paymentBox}>
            <Text style={styles.label}>{t.enterUpiId}</Text>

            <TextInput
              style={styles.input}
              placeholder="example@upi"
              placeholderTextColor="#94A3B8"
              value={upiId}
              onChangeText={setUpiId}
            />
          </View>
        )}

        {paymentMode === "app" && (
          <View style={styles.appsContainer}>
            <TouchableOpacity
              style={[
                styles.appCard,
                selectedApp === "gpay" && styles.selectedCard,
              ]}
              onPress={() => setSelectedApp("gpay")}
            >
              <Text style={styles.appText}>Google Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.appCard,
                selectedApp === "phonepe" && styles.selectedCard,
              ]}
              onPress={() => setSelectedApp("phonepe")}
            >
              <Text style={styles.appText}>PhonePe</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.appCard,
                selectedApp === "paytm" && styles.selectedCard,
              ]}
              onPress={() => setSelectedApp("paytm")}
            >
              <Text style={styles.appText}>Paytm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.appCard,
                selectedApp === "bhim" && styles.selectedCard,
              ]}
              onPress={() => setSelectedApp("bhim")}
            >
              <Text style={styles.appText}>BHIM</Text>
            </TouchableOpacity>
          </View>
        )}

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
            <MaterialIcons name="check-circle" size={60} color="#22C55E" />

            <Text style={styles.successText}>{t.paymentSuccess}</Text>

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
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  amountLabel: {
    color: "#94A3B8",
    textAlign: "center",
    letterSpacing: 2,
    marginTop: 10,
  },

  amount: {
    color: "#D4AF37",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
  },

  title: {
    color: "#F8E7C8",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: 2,
  },

  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  methodCard: {
    width: "31%",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.08)",
  },

  methodText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  paymentBox: {
    backgroundColor: "#020817",
    borderRadius: 25,
    padding: 25,
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  qrImage: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },

  scanText: {
    color: "#CBD5E1",
    fontSize: 16,
    marginTop: 20,
  },

  label: {
    color: "#D4AF37",
    fontSize: 16,
    marginBottom: 10,
  },

  input: {
    width: "100%",
    height: 55,
    backgroundColor: "#081120",
    borderRadius: 15,
    paddingHorizontal: 18,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  appsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  appCard: {
    width: "48%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#020817",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  appText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
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
    borderRadius: 15,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },

  payText: {
    color: "#FFFFFF",
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

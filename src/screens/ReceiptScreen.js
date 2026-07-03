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

export default function ReceiptScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const { firstName, lastName, selectedRoom } = route.params;

  const [printed, setPrinted] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const roomNames = {
    1: t.deluxeRoom,
    2: t.executiveSuite,
    3: t.familySuite,
    4: t.presidentialSuite,
  };

  const handlePrint = () => {
    setTimeout(() => {
      setPrinted(true);
      setModalVisible(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundDecorations />

      <ScreenHeader title={t.printReceipt} step={6} totalSteps={7} />

      <View style={styles.card}>
        <MaterialIcons name="receipt-long" size={70} color="#D4AF37" />

        <Text style={styles.title}>{t.receiptDetails}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{t.guest}</Text>

          <Text style={styles.value}>
            {firstName} {lastName}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{t.room}</Text>

          <Text style={styles.value}>{roomNames[selectedRoom]}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>{t.paymentStatus}</Text>

          <Text style={styles.value}>{t.paid}</Text>
        </View>
      </View>

      {!printed ? (
        <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
          <Text style={styles.buttonText}>{t.printReceipt}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("KeyCard", route.params)}
        >
          <Text style={styles.buttonText}>{t.continue}</Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <MaterialIcons name="check-circle" size={60} color="#22C55E" />

            <Text style={styles.modalTitle}>{t.receiptPrinted}</Text>

            <Text style={styles.modalText}>{t.collectReceipt}</Text>

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
    paddingHorizontal: 20,
  },

  card: {
    width: "85%",
    alignSelf: "center",
    padding: 30,
    borderRadius: 25,
    backgroundColor: "rgba(15,23,42,0.85)",
    marginTop: 30,
  },

  title: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  label: {
    color: "#94A3B8",
    fontSize: 16,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  printButton: {
    width: 250,
    height: 55,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#D4AF37",
  },

  continueButton: {
    width: 250,
    height: 55,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#22C55E",
  },

  buttonText: {
    color: "#081120",
    fontSize: 16,
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
  },

  modalTitle: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
  },

  modalText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 10,
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
  },
});

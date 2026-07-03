import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function IdVerificationScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const idType = route.params?.idType || "aadhaar";

  const [selectedId, setSelectedId] = useState(idType);

  const [verified, setVerified] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);

    setTimeout(() => {
      setScanning(false);
      setVerified(true);
      setModalVisible(true);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>
          {route.params?.from === "reservation"
            ? "STEP 03 / 06"
            : "STEP 03 / 07"}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainCard}>
          <Text style={styles.title}>VERIFY IDENTITY</Text>

          <Text style={styles.subtitle}>
            Please provide and verify a legal identification card.
          </Text>

          <View style={styles.idContainer}>
            <TouchableOpacity
              style={[
                styles.idCard,
                selectedId === "aadhaar" && styles.selectedCard,
              ]}
              onPress={() => setSelectedId("aadhaar")}
            >
              <Text style={styles.idText}>{t.aadhaarCard}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.idCard,
                selectedId === "passport" && styles.selectedCard,
              ]}
              onPress={() => setSelectedId("passport")}
            >
              <Text style={styles.idText}>{t.passport}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.idCard,
                selectedId === "license" && styles.selectedCard,
              ]}
              onPress={() => setSelectedId("license")}
            >
              <Text style={styles.idText}>{t.drivingLicense}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.idCard,
                selectedId === "other" && styles.selectedCard,
              ]}
              onPress={() => setSelectedId("other")}
            >
              <Text style={styles.idText}>{t.otherId}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.scannerArea}>
            <MaterialIcons name="document-scanner" size={70} color="#D4AF37" />

            <Text style={styles.scanText}>
              Place your selected ID card on the scanner.
            </Text>

            <Text style={styles.scanSubText}>
              JPG, PNG, PDF or physical card
            </Text>

            {!verified && (
              <TouchableOpacity
                style={[
                  styles.scanButton,
                  scanning && {
                    opacity: 0.6,
                  },
                ]}
                disabled={scanning}
                onPress={handleScan}
              >
                <Text style={styles.scanButtonText}>
                  {scanning ? t.scanning : "INITIATE ID SCAN"}
                </Text>
              </TouchableOpacity>
            )}

            {verified && (
              <View style={styles.verifiedBox}>
                <MaterialIcons name="check-circle" size={24} color="#22C55E" />

                <Text style={styles.verifiedText}>ID VERIFIED</Text>
              </View>
            )}
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>← BACK</Text>
            </TouchableOpacity>

            {verified && (
              <TouchableOpacity
                style={styles.continueButton}
                onPress={() => {
                  if (route.params?.from === "reservation") {
                    if (route.params?.paymentStatus?.toLowerCase() === "paid") {
                      navigation.navigate("Confirmation", {
                        ...route.params,
                        verifiedIdType: selectedId,
                      });
                    } else {
                      navigation.navigate("Payment", {
                        ...route.params,
                        verifiedIdType: selectedId,
                      });
                    }
                  } else {
                    navigation.navigate("AvailableRoom", {
                      ...route.params,
                      verifiedIdType: selectedId,
                    });
                  }
                }}
              >
                <Text style={styles.continueText}>
                  {route.params?.from === "reservation"
                    ? "PROCEED TO PAYMENT →"
                    : "SELECT ROOM →"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <MaterialIcons name="check-circle" size={70} color="#22C55E" />

            <Text style={styles.modalTitle}>Verification Completed</Text>

            <Text style={styles.modalText}>
              Your ID has been successfully verified.
            </Text>

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.okText}>OK</Text>
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
    letterSpacing: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },

  mainCard: {
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
    maxWidth: 900,
    width: "100%",
    alignSelf: "center",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 30,
    letterSpacing: 2,
    marginBottom: 10,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },

  scannerArea: {
    marginTop: 20,
    backgroundColor: "#020817",
    borderRadius: 22,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.1)",
  },

  scanText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 20,
  },

  scanSubText: {
    color: "#64748B",
    marginTop: 10,
  },

  scanButton: {
    marginTop: 30,
    backgroundColor: "#D4AF37",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 15,
  },

  scanButtonText: {
    color: "#081120",
    fontWeight: "bold",
  },

  idContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  idCard: {
    width: "23%",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020817",
    marginBottom: 12,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.08)",
  },

  idText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  verifiedBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  verifiedText: {
    color: "#22C55E",
    marginLeft: 10,
    fontWeight: "bold",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  backText: {
    color: "#94A3B8",
    fontSize: 15,
    marginRight: 15,
  },

  continueButton: {
    backgroundColor: "#D4AF37",
    height: 55,
    width: 220,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  continueText: {
    color: "#081120",
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: 350,
    backgroundColor: "#111827",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  modalTitle: {
    color: "#22C55E",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },

  modalText: {
    color: "#FFFFFF",
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: "bold",
  },
});

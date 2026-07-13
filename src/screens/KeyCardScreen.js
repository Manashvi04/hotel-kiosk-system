import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { createDigitalKey } from "../services/digitalkeyapi";
import { MaterialIcons } from "@expo/vector-icons";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function KeyCardScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const roomNumbers = route.params?.roomNumbers || [];

  const reservation = route.params?.reservation;

  const bookingId = reservation?.booking_id;

  const [digitalKey, setDigitalKey] = useState(null);

  useEffect(() => {
    generateKey();
  }, []);

  const generateKey = async () => {
    try {
      const response = await createDigitalKey(bookingId);

      console.log(response);

      setDigitalKey(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>ARRIVAL EXPERIENCE • Access Granted</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainCard}>
          <Text style={styles.stepBadge}>
            {route.params?.from === "reservation"
              ? "STEP 06 / 06"
              : "STEP 07 / 07"}
          </Text>

          <Text style={styles.title}>DIGITAL KEY CARD</Text>

          <Text style={styles.subtitle}>
            Hold your device near the scanner to access your room.
          </Text>

          <View style={styles.keyCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.hotelName}>L'AURA</Text>

                <Text style={styles.cardLabel}>DIGITAL KEY PASS</Text>
              </View>

              <View style={styles.roomBadge}>
                <Text style={styles.roomBadgeText}>
                  ROOM ROOM {reservation?.room_number}
                </Text>
              </View>
            </View>

            <MaterialIcons
              name="qr-code-2"
              size={160}
              color="#D4AF37"
              style={{ alignSelf: "center", marginVertical: 30 }}
            />

            <Text style={styles.scanText}>SCANNING QR IS ACTIVE</Text>

            <Text
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                fontSize: 18,
                marginTop: 15,
                fontWeight: "bold",
              }}
            >
              {digitalKey?.key_number}
            </Text>

            <Text
              style={{
                color: "#94A3B8",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Valid Until:{" "}
              {digitalKey
                ? new Date(digitalKey.valid_until).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </Text>

            <View style={styles.divider} />

            <View style={styles.bottomInfo}>
              <View>
                <Text style={styles.smallLabel}>PRIMARY GUEST</Text>

                <Text style={styles.infoText}>
                  {reservation?.first_name} {reservation?.last_name}
                </Text>
              </View>

              <View>
                <Text style={styles.smallLabel}>BOOKING ID</Text>

                <Text style={styles.infoText}>{reservation?.booking_id}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <MaterialIcons name="info" size={20} color="#D4AF37" />

            <Text style={styles.infoMessage}>
              Your digital key has been issued successfully.
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>← BACK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.finishButton}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                })
              }
            >
              <Text style={styles.finishText}>FINISH</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: 25,
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
    borderRadius: 30,
    padding: 25,
    backgroundColor: "rgba(10,20,40,0.92)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  stepBadge: {
    alignSelf: "center",
    color: "#D4AF37",
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 12,
    letterSpacing: 1,
  },

  title: {
    color: "#F8E7C8",
    fontSize: 36,
    textAlign: "center",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
    fontSize: 15,
  },

  keyCard: {
    backgroundColor: "#020817",
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.2)",
    shadowColor: "#D4AF37",
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 12,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  hotelName: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
  },

  cardLabel: {
    color: "#64748B",
    marginTop: 5,
  },

  roomBadge: {
    backgroundColor: "rgba(212,175,55,0.15)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },

  roomBadgeText: {
    color: "#D4AF37",
    fontWeight: "bold",
  },

  scanText: {
    textAlign: "center",
    color: "#D4AF37",
    letterSpacing: 2,
    marginBottom: 25,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 20,
  },

  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallLabel: {
    color: "#64748B",
    fontSize: 12,
    letterSpacing: 1,
  },

  infoText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 8,
    fontWeight: "600",
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020817",
    padding: 18,
    borderRadius: 18,
    marginTop: 20,
  },

  infoMessage: {
    color: "#FFFFFF",
    marginLeft: 10,
    flex: 1,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  backButton: {
    width: "45%",
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  finishButton: {
    width: "50%",
    height: 58,
    borderRadius: 16,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  finishText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

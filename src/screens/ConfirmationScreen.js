import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function ConfirmationScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const {
    firstName,
    lastName,
    guestName,
    selectedRoom,
    roomType,
    roomNumber,
    totalGuests,
    requiredRooms,
    totalPrice,
    totalAmount,
    paymentMethod,
  } = route.params;

  const roomNames = {
    1: t.deluxeRoom,
    2: t.executiveSuite,
    3: t.familySuite,
    4: t.presidentialSuite,
  };

  const displayGuest = guestName || `${firstName || ""} ${lastName || ""}`;

  const displayRoomType = roomType || roomNames[selectedRoom];

  const displayRooms = roomNumber
    ? roomNumber.toString()
    : Array.from({ length: requiredRooms || 1 }, (_, i) => 201 + i).join(", ");

  const displayGuests = totalGuests || 1;

  const displayRequiredRooms = requiredRooms || 1;

  const displayAmount = totalPrice || totalAmount || 0;

  const bookingId =
    route.params?.bookingId ||
    "BK" + Math.floor(100000 + Math.random() * 900000);

  const roomNumbers = roomNumber
    ? [roomNumber]
    : Array.from({ length: requiredRooms || 1 }, (_, i) => 201 + i);

  const paymentText =
    route.params?.paymentStatus === "pending" ? t.pending : t.paid;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>
          {route.params?.from === "reservation"
            ? "STEP 05 / 06"
            : "STEP 06 / 07"}
        </Text>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.title}>✨ FINAL REVIEW</Text>

        <Text style={styles.subtitle}>
          Confirm details before generating your digital key.
        </Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>PRIMARY GUEST</Text>
            <Text style={styles.infoValue}>{displayGuest}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>BOOKING ID</Text>
            <Text style={styles.goldValue}>{bookingId}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>ROOM TYPE</Text>
            <Text style={styles.infoValue}>{displayRoomType}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>ROOM NUMBERS</Text>
            <Text style={styles.infoValue}>{displayRooms}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>TOTAL GUESTS</Text>
            <Text style={styles.infoValue}>{displayGuests}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>TOTAL ROOMS</Text>
            <Text style={styles.infoValue}>{displayRequiredRooms}</Text>
          </View>
        </View>

        <View style={styles.paymentBox}>
          <View>
            <Text style={styles.infoLabel}>PAYMENT METHOD</Text>

            <Text style={styles.infoValue}>{paymentMethod || "CARD"}</Text>

            <Text
              style={
                route.params?.paymentStatus === "pending"
                  ? styles.pending
                  : styles.paid
              }
            >
              {paymentText}
            </Text>
          </View>

          <Text style={styles.amountText}>
            ₹{displayAmount.toLocaleString()}
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.editText}>EDIT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.keyButton}
            onPress={() =>
              navigation.navigate("KeyCard", {
                ...route.params,
                bookingId,
                roomNumbers,
              })
            }
          >
            <Text style={styles.keyText}>GENERATE KEY</Text>
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
    paddingHorizontal: 10,
    paddingTop: 15,
    marginBottom: 20,
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
    flex: 0.9,
    marginTop: 10,
    marginBottom: 25,
    borderRadius: 30,
    padding: 25,
    backgroundColor: "rgba(10,20,40,0.82)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.2)",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 32,
    letterSpacing: 2,
    marginBottom: 8,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 15,
    marginBottom: 25,
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  infoCard: {
    width: "48%",
    backgroundColor: "#020817",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
  },

  infoLabel: {
    color: "#64748B",
    fontSize: 12,
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  infoValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  goldValue: {
    color: "#D4AF37",
    fontSize: 20,
    fontWeight: "bold",
  },

  paymentBox: {
    marginTop: 10,
    backgroundColor: "#020817",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  amountText: {
    color: "#D4AF37",
    fontSize: 30,
    fontWeight: "bold",
  },

  paid: {
    color: "#22C55E",
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 15,
  },

  pending: {
    color: "#D4AF37",
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 15,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  editButton: {
    width: "42%",
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  editText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  keyButton: {
    width: "52%",
    height: 60,
    borderRadius: 16,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  keyText: {
    color: "#081120",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});

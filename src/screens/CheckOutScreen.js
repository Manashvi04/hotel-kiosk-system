import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import BackgroundDecorations from "../components/BackgroundDecorations";
import ScreenHeader from "../components/ScreenHeader";

export default function CheckOutScreen({ navigation }) {
  const [bookingId, setBookingId] = useState("");

  const [bookingFound, setBookingFound] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);

  // Temporary booking data
  const booking = [
    {
      bookingId: "BK123456",
      guestName: "Manu Choksi",
      roomType: "Deluxe Room",
      roomNumbers: [201, 202],
      totalAmount: 9000,
      paymentMethod: "Pay Later",
      paymentStatus: "pending",
    },
    {
      bookingId: "BK789106",
      guestName: "Yashvi Choksi",
      roomType: "Executive Suite",
      roomNumbers: [301, 302],
      totalAmount: 9000,
      paymentMethod: "UPI",
      paymentStatus: "Paid",
    },
  ];

  const verifyBooking = () => {
    const foundBooking = booking.find(
      (item) => item.bookingId.toUpperCase() === bookingId.trim().toUpperCase(),
    );

    if (foundBooking) {
      setSelectedBooking(foundBooking);
      setBookingFound(true);
    } else {
      alert("Booking not found");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.headerStep}>STEP 01 / 04 • STAY VERIFICATION</Text>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.title}>VERIFICATION OF DETAILS</Text>

        <Text style={styles.subtitle}>
          Please verify your reservation details before reviewing your checkout
          folio.
        </Text>

        <Text style={styles.label}>BOOKING VOUCHER ID</Text>

        <TextInput
          style={styles.input}
          placeholder="BK123456"
          placeholderTextColor="#64748B"
          value={bookingId}
          onChangeText={setBookingId}
          autoCapitalize="characters"
        />

        <TouchableOpacity style={styles.verifyButton} onPress={verifyBooking}>
          <Text style={styles.verifyText}>VERIFY BOOKING</Text>
        </TouchableOpacity>

        {bookingFound && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>BOOKING VERIFIED</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Guest Name</Text>

              <Text style={styles.infoValue}>{selectedBooking.guestName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Room Type</Text>

              <Text style={styles.infoValue}>{selectedBooking.roomType}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Room Number</Text>

              <Text style={styles.infoValue}>
                {selectedBooking.roomNumbers.join(", ")}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Payment Status</Text>

              <Text
                style={
                  selectedBooking.paymentStatus === "pending"
                    ? styles.pending
                    : styles.paid
                }
              >
                {selectedBooking.paymentStatus.toUpperCase()}
              </Text>
            </View>
          </View>
        )}

        {bookingFound && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() =>
              navigation.navigate("CheckOutSummary", selectedBooking)
            }
          >
            <Text style={styles.continueText}>CONFIRM & VIEW BILL →</Text>
          </TouchableOpacity>
        )}
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
    paddingTop: 25,
    marginBottom: 30,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  headerStep: {
    color: "#D4AF37",
    fontSize: 12,
    letterSpacing: 1,
  },

  mainCard: {
    width: "85%",
    alignSelf: "center",
    padding: 35,
    borderRadius: 30,
    backgroundColor: "rgba(10,20,40,0.95)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 32,
    textAlign: "center",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 35,
    lineHeight: 24,
  },

  label: {
    color: "#64748B",
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 10,
  },

  input: {
    height: 58,
    borderRadius: 15,
    backgroundColor: "#020817",
    color: "#FFFFFF",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    fontSize: 16,
  },

  verifyButton: {
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D4AF37",
    marginTop: 20,
  },

  verifyText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  resultCard: {
    marginTop: 30,
    backgroundColor: "#020817",
    borderRadius: 22,
    padding: 25,
  },

  resultTitle: {
    color: "#22C55E",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  infoLabel: {
    color: "#94A3B8",
  },

  infoValue: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  paid: {
    color: "#22C55E",
    fontWeight: "bold",
  },

  pending: {
    color: "#D4AF37",
    fontWeight: "bold",
  },

  continueButton: {
    marginTop: 30,
    height: 58,
    borderRadius: 15,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  continueText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 18,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 15,
  },

  input: {
    width: "80%",
    height: 55,

    alignSelf: "center",

    borderRadius: 15,

    backgroundColor: "rgba(15,23,42,0.8)",

    color: "#FFFFFF",

    paddingHorizontal: 20,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  verifyButton: {
    width: 180,
    height: 55,

    alignSelf: "center",

    marginTop: 20,

    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#D4AF37",
  },

  verifyText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "bold",
  },

  resultCard: {
    width: "85%",

    alignSelf: "center",

    marginTop: 30,

    backgroundColor: "rgba(15,23,42,0.85)",

    borderRadius: 20,

    padding: 20,
  },

  heading: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "bold",

    marginBottom: 20,

    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: 10,

    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  left: {
    color: "#94A3B8",
    fontSize: 16,
  },

  right: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },

  paid: {
    color: "#22C55E",
    fontWeight: "bold",
  },

  pending: {
    color: "#D4AF37",
    fontWeight: "bold",
  },
});

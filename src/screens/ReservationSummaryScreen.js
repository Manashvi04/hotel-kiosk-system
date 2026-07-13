import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ReservationSummaryScreen({ navigation, route }) {
  const { reservation } = route.params || {};

  const guestName = reservation
    ? `${reservation.first_name} ${reservation.last_name}`
    : "";

  const bookingId = reservation?.booking_id || "";

  const roomType = reservation?.room_type || "";

  const roomNumber = reservation?.room_number || "";

  const guests = reservation?.guests_assigned || 0;

  const paymentStatus = reservation?.payment_status || "";

  const checkInDate = reservation
    ? new Date(reservation.check_in_date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const checkOutDate = reservation
    ? new Date(reservation.check_out_date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const totalAmount = reservation?.total_amount || 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>STEP 02 / 06</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainCard}>
          <View style={styles.iconBox}>
            <MaterialIcons name="fact-check" size={40} color="#22C55E" />
          </View>

          <Text style={styles.title}>RESERVATION VERIFIED</Text>

          <Text style={styles.subtitle}>
            Please review your reservation details before proceeding to identity
            verification.
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.topRow}>
              <View>
                <Text style={styles.smallLabel}>BOOKING REFERENCE</Text>

                <Text style={styles.bookingId}>{bookingId}</Text>
              </View>

              <View
                style={[
                  styles.badge,
                  paymentStatus === "Paid"
                    ? styles.paidBadge
                    : styles.pendingBadge,
                ]}
              >
                <Text style={styles.badgeText}>
                  {paymentStatus.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.left}>Guest Name</Text>

              <Text style={styles.right}>{guestName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.left}>Room Type</Text>

              <Text style={styles.right}>{roomType}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.left}>Room Number</Text>

              <Text style={styles.right}>{roomNumber}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.left}>Guests</Text>

              <Text style={styles.right}>{guests}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.left}>Check-In</Text>

              <Text style={styles.right}>{checkInDate}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.left}>Check-Out</Text>

              <Text style={styles.right}>{checkOutDate}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.left}>Total Amount</Text>

              <Text style={styles.amount}>₹{totalAmount}</Text>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() =>
                navigation.navigate("IdVerification", {
                  ...(route.params || {}),
                  roomNumber,
                  roomNumbers: [roomNumber],
                  totalPrice: totalAmount,
                  amount: totalAmount,
                  from: "reservation",
                })
              }
            >
              <Text style={styles.continueText}>CONTINUE →</Text>
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
    marginBottom: 30,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  stepText: {
    color: "#D4AF37",
    fontSize: 12,
    letterSpacing: 1,
  },

  mainCard: {
    width: "85%",
    alignSelf: "center",
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    padding: 35,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
    marginBottom: 30,
  },

  iconBox: {
    alignSelf: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(34,197,94,0.1)",
    marginBottom: 20,
  },

  title: {
    color: "#F8E7C8",
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 24,
  },

  infoCard: {
    backgroundColor: "#020817",
    borderRadius: 24,
    padding: 25,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },

  smallLabel: {
    color: "#64748B",
    fontSize: 10,
    letterSpacing: 2,
  },

  bookingId: {
    color: "#D4AF37",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },

  paidBadge: {
    backgroundColor: "rgba(34,197,94,0.1)",
  },

  pendingBadge: {
    backgroundColor: "rgba(212,175,55,0.12)",
  },

  badgeText: {
    color: "#22C55E",
    fontSize: 11,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  left: {
    color: "#94A3B8",
  },

  right: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  amount: {
    color: "#D4AF37",
    fontWeight: "bold",
    fontSize: 18,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  backButton: {
    width: 160,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  continueButton: {
    width: 180,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D4AF37",
  },

  backText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  continueText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

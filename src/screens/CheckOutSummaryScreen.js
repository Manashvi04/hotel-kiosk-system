import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import BackgroundDecorations from "../components/BackgroundDecorations";
import ScreenHeader from "../components/ScreenHeader";

export default function CheckOutSummaryScreen({ navigation, route }) {
  const {
    guestName,
    roomNumbers = [],
    totalAmount = 0,
    paymentMethod = "",
    paymentStatus = "",
    bookingId = "",
  } = route.params;

  const serviceCharges = 500;

  const foodCharges = 1200;

  const taxes = Math.round((totalAmount + serviceCharges + foodCharges) * 0.18);

  const grandTotal = totalAmount + serviceCharges + foodCharges + taxes;

  const amountDue = paymentStatus === "pending" ? grandTotal : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>STEP 02 / 04 • FINAL FOLIO</Text>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.title}>CHECK-OUT FOLIO</Text>

        <Text style={styles.subtitle}>
          Please review your stay summary and outstanding balance.
        </Text>

        <View style={styles.referenceRow}>
          <View>
            <Text style={styles.smallLabel}>BOOKING REFERENCE</Text>

            <Text style={styles.bookingId}>{bookingId}</Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              paymentStatus === "pending"
                ? styles.pendingBadge
                : styles.paidBadgeBox,
            ]}
          >
            <Text
              style={
                paymentStatus === "pending"
                  ? styles.pendingText
                  : styles.paidText
              }
            >
              {paymentStatus.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Guest Name</Text>

            <Text style={styles.value}>{guestName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Room Number</Text>

            <Text style={styles.value}>{roomNumbers.join(", ")}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Room Charges</Text>

            <Text style={styles.value}>₹{totalAmount.toLocaleString()}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Service Charges</Text>

            <Text style={styles.value}>₹{serviceCharges}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Food & Beverage</Text>

            <Text style={styles.value}>₹{foodCharges}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Taxes</Text>

            <Text style={styles.value}>₹{taxes}</Text>
          </View>

          <View style={styles.totalDivider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>AMOUNT DUE</Text>

            <Text
              style={amountDue === 0 ? styles.paidAmount : styles.totalAmount}
            >
              {amountDue === 0 ? "₹0" : `₹${amountDue.toLocaleString()}`}
            </Text>
          </View>
        </View>

        {paymentStatus === "pending" ? (
          <TouchableOpacity
            style={styles.payButton}
            onPress={() =>
              navigation.navigate("Payment", {
                ...route.params,
                from: "checkout",
                totalPrice: amountDue,
              })
            }
          >
            <Text style={styles.payText}>PROCEED TO PAYMENT →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.payButton}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              })
            }
          >
            <Text style={styles.payText}>FINISH CHECKOUT</Text>
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
    marginBottom: 25,
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
    padding: 35,
    borderRadius: 30,
    backgroundColor: "rgba(10,20,40,0.95)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 32,
    letterSpacing: 2,
    textAlign: "center",
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 24,
  },

  referenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
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

  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },

  pendingBadge: {
    backgroundColor: "rgba(251,191,36,0.1)",
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)",
  },

  paidBadgeBox: {
    backgroundColor: "rgba(34,197,94,0.1)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.3)",
  },

  pendingText: {
    color: "#FBBF24",
    fontWeight: "bold",
  },

  paidText: {
    color: "#22C55E",
    fontWeight: "bold",
  },

  summaryCard: {
    backgroundColor: "#020817",
    borderRadius: 25,
    padding: 25,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  label: {
    color: "#94A3B8",
    fontSize: 15,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 15,
  },

  totalDivider: {
    height: 1,
    backgroundColor: "rgba(212,175,55,0.2)",
    marginVertical: 18,
  },

  totalLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  totalAmount: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
  },

  paidAmount: {
    color: "#22C55E",
    fontSize: 28,
    fontWeight: "bold",
  },

  payButton: {
    marginTop: 30,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  payText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  card: {
    width: "85%",
    alignSelf: "center",

    backgroundColor: "rgba(15,23,42,0.85)",

    borderRadius: 25,

    padding: 25,

    marginTop: 20,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  title: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
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

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 10,
  },

  totalLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  amount: {
    color: "#D4AF37",
    fontSize: 20,
    fontWeight: "bold",
  },

  paid: {
    color: "#22C55E",
    fontSize: 18,
    fontWeight: "bold",
  },

  pending: {
    color: "#FB7185",
    fontSize: 18,
    fontWeight: "bold",
  },

  payButton: {
    width: 250,
    height: 55,

    alignSelf: "center",

    marginTop: 30,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,

    backgroundColor: "#D4AF37",
  },

  finishButton: {
    width: 220,
    height: 55,

    alignSelf: "center",

    marginTop: 30,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 15,

    backgroundColor: "#D4AF37",
  },

  finishText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "bold",
  },
});

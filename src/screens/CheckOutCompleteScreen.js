import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

export default function CheckOutCompleteScreen({ navigation, route }) {
  const { guestName, bookingId, paymentMethod, totalPrice } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>L'AURA</Text>

          <Text style={styles.stepText}>STEP 04 / 04 • CHECKOUT COMPLETE</Text>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.successCircle}>
            <MaterialIcons name="check-circle" size={42} color="#22C55E" />
          </View>

          <Text style={styles.title}>THANK YOU</Text>

          <Text style={styles.subtitle}>
            Your checkout has been completed successfully. Your stay details
            have been synchronized and your room has been released.
          </Text>

          <View style={styles.summaryCard}>
            <View style={styles.topRow}>
              <View>
                <Text style={styles.smallLabel}>CHECKOUT REFERENCE</Text>

                <Text style={styles.bookingText}>{bookingId}</Text>
              </View>

              <View style={styles.approvedBadge}>
                <Text style={styles.approvedText}>COMPLETED</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.left}>Guest</Text>

              <Text style={styles.right}>{guestName}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.left}>Payment Method</Text>

              <Text style={styles.right}>{paymentMethod}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.left}>Amount Paid</Text>

              <Text style={styles.amount}>₹{totalPrice?.toLocaleString()}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.left}>Status</Text>

              <Text style={styles.successText}>APPROVED</Text>
            </View>
          </View>

          <Text style={styles.message}>
            We sincerely thank you for choosing L'AURA. We wish you a pleasant
            and safe journey.
          </Text>

          <View style={styles.keyStatus}>
            <MaterialIcons name="vpn-key-off" size={42} color="#EF4444" />

            <Text style={styles.keyText}>
              Your room key and access credentials have been securely
              deactivated.
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => alert("Receipt printed")}
            >
              <MaterialIcons name="print" size={18} color="#D4AF37" />

              <Text style={styles.secondaryText}>PRINT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => alert("Receipt emailed")}
            >
              <MaterialIcons name="mail-outline" size={18} color="#D4AF37" />

              <Text style={styles.secondaryText}>EMAIL</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => navigation.navigate("Feedback")}
          >
            <Text style={styles.finishText}>CONTINUE TO FEEDBACK →</Text>
          </TouchableOpacity>
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

  scrollContent: {
    paddingBottom: 40,
  },

  mainCard: {
    width: "90%",
    maxWidth: 600,
    alignSelf: "center",
    padding: 35,
    borderRadius: 30,
    backgroundColor: "rgba(10,20,40,0.95)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
    alignItems: "center",
  },

  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(34,197,94,0.12)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    color: "#F8E7C8",
    fontSize: 34,
    letterSpacing: 2,
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 30,
    lineHeight: 24,
  },

  summaryCard: {
    width: "100%",
    backgroundColor: "#020817",
    borderRadius: 22,
    padding: 22,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  smallLabel: {
    color: "#64748B",
    fontSize: 10,
    letterSpacing: 2,
  },

  bookingText: {
    color: "#D4AF37",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  approvedBadge: {
    backgroundColor: "rgba(34,197,94,0.1)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  approvedText: {
    color: "#22C55E",
    fontSize: 11,
    fontWeight: "bold",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
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

  successText: {
    color: "#22C55E",
    fontWeight: "bold",
  },

  keyStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239,68,68,0.08)",
    borderRadius: 18,
    padding: 18,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.15)",
  },

  keyText: {
    flex: 1,
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
    marginLeft: 12,
  },

  message: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 25,
    marginBottom: 10,
    lineHeight: 24,
  },

  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  secondaryButton: {
    width: "48%",
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.3)",
    backgroundColor: "#020817",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryText: {
    color: "#D4AF37",
    marginLeft: 8,
    fontWeight: "600",
  },

  finishButton: {
    width: "100%",
    height: 58,
    borderRadius: 16,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  finishText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

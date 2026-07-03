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

export default function ExtensionCompleteScreen({ navigation, route }) {
  const {
    bookingId = "BK305678",

    firstName = "Manu",
    lastName = "Choksi",

    roomNumber = 305,

    extensionDays = 1,

    totalPrice,
    amount,

    paymentMethod = "Pay Later",

    currentCheckout,
  } = route.params || {};

  const newCheckoutDate = `+${extensionDays} Day(s)`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>
          ROOM EXTENSION JOURNEY • STEP 05 / 05
        </Text>
      </View>

      <View style={styles.centerContainer}>
        <View style={styles.mainCard}>
          <View style={styles.successCircle}>
            <MaterialIcons name="check" size={34} color="#10B981" />
          </View>

          <Text style={styles.title}>THANK YOU</Text>

          <Text style={styles.subtitle}>
            Your room extension request is approved and synchronized.
            {"\n"}
            Your active digital key card is extended automatically.
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.referenceRow}>
              <View>
                <Text style={styles.referenceLabel}>
                  CONFIRMATION REFERENCE
                </Text>

                <Text style={styles.reference}>LR-{bookingId}-EX</Text>
              </View>

              <View style={styles.approvedBadge}>
                <Text style={styles.approvedText}>APPROVED</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.label}>Lead Resident</Text>

              <Text style={styles.value}>
                {firstName} {lastName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Room Number</Text>

              <Text style={styles.value}>{roomNumber}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Extended Nights</Text>

              <Text style={styles.value}>
                {extensionDays} Additional Night
                {extensionDays > 1 ? "s" : ""}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.goldLabel}>Extended Until</Text>

              <Text style={styles.goldValue}>+{extensionDays} Day(s)</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              })
            }
          >
            <Text style={styles.finishText}>FINISH & RETURN HOME</Text>
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
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 30,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 5,
  },

  stepText: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "600",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  mainCard: {
    width: "80%",
    maxWidth: 600,
    backgroundColor: "rgba(10,20,40,0.99)",
    borderRadius: 28,
    borderWidth: 4,
    borderColor: "rgba(212,175,55,0.15)",
    padding: 35,
    alignItems: "center",
  },

  successCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(16,185,129,0.12)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    color: "#F8E7C8",
    fontSize: 34,
    letterSpacing: 2,
    marginBottom: 15,
  },

  subtitle: {
    color: "#CBD5E1",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 30,
  },

  infoCard: {
    width: "100%",
    backgroundColor: "#020817",
    borderRadius: 18,
    padding: 22,
    marginBottom: 30,
  },

  referenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  referenceLabel: {
    color: "#64748B",
    fontSize: 10,
    letterSpacing: 2,
  },

  reference: {
    color: "#D4AF37",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  approvedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(16,185,129,0.12)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.2)",
  },

  approvedText: {
    color: "#10B981",
    fontSize: 10,
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginVertical: 18,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    color: "#CBD5E1",
    fontSize: 16,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  goldLabel: {
    color: "#D4AF37",
    fontSize: 16,
  },

  goldValue: {
    color: "#D4AF37",
    fontWeight: "bold",
    fontSize: 16,
  },

  finishButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#D4AF37",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  finishText: {
    color: "#081120",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

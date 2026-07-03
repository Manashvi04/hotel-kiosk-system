import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function RoomExtensionScreen({ navigation, route }) {
  const [days, setDays] = useState(1);

  const {
    firstName = "Manu",
    lastName = "Choksi",
    selectedRoom = 3,
    roomNumber = 305,
    currentCheckout = "25 June 2026",
  } = route.params || {};

  const roomPrices = {
    1: 4500,
    2: 7500,
    3: 9500,
    4: 15000,
  };

  const roomNames = {
    1: "Deluxe Room",
    2: "Executive Suite",
    3: "Family Suite",
    4: "Presidential Suite",
  };

  const pricePerNight = roomPrices[selectedRoom];

  const totalAmount = days * pricePerNight;

  const handleContinue = () => {
    navigation.navigate("Payment", {
      ...route.params,

      from: "extension",

      firstName,
      lastName,
      roomNumber,
      selectedRoom,
      currentCheckout,

      bookingId: "BK305678",

      extensionDays: days,

      amount: totalAmount,
      totalPrice: totalAmount,

      paymentStatus: "pending",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>L'AURA</Text>

          <Text style={styles.stepText}>STEP 02 / 05</Text>
        </View>

        <View style={styles.mainCard}>
          <Text style={styles.title}>EXTEND YOUR SERENITY</Text>

          <Text style={styles.subtitle}>
            Select the number of additional nights for your stay.
          </Text>

          <Text style={styles.roomType}>{roomNames[selectedRoom]}</Text>

          <View style={styles.counterBox}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => {
                if (days > 1) {
                  setDays(days - 1);
                }
              }}
            >
              <MaterialIcons name="remove" size={30} color="#D4AF37" />
            </TouchableOpacity>

            <View style={styles.daysContainer}>
              <Text style={styles.daysNumber}>{days}</Text>

              <Text style={styles.daysLabel}>NIGHTS</Text>
            </View>

            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => {
                if (days < 7) {
                  setDays(days + 1);
                }
              }}
            >
              <MaterialIcons name="add" size={30} color="#D4AF37" />
            </TouchableOpacity>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Daily Rate</Text>

              <Text style={styles.summaryValue}>
                ₹{pricePerNight.toLocaleString()}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Extension Duration</Text>

              <Text style={styles.summaryValue}>{days} Nights</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Current Checkout</Text>

              <Text style={styles.summaryValue}>{currentCheckout}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>New Checkout</Text>

              <Text style={styles.summaryValue}>{25 + days} June 2026</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Room Number</Text>

              <Text style={styles.summaryValue}>{roomNumber}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Extension Charges</Text>

              <Text style={styles.totalAmount}>
                ₹{totalAmount.toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>← BACK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>PROCEED TO PAYMENT →</Text>
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
    paddingTop: 20,
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
    width: "85%",
    alignSelf: "center",
    marginTop: 10,
    padding: 35,
    borderRadius: 30,
    backgroundColor: "rgba(10,20,40,0.95)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 34,
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

  roomType: {
    color: "#D4AF37",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 25,
  },

  counterBox: {
    backgroundColor: "#020817",
    borderRadius: 25,
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  counterButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },

  daysContainer: {
    alignItems: "center",
  },

  daysNumber: {
    color: "#D4AF37",
    fontSize: 42,
    fontWeight: "bold",
  },

  daysLabel: {
    color: "#94A3B8",
    letterSpacing: 2,
    marginTop: 5,
  },

  summaryCard: {
    backgroundColor: "#020817",
    borderRadius: 25,
    padding: 25,
    marginTop: 30,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  summaryLabel: {
    color: "#94A3B8",
    fontSize: 16,
  },

  summaryValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 15,
  },

  totalLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  totalAmount: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
  },

  backText: {
    color: "#94A3B8",
    fontSize: 16,
  },

  continueButton: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 35,
    paddingVertical: 16,
    borderRadius: 15,
  },

  continueText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

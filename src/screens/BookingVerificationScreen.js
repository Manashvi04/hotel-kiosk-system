import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function BookingVerificationScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const [method, setMethod] = useState("booking");

  const [value, setValue] = useState("");

  const [verified, setVerified] = useState(false);

  const { firstName, selectedRoom, mobile, email } = route.params || {};

  const roomNames = {
    1: t.deluxeRoom,
    2: t.executiveSuite,
    3: t.familySuite,
    4: t.presidentialSuite,
  };

  const handleVerify = () => {
    if (!value.trim()) {
      Alert.alert("Error", "Please enter a value.");
      return;
    }

    if (method === "mobile" && !/^\d{10}$/.test(value)) {
      Alert.alert("Error", "Please enter a valid mobile number.");
      return;
    }

    if (method === "email") {
      const emailRegex = /\S+@\S+\.\S+/;

      if (!emailRegex.test(value)) {
        Alert.alert("Error", "Please enter a valid email.");
        return;
      }
    }

    setVerified(true);
  };

  const flow = route.params?.from;

  const pageTitle =
    flow === "extension"
      ? "GUEST VERIFICATION"
      : flow === "reservation"
        ? "FIND RESERVATION"
        : "BOOKING DETAILS";

  const stepText =
    flow === "extension"
      ? "STEP 01 / 05"
      : flow === "reservation"
        ? "STEP 01 / 06"
        : "STEP 04 / 07";

  const subtitle =
    flow === "extension"
      ? "Verify your stay before extending your reservation."
      : flow === "reservation"
        ? "Locate your existing reservation to continue check-in."
        : "Enter your booking details to begin your stay.";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>{stepText}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainCard}>
          <Text style={styles.title}>{pageTitle}</Text>

          <Text style={styles.subtitle}>{subtitle}</Text>

          <View style={styles.methodContainer}>
            <TouchableOpacity
              style={[
                styles.methodCard,
                method === "booking" && styles.selectedCard,
              ]}
              onPress={() => setMethod("booking")}
            >
              <Text style={styles.methodText}>{t.bookingId}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.methodCard,
                method === "email" && styles.selectedCard,
              ]}
              onPress={() => setMethod("email")}
            >
              <Text style={styles.methodText}>{t.email}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.methodCard,
                method === "mobile" && styles.selectedCard,
              ]}
              onPress={() => setMethod("mobile")}
            >
              <Text style={styles.methodText}>{t.mobile}</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder={
              method === "booking"
                ? t.enterBookingId
                : method === "email"
                  ? t.enterEmail
                  : t.enterMobile
            }
            placeholderTextColor="#64748B"
            value={value}
            onChangeText={setValue}
            keyboardType={
              method === "mobile"
                ? "number-pad"
                : method === "email"
                  ? "email-address"
                  : "default"
            }
          />

          {!verified && (
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerify}
            >
              <Text style={styles.verifyText}>VERIFY BOOKING</Text>
            </TouchableOpacity>
          )}

          {verified && (
            <>
              <View style={styles.detailsGrid}>
                {flow === "extension" ? (
                  <>
                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>GUEST</Text>
                      <Text style={styles.detailValue}>Manu Choksi</Text>
                    </View>

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>ROOM</Text>
                      <Text style={styles.detailValue}>Family Suite</Text>
                    </View>

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>ROOM NO.</Text>
                      <Text style={styles.detailValue}>305</Text>
                    </View>

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>CHECKOUT</Text>
                      <Text style={styles.detailValue}>25 June 2026</Text>
                    </View>
                  </>
                ) : flow === "reservation" ? (
                  <>
                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>GUEST</Text>
                      <Text style={styles.detailValue}>Manu Choksi</Text>
                    </View>

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>ROOM</Text>
                      <Text style={styles.detailValue}>Executive Suite</Text>
                    </View>

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>GUESTS</Text>
                      <Text style={styles.detailValue}>2</Text>
                    </View>

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>CHECK-IN</Text>
                      <Text style={styles.detailValue}>20 June 2026</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>GUEST NAME</Text>
                      <Text style={styles.detailValue}>{firstName}</Text>
                    </View>

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>ROOM</Text>
                      <Text style={styles.detailValue}>
                        {roomNames[selectedRoom]}
                      </Text>
                    </View>

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>EMAIL</Text>
                      <Text style={styles.detailValue}>{email}</Text>
                    </View>

                    <View style={styles.detailBox}>
                      <Text style={styles.detailLabel}>MOBILE</Text>
                      <Text style={styles.detailValue}>{mobile}</Text>
                    </View>
                  </>
                )}
              </View>

              <View style={styles.bottomRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.backText}>← BACK</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => {
                    if (flow === "extension") {
                      navigation.navigate("RoomExtension", {
                        from: "extension",

                        firstName: "Manu",
                        lastName: "Choksi",

                        selectedRoom: 3,

                        roomNumber: 305,

                        totalGuests: 4,

                        currentCheckout: "25 June 2026",

                        mobile: "8469397767",

                        email: "manu@gmail.com",
                      });
                    } else if (flow === "reservation") {
                      navigation.navigate("ReservationSummary", {
                        from: "reservation",

                        bookingId: value,

                        firstName: "Manu",
                        lastName: "Choksi",

                        selectedRoom: 2,

                        totalGuests: 2,

                        mobile: "9876543210",

                        email: "manu@gmail.com",
                      });
                    } else {
                      navigation.navigate("Payment", {
                        ...route.params,

                        from: "checkin",

                        selectedRoom: route.params.selectedRoom,
                        adults: route.params.adults,
                        children: route.params.children,
                        totalGuests: route.params.totalGuests,
                        requiredRooms: route.params.requiredRooms,
                        totalPrice: route.params.totalPrice,
                      });
                    }
                  }}
                >
                  <Text style={styles.continueText}>
                    {flow === "extension"
                      ? "CONTINUE →"
                      : flow === "reservation"
                        ? "VERIFY ID →"
                        : "PAYMENT →"}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
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
    fontSize: 20,
    fontWeight: "800",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  mainCard: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",

    backgroundColor: "rgba(10,20,40,0.95)",

    borderRadius: 30,

    padding: 28,

    borderWidth: 1,

    borderColor: "rgba(212,175,55,0.15)",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 34,
    letterSpacing: 2,
    marginBottom: 10,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },

  label: {
    color: "#D4AF37",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },

  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  methodCard: {
    width: "31%",
    height: 55,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 14,

    backgroundColor: "#020817",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.08)",
  },

  selectedCard: {
    borderColor: "#D4AF37",
    borderWidth: 2,
    backgroundColor: "rgba(212,175,55,0.08)",
  },

  methodText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  input: {
    height: 55,

    backgroundColor: "#020817",

    borderRadius: 14,

    paddingHorizontal: 18,

    color: "#FFFFFF",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.08)",

    marginBottom: 25,
  },

  verifyButton: {
    alignSelf: "center",

    width: 220,

    height: 55,

    justifyContent: "center",

    alignItems: "center",

    borderRadius: 15,

    backgroundColor: "#D4AF37",

    marginBottom: 30,
  },

  verifyText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    marginTop: 10,

    marginBottom: 20,
  },

  detailBox: {
    width: "48%",

    backgroundColor: "#020817",

    borderRadius: 18,

    padding: 18,

    marginBottom: 15,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.05)",
  },

  detailLabel: {
    color: "#64748B",

    fontSize: 12,

    letterSpacing: 2,

    marginBottom: 10,
  },

  detailValue: {
    color: "#F8E7C8",

    fontSize: 20,

    fontWeight: "500",
  },

  resultCard: {
    width: "100%",

    borderRadius: 25,

    backgroundColor: "#020817",

    padding: 25,

    alignItems: "center",

    marginBottom: 25,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.05)",
  },

  successTitle: {
    color: "#22C55E",

    fontSize: 22,

    fontWeight: "bold",

    marginTop: 10,

    marginBottom: 15,
  },

  infoText: {
    color: "#FFFFFF",

    fontSize: 16,

    marginBottom: 6,
  },

  bottomRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 20,

    paddingTop: 20,

    borderTopWidth: 1,

    borderColor: "rgba(255,255,255,0.08)",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  backButton: {
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    color: "#94A3B8",

    fontSize: 15,

    fontWeight: "500",
  },

  continueButton: {
    width: 230,

    height: 55,

    borderRadius: 15,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#D4AF37",
  },

  continueText: {
    color: "#081120",

    fontSize: 15,

    fontWeight: "bold",

    letterSpacing: 1,
  },
});

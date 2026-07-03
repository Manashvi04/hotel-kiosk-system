import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CheckInOptionScreen({ navigation }) {
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (selected === "walkin") {
      navigation.navigate("CheckIn", {
        from: "walkin",
      });
    }

    if (selected === "reservation") {
      navigation.navigate("BookingVerification", { from: "reservation" });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.headerText}>GUEST ARRIVAL • CHECK-IN</Text>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.title}>WELCOME TO CHECK-IN</Text>

        <Text style={styles.subtitle}>
          Select how you would like to begin your arrival experience.
        </Text>

        {/* Walk In */}
        <TouchableOpacity
          style={[
            styles.optionCard,
            selected === "walkin" && styles.selectedCard,
          ]}
          onPress={() => setSelected("walkin")}
        >
          <View style={styles.iconBox}>
            <MaterialIcons name="person-add" size={30} color="#D4AF37" />
          </View>

          <View style={styles.textArea}>
            <Text style={styles.optionTitle}>WALK-IN GUEST</Text>

            <Text style={styles.optionSubtitle}>
              Create a new reservation and begin check-in.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Reservation */}
        <TouchableOpacity
          style={[
            styles.optionCard,
            selected === "reservation" && styles.selectedCard,
          ]}
          onPress={() => setSelected("reservation")}
        >
          <View style={styles.iconBox}>
            <MaterialIcons name="hotel" size={30} color="#D4AF37" />
          </View>

          <View style={styles.textArea}>
            <Text style={styles.optionTitle}>EXISTING RESERVATION</Text>

            <Text style={styles.optionSubtitle}>
              Locate and verify an existing booking.
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!selected}
            style={[styles.continueButton, !selected && { opacity: 0.4 }]}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>CONTINUE →</Text>
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
    paddingTop: 25,
    marginBottom: 40,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  headerText: {
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
    marginTop: 12,
    marginBottom: 35,
    lineHeight: 24,
  },

  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020817",
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  selectedCard: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.10)",
  },

  iconBox: {
    width: 65,
    height: 65,
    borderRadius: 18,
    backgroundColor: "rgba(212,175,55,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  textArea: {
    flex: 1,
  },

  optionTitle: {
    color: "#F8E7C8",
    fontSize: 18,
    letterSpacing: 1,
  },

  optionSubtitle: {
    color: "#94A3B8",
    marginTop: 8,
    lineHeight: 20,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  backText: {
    color: "#94A3B8",
    fontSize: 16,
    letterSpacing: 1,
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

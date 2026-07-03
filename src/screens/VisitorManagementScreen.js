import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function VisitorManagementScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNext = () => {
    if (selectedOption === "new") {
      navigation.navigate("VisitorRegistration");
    }

    if (selectedOption === "pre") {
      navigation.navigate("PreRegistered", {
        preRegistered: true,
      });
    }

    if (selectedOption === "exit") {
      navigation.navigate("VisitorExit");
    }

    if (selectedOption === "history") {
      navigation.navigate("VisitorHistory");
    }
  };

  const cards = [
    {
      id: "new",
      title: "REGISTER GUEST",
      subtitle:
        "Register private visitors, service providers, or family arrivals.",
      button: "GENERATE PASS →",
      icon: "person-add-alt-1",
    },
    {
      id: "pre",
      title: "PRE-REGISTERED",
      subtitle:
        "Retrieve QR invitations created in advance by resort residents.",
      button: "CLAIM PASS →",
      icon: "verified-user",
    },
    {
      id: "exit",
      title: "VISITOR EXIT",
      subtitle: "Deactivate temporary access and record guest departures.",
      button: "CLEAR DEPARTURE →",
      icon: "logout",
    },
    {
      id: "history",
      title: "VISITOR HISTORY",
      subtitle: "Access historical records of approved visitor entries.",
      button: "REVIEW LOGS →",
      icon: "history",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.logo}>L'AURA</Text>

          <Text style={styles.headerText}>
            VISITOR MANAGEMENT • Control Panel Hub
          </Text>
        </View>

        {/* TITLE */}

        <Text style={styles.title}>WELCOME TO THE SANCTUARY</Text>

        <Text style={styles.subtitle}>
          Security and visitor hub. Register guests, request access badges,
          record exits and review visitor history.
        </Text>

        {/* CARDS */}

        <View style={styles.grid}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              onPress={() => setSelectedOption(card.id)}
              style={[
                styles.card,
                selectedOption === card.id && styles.selectedCard,
              ]}
            >
              <View style={styles.iconBox}>
                <MaterialIcons name={card.icon} size={26} color="#D4AF37" />
              </View>

              <Text style={styles.cardTitle}>{card.title}</Text>

              <Text style={styles.cardSubtitle}>{card.subtitle}</Text>

              <Text style={styles.actionText}>{card.button}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BUTTONS */}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.backText}>BACK TO MAIN KIOSK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!selectedOption}
            style={[styles.nextButton, !selectedOption && { opacity: 0.4 }]}
            onPress={handleNext}
          >
            <Text style={styles.nextText}>CONTINUE →</Text>
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
  },

  scroll: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    marginBottom: 50,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  headerText: {
    color: "#D4AF37",
    fontSize: 13,
  },

  title: {
    color: "#F8E7C8",
    textAlign: "center",
    fontSize: 42,
    letterSpacing: 3,
    marginBottom: 15,
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 24,
    width: "80%",
    alignSelf: "center",
    marginBottom: 45,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    minHeight: 220,
    padding: 22,
    borderRadius: 25,
    marginBottom: 20,
    backgroundColor: "rgba(10,20,40,0.95)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  selectedCard: {
    borderColor: "#D4AF37",
    shadowColor: "#D4AF37",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#020817",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  cardTitle: {
    color: "#F8E7C8",
    fontSize: 22,
    marginBottom: 15,
  },

  cardSubtitle: {
    color: "#94A3B8",
    lineHeight: 22,
    fontSize: 14,
  },

  actionText: {
    marginTop: "auto",
    color: "#D4AF37",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 1,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },

  backButton: {
    width: 220,
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  nextButton: {
    width: 180,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  backText: {
    color: "#CBD5E1",
    letterSpacing: 1,
  },

  nextText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

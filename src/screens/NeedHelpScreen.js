import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";

import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function NeedHelpScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const [roomNumber, setRoomNumber] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [requestId, setRequestId] = useState("");

  const services = [
    {
      title: "Front Desk & Reception",
      subtitle: "Speak directly with front desk managers.",
      icon: "support-agent",
      time: "2-5 minutes",
    },
    {
      title: "Housekeeping & Linen",
      subtitle: "Cleaning, towels, laundry service.",
      icon: "cleaning-services",
      time: "10-15 minutes",
    },
    {
      title: "In-Suite Dining",
      subtitle: "Food, beverages and room service.",
      icon: "restaurant",
      time: "20-30 minutes",
    },
    {
      title: "Maintenance & Repairs",
      subtitle: "Report room issues or repairs.",
      icon: "build",
      time: "15-20 minutes",
    },
    {
      title: "Emergency Assistance",
      subtitle: "Immediate support and security.",
      icon: "warning",
      emergency: true,
      time: "Immediate",
    },
    {
      title: "Resort Amenities",
      subtitle: "Spa, gym and hotel facilities.",
      icon: "spa",
      time: "5-10 minutes",
    },
  ];

  const responseTimes = {
    [t.reception]: "2-5 minutes",
    [t.housekeeping]: "10-15 minutes",
    [t.roomService]: "20-30 minutes",
    [t.maintenance]: "15-20 minutes",
    [t.bellDesk]: "5-10 minutes",
    [t.emergency]: "Immediate",
  };

  const handleRequest = (service) => {
    const selected = services.find((item) => item.title === service);

    setSelectedService(service);

    setResponseTime(selected.time);

    setRequestId("REQ" + Math.floor(100000 + Math.random() * 900000));

    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>L'AURA</Text>

          <Text style={styles.headerText}>
            BUTLER ASSISTANCE • Concierge Hub
          </Text>
        </View>

        <Text style={styles.title}>HOW MAY WE ASSIST YOU?</Text>

        <Text style={styles.subtitle}>
          Elite concierge services. Select a service below to alert our hotel
          team.
        </Text>

        <View style={styles.grid}>
          {services.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.serviceCard,
                service.emergency && styles.emergencyCard,
              ]}
              onPress={() => handleRequest(service.title)}
            >
              <View style={styles.iconBox}>
                <MaterialIcons name={service.icon} size={26} color="#D4AF37" />
              </View>

              <Text style={styles.serviceTitle}>{service.title}</Text>

              <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>

              <Text style={styles.actionText}>REQUEST SERVICE →</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.bottomCard}>
            <MaterialIcons name="chat" size={24} color="#D4AF37" />

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.bottomTitle}>LIVE CHAT</Text>

              <Text style={styles.bottomSubtitle}>Under 30 sec wait</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomCard}>
            <MaterialIcons name="call" size={24} color="#D4AF37" />

            <View style={{ marginLeft: 10 }}>
              <Text style={styles.bottomTitle}>FRONT DESK</Text>

              <Text style={styles.bottomSubtitle}>Connect instantly</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.homeText}>BACK TO MAIN KIOSK</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <MaterialIcons
              name={
                selectedService === "Emergency Assistance"
                  ? "warning"
                  : "check-circle"
              }
              size={70}
              color={
                selectedService === "Emergency Assistance"
                  ? "#FB7185"
                  : "#22C55E"
              }
            />

            <Text style={styles.modalTitle}>REQUEST REGISTERED</Text>

            <Text style={styles.requestId}>{requestId}</Text>

            <Text style={styles.modalText}>{selectedService}</Text>

            <Text style={styles.timeText}>Estimated response:</Text>

            <Text style={styles.responseText}>{responseTime}</Text>

            <Text style={styles.helpText}>
              A hotel representative has been notified and will assist you
              shortly.
            </Text>

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                setModalVisible(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.okText}>HOME</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#081120",
    paddingHorizontal: 25,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    marginBottom: 25,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  headerText: {
    color: "#D4AF37",
    fontSize: 13,
    alignSelf: "center",
  },

  selectedCard: {
    borderColor: "#D4AF37",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 22,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  serviceCard: {
    width: "48%",
    minHeight: 180,
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 25,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  emergencyCard: {
    borderColor: "#FB7185",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#020817",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  serviceTitle: {
    color: "#F8E7C8",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },

  serviceSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    lineHeight: 20,
  },

  actionText: {
    color: "#D4AF37",
    marginTop: "auto",
    fontWeight: "bold",
    fontSize: 12,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  bottomCard: {
    width: "48%",
    height: 75,
    borderRadius: 18,
    backgroundColor: "#020817",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  homeButton: {
    alignSelf: "center",
    marginTop: 25,
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    marginBottom: 30,
  },

  bottomTitle: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  bottomSubtitle: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 3,
  },

  homeText: {
    color: "#CBD5E1",
    letterSpacing: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: 420,
    maxWidth: "90%",
    backgroundColor: "#111827",
    borderRadius: 30,
    padding: 35,
    alignItems: "center",
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  requestId: {
    color: "#D4AF37",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  modalText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginTop: 15,
  },

  timeText: {
    color: "#94A3B8",
    marginTop: 20,
  },

  helpText: {
    color: "#FFFFFF",
    marginTop: 20,
    fontSize: 17,
    fontWeight: 400,
  },

  responseText: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },

  okButton: {
    marginTop: 30,
    backgroundColor: "#D4AF37",
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 15,
  },

  okText: {
    color: "#081120",
    fontWeight: "bold",
  },
});

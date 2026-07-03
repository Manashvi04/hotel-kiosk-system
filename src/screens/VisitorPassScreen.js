import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function VisitorPassScreen({ navigation, route }) {
  const { firstName, lastName, mobile, roomNumber, purpose, visitorId } =
    route.params;

  const validUntil = new Date(
    Date.now() + 3 * 60 * 60 * 1000,
  ).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.logo}>L'AURA</Text>

          <Text style={styles.step}>VISITOR MANAGEMENT • STEP 2 OF 2</Text>
        </View>

        {/* MAIN GLASS CARD */}

        <View style={styles.mainCard}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.navigate("VisitorManagement")}
          >
            <MaterialIcons name="close" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <Text style={styles.badge}>AUTHORIZED ENTRY CARD</Text>

          <Text style={styles.title}>VISITOR ACCESS PASS</Text>

          {/* PASS */}

          <View style={styles.passCard}>
            <View style={styles.passTop}>
              <View>
                <Text style={styles.brand}>L'AURA SECURITY</Text>

                <Text style={styles.subBrand}>INVITED VISITOR BADGE</Text>
              </View>

              <View style={styles.roomBadge}>
                <Text style={styles.roomText}>Room {roomNumber}</Text>
              </View>
            </View>

            <View style={styles.qrContainer}>
              <View style={styles.qrBox}>
                <MaterialIcons name="qr-code" size={120} color="#D4AF37" />
              </View>

              <Text style={styles.qrLabel}>GATE OPTICAL CLEARANCE ACTIVE</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.bottomRow}>
              <View>
                <Text style={styles.label}>VISITOR NAME</Text>

                <Text style={styles.value}>
                  {firstName} {lastName}
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.label}>VALIDITY</Text>

                <Text style={styles.validText}>Until {validUntil}</Text>
              </View>
            </View>
          </View>

          {/* INFO */}

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>🍝 Purpose: {purpose}</Text>

            <Text style={styles.infoText}>
              📱 Mobile Ticket: Access slip transmitted to guest phone.
            </Text>
          </View>

          {/* BUTTONS */}

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.printButton}
              onPress={() =>
                Alert.alert("Printing Pass", "Visitor pass is being printed.")
              }
            >
              <MaterialIcons name="print" size={15} color="#D4AF37" />

              <Text style={styles.printText}>PRINT PASS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.mobileButton}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home" }],
                })
              }
            >
              <MaterialIcons name="smartphone" size={15} color="#FFFFFF" />

              <Text style={styles.mobileText}>FINISH</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>L'AURA LUXURY RESORTS S.P.A.</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 25,
    marginBottom: 40,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  step: {
    color: "#D4AF37",
    fontSize: 12,
    alignSelf: "center",
  },

  mainCard: {
    width: "85%",
    maxWidth: 420,
    alignSelf: "center",
    padding: 30,
    borderRadius: 30,
    backgroundColor: "rgba(10,20,40,0.90)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.2)",
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    top: 18,
    right: 18,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },

  badge: {
    alignSelf: "center",
    color: "#D4AF37",
    fontSize: 10,
    letterSpacing: 2,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.25)",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 20,
  },

  title: {
    color: "#F8E7C8",
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 25,
  },

  passCard: {
    backgroundColor: "#020817",
    borderRadius: 25,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.3)",

    shadowColor: "#D4AF37",
    shadowOpacity: 0.5,
    shadowRadius: 18,

    elevation: 12,
  },

  passTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  brand: {
    color: "#D4AF37",
    fontSize: 18,
    fontWeight: "bold",
  },

  subBrand: {
    color: "#64748B",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 5,
  },

  roomBadge: {
    backgroundColor: "rgba(212,175,55,0.12)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  roomText: {
    color: "#D4AF37",
    fontSize: 10,
  },

  qrContainer: {
    alignItems: "center",
    marginVertical: 25,
  },

  qrBox: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.2)",
  },

  qrLabel: {
    color: "#D4AF37",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginBottom: 18,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    color: "#64748B",
    fontSize: 10,
    letterSpacing: 2,
  },

  value: {
    color: "#FFFFFF",
    marginTop: 5,
    fontWeight: "600",
  },

  validText: {
    color: "#D4AF37",
    marginTop: 5,
    fontWeight: "bold",
  },

  infoBox: {
    marginTop: 18,
    backgroundColor: "rgba(2,8,23,0.7)",
    borderRadius: 16,
    padding: 14,
  },

  infoText: {
    color: "#CBD5E1",
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 5,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 25,
  },

  printButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.3)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  mobileButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  printText: {
    color: "#D4AF37",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 12,
  },

  mobileText: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 12,
  },

  footer: {
    color: "#475569",
    textAlign: "center",
    marginTop: 40,
    letterSpacing: 2,
    fontSize: 10,
  },
});

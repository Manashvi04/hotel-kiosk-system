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

export default function VisitorExitScreen({ navigation }) {
  const [exitStatus, setExitStatus] = useState("idle");
  const [visitorName, setVisitorName] = useState("");

  const triggerScan = () => {
    setExitStatus("scanning");

    setTimeout(() => {
      setExitStatus("verified");
      setVisitorName("Alexander Sterling");
    }, 2500);
  };

  const completeExit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.logo}>L'AURA</Text>

          <Text style={styles.headerText}>
            VISITOR MANAGEMENT • EXIT CLEARANCE
          </Text>
        </View>

        {/* TITLE */}

        <Text style={styles.title}>VISITOR EXIT CLEARANCE</Text>

        <Text style={styles.subtitle}>
          Present visitor QR ticket or scan visitor pass to complete security
          departure verification.
        </Text>

        {/* SCANNER CARD */}

        <View style={styles.scanCard}>
          {exitStatus === "idle" && (
            <>
              <MaterialIcons
                name="qr-code-scanner"
                size={70}
                color="rgba(212,175,55,0.5)"
              />

              <Text style={styles.scanText}>
                Aim visitor QR code toward the scanner.
              </Text>

              <TouchableOpacity style={styles.scanButton} onPress={triggerScan}>
                <Text style={styles.scanButtonText}>SCAN QR CODE</Text>
              </TouchableOpacity>
            </>
          )}

          {exitStatus === "scanning" && (
            <>
              <MaterialIcons name="qr-code-scanner" size={70} color="#D4AF37" />

              <Text style={styles.scanningText}>READING ACCESS TICKET...</Text>
            </>
          )}

          {exitStatus === "verified" && (
            <>
              <MaterialIcons name="check-circle" size={70} color="#22C55E" />

              <Text style={styles.verifiedText}>TICKET VERIFIED</Text>

              <View style={styles.visitorBox}>
                <Text style={styles.visitorLabel}>Visitor</Text>

                <Text style={styles.visitorValue}>{visitorName}</Text>

                <Text style={styles.visitorRoom}>Executive Suite 302</Text>
              </View>
            </>
          )}
        </View>

        {/* DETAILS CARD */}

        <View style={styles.detailsCard}>
          <Text style={styles.cardHeading}>SECURITY STATUS</Text>

          {exitStatus !== "verified" ? (
            <View style={styles.waitingBox}>
              <MaterialIcons name="warning-amber" size={22} color="#D4AF37" />

              <Text style={styles.waitingText}>
                Scan a visitor pass to retrieve details.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.row}>
                <Text style={styles.left}>Visitor Profile</Text>

                <Text style={styles.right}>{visitorName}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.left}>Authorized Host</Text>

                <Text style={styles.right}>Executive Suite 302</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.left}>Entry Registered</Text>

                <Text style={styles.right}>03:45 PM Today</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.left}>Departure Status</Text>

                <Text style={styles.approved}>APPROVED</Text>
              </View>
            </>
          )}
        </View>

        {/* BUTTONS */}

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={exitStatus !== "verified"}
            style={[
              styles.finishButton,
              exitStatus !== "verified" && {
                opacity: 0.4,
              },
            ]}
            onPress={completeExit}
          >
            <Text style={styles.finishText}>CLEAR EXIT</Text>
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
    marginTop: 20,
    marginBottom: 30,
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
    lineHeight: 22,
  },

  scanCard: {
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    padding: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  scanText: {
    color: "#CBD5E1",
    marginTop: 20,
    textAlign: "center",
  },

  scanButton: {
    marginTop: 25,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "#D4AF37",
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 15,
  },

  scanButtonText: {
    color: "#D4AF37",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  scanningText: {
    color: "#D4AF37",
    marginTop: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  verifiedText: {
    color: "#22C55E",
    marginTop: 15,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  visitorBox: {
    marginTop: 20,
    backgroundColor: "#020817",
    padding: 18,
    borderRadius: 18,
    width: "100%",
    alignItems: "center",
  },

  visitorLabel: {
    color: "#64748B",
    fontSize: 12,
    letterSpacing: 2,
  },

  visitorValue: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },

  visitorRoom: {
    color: "#D4AF37",
    marginTop: 5,
  },

  detailsCard: {
    marginTop: 25,
    backgroundColor: "#020817",
    borderRadius: 25,
    padding: 25,
  },

  cardHeading: {
    color: "#D4AF37",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 20,
  },

  waitingBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  waitingText: {
    color: "#94A3B8",
    marginLeft: 10,
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

  approved: {
    color: "#22C55E",
    fontWeight: "bold",
  },

  buttonRow: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backText: {
    color: "#94A3B8",
    fontSize: 16,
  },

  finishButton: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 35,
    paddingVertical: 16,
    borderRadius: 15,
  },

  finishText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

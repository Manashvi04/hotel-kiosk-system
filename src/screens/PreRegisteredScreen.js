import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import BackgroundDecorations from "../components/BackgroundDecorations";
import ScreenHeader from "../components/ScreenHeader";

export default function PreRegisteredScreen({ navigation }) {
  const [method, setMethod] = useState("mobile");
  const [inputValue, setInputValue] = useState("");
  const [visitorFound, setVisitorFound] = useState(false);

  const visitor = {
    firstName: "manu",
    lastName: "choksi",
    mobile: "9876543210",
    roomNumber: "208",
    purpose: "Official Visit",
    visitorId: "VIS5286",
  };

  const verifyVisitor = () => {
    if (!inputValue.trim()) {
      Alert.alert("Error", "Please enter a value.");
      return;
    }

    if (
      (method === "mobile" && inputValue === visitor.mobile) ||
      (method === "visitor" && inputValue === visitor.visitorId) ||
      (method === "room" && inputValue === visitor.roomNumber)
    ) {
      setVisitorFound(true);
    } else {
      setVisitorFound(false);

      Alert.alert("Visitor Not Found", "No visitor record found.");
    }
  };

  const changeMethod = (selectedMethod) => {
    setMethod(selectedMethod);
    setInputValue("");
    setVisitorFound(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.headerText}>
          PRE-REGISTERED VISITOR • INVITATION CLAIM
        </Text>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.title}>CLAIM VISITOR INVITATION</Text>

        <Text style={styles.subtitle}>
          Retrieve previously authorized visitor invitations and generate access
          credentials.
        </Text>

        <View style={styles.methodContainer}>
          <TouchableOpacity
            style={[
              styles.methodButton,
              method === "mobile" && styles.activeMethod,
            ]}
            onPress={() => changeMethod("mobile")}
          >
            <Text style={styles.methodText}>MOBILE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              method === "visitor" && styles.activeMethod,
            ]}
            onPress={() => changeMethod("visitor")}
          >
            <Text style={styles.methodText}>VISITOR ID</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.methodButton,
              method === "room" && styles.activeMethod,
            ]}
            onPress={() => changeMethod("room")}
          >
            <Text style={styles.methodText}>ROOM</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder={
            method === "mobile"
              ? "Enter Mobile Number"
              : method === "visitor"
                ? "Enter Visitor ID"
                : "Enter Room Number"
          }
          placeholderTextColor="#64748B"
          keyboardType={
            method === "mobile" || method === "room" ? "number-pad" : "default"
          }
          value={inputValue}
          onChangeText={setInputValue}
        />

        <TouchableOpacity style={styles.verifyButton} onPress={verifyVisitor}>
          <Text style={styles.verifyText}>VERIFY INVITATION →</Text>
        </TouchableOpacity>

        {visitorFound && (
          <View style={styles.resultCard}>
            <View style={styles.topRow}>
              <View>
                <Text style={styles.smallLabel}>INVITATION ID</Text>

                <Text style={styles.visitorId}>{visitor.visitorId}</Text>
              </View>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>VERIFIED</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.left}>Visitor Name</Text>

              <Text style={styles.right}>
                {visitor.firstName} {visitor.lastName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.left}>Mobile</Text>

              <Text style={styles.right}>{visitor.mobile}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.left}>Host Room</Text>

              <Text style={styles.right}>{visitor.roomNumber}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.left}>Purpose</Text>

              <Text style={styles.right}>{visitor.purpose}</Text>
            </View>

            <TouchableOpacity
              style={styles.passButton}
              onPress={() =>
                navigation.navigate("VisitorPass", {
                  firstName: visitor.firstName,
                  lastName: visitor.lastName,
                  mobile: visitor.mobile,
                  roomNumber: visitor.roomNumber,
                  purpose: visitor.purpose,
                  visitorId: visitor.visitorId,
                })
              }
            >
              <Text style={styles.passText}>GENERATE PASS →</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← BACK</Text>
        </TouchableOpacity>
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
    paddingTop: 20,
    marginBottom: 30,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  headerText: {
    color: "#D4AF37",
    fontSize: 11,
    letterSpacing: 1,
  },

  mainCard: {
    width: "85%",
    alignSelf: "center",
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    padding: 35,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 10,
  },

  subtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    fontSize: 15,
  },

  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  methodButton: {
    width: "31%",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  activeMethod: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.12)",
  },

  methodText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },

  input: {
    height: 58,
    borderRadius: 15,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    paddingHorizontal: 20,
    fontSize: 15,
  },

  verifyButton: {
    marginTop: 20,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  verifyText: {
    color: "#081120",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  resultCard: {
    marginTop: 30,
    backgroundColor: "#020817",
    borderRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  smallLabel: {
    color: "#64748B",
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 5,
  },

  visitorId: {
    color: "#D4AF37",
    fontSize: 22,
    fontWeight: "bold",
  },

  badge: {
    backgroundColor: "rgba(34,197,94,0.1)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  badgeText: {
    color: "#22C55E",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  left: {
    color: "#94A3B8",
    fontSize: 14,
    flex: 1,
  },

  right: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },

  passButton: {
    marginTop: 25,
    height: 55,
    borderRadius: 15,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  passText: {
    color: "#081120",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  backButton: {
    marginTop: 25,
    alignSelf: "center",
  },

  backText: {
    color: "#94A3B8",
    fontSize: 14,
    letterSpacing: 1,
  },
});

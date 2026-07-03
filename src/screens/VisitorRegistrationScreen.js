import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function VisitorRegistrationScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [purpose, setPurpose] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const handleGenerate = () => {
    navigation.navigate("VisitorPass", {
      firstName,
      lastName,
      mobile,
      roomNumber,
      purpose,
      visitorId: "V-" + Math.floor(1000 + Math.random() * 9000),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text style={styles.logo}>L'AURA</Text>

          <Text style={styles.stepText}>VISITOR MANAGEMENT • STEP 1 OF 2</Text>
        </View>

        {/* GLASS CARD */}

        <View style={styles.mainCard}>
          <Text style={styles.title}>WELCOME TO TRANQUILITY</Text>

          <Text style={styles.subtitle}>
            Visitor security registration. Complete the information below to
            generate a digital access pass.
          </Text>

          {/* ROW 1 */}

          <View style={styles.row}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>VISITOR FIRST NAME</Text>

              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>LAST NAME</Text>

              <TextInput
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
              />
            </View>
          </View>

          {/* ROW 2 */}

          <View style={styles.row}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>MOBILE NUMBER</Text>

              <TextInput
                value={mobile}
                onChangeText={setMobile}
                style={styles.input}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>HOST ROOM</Text>

              <TextInput
                value={roomNumber}
                onChangeText={setRoomNumber}
                style={styles.input}
              />
            </View>
          </View>

          {/* PURPOSE */}

          <View style={styles.fullBox}>
            <Text style={styles.label}>PURPOSE OF VISIT</Text>

            <TextInput
              value={purpose}
              onChangeText={setPurpose}
              style={styles.input}
            />
          </View>

          {/* ID */}

          <View style={styles.row}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>ID TYPE</Text>

              <TextInput
                value={idType}
                onChangeText={setIdType}
                style={styles.input}
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>ID NUMBER</Text>

              <TextInput
                value={idNumber}
                onChangeText={setIdNumber}
                style={styles.input}
              />
            </View>
          </View>

          {/* BUTTONS */}

          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>← BACK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerate}
            >
              <Text style={styles.generateText}>GENERATE PASS →</Text>
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

  stepText: {
    color: "#D4AF37",
    fontSize: 12,
    alignSelf: "center",
  },

  mainCard: {
    width: "85%",
    maxWidth: 650,
    alignSelf: "center",
    backgroundColor: "rgba(10,20,40,0.92)",
    borderRadius: 30,
    padding: 35,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.18)",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 30,
    letterSpacing: 2,
    marginBottom: 10,
  },

  subtitle: {
    color: "#94A3B8",
    lineHeight: 22,
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 20,
  },

  inputBox: {
    flex: 1,
  },

  fullBox: {
    marginBottom: 20,
  },

  label: {
    color: "#64748B",
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 8,
  },

  input: {
    height: 55,
    backgroundColor: "#020817",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    paddingHorizontal: 18,
    fontSize: 14,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingTop: 25,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  backText: {
    color: "#94A3B8",
    letterSpacing: 1,
  },

  generateButton: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 15,
  },

  generateText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },

  footer: {
    textAlign: "center",
    color: "#475569",
    fontSize: 10,
    marginTop: 40,
    letterSpacing: 2,
  },
});

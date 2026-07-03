import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function GuestInformationScreen({ navigation, route }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [nationality, setNationality] = useState("");

  const [idType, setIdType] = useState("aadhaar");

  const [idNumber, setIdNumber] = useState("");

  const handleContinue = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !nationality.trim() ||
      !idNumber.trim()
    ) {
      Alert.alert(t.error, t.fillAllFields);
      return;
    }

    // Name validation
    if (firstName.trim().length < 2) {
      Alert.alert(t.error, "Please enter a valid first name.");
      return;
    }

    if (lastName.trim().length < 2) {
      Alert.alert(t.error, "Please enter a valid last name.");
      return;
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      Alert.alert(t.error, t.invalidEmail);
      return;
    }

    // Mobile validation
    if (!/^\d{10}$/.test(mobile)) {
      Alert.alert(t.error, "Please enter a valid 10-digit mobile number.");
      return;
    }

    // Aadhaar validation
    if (idType === "aadhaar") {
      if (!/^\d{12}$/.test(idNumber)) {
        Alert.alert(t.error, "Aadhaar number must contain exactly 12 digits.");
        return;
      }
    }

    // Passport validation
    if (idType === "passport") {
      if (idNumber.length < 6) {
        Alert.alert(t.error, "Please enter a valid passport number.");
        return;
      }
    }

    // Driving License validation
    if (idType === "license") {
      if (idNumber.length < 8) {
        Alert.alert(t.error, "Please enter a valid driving license number.");
        return;
      }
    }

    if (idType === "other") {
      if (idNumber.trim().length < 5) {
        Alert.alert(t.error, "Please enter a valid ID number.");
        return;
      }
    }

    navigation.navigate("IdVerification", {
      firstName,
      lastName,
      email,
      mobile,
      nationality,
      idType,
      idNumber,

      selectedRoom: route.params.selectedRoom,
      adults: route.params.adults,
      children: route.params.children,
      totalGuests: route.params.totalGuests,
      requiredRooms: route.params.requiredRooms,
      totalPrice: route.params.totalPrice,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>STEP 02 / 07</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.profileCard}>
          <Text style={styles.title}>GUEST PROFILE</Text>

          <Text style={styles.subtitle}>
            Please fill in the details of the primary guest.
          </Text>

          <View style={styles.row}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>FIRST NAME</Text>

              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder={t.firstName}
                placeholderTextColor="#64748B"
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>LAST NAME</Text>

              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder={t.lastName}
                placeholderTextColor="#64748B"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputBox}>
              <Text style={styles.label}>EMAIL</Text>

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder={t.emailAddress}
                placeholderTextColor="#64748B"
              />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>MOBILE</Text>

              <TextInput
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="number-pad"
                maxLength={10}
                placeholder={t.mobileNumber}
                placeholderTextColor="#64748B"
              />
            </View>
          </View>

          <Text style={styles.label}>NATIONALITY</Text>

          <TextInput
            style={styles.fullInput}
            value={nationality}
            onChangeText={setNationality}
            placeholder={t.nationality}
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>ID TYPE</Text>

          <View style={styles.idContainer}>
            {[
              {
                key: "aadhaar",
                label: t.aadhaarCard,
              },
              {
                key: "passport",
                label: t.passport,
              },
              {
                key: "license",
                label: t.drivingLicense,
              },
              {
                key: "other",
                label: t.otherId,
              },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.idCard,
                  idType === item.key && styles.selectedCard,
                ]}
                onPress={() => setIdType(item.key)}
              >
                <Text style={styles.idText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>ID NUMBER</Text>

          <TextInput
            style={styles.fullInput}
            value={idNumber}
            onChangeText={setIdNumber}
            keyboardType={idType === "aadhaar" ? "number-pad" : "default"}
            placeholder={t.idNumber}
            placeholderTextColor="#64748B"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>← BACK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>CONTINUE TO ID →</Text>
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
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingTop: 15,
    marginTop: 18,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  stepText: {
    color: "#D4AF37",
    fontSize: 15,
    fontWeight: "600",
  },

  scrollContent: {
    padding: 25,
  },

  profileCard: {
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    padding: 30,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
  },

  title: {
    color: "#F8E7C8",
    fontSize: 34,
    letterSpacing: 2,
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 10,
    marginBottom: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  inputBox: {
    width: "48%",
  },

  label: {
    color: "#94A3B8",
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 55,
    backgroundColor: "#020817",
    borderRadius: 14,
    paddingHorizontal: 18,
    color: "#FFFFFF",
  },

  fullInput: {
    height: 55,
    backgroundColor: "#020817",
    borderRadius: 14,
    paddingHorizontal: 18,
    color: "#FFFFFF",
  },

  idContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  idCard: {
    width: "48%",
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020817",
    marginBottom: 12,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#D4AF37",
  },

  idText: {
    color: "#FFFFFF",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },

  backText: {
    color: "#94A3B8",
    fontSize: 16,
  },

  continueButton: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 35,
    paddingVertical: 16,
    borderRadius: 16,
  },

  continueText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "bold",
  },

  requiredText: {
    color: "#FB7185",
    fontSize: 13,
    width: "88%",
    alignSelf: "center",
    marginBottom: 15,
  },

  formContainer: {
    width: "88%",
    alignSelf: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    marginTop: 15,
    marginBottom: 10,
  },

  backButton: {
    width: 180,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  continueText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "bold",
  },

  halfInput: {
    width: "48%",
    height: 50,
    backgroundColor: "rgba(15,23,42,0.85)",
    borderRadius: 15,
    paddingHorizontal: 18,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    fontWeight: "bold",
    fontSize: 16,
  },
});

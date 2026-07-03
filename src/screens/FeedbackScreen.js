import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function FeedbackScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert(
        "Feedback Required",
        "Please rate your experience before submitting.",
      );
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>FINAL STEP • GUEST EXPERIENCE</Text>
      </View>

      <View style={styles.mainCard}>
        <View style={styles.iconCircle}>
          <MaterialIcons name="favorite" size={36} color="#D4AF37" />
        </View>

        <Text style={styles.title}>THANK YOU FOR STAYING</Text>

        <Text style={styles.subtitle}>
          Your journey with L'AURA has now concluded.
        </Text>

        <Text style={styles.message}>
          We sincerely value your opinion. Your feedback helps us create a
          better luxury experience for future guests.
        </Text>

        <View style={styles.ratingCard}>
          <Text style={styles.ratingLabel}>HOW WOULD YOU RATE YOUR STAY?</Text>

          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <MaterialIcons
                  name={rating >= star ? "star" : "star-border"}
                  size={50}
                  color="#D4AF37"
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.ratingText}>
            {rating === 0 && "Tap a star to rate"}

            {rating === 1 && "Poor Experience"}

            {rating === 2 && "Fair Experience"}

            {rating === 3 && "Good Experience"}

            {rating === 4 && "Excellent Experience"}

            {rating === 5 && "Exceptional Stay"}
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Share your experience with us..."
          placeholderTextColor="#64748B"
          multiline
          value={comment}
          onChangeText={setComment}
        />

        <TouchableOpacity
          style={[styles.submitButton, rating === 0 && styles.disabledButton]}
          disabled={rating === 0}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>SUBMIT & RETURN HOME →</Text>
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
    paddingTop: 25,
    marginBottom: 25,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  stepText: {
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
    alignItems: "center",
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(212,175,55,0.1)",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.25)",
    marginBottom: 25,
  },

  title: {
    color: "#F8E7C8",
    fontSize: 32,
    letterSpacing: 2,
    textAlign: "center",
  },

  subtitle: {
    color: "#D4AF37",
    fontSize: 16,
    marginTop: 10,
    marginBottom: 15,
  },

  message: {
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },

  ratingCard: {
    width: "100%",
    backgroundColor: "#020817",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    marginBottom: 25,
  },

  ratingLabel: {
    color: "#64748B",
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 20,
  },

  starContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },

  ratingText: {
    color: "#D4AF37",
    fontSize: 15,
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: 120,
    borderRadius: 20,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    padding: 20,
    textAlignVertical: "top",
    marginBottom: 25,
  },

  submitButton: {
    width: "100%",
    height: 58,
    borderRadius: 16,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.5,
  },

  submitText: {
    color: "#081120",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

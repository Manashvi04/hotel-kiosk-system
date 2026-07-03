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

export default function AvailableRoomScreen({ navigation, route }) {
  const rooms = {
    1: [
      { number: 101, view: "Garden View" },
      { number: 103, view: "Pool View" },
      { number: 105, view: "Courtyard View" },
    ],

    2: [
      { number: 301, view: "Ocean View" },
      { number: 305, view: "Balcony View" },
      { number: 308, view: "City View" },
    ],

    3: [
      { number: 401, view: "Sea View" },
      { number: 405, view: "Resort View" },
    ],

    4: [{ number: 501, view: "Presidential View" }],
  };

  const roomNames = {
    1: "Deluxe Room",
    2: "Executive Suite",
    3: "Family Suite",
    4: "Presidential Suite",
  };

  const roomPrices = {
    1: 4500,
    2: 7500,
    3: 9500,
    4: 15000,
  };

  const {
    selectedRoom,
    firstName,
    lastName,
    mobile,
    email,
    totalGuests,
    requiredRooms,
    totalPrice = roomPrices[selectedRoom],
  } = route.params || {};

  const [selectedRooms, setSelectedRooms] = useState([]);

  const toggleRoom = (room) => {
    const exists = selectedRooms.find((r) => r.number === room.number);

    if (exists) {
      setSelectedRooms(selectedRooms.filter((r) => r.number !== room.number));
    } else {
      if (selectedRooms.length < requiredRooms) {
        setSelectedRooms([...selectedRooms, room]);
      }
    }
  };

  const handleContinue = () => {
    navigation.navigate("Payment", {
      ...route.params,
      from: "checkin",
      roomNumbers: selectedRooms.map((room) => room.number),
      requiredRooms,
      totalGuests,
      totalPrice,
      amount: totalPrice,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>STEP 04 / 07</Text>
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.title}>AVAILABLE RESIDENCES</Text>
        <Text style={styles.subtitle}>
          Select an available suite for your stay.
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {rooms[selectedRoom].map((room) => (
            <TouchableOpacity
              key={room.number}
              style={[
                styles.roomCard,
                selectedRooms.some((r) => r.number === room.number) &&
                  styles.selectedRoom,
              ]}
              onPress={() => toggleRoom(room)}
            >
              <View>
                <Text style={styles.roomNumber}>ROOM {room.number}</Text>

                <Text style={styles.roomType}>{roomNames[selectedRoom]}</Text>

                <Text style={styles.roomView}>{room.view}</Text>
              </View>

              <View style={styles.priceBox}>
                <Text style={styles.price}>
                  ₹{roomPrices[selectedRoom]} × {requiredRooms}
                </Text>

                <Text style={styles.roomView}>Total: ₹{totalPrice}</Text>

                <MaterialIcons name="hotel" size={28} color="#D4AF37" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.summaryBox}>
          <Text>Total Guests: {totalGuests}</Text>
          <Text>Rooms Required: {requiredRooms}</Text>
          <Text>
            Selected: {selectedRooms.length}/{requiredRooms}
          </Text>
          <Text>Amount: ₹{totalPrice}</Text>
        </View>

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={selectedRooms.length !== requiredRooms}
            style={[
              styles.continueButton,
              selectedRooms.length !== requiredRooms && {
                opacity: 0.4,
              },
            ]}
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
    marginBottom: 30,
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
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    padding: 35,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
    flex: 1,
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
    lineHeight: 24,
  },

  roomCard: {
    backgroundColor: "#020817",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectedRoom: {
    borderColor: "#D4AF37",
    backgroundColor: "rgba(212,175,55,0.10)",
  },

  roomNumber: {
    color: "#F8E7C8",
    fontSize: 22,
    letterSpacing: 1,
  },

  roomType: {
    color: "#FFFFFF",
    marginTop: 8,
    fontSize: 16,
  },

  roomView: {
    color: "#94A3B8",
    marginTop: 5,
  },

  priceBox: {
    alignItems: "center",
  },

  price: {
    color: "#D4AF37",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  summaryBox: {
    marginTop: 20,
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.1)",
  },

  summaryText: {
    color: "#CBD5E1",
    fontSize: 15,
    marginBottom: 8,
  },

  amountText: {
    color: "#D4AF37",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
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

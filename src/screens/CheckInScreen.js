import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";

export default function CheckInScreen({ navigation }) {
  const { language } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [adults, setAdults] = useState(1);

  const [children, setChildren] = useState(0);

  const rooms = [
    {
      id: 1,
      title: t.deluxeRoom,
      price: 4500,
      guests: 2,
      icon: "king-bed",
      color: "#60A5FA",
      image: require("../../assets/rooms/deluxe-room.jpg"),
      label: "SERENE & ELEGANT",
      description: "Warm interiors, premium comfort and luxury amenities.",
    },
    {
      id: 2,
      title: t.executiveSuite,
      price: 7500,
      guests: 3,
      icon: "hotel",
      color: "#D4AF37",
      image: require("../../assets/rooms/executive-suite.jpg"),
      label: "SERENE & ELEGANT",
      description: "Warm interiors, premium comfort and luxury amenities.",
    },
    {
      id: 3,
      title: t.familySuite,
      price: 9500,
      guests: 5,
      icon: "weekend",
      color: "#2DD4BF",
      image: require("../../assets/rooms/family-suite.jpg"),
      label: "SERENE & ELEGANT",
      description: "Warm interiors, premium comfort and luxury amenities.",
    },
    {
      id: 4,
      title: t.presidentialSuite,
      price: 15000,
      guests: 6,
      icon: "star",
      color: "#FB7185",
      image: require("../../assets/rooms/presidential-suite.jpg"),
      label: "SERENE & ELEGANT",
      description: "Warm interiors, premium comfort and luxury amenities.",
    },
  ];

  const selectedRoomData = rooms.find((room) => room.id === selectedRoom);

  const totalGuests = adults + children;

  const requiredRooms = selectedRoomData?.guests
    ? Math.ceil(totalGuests / selectedRoomData?.guests)
    : 0;

  const totalPrice = selectedRoomData?.price
    ? requiredRooms * selectedRoomData?.price
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.stepText}>STEP 01 / 07</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>SELECT YOUR SANCTUARY SUITE</Text>

        <Text style={styles.heroSubtitle}>
          Tailor your stay to your preference and choose the perfect room
          experience.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.roomGrid}>
        {rooms.map((room) => (
          <TouchableOpacity
            key={room.id}
            style={[
              styles.roomCard,
              selectedRoom === room.id && styles.selectedRoom,
            ]}
            onPress={() => {
              setAdults(1);
              setChildren(0);
              setSelectedRoom(room.id);
            }}
          >
            <Image source={room.image} style={styles.cardImage} />

            <View style={styles.roomInfo}>
              <Text style={styles.roomLabel}>{room.label}</Text>

              <Text style={styles.cardTitle}>{room.title}</Text>

              <Text style={styles.roomDescription}>{room.description}</Text>

              <Text style={styles.cardGuests}>KING BED • WIFI • AC</Text>

              <Text style={styles.cardPrice}>
                ₹{room.price.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={22} color="#94A3B8" />

          <Text style={styles.backText}>BACK</Text>
        </TouchableOpacity>

        {selectedRoomData && (
          <Text style={styles.selectedText}>
            Selected: {selectedRoomData.title}
          </Text>
        )}
      </View>

      {selectedRoom && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.continueText}>CONTINUE TO PROFILE →</Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {selectedRoomData && (
              <>
                <Text style={styles.modalTitle}>{selectedRoomData.title}</Text>

                <Image
                  source={selectedRoomData.image}
                  style={styles.modalImage}
                />

                <Text style={styles.capacityText}>
                  Maximum Capacity:
                  {"\n"}
                  {selectedRoomData.guests} Guests
                </Text>

                <View style={styles.counterRow}>
                  <Text style={styles.counterLabel}>Adults</Text>

                  <View style={styles.counterBox}>
                    <TouchableOpacity
                      onPress={() => adults > 1 && setAdults(adults - 1)}
                    >
                      <Text style={styles.counterBtn}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.counterValue}>{adults}</Text>

                    <TouchableOpacity onPress={() => setAdults(adults + 1)}>
                      <Text style={styles.counterBtn}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.counterRow}>
                  <Text style={styles.counterLabel}>Children</Text>

                  <View style={styles.counterBox}>
                    <TouchableOpacity
                      onPress={() => children > 0 && setChildren(children - 1)}
                    >
                      <Text style={styles.counterBtn}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.counterValue}>{children}</Text>

                    <TouchableOpacity onPress={() => setChildren(children + 1)}>
                      <Text style={styles.counterBtn}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {adults + children > selectedRoomData.guests && (
                  <Text style={styles.warningText}>
                    Additional room required.
                  </Text>
                )}

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryItem}>Guests: {totalGuests}</Text>

                  <Text style={styles.summaryItem}>Rooms: {requiredRooms}</Text>

                  <Text style={styles.summaryPrice}>
                    ₹{totalPrice.toLocaleString()}
                  </Text>
                </View>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.okButton}
                    onPress={() => {
                      setModalVisible(false);

                      navigation.navigate("GuestInformation", {
                        selectedRoom: selectedRoomData.id,
                        roomName: selectedRoomData.name,
                        roomPrice: selectedRoomData.price,
                        maxGuests: selectedRoomData.maxGuests,
                        adults,
                        children,
                        totalGuests,
                        requiredRooms,
                        totalPrice,
                      });
                    }}
                  >
                    <Text style={styles.okText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
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
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },

  logo: {
    color: "#D4AF37",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },

  stepText: {
    color: "#D4AF37",
    fontSize: 16,
    fontWeight: "600",
  },

  hero: {
    alignItems: "center",
    marginVertical: 20,
  },

  heroTitle: {
    color: "#F8E7C8",
    fontSize: 32,
    textAlign: "center",
    letterSpacing: 2,
  },

  heroSubtitle: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },

  roomGrid: {
    flex: 1,
  },

  roomCard: {
    flexDirection: "row",

    backgroundColor: "rgba(12,22,45,0.95)",

    borderRadius: 25,

    padding: 15,

    marginBottom: 18,

    borderWidth: 1,

    borderColor: "rgba(212,175,55,0.15)",
  },

  bottomBar: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 35,
  },

  backButton: {
    flexDirection: "row",

    alignItems: "center",
  },

  backText: {
    color: "#94A3B8",

    fontSize: 16,

    marginLeft: 6,

    letterSpacing: 1,
  },

  selectedText: {
    color: "#D4AF37",

    fontSize: 15,

    fontWeight: "600",
  },

  selectedRoom: {
    borderColor: "#D4AF37",
    borderWidth: 2,
  },

  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 18,
  },

  roomInfo: {
    flex: 1,
    marginLeft: 18,
    justifyContent: "center",
  },

  roomLabel: {
    color: "#D4AF37",
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "600",
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    marginTop: 8,
  },

  roomDescription: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },

  cardGuests: {
    color: "#64748B",
    marginTop: 12,
  },

  cardPrice: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
  },

  continueButton: {
    height: 60,
    borderRadius: 18,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  continueText: {
    color: "#081120",
    fontSize: 18,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "90%",
    backgroundColor: "#0B1730",
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.2)",
  },

  modalTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },

  modalImage: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    marginBottom: 20,
  },

  capacityText: {
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },

  counterLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  counterBtn: {
    width: 40,
    textAlign: "center",
    color: "#D4AF37",
    fontSize: 34,
    fontWeight: "bold",
  },

  counterValue: {
    width: 40,
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },

  warningText: {
    color: "#EF4444",
    textAlign: "center",
    marginTop: 15,
    fontSize: 15,
    fontWeight: "600",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  summaryItem: {
    color: "#CBD5E1",
    fontSize: 15,
  },

  summaryPrice: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "bold",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },

  cancelButton: {
    flex: 1,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginRight: 10,
  },

  cancelText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  okButton: {
    flex: 1,
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D4AF37",
    marginLeft: 10,
  },

  okText: {
    color: "#081120",
    fontSize: 16,
    fontWeight: "bold",
  },
});

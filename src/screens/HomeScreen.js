import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";

import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../translation";
import LanguageButton from "../components/LanguageButton";

import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

export default function HomeScreen({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);

  const t = translations[language] || translations.en;

  const menuItems = [
    {
      title: t.checkIn,
      subtitle: t.newCheckIn,
      color: "#D4AF37",
      icon: <MaterialIcons name="login" size={35} color="#fff" />,
      screen: "CheckInOption",
    },
    {
      title: t.checkOut,
      subtitle: t.checkOutBilling,
      color: "#60A5FA",
      icon: <MaterialIcons name="logout" size={35} color="#fff" />,
      screen: "CheckOut",
    },
    {
      title: t.roomExtension,
      subtitle: t.extendStay,
      color: "#A78BFA",
      icon: <Ionicons name="time" size={35} color="#fff" />,
      screen: "RoomExtension",
    },
    {
      title: t.visitorManagement,
      subtitle: t.registerVisitor,
      color: "#2DD4BF",
      icon: <FontAwesome5 name="user-friends" size={28} color="#fff" />,
      screen: "VisitorManagement",
    },
    {
      title: t.needHelp,
      subtitle: t.connectStaff,
      color: "#FB7185",
      icon: <Ionicons name="help-circle" size={35} color="#fff" />,
      screen: "NeedHelp",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/resort.png")}
        style={styles.background}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>L'AURA</Text>
              <Text style={styles.logoSub}>RESORT & SPA</Text>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.time}>{new Date().toLocaleTimeString()}</Text>

              <Text style={styles.date}>{new Date().toDateString()}</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* HERO */}
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>WELCOME TO</Text>

              <Text style={styles.heroTitle}>PERSONALIZED</Text>

              <Text style={styles.heroTitle}>TRANQUILITY</Text>

              <Text style={styles.heroText}>{t.welcomeMessage}</Text>
            </View>

            {/* DASHBOARD */}
            {isTablet ? (
              <>
                <View style={styles.topRow}>
                  {/* CHECK IN */}

                  <TouchableOpacity
                    style={styles.checkInCard}
                    onPress={() => navigation.navigate("CheckInOption")}
                  >
                    {menuItems[0].icon}

                    <Text style={styles.cardTitle}>{menuItems[0].title}</Text>

                    <Text style={styles.cardText}>{menuItems[0].subtitle}</Text>
                  </TouchableOpacity>

                  <View style={styles.rightColumn}>
                    <View style={styles.smallRow}>
                      <TouchableOpacity
                        style={styles.smallCard}
                        onPress={() => navigation.navigate("CheckOut")}
                      >
                        {menuItems[1].icon}

                        <Text style={styles.smallTitle}>
                          {menuItems[1].title}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.smallCard}
                        onPress={() => {
                          const screen = menuItems[2].screen;

                          if (screen === "RoomExtension") {
                            navigation.navigate("BookingVerification", {
                              from: "extension",
                            });
                          } else if (screen === "CheckIn") {
                            navigation.navigate("CheckInOption");
                          } else {
                            navigation.navigate(screen);
                          }
                        }}
                      >
                        {menuItems[2].icon}

                        <Text style={styles.smallTitle}>
                          {menuItems[2].title}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.visitorCard}
                      onPress={() => navigation.navigate("VisitorManagement")}
                    >
                      {menuItems[3].icon}

                      <Text style={styles.cardTitle}>{menuItems[3].title}</Text>

                      <Text style={styles.cardText}>
                        {menuItems[3].subtitle}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.helpCard}
                  onPress={() => navigation.navigate("NeedHelp")}
                >
                  {menuItems[4].icon}

                  <Text style={styles.cardTitle}>{menuItems[4].title}</Text>

                  <Text style={styles.cardText}>{menuItems[4].subtitle}</Text>
                </TouchableOpacity>
              </>
            ) : (
              menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.mobileCard}
                  onPress={() => {
                    if (item.screen === "RoomExtension") {
                      navigation.navigate("BookingVerification", {
                        from: "extension",
                      });
                    } else {
                      navigation.navigate(item.screen);
                    }
                  }}
                >
                  {item.icon}

                  <Text style={styles.cardTitle}>{item.title}</Text>

                  <Text style={styles.cardText}>{item.subtitle}</Text>
                </TouchableOpacity>
              ))
            )}

            <View style={styles.language}>
              <LanguageButton />
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  image: {
    resizeMode: "cover",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.82)",
    paddingHorizontal: 25,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
  },

  logo: {
    color: "#E9BF90",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 4,
  },

  logoSub: {
    color: "#CBD5E1",
    fontSize: 10,
    letterSpacing: 3,
    marginTop: 1,
  },

  timeContainer: {
    alignItems: "flex-end",
  },

  time: {
    color: "#E9BF90",
    fontSize: 16,
  },

  date: {
    color: "#94A3B8",
    fontSize: 10,
  },

  hero: {
    alignItems: "center",
    marginVertical: 5,
  },

  heroTitle: {
    color: "#F8E7C8",
    fontSize: isTablet ? 36 : 28,
    letterSpacing: 4,
    fontWeight: "300",
  },

  heroText: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 20,
    maxWidth: 600,
    lineHeight: 24,
  },

  topRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  checkInCard: {
    flex: 6,
    marginRight: 15,
    minHeight: 260,

    backgroundColor: "rgba(15,23,42,0.75)",

    borderRadius: 30,

    padding: 30,

    borderWidth: 1,

    borderColor: "rgba(233,191,144,0.2)",
  },

  rightColumn: {
    flex: 6,
  },

  smallRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  smallCard: {
    width: "48%",
    minHeight: 120,

    backgroundColor: "rgba(15,23,42,0.75)",

    borderRadius: 24,

    padding: 20,

    borderWidth: 1,

    borderColor: "rgba(233,191,144,0.15)",
  },

  visitorCard: {
    minHeight: 125,

    backgroundColor: "rgba(15,23,42,0.75)",

    borderRadius: 24,

    padding: 24,

    borderWidth: 1,

    borderColor: "rgba(233,191,144,0.15)",
  },

  helpCard: {
    minHeight: 160,

    backgroundColor: "rgba(15,23,42,0.75)",

    borderRadius: 30,

    padding: 28,

    borderWidth: 1,

    borderColor: "rgba(233,191,144,0.15)",

    marginBottom: 20,
  },

  mobileCard: {
    minHeight: 160,

    marginBottom: 20,

    backgroundColor: "rgba(15,23,42,0.75)",

    borderRadius: 28,

    padding: 25,

    borderWidth: 1,

    borderColor: "rgba(233,191,144,0.15)",
  },

  cardTitle: {
    color: "#F8E7C8",

    fontSize: 22,

    marginTop: 20,

    fontWeight: "600",
  },

  smallTitle: {
    color: "#F8E7C8",

    marginTop: 20,

    fontSize: 16,

    fontWeight: "600",
  },

  cardText: {
    color: "#CBD5E1",

    marginTop: 10,

    lineHeight: 22,
  },

  language: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },
});

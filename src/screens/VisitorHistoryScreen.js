import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";

export default function VisitorHistoryScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const { width } = Dimensions.get("window");
  const isMobile = width < 768;

  const visitors = [
    {
      id: "VIS5286",
      name: "Rahul Patel",
      room: "208",
      purpose: "Business Meeting",
      date: "12 Jul 2026",
      time: "04:30 PM",
      status: "Cancelled",
    },
    {
      id: "VIS5312",
      name: "Priya Shah",
      room: "315",
      purpose: "Family Visit",
      date: "13 Jul 2026",
      time: "06:00 PM",
      status: "Active",
    },
    {
      id: "VIS5401",
      name: "Amit Kumar",
      room: "110",
      purpose: "Maintenance",
      date: "13 Jul 2026",
      time: "02:15 PM",
      status: "Completed",
    },
    {
      id: "VIS5420",
      name: "Neha Shah",
      room: "412",
      purpose: "Friend Visit",
      date: "14 Jul 2026",
      time: "05:45 PM",
      status: "Active",
    },
    {
      id: "VIS5450",
      name: "Karan Mehta",
      room: "305",
      purpose: "Business Meeting",
      date: "14 Jul 2026",
      time: "06:30 PM",
      status: "Completed",
    },
  ];

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.name.toLowerCase().includes(search.toLowerCase()) ||
      visitor.room.toLowerCase().includes(search.toLowerCase()) ||
      visitor.purpose.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.logo}>L'AURA</Text>

        <Text style={styles.headerText}>VISITOR MANAGEMENT • AUDIT LOGS</Text>
      </View>

      <View style={styles.mainCard}>
        <View
          style={[styles.topSection, isMobile && { flexDirection: "column" }]}
        >
          <View>
            <Text style={[styles.title, isMobile && { fontSize: 24 }]}>
              VISITOR HISTORY LOGS
            </Text>

            <Text style={styles.subtitle}>
              Historic security audit records and visitor activities.
            </Text>
          </View>

          <TextInput
            style={[
              styles.searchBox,
              isMobile && {
                width: "100%",
                marginTop: 20,
              },
            ]}
            placeholder="Search visitor, room..."
            placeholderTextColor="#64748B"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* MOBILE VIEW */}

        {isMobile ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredVisitors.map((item) => (
              <View key={item.id} style={styles.mobileCard}>
                <View style={styles.mobileTop}>
                  <View>
                    <Text style={styles.visitorName}>{item.name}</Text>

                    <Text style={styles.visitorId}>{item.id}</Text>
                  </View>

                  <View
                    style={[
                      styles.badge,
                      item.status === "Active"
                        ? styles.activeBadge
                        : item.status === "Completed"
                          ? styles.completedBadge
                          : styles.cancelledBadge,
                    ]}
                  >
                    <Text style={styles.badgeText}>{item.status}</Text>
                  </View>
                </View>

                <View style={styles.mobileRow}>
                  <Text style={styles.mobileLabel}>ROOM</Text>

                  <Text style={styles.mobileValue}>{item.room}</Text>
                </View>

                <View style={styles.mobileRow}>
                  <Text style={styles.mobileLabel}>PURPOSE</Text>

                  <Text style={styles.mobileValue}>{item.purpose}</Text>
                </View>

                <View style={styles.mobileRow}>
                  <Text style={styles.mobileLabel}>TIME</Text>

                  <Text style={styles.mobileValue}>{item.time}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <>
            <View style={styles.tableHeader}>
              <View style={styles.nameColumn}>
                <Text style={styles.headerCell}>VISITOR</Text>
              </View>

              <View style={styles.roomColumn}>
                <Text style={styles.headerCell}>ROOM</Text>
              </View>

              <View style={styles.purposeColumn}>
                <Text style={styles.headerCell}>PURPOSE</Text>
              </View>

              <View style={styles.timeColumn}>
                <Text style={styles.headerCell}>TIME</Text>
              </View>

              <View style={styles.statusColumn}>
                <Text style={styles.headerCell}>STATUS</Text>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredVisitors.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <View style={styles.nameColumn}>
                    <Text style={styles.visitorName}>{item.name}</Text>

                    <Text style={styles.visitorId}>{item.id}</Text>
                  </View>

                  <View style={styles.roomColumn}>
                    <Text style={styles.cell}>{item.room}</Text>
                  </View>

                  <View style={styles.purposeColumn}>
                    <Text style={styles.cell}>{item.purpose}</Text>
                  </View>

                  <View style={styles.timeColumn}>
                    <Text style={styles.cell}>{item.time}</Text>
                  </View>

                  <View style={styles.statusColumn}>
                    <View
                      style={[
                        styles.badge,
                        item.status === "Active"
                          ? styles.activeBadge
                          : item.status === "Completed"
                            ? styles.completedBadge
                            : styles.cancelledBadge,
                      ]}
                    >
                      <Text style={styles.badgeText}>{item.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        )}

        <View style={styles.bottomRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              })
            }
          >
            <Text style={styles.finishText}>RETURN HOME</Text>
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
    paddingTop: 20,
    marginBottom: 25,
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
    flex: 1,
    backgroundColor: "rgba(10,20,40,0.95)",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.15)",
    padding: 25,
    marginBottom: 20,
  },

  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    color: "#F8E7C8",
    fontSize: 32,
    letterSpacing: 2,
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 8,
    lineHeight: 22,
  },

  searchBox: {
    width: 260,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#020817",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#FFFFFF",
    paddingHorizontal: 18,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },

  headerCell: {
    flex: 1,
    color: "#64748B",
    fontSize: 11,
    letterSpacing: 1,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },

  nameColumn: {
    width: "28%",
  },

  roomColumn: {
    width: "14%",
  },

  purposeColumn: {
    width: "24%",
  },

  timeColumn: {
    width: "18%",
  },

  statusColumn: {
    width: "16%",
    alignItems: "flex-end",
  },

  visitorName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  visitorId: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 3,
  },

  cell: {
    flex: 1,
    color: "#CBD5E1",
    fontSize: 14,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  activeBadge: {
    backgroundColor: "rgba(16,185,129,0.15)",
    borderWidth: 1,
    borderColor: "#10B981",
  },

  completedBadge: {
    backgroundColor: "rgba(212,175,55,0.15)",
    borderWidth: 1,
    borderColor: "#D4AF37",
  },

  cancelledBadge: {
    backgroundColor: "rgba(239,68,68,0.15)",
    borderWidth: 1,
    borderColor: "#EF4444",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  mobileCard: {
    backgroundColor: "#020817",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  mobileTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  mobileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  mobileLabel: {
    color: "#64748B",
    fontSize: 12,
  },

  mobileValue: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },

  backText: {
    color: "#94A3B8",
    letterSpacing: 1,
  },

  finishButton: {
    backgroundColor: "#D4AF37",
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 14,
  },

  finishText: {
    color: "#081120",
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

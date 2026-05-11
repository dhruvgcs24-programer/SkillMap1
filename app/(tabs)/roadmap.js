import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useFocusEffect } from "expo-router";

import { ROLE_ROADMAPS, SKILL_ROADMAPS, getRoadmapById } from "../../src/data/roadmapData";
import RoadmapScreen from "../../src/components/RoadmapScreen";

const { width } = Dimensions.get("window");
const CARD_W = (width - 48 - 12) / 2;

// ─── ROADMAP CARD ─────────────────────────────────────────────────────────────
function RoadmapCard({ roadmap, onPress }) {
  const total = roadmap.modules.length;
  const hasModules = total > 0;
  const totalTopics = roadmap.modules.reduce((acc, m) => acc + (m.subTopics?.length || 0), 0);

  return (
    <TouchableOpacity
      onPress={() => onPress(roadmap)}
      activeOpacity={0.8}
      style={styles.card}
    >
      <LinearGradient colors={["#0e0e26", "#0a0a1e"]} style={styles.cardGrad}>
        {/* Gradient icon box */}
        <LinearGradient colors={roadmap.color} style={styles.cardIconBox} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Ionicons name={roadmap.icon} size={24} color="#fff" />
        </LinearGradient>

        <Text style={styles.cardTitle} numberOfLines={2}>{roadmap.title}</Text>
        <Text style={styles.cardSub} numberOfLines={2}>{roadmap.subtitle}</Text>

        <View style={styles.cardFooter}>
          {hasModules ? (
            <>
              <View style={styles.cardStat}>
                <Ionicons name="layers-outline" size={11} color="#555577" />
                <Text style={styles.cardStatText}>{total} modules</Text>
              </View>
              <View style={styles.cardStat}>
                <Ionicons name="document-text-outline" size={11} color="#555577" />
                <Text style={styles.cardStatText}>{totalTopics} topics</Text>
              </View>
            </>
          ) : (
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Coming soon</Text>
            </View>
          )}
        </View>

        {/* Bottom color accent line */}
        <LinearGradient
          colors={roadmap.color}
          style={styles.cardAccent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, icon }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIconWrap}>
        <Ionicons name={icon} size={16} color="#a855f7" />
      </View>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSub}>{subtitle}</Text>
      </View>
    </View>
  );
}

// ─── MAIN EXPLORE SCREEN ──────────────────────────────────────────────────────
export default function RoadmapExploreScreen() {
  const [activeRoadmap, setActiveRoadmap] = useState(null);
  const { openId } = useLocalSearchParams();

  // Auto-open a specific roadmap when navigated from another tab
  useFocusEffect(
    useCallback(() => {
      if (openId) {
        const roadmap = getRoadmapById(openId);
        if (roadmap && roadmap.modules?.length > 0) {
          setActiveRoadmap(roadmap);
        }
      }
    }, [openId])
  );

  const handlePress = (roadmap) => {
    if (roadmap.modules.length === 0) return; // coming soon
    setActiveRoadmap(roadmap);
  };

  // Full roadmap detail view
  if (activeRoadmap) {
    return (
      <RoadmapScreen
        roadmap={activeRoadmap}
        onBack={() => setActiveRoadmap(null)}
      />
    );
  }

  return (
    <LinearGradient colors={["#06060f", "#0d0d1f", "#06060f"]} style={styles.bg}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* ── Top Header ── */}
          <View style={styles.header}>
            <Text style={styles.eyebrow}>SKILLMAP</Text>
            <Text style={styles.headerTitle}>Explore Roadmaps</Text>
            <Text style={styles.headerSub}>
              Structured learning paths from beginner to expert
            </Text>

            {/* Stats bar */}
            <View style={styles.statsBar}>
              <View style={styles.statItem}>
                <Text style={styles.statNum}>{ROLE_ROADMAPS.length + SKILL_ROADMAPS.length}</Text>
                <Text style={styles.statLabel}>Roadmaps</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNum}>
                  {[...ROLE_ROADMAPS, ...SKILL_ROADMAPS].reduce((acc, r) => acc + r.modules.length, 0)}
                </Text>
                <Text style={styles.statLabel}>Modules</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNum}>
                  {[...ROLE_ROADMAPS, ...SKILL_ROADMAPS].reduce(
                    (acc, r) => acc + r.modules.reduce((a, m) => a + (m.subTopics?.length || 0), 0), 0
                  )}
                </Text>
                <Text style={styles.statLabel}>Topics</Text>
              </View>
            </View>
          </View>

          {/* ── Role-based ── */}
          <View style={styles.section}>
            <SectionHeader
              icon="person-outline"
              title="Role-based Roadmaps"
              subtitle="Pick a career path and master it"
            />
            <View style={styles.grid}>
              {ROLE_ROADMAPS.map((r) => (
                <RoadmapCard key={r.id} roadmap={r} onPress={handlePress} />
              ))}
            </View>
          </View>

          {/* ── Skill-based ── */}
          <View style={styles.section}>
            <SectionHeader
              icon="code-slash-outline"
              title="Skill-based Roadmaps"
              subtitle="Go deep on a specific technology"
            />
            <View style={styles.grid}>
              {SKILL_ROADMAPS.map((r) => (
                <RoadmapCard key={r.id} roadmap={r} onPress={handlePress} />
              ))}
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },
  scroll: { paddingBottom: 20 },

  // Header
  header: { paddingHorizontal: 22, paddingTop: 16, paddingBottom: 28 },
  eyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 3, color: "#a855f7", marginBottom: 4 },
  headerTitle: { fontSize: 30, fontWeight: "800", color: "#f0f0ff", marginBottom: 6, letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: "#55557a", lineHeight: 19, marginBottom: 22 },

  // Stats bar
  statsBar: {
    flexDirection: "row",
    backgroundColor: "rgba(168,85,247,0.07)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.15)",
    alignItems: "center",
    justifyContent: "space-around",
  },
  statItem: { alignItems: "center" },
  statNum: { fontSize: 22, fontWeight: "800", color: "#f0f0ff", marginBottom: 2 },
  statLabel: { fontSize: 11, color: "#55557a" },
  statDivider: { width: 1, height: 32, backgroundColor: "rgba(168,85,247,0.2)" },

  // Section
  section: { paddingHorizontal: 22, marginBottom: 32 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 18 },
  sectionIconWrap: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: "rgba(168,85,247,0.12)",
    borderWidth: 1, borderColor: "rgba(168,85,247,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#e0e0ff", marginBottom: 2 },
  sectionSub: { fontSize: 11, color: "#44446a" },

  // Grid
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },

  // Card
  card: {
    width: CARD_W,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.18)",
  },
  cardGrad: { padding: 16, minHeight: 185, justifyContent: "space-between" },
  cardIconBox: {
    width: 48, height: 48, borderRadius: 14,
    alignItems: "center", justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  },
  cardTitle: { fontSize: 14, fontWeight: "700", color: "#f0f0ff", marginBottom: 4, lineHeight: 18 },
  cardSub: { fontSize: 11, color: "#44446a", lineHeight: 15, flex: 1, marginBottom: 12 },
  cardFooter: { gap: 4 },
  cardStat: { flexDirection: "row", alignItems: "center", gap: 5 },
  cardStatText: { fontSize: 11, color: "#44446a" },

  comingSoonBadge: {
    backgroundColor: "rgba(168,85,247,0.1)",
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 8, alignSelf: "flex-start",
    borderWidth: 1, borderColor: "rgba(168,85,247,0.2)",
  },
  comingSoonText: { color: "#6644aa", fontSize: 10, fontWeight: "600" },

  // Bottom accent line
  cardAccent: { height: 3, marginHorizontal: -16, marginBottom: -16, marginTop: 14 },
});
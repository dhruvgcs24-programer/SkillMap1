// ============================================================
// skills.js — Multi-Roadmap AI Skills Tab
// ============================================================
// States:
//   "dashboard" → My Roadmaps list (shows if ≥1 roadmap saved)
//   "form"      → RoadmapForm (first time OR after pressing +)
//   "loading"   → Animated loading screen during generation
//   "result"    → GeneratedRoadmap viewer for a selected roadmap
// ============================================================

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RoadmapForm from "../../components/ui/RoadmapForm";
import GeneratedRoadmap from "../../components/ui/GeneratedRoadmap";

const { width } = Dimensions.get("window");

const STORAGE_KEY = "skillmap_ai_roadmaps";

// ─── Persistence helpers ───────────────────────────────────────────────────────
async function loadRoadmaps() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function saveRoadmaps(roadmaps) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(roadmaps));
  } catch {}
}

// ─── Phase colour dots ─────────────────────────────────────────────────────────
const PHASE_COLORS = ["#6C63FF", "#FF6584", "#43D9AD"];

// ─── Loading Screen ────────────────────────────────────────────────────────────
function LoadingScreen({ topic }) {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  const STEPS = [
    { icon: "search-outline",     text: "Analysing your topic..." },
    { icon: "git-branch-outline", text: "Mapping dependencies..." },
    { icon: "layers-outline",     text: "Structuring phases..." },
    { icon: "calendar-outline",   text: "Planning weekly goals..." },
    { icon: "library-outline",    text: "Curating resources..." },
    { icon: "sparkles-outline",   text: "Finalising your roadmap..." },
  ];

  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const bounceDot = (dot, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -8, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.delay(400),
        ])
      ).start();

    bounceDot(dot1, 0);
    bounceDot(dot2, 150);
    bounceDot(dot3, 300);

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 900, useNativeDriver: true }),
      ])
    ).start();

    const interval = setInterval(() => {
      setStepIndex((i) => (i + 1) % STEPS.length);
    }, 330);

    return () => clearInterval(interval);
  }, []);

  const step = STEPS[stepIndex];

  return (
    <View style={styles.loadingContainer}>
      <LinearGradient colors={["#0D0D1A", "#12122A", "#0D0D1A"]} style={StyleSheet.absoluteFill} />
      <Animated.View style={[styles.glowCircle, { opacity: glowAnim }]}>
        <LinearGradient colors={["#6C63FF55", "#9B5DE533", "#00000000"]} style={StyleSheet.absoluteFill} />
      </Animated.View>
      <View style={styles.loadingIconWrapper}>
        <LinearGradient colors={["#6C63FF", "#9B5DE5"]} style={styles.loadingIconBg}>
          <Ionicons name={step.icon} size={32} color="#fff" />
        </LinearGradient>
      </View>
      <Text style={styles.loadingTitle}>Building your roadmap</Text>
      <Text style={styles.loadingTopic} numberOfLines={1}>{topic}</Text>
      <Text style={styles.loadingStep}>{step.text}</Text>
      <View style={styles.dotsRow}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View key={i} style={[styles.dot, { transform: [{ translateY: dot }] }]} />
        ))}
      </View>
    </View>
  );
}

// ─── Roadmap Dashboard Card ────────────────────────────────────────────────────
function RoadmapCard({ roadmap, index, onPress, onDelete }) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 350, delay: index * 80, useNativeDriver: true }),
      Animated.timing(fadeAnim,  { toValue: 1, duration: 350, delay: index * 80, useNativeDriver: true }),
    ]).start();
  }, []);

  const totalWeeks   = roadmap.totalWeeks || 0;
  const totalPhases  = roadmap.phases?.length || 0;
  const totalTopics  = roadmap.phases?.reduce((a, p) => a + (p.topics?.length || 0), 0) || 0;
  const createdDate  = roadmap.createdAt
    ? new Date(roadmap.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "";

  const levelColors = {
    Beginner:     ["#43D9AD", "#06b6d4"],
    Intermediate: ["#6C63FF", "#9B5DE5"],
    Advanced:     ["#FF6584", "#f97316"],
  };
  const gradColors = levelColors[roadmap.level] || levelColors.Beginner;

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity
        style={styles.roadmapCard}
        onPress={() => onPress(roadmap)}
        activeOpacity={0.85}
      >
        {/* Left accent bar */}
        <LinearGradient colors={gradColors} style={styles.cardAccentBar} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} />

        <View style={styles.cardBody}>
          {/* Header row */}
          <View style={styles.cardHeaderRow}>
            <LinearGradient colors={gradColors} style={styles.cardIconBox} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Ionicons name="git-branch-outline" size={20} color="#fff" />
            </LinearGradient>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.cardTitle} numberOfLines={1}>{roadmap.title}</Text>
              <View style={styles.cardMeta}>
                <View style={[styles.levelBadge, { borderColor: gradColors[0] }]}>
                  <Text style={[styles.levelText, { color: gradColors[0] }]}>{roadmap.level}</Text>
                </View>
                <Text style={styles.cardDate}>{createdDate}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => onDelete(roadmap.id)}
              style={styles.deleteBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="trash-outline" size={16} color="#3a3a5a" />
            </TouchableOpacity>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { icon: "time-outline",    value: roadmap.duration,         label: "Duration" },
              { icon: "layers-outline",  value: `${totalPhases} phases`,  label: "Phases" },
              { icon: "calendar-outline",value: `${totalWeeks} weeks`,    label: "Weeks" },
              { icon: "flame-outline",   value: `${roadmap.xpTotal} XP`,  label: "XP Reward" },
            ].map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Ionicons name={stat.icon} size={12} color={gradColors[0]} />
                <Text style={styles.statValue} numberOfLines={1}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Phase dots */}
          <View style={styles.phaseDotsRow}>
            {roadmap.phases?.map((phase, i) => (
              <View key={phase.id} style={styles.phaseDotWrap}>
                <View style={[styles.phaseDot, { backgroundColor: PHASE_COLORS[i] || "#555" }]} />
                <Text style={styles.phaseDotLabel} numberOfLines={1}>{phase.name?.replace(/Phase \d+ – /, "")}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Arrow */}
        <View style={styles.cardArrow}>
          <Ionicons name="chevron-forward" size={18} color="#3a3a5a" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ roadmaps, onSelectRoadmap, onDelete, onCreateNew }) {
  const totalXP = roadmaps.reduce((acc, r) => acc + (r.xpTotal || 0), 0);

  return (
    <LinearGradient colors={["#06060f", "#0d0d1f", "#06060f"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.dashScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.dashHeader}>
            <Text style={styles.dashEyebrow}>AI GENERATOR</Text>
            <Text style={styles.dashTitle}>My Roadmaps</Text>
            <Text style={styles.dashSub}>
              {roadmaps.length} custom learning {roadmaps.length === 1 ? "path" : "paths"} · {totalXP.toLocaleString()} total XP
            </Text>
          </View>

          {/* Cards */}
          <View style={styles.cardsWrap}>
            {roadmaps.map((roadmap, index) => (
              <RoadmapCard
                key={roadmap.id}
                roadmap={roadmap}
                index={index}
                onPress={onSelectRoadmap}
                onDelete={onDelete}
              />
            ))}
          </View>

          {/* Bottom spacer for FAB */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity style={styles.fab} onPress={onCreateNew} activeOpacity={0.85}>
          <LinearGradient colors={["#6C63FF", "#9B5DE5"]} style={styles.fabGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Ionicons name="add" size={28} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── RoadmapFormWrapper ────────────────────────────────────────────────────────
function RoadmapFormWrapper({ onSubmitStart, onRoadmapGenerated, onBack, showBack }) {
  const { generateRoadmap } = require("../../components/roadmapAI");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData) => {
    onSubmitStart(formData.topic);
    setLoading(true);
    try {
      const result = await generateRoadmap(formData);
      onRoadmapGenerated(result);
    } catch (e) {
      console.error("Roadmap generation failed:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showBack && (
        <SafeAreaView edges={["top"]} style={styles.backBarSafe}>
          <TouchableOpacity style={styles.backBar} onPress={onBack}>
            <Ionicons name="arrow-back" size={18} color="#a855f7" />
            <Text style={styles.backBarLabel}>My Roadmaps</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
      <RoadmapForm
        onRoadmapGenerated={onRoadmapGenerated}
        onGenerateStart={handleGenerate}
        externalLoading={loading}
      />
    </View>
  );
}

// ─── Main Skills Tab ───────────────────────────────────────────────────────────
export default function SkillsScreen() {
  // "init" | "dashboard" | "form" | "loading" | "result"
  const [screen, setScreen]         = useState("init");
  const [roadmaps, setRoadmaps]     = useState([]);
  const [activeRoadmap, setActive]  = useState(null);
  const [formTopic, setFormTopic]   = useState("");

  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Load persisted roadmaps on mount
  useEffect(() => {
    loadRoadmaps().then((saved) => {
      setRoadmaps(saved);
      setScreen(saved.length === 0 ? "form" : "dashboard");
    });
  }, []);

  const transitionTo = useCallback((nextScreen, callback) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      if (callback) callback();
      setScreen(nextScreen);
      Animated.timing(fadeAnim, { toValue: 1, duration: 260, useNativeDriver: true }).start();
    });
  }, [fadeAnim]);

  // When generation completes → save + go to result
  const handleRoadmapGenerated = useCallback((generated) => {
    const newRoadmap = {
      ...generated,
      id: `roadmap_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    transitionTo("result", () => {
      setRoadmaps((prev) => {
        const updated = [newRoadmap, ...prev];
        saveRoadmaps(updated);
        return updated;
      });
      setActive(newRoadmap);
    });
  }, [transitionTo]);

  // Form submit start → show loading
  const handleFormSubmitStart = useCallback((topic) => {
    setFormTopic(topic);
    transitionTo("loading");
  }, [transitionTo]);

  // Delete a roadmap
  const handleDelete = useCallback((id) => {
    Alert.alert(
      "Delete Roadmap",
      "Are you sure you want to remove this roadmap?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setRoadmaps((prev) => {
              const updated = prev.filter((r) => r.id !== id);
              saveRoadmaps(updated);
              if (updated.length === 0) transitionTo("form");
              return updated;
            });
          },
        },
      ]
    );
  }, [transitionTo]);

  // Select a roadmap from dashboard
  const handleSelectRoadmap = useCallback((roadmap) => {
    transitionTo("result", () => setActive(roadmap));
  }, [transitionTo]);

  // Go back to dashboard (or form if no roadmaps)
  const handleBack = useCallback(() => {
    transitionTo(roadmaps.length > 0 ? "dashboard" : "form");
  }, [roadmaps.length, transitionTo]);

  if (screen === "init") return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0D1A" }}>
      <StatusBar style="light" />
      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>

        {screen === "dashboard" && (
          <Dashboard
            roadmaps={roadmaps}
            onSelectRoadmap={handleSelectRoadmap}
            onDelete={handleDelete}
            onCreateNew={() => transitionTo("form")}
          />
        )}

        {screen === "form" && (
          <RoadmapFormWrapper
            onSubmitStart={handleFormSubmitStart}
            onRoadmapGenerated={handleRoadmapGenerated}
            onBack={() => transitionTo("dashboard")}
            showBack={roadmaps.length > 0}
          />
        )}

        {screen === "loading" && (
          <LoadingScreen topic={formTopic} />
        )}

        {screen === "result" && activeRoadmap && (
          <View style={{ flex: 1, backgroundColor: "#0D0D1A" }}>
            <GeneratedRoadmap
              roadmap={activeRoadmap}
              onRegenerate={() => transitionTo("form")}
              onBack={handleBack}
              backLabel={roadmaps.length > 1 ? "My Roadmaps" : "Back"}
            />
          </View>
        )}

      </Animated.View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Loading
  loadingContainer:  { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  glowCircle:        { position: "absolute", width: 320, height: 320, borderRadius: 160, alignSelf: "center", top: "25%", overflow: "hidden" },
  loadingIconWrapper: { marginBottom: 28, shadowColor: "#6C63FF", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 24, elevation: 10 },
  loadingIconBg:     { width: 80, height: 80, borderRadius: 24, justifyContent: "center", alignItems: "center" },
  loadingTitle:      { fontSize: 24, fontWeight: "800", color: "#F0F0FF", marginBottom: 6, letterSpacing: -0.4 },
  loadingTopic:      { fontSize: 16, color: "#6C63FF", fontWeight: "700", marginBottom: 28, maxWidth: width - 80, textAlign: "center" },
  loadingStep:       { fontSize: 14, color: "#8888AA", marginBottom: 28, textAlign: "center", minHeight: 20 },
  dotsRow:           { flexDirection: "row", gap: 10, alignItems: "center" },
  dot:               { width: 10, height: 10, borderRadius: 5, backgroundColor: "#6C63FF" },

  // Dashboard
  dashScroll:        { paddingHorizontal: 20, paddingTop: 16 },
  dashHeader:        { marginBottom: 28 },
  dashEyebrow:       { fontSize: 10, fontWeight: "800", letterSpacing: 3, color: "#6C63FF", marginBottom: 6 },
  dashTitle:         { fontSize: 30, fontWeight: "800", color: "#f0f0ff", letterSpacing: -0.5, marginBottom: 6 },
  dashSub:           { fontSize: 13, color: "#55557a" },

  // Cards
  cardsWrap:         { gap: 14 },
  roadmapCard: {
    flexDirection: "row",
    borderRadius: 20,
    backgroundColor: "#0e0e26",
    borderWidth: 1,
    borderColor: "rgba(108,99,255,0.2)",
    overflow: "hidden",
  },
  cardAccentBar:     { width: 4 },
  cardBody:          { flex: 1, padding: 16 },
  cardArrow:         { justifyContent: "center", paddingRight: 14 },

  cardHeaderRow:     { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  cardIconBox:       { width: 44, height: 44, borderRadius: 13, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardTitle:         { fontSize: 15, fontWeight: "800", color: "#f0f0ff", marginBottom: 5 },
  cardMeta:          { flexDirection: "row", alignItems: "center", gap: 10 },
  levelBadge:        { borderWidth: 1, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  levelText:         { fontSize: 10, fontWeight: "700" },
  cardDate:          { fontSize: 11, color: "#3a3a5a" },
  deleteBtn:         { padding: 6 },

  statsRow:          { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  statItem:          { alignItems: "center", flex: 1 },
  statValue:         { fontSize: 11, fontWeight: "700", color: "#c0c0e0", marginTop: 3, marginBottom: 1 },
  statLabel:         { fontSize: 9, color: "#44446a" },

  phaseDotsRow:      { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  phaseDotWrap:      { flexDirection: "row", alignItems: "center", gap: 5 },
  phaseDot:          { width: 8, height: 8, borderRadius: 4 },
  phaseDotLabel:     { fontSize: 10, color: "#44446a", maxWidth: 80 },

  // FAB
  fab:               { position: "absolute", bottom: 28, right: 24, borderRadius: 32, overflow: "hidden", shadowColor: "#6C63FF", shadowOpacity: 0.6, shadowRadius: 16, shadowOffset: { width: 0, height: 4 }, elevation: 12 },
  fabGrad:           { width: 60, height: 60, alignItems: "center", justifyContent: "center" },

  // Back bar
  backBarSafe:       { backgroundColor: "transparent" },
  backBar:           { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 20, paddingVertical: 12, alignSelf: "flex-start", backgroundColor: "rgba(108,99,255,0.1)", marginHorizontal: 16, marginTop: 8, borderRadius: 20, borderWidth: 1, borderColor: "rgba(168,85,247,0.2)" },
  backBarLabel:      { color: "#a855f7", fontSize: 13, fontWeight: "600" },
});
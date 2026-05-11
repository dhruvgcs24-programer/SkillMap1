// ============================================================
// skills.js — Multi-Roadmap AI Skills Tab with Cloud Sync
// ============================================================
// Logic:
// 1. Initial Load: Load from AsyncStorage (Local) for speed.
// 2. Background Sync: Fetch from Supabase (Cloud) to update/sync.
// 3. Generation: Save to Supabase -> then update Local.
// 4. Deletion: Delete from Supabase -> then update Local.
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
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "../../src/services/supabase";
import RoadmapForm from "../../components/ui/RoadmapForm";
import GeneratedRoadmap from "../../components/ui/GeneratedRoadmap";

const { width } = Dimensions.get("window");
const STORAGE_KEY = "skillmap_ai_roadmaps";

// ─── Phase colour dots ─────────────────────────────────────────────────────────
const PHASE_COLORS = ["#6C63FF", "#FF6584", "#43D9AD"];

// ─── Persistence Helpers ───────────────────────────────────────────────────────
async function getLocalRoadmaps() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

async function setLocalRoadmaps(roadmaps) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(roadmaps));
  } catch {}
}

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
        <LinearGradient colors={gradColors} style={styles.cardAccentBar} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} />
        <View style={styles.cardBody}>
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
            <TouchableOpacity onPress={() => onDelete(roadmap.id)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={16} color="#3a3a5a" />
            </TouchableOpacity>
          </View>

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
        </View>
        <View style={styles.cardArrow}>
          <Ionicons name="chevron-forward" size={18} color="#3a3a5a" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ roadmaps, onSelectRoadmap, onDelete, onCreateNew, syncing }) {
  const totalXP = roadmaps.reduce((acc, r) => acc + (r.xpTotal || 0), 0);

  return (
    <LinearGradient colors={["#06060f", "#0d0d1f", "#06060f"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.dashScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.dashHeader}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={styles.dashEyebrow}>AI GENERATOR</Text>
              {syncing && <ActivityIndicator size="small" color="#6C63FF" />}
            </View>
            <Text style={styles.dashTitle}>My Roadmaps</Text>
            <Text style={styles.dashSub}>
              {roadmaps.length} custom learning {roadmaps.length === 1 ? "path" : "paths"} · {totalXP.toLocaleString()} total XP
            </Text>
          </View>

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
          <View style={{ height: 100 }} />
        </ScrollView>

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
      Alert.alert("Error", "Failed to generate roadmap. Please check your API key.");
      onBack();
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
  const [screen, setScreen]         = useState("init");
  const [roadmaps, setRoadmaps]     = useState([]);
  const [activeRoadmap, setActive]  = useState(null);
  const [formTopic, setFormTopic]   = useState("");
  const [syncing, setSyncing]       = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Sync logic: Map database columns (snake_case) to state (camelCase)
  const mapFromDb = (dbItem) => ({
    id: dbItem.id,
    title: dbItem.title,
    topic: dbItem.topic,
    duration: dbItem.duration,
    level: dbItem.level,
    goal: dbItem.goal,
    totalWeeks: dbItem.total_weeks,
    xpTotal: dbItem.xp_total,
    phases: dbItem.phases,
    createdAt: dbItem.created_at,
  });

  const mapToDb = (roadmap, userId) => ({
    user_id: userId,
    title: roadmap.title,
    topic: roadmap.topic,
    duration: roadmap.duration,
    level: roadmap.level,
    goal: roadmap.goal,
    total_weeks: roadmap.totalWeeks,
    xp_total: roadmap.xpTotal,
    phases: roadmap.phases,
  });

  const loadAndSync = async () => {
    // 1. Load local for instant UI
    const local = await getLocalRoadmaps();
    setRoadmaps(local);
    if (local.length > 0) setScreen("dashboard");
    else setScreen("form");

    // 2. Sync from Supabase in background
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setSyncing(true);
      const { data, error } = await supabase
        .from("ai_roadmaps")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const synced = data.map(mapFromDb);
        setRoadmaps(synced);
        setLocalRoadmaps(synced);
        if (synced.length > 0) setScreen("dashboard");
        else setScreen("form");
      }
    } catch (err) {
      console.warn("Sync failed:", err);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadAndSync();
  }, []);

  const transitionTo = useCallback((nextScreen, callback) => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      if (callback) callback();
      setScreen(nextScreen);
      Animated.timing(fadeAnim, { toValue: 1, duration: 260, useNativeDriver: true }).start();
    });
  }, [fadeAnim]);

  const handleRoadmapGenerated = useCallback(async (generated) => {
    setFormTopic(generated.topic);
    transitionTo("loading");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert("Auth Error", "Please sign in to save roadmaps.");
        transitionTo("form");
        return;
      }

      // 1. Save to Supabase
      const { data, error } = await supabase
        .from("ai_roadmaps")
        .insert([mapToDb(generated, user.id)])
        .select()
        .single();

      if (error) throw error;

      const newRoadmap = mapFromDb(data);

      // 2. Update State & Local
      transitionTo("result", () => {
        setRoadmaps((prev) => {
          const updated = [newRoadmap, ...prev];
          setLocalRoadmaps(updated);
          return updated;
        });
        setActive(newRoadmap);
      });
    } catch (err) {
      console.error("Save error:", err);
      Alert.alert("Save Error", "Generated but could not save to cloud.");
      // Fallback: save locally only
      const localOnly = { ...generated, id: `local_${Date.now()}`, createdAt: new Date().toISOString() };
      transitionTo("result", () => {
        setRoadmaps(p => [localOnly, ...p]);
        setActive(localOnly);
      });
    }
  }, [transitionTo]);

  const handleDelete = useCallback((id) => {
    Alert.alert("Delete Roadmap", "Remove this roadmap from your library?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          // Optimistic local delete
          const updated = roadmaps.filter((r) => r.id !== id);
          setRoadmaps(updated);
          setLocalRoadmaps(updated);
          if (updated.length === 0) transitionTo("form");

          // Cloud delete
          if (typeof id === 'string' && id.includes('-')) { // likely UUID
             await supabase.from("ai_roadmaps").delete().eq("id", id);
          }
        },
      },
    ]);
  }, [roadmaps, transitionTo]);

  if (screen === "init") return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0D1A" }}>
      <StatusBar style="light" />
      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        {screen === "dashboard" && (
          <Dashboard
            roadmaps={roadmaps}
            onSelectRoadmap={(r) => transitionTo("result", () => setActive(r))}
            onDelete={handleDelete}
            onCreateNew={() => transitionTo("form")}
            syncing={syncing}
          />
        )}

        {screen === "form" && (
          <RoadmapFormWrapper
            onSubmitStart={setFormTopic}
            onRoadmapGenerated={handleRoadmapGenerated}
            onBack={() => transitionTo("dashboard")}
            showBack={roadmaps.length > 0}
          />
        )}

        {screen === "loading" && <LoadingScreen topic={formTopic} />}

        {screen === "result" && activeRoadmap && (
          <View style={{ flex: 1, backgroundColor: "#0D0D1A" }}>
            <GeneratedRoadmap
              roadmap={activeRoadmap}
              onRegenerate={() => transitionTo("form")}
              onBack={() => transitionTo(roadmaps.length > 0 ? "dashboard" : "form")}
              backLabel={roadmaps.length > 1 ? "My Roadmaps" : "Back"}
            />
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer:  { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 },
  glowCircle:        { position: "absolute", width: 320, height: 320, borderRadius: 160, alignSelf: "center", top: "25%", overflow: "hidden" },
  loadingIconWrapper: { marginBottom: 28, shadowColor: "#6C63FF", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 24, elevation: 10 },
  loadingIconBg:     { width: 80, height: 80, borderRadius: 24, justifyContent: "center", alignItems: "center" },
  loadingTitle:      { fontSize: 24, fontWeight: "800", color: "#F0F0FF", marginBottom: 6, letterSpacing: -0.4 },
  loadingTopic:      { fontSize: 16, color: "#6C63FF", fontWeight: "700", marginBottom: 28, maxWidth: width - 80, textAlign: "center" },
  loadingStep:       { fontSize: 14, color: "#8888AA", marginBottom: 28, textAlign: "center", minHeight: 20 },
  dotsRow:           { flexDirection: "row", gap: 10, alignItems: "center" },
  dot:               { width: 10, height: 10, borderRadius: 5, backgroundColor: "#6C63FF" },

  dashScroll:        { paddingHorizontal: 20, paddingTop: 16 },
  dashHeader:        { marginBottom: 28 },
  dashEyebrow:       { fontSize: 10, fontWeight: "800", letterSpacing: 3, color: "#6C63FF", marginBottom: 6 },
  dashTitle:         { fontSize: 30, fontWeight: "800", color: "#f0f0ff", letterSpacing: -0.5, marginBottom: 6 },
  dashSub:           { fontSize: 13, color: "#8888AA" },

  cardsWrap:         { gap: 14 },
  roadmapCard: { flexDirection: "row", borderRadius: 20, backgroundColor: "#0e0e26", borderWidth: 1, borderColor: "rgba(108,99,255,0.2)", overflow: "hidden" },
  cardAccentBar:     { width: 4 },
  cardBody:          { flex: 1, padding: 16 },
  cardArrow:         { justifyContent: "center", paddingRight: 14 },
  cardHeaderRow:     { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  cardIconBox:       { width: 44, height: 44, borderRadius: 13, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardTitle:         { fontSize: 15, fontWeight: "800", color: "#f0f0ff", marginBottom: 5 },
  cardMeta:          { flexDirection: "row", alignItems: "center", gap: 10 },
  levelBadge:        { borderWidth: 1, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  levelText:         { fontSize: 10, fontWeight: "700" },
  cardDate:          { fontSize: 11, color: "#777799" },
  deleteBtn:         { padding: 6 },
  statsRow:          { flexDirection: "row", justifyContent: "space-between" },
  statItem:          { alignItems: "center", flex: 1 },
  statValue:         { fontSize: 11, fontWeight: "700", color: "#c0c0e0", marginTop: 3, marginBottom: 1 },
  statLabel:         { fontSize: 9, color: "#8888AA" },

  fab:               { position: "absolute", bottom: 28, right: 24, borderRadius: 32, overflow: "hidden", shadowColor: "#6C63FF", shadowOpacity: 0.6, shadowRadius: 16, shadowOffset: { width: 0, height: 4 }, elevation: 12 },
  fabGrad:           { width: 60, height: 60, alignItems: "center", justifyContent: "center" },

  backBarSafe:       { backgroundColor: "transparent" },
  backBar:           { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 20, paddingVertical: 12, alignSelf: "flex-start", backgroundColor: "rgba(108,99,255,0.1)", marginHorizontal: 16, marginTop: 8, borderRadius: 20, borderWidth: 1, borderColor: "rgba(168,85,247,0.2)" },
  backBarLabel:      { color: "#a855f7", fontSize: 13, fontWeight: "600" },
});
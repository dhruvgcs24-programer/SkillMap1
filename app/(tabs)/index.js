import { useEffect, useState, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions, ActivityIndicator, RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../src/services/supabase";
import { ALL_ROADMAPS } from "../../src/data/roadmapData";

const { width } = Dimensions.get("window");

// ─── Theme ────────────────────────────────────────────────────────────────────
const T = {
  bg:        ["#06060f", "#0d0d1f", "#06060f"],
  card:      ["#0f0f28", "#0a0a1e"],
  purple:    "#a855f7",
  purpleDim: "rgba(168,85,247,0.12)",
  purpleBdr: "rgba(168,85,247,0.2)",
  green:     "#00f5a0",
  greenDim:  "rgba(0,245,160,0.08)",
  greenBdr:  "rgba(0,245,160,0.2)",
  cyan:      "#00d9f5",
  gold:      "#f59e0b",
  text:      "#f0f0ff",
  textSub:   "#8888aa",
  textMuted: "#44446a",
  surface:   "rgba(255,255,255,0.03)",
  border:    "rgba(168,85,247,0.1)",
};

const DAILY_TIPS = [
  { icon: "bulb-outline",    color: "#f59e0b", tip: "Consistency beats intensity. Even 20 minutes a day compounds into mastery." },
  { icon: "rocket-outline",  color: "#a855f7", tip: "Build projects alongside theory. Real code is the best teacher." },
  { icon: "flash-outline",   color: "#00d9f5", tip: "Teach what you learn. Explaining concepts cements your understanding." },
  { icon: "git-branch-outline", color: "#00f5a0", tip: "Version control everything from day one. Your future self will thank you." },
  { icon: "trophy-outline",  color: "#f97316", tip: "Break big goals into small modules. Celebrate every checkpoint." },
];

// ─── Quick Stat Pill ──────────────────────────────────────────────────────────
function StatPill({ icon, iconColor, value, label }) {
  return (
    <View style={s.pill}>
      <Ionicons name={icon} size={15} color={iconColor} />
      <Text style={s.pillValue}>{value}</Text>
      <Text style={s.pillLabel}>{label}</Text>
    </View>
  );
}

// ─── Active Roadmap Card ──────────────────────────────────────────────────────
function RoadmapCard({ roadmap, pct, done, total }) {
  const cfg = pct === 100
    ? { colors: ["#061a13", "#071626"], bar: "#00f5a0", label: "Completed", lc: "#00f5a0" }
    : { colors: ["#120820", "#0c0c22"], bar: "#a855f7", label: "In Progress", lc: "#c084fc" };

  return (
    <TouchableOpacity
      style={s.roadmapCard}
      activeOpacity={0.8}
      onPress={() => router.push({ pathname: "/(tabs)/roadmap", params: { openId: roadmap.id } })}
    >
      <LinearGradient colors={cfg.colors} style={s.roadmapCardInner}>
        <LinearGradient colors={roadmap.color} style={s.roadmapIcon}>
          <Ionicons name={roadmap.icon} size={20} color="#fff" />
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={s.roadmapTitle} numberOfLines={1}>{roadmap.title}</Text>
          <View style={s.roadmapBar}>
            <View style={[s.roadmapBarFill, { width: `${pct}%`, backgroundColor: cfg.bar }]} />
          </View>
          <View style={s.roadmapFooter}>
            <Text style={[s.roadmapStatus, { color: cfg.lc }]}>{cfg.label}</Text>
            <Text style={s.roadmapFraction}>{done}/{total} topics</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName]             = useState("Explorer");
  const [stats, setStats]           = useState({ xp: 0, streak: 1, mastery: 0 });
  const [activeRoadmaps, setActiveRoadmaps] = useState([]);
  const [tip, setTip]               = useState(DAILY_TIPS[0]);

  const loadData = async () => {
    try {
      // Auth guard
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/login"); return; }

      // User name
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prof } = await supabase
          .from("profiles").select("first_name").eq("id", user.id).single();
        const fallback = user.email?.split("@")[0] || "Explorer";
        setName(prof?.first_name || fallback);
      }

      // Pick today's tip deterministically
      const day = new Date().getDate();
      setTip(DAILY_TIPS[day % DAILY_TIPS.length]);

      // Progress across roadmaps
      let totalXp = 0, doneAll = 0, totalAll = 0;
      const active = [];

      for (const roadmap of ALL_ROADMAPS) {
        if (!roadmap.modules?.length) continue;
        const raw = await AsyncStorage.getItem(`skillmap_progress_${roadmap.id}`);
        const prog = raw ? JSON.parse(raw) : {};

        let done = 0, total = 0;
        for (const mod of roadmap.modules) {
          const subs = mod.subTopics || [];
          total += subs.length;
          const modDone = subs.filter(st => prog[st.id] === true).length;
          done += modDone;
          if (modDone === subs.length && subs.length > 0) totalXp += mod.xp || 0;
          else totalXp += modDone * 10;
        }
        doneAll += done; totalAll += total;
        if (done > 0) active.push({ roadmap, pct: total > 0 ? Math.round((done/total)*100) : 0, done, total });
      }

      // Streak
      const today = new Date().toDateString();
      const lastLogin = await AsyncStorage.getItem("skillmap_last_login");
      let streak = parseInt(await AsyncStorage.getItem("skillmap_streak") || "1", 10);
      if (lastLogin !== today) {
        const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
        if (lastLogin === yesterday.toDateString()) streak++;
        else if (lastLogin) streak = 1;
        await AsyncStorage.setItem("skillmap_last_login", today);
        await AsyncStorage.setItem("skillmap_streak", String(streak));
      }

      setStats({ xp: totalXp, streak, mastery: totalAll > 0 ? Math.round((doneAll/totalAll)*100) : 0 });
      setActiveRoadmaps(active);
    } catch (e) {
      console.error("Home load error:", e);
    } finally {
      setLoading(false); setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { loadData(); }, []));
  const onRefresh = () => { setRefreshing(true); loadData(); };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <LinearGradient colors={T.bg} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={T.purple} size="large" />
        <Text style={{ color: T.textSub, marginTop: 12 }}>Loading SkillMap...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={T.bg} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={T.purple} />}
        >

          {/* ── GREETING ──────────────────────────────────────── */}
          <View style={s.greetRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.greetSub}>{greeting()},</Text>
              <Text style={s.greetName}>{name} 👋</Text>
            </View>
            <TouchableOpacity
              style={s.avatarBtn}
              onPress={() => router.push("/(tabs)/profile")}
            >
              <LinearGradient colors={["#a855f7", "#7c3aed"]} style={s.avatarGrad}>
                <Text style={s.avatarTxt}>{name.charAt(0).toUpperCase()}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* ── STATS ROW ─────────────────────────────────────── */}
          <LinearGradient colors={T.card} style={s.statsCard}>
            <StatPill icon="star"     iconColor={T.gold}   value={stats.xp.toLocaleString()} label="XP" />
            <View style={s.statDivider} />
            <StatPill icon="flame"    iconColor="#f97316"  value={stats.streak}               label="Streak" />
            <View style={s.statDivider} />
            <StatPill icon="infinite" iconColor={T.purple} value={`${stats.mastery}%`}        label="Mastery" />
          </LinearGradient>

          {/* ── ACTIVE ROADMAPS ───────────────────────────────── */}
          <View style={s.sectionHeader}>
            <Text style={s.eyebrow}>ACTIVE ROADMAPS</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/roadmap")}>
              <Text style={s.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>

          {activeRoadmaps.length === 0 ? (
            <TouchableOpacity
              style={s.startCard}
              onPress={() => router.push("/(tabs)/roadmap")}
              activeOpacity={0.8}
            >
              <LinearGradient colors={T.card} style={s.startCardInner}>
                <Ionicons name="rocket-outline" size={36} color={T.purple} />
                <Text style={s.startTitle}>Start your first roadmap</Text>
                <Text style={s.startSub}>Pick a learning path and begin your journey</Text>
                <LinearGradient colors={["#a855f7", "#7c3aed"]} style={s.startBtn}>
                  <Text style={s.startBtnTxt}>Explore Roadmaps</Text>
                  <Ionicons name="arrow-forward" size={15} color="#fff" />
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            activeRoadmaps.map(({ roadmap, pct, done, total }) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} pct={pct} done={done} total={total} />
            ))
          )}

          {/* ── QUICK ACTIONS ─────────────────────────────────── */}
          <Text style={[s.eyebrow, { marginTop: 8, marginBottom: 12 }]}>QUICK ACTIONS</Text>
          <View style={s.actionsRow}>
            {[
              { icon: "map-outline",       label: "Roadmaps",  color: T.purple, bg: T.purpleDim, route: "/(tabs)/roadmap"  },
              { icon: "bar-chart-outline", label: "Skills",    color: T.cyan,   bg: "rgba(0,217,245,0.1)", route: "/(tabs)/skills"   },
              { icon: "person-outline",    label: "Profile",   color: T.green,  bg: T.greenDim,  route: "/(tabs)/profile"  },
            ].map(a => (
              <TouchableOpacity key={a.label} style={[s.actionCard, { backgroundColor: a.bg, borderColor: a.color + "33" }]} onPress={() => router.push(a.route)} activeOpacity={0.75}>
                <Ionicons name={a.icon} size={24} color={a.color} />
                <Text style={[s.actionLabel, { color: a.color }]}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── DAILY TIP ─────────────────────────────────────── */}
          <Text style={[s.eyebrow, { marginTop: 8, marginBottom: 12 }]}>DAILY TIP</Text>
          <LinearGradient colors={T.card} style={s.tipCard}>
            <View style={[s.tipIcon, { backgroundColor: tip.color + "18" }]}>
              <Ionicons name={tip.icon} size={22} color={tip.color} />
            </View>
            <Text style={s.tipText}>{tip.tip}</Text>
          </LinearGradient>

          {/* ── EXPLORE SECTION ───────────────────────────────── */}
          <Text style={[s.eyebrow, { marginTop: 8, marginBottom: 12 }]}>FEATURED PATHS</Text>
          {ALL_ROADMAPS.filter(r => r.modules?.length > 0).map(r => (
            <TouchableOpacity
              key={r.id}
              style={s.featuredCard}
              onPress={() => router.push({ pathname: "/(tabs)/roadmap", params: { openId: r.id } })}
              activeOpacity={0.8}
            >
              <LinearGradient colors={r.color} style={s.featuredIcon}>
                <Ionicons name={r.icon} size={18} color="#fff" />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={s.featuredTitle}>{r.title}</Text>
                <Text style={s.featuredSub} numberOfLines={1}>{r.subtitle}</Text>
              </View>
              <View style={s.featuredBadge}>
                <Text style={s.featuredBadgeTxt}>{r.modules.length} modules</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  scroll: { padding: 22 },

  // Greeting
  greetRow:   { flexDirection: "row", alignItems: "center", marginBottom: 22, marginTop: 4 },
  greetSub:   { fontSize: 13, color: T.textSub, marginBottom: 2 },
  greetName:  { fontSize: 26, fontWeight: "800", color: T.text, letterSpacing: -0.5 },
  avatarBtn:  { marginLeft: 12 },
  avatarGrad: { width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center" },
  avatarTxt:  { fontSize: 20, fontWeight: "800", color: "#fff" },

  // Stats card
  statsCard:   { flexDirection: "row", borderRadius: 18, padding: 18, marginBottom: 24, borderWidth: 1, borderColor: T.purpleBdr, alignItems: "center" },
  pill:        { flex: 1, alignItems: "center", gap: 3 },
  pillValue:   { fontSize: 20, fontWeight: "800", color: T.text },
  pillLabel:   { fontSize: 11, color: T.textSub, fontWeight: "600" },
  statDivider: { width: 1, height: 36, backgroundColor: "rgba(168,85,247,0.15)" },

  // Section header
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  eyebrow:    { fontSize: 10, fontWeight: "800", letterSpacing: 3, color: T.purple },
  seeAll:     { fontSize: 12, color: T.purple, fontWeight: "600" },

  // Roadmap card
  roadmapCard:      { marginBottom: 10, borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "rgba(168,85,247,0.25)" },
  roadmapCardInner: { flexDirection: "row", alignItems: "center", padding: 14, gap: 14 },
  roadmapIcon:      { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  roadmapTitle:     { fontSize: 14, fontWeight: "700", color: T.text, marginBottom: 8 },
  roadmapBar:       { height: 5, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden", marginBottom: 6 },
  roadmapBarFill:   { height: "100%", borderRadius: 3 },
  roadmapFooter:    { flexDirection: "row", justifyContent: "space-between" },
  roadmapStatus:    { fontSize: 11, fontWeight: "700" },
  roadmapFraction:  { fontSize: 11, color: T.textMuted },

  // Start card (empty state)
  startCard:      { marginBottom: 14, borderRadius: 20, overflow: "hidden", borderWidth: 1, borderColor: T.purpleBdr },
  startCardInner: { padding: 28, alignItems: "center", gap: 8 },
  startTitle:     { fontSize: 18, fontWeight: "800", color: T.text, marginTop: 4 },
  startSub:       { fontSize: 13, color: T.textSub, textAlign: "center" },
  startBtn:       { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, marginTop: 8 },
  startBtnTxt:    { color: "#fff", fontWeight: "700", fontSize: 14 },

  // Quick actions
  actionsRow:  { flexDirection: "row", gap: 10, marginBottom: 22 },
  actionCard:  { flex: 1, alignItems: "center", paddingVertical: 18, borderRadius: 16, borderWidth: 1, gap: 6 },
  actionLabel: { fontSize: 11, fontWeight: "700" },

  // Daily tip
  tipCard: { flexDirection: "row", borderRadius: 18, padding: 18, marginBottom: 22, borderWidth: 1, borderColor: T.purpleBdr, alignItems: "center", gap: 14 },
  tipIcon: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  tipText: { flex: 1, fontSize: 13, color: T.textSub, lineHeight: 20 },

  // Featured paths
  featuredCard:     { flexDirection: "row", alignItems: "center", backgroundColor: T.surface, borderRadius: 16, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: T.border, gap: 14 },
  featuredIcon:     { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  featuredTitle:    { fontSize: 14, fontWeight: "700", color: T.text, marginBottom: 2 },
  featuredSub:      { fontSize: 11, color: T.textSub },
  featuredBadge:    { backgroundColor: T.purpleDim, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  featuredBadgeTxt: { fontSize: 10, color: T.purple, fontWeight: "700" },
});
import React, { useState, useCallback } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, ActivityIndicator, RefreshControl, Alert,
  Modal, TextInput, KeyboardAvoidingView, Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../src/services/supabase";
import { ALL_ROADMAPS } from "../../src/data/roadmapData";
import { router, useFocusEffect } from "expo-router";
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";

const { width } = Dimensions.get("window");

// ─── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg:         ["#06060f", "#0d0d1f", "#06060f"],
  cardDark:   ["#0f0f28", "#0a0a1e"],
  purple:     "#a855f7",
  purpleDim:  "rgba(168,85,247,0.1)",
  purpleBdr:  "rgba(168,85,247,0.2)",
  green:      "#00f5a0",
  greenDim:   "rgba(0,245,160,0.08)",
  cyan:       "#00d9f5",
  gold:       "#f59e0b",
  text:       "#f0f0ff",
  textSub:    "#8888aa",
  textMuted:  "#44446a",
  error:      "#ffb4ab",
  errorDim:   "rgba(255,180,171,0.1)",
  surface:    "rgba(255,255,255,0.03)",
  surfaceBdr: "rgba(168,85,247,0.1)",
};

// ─── MASTERY RING ─────────────────────────────────────────────────────────────
function MasteryRing({ percentage }) {
  const SIZE = 156;
  const STROKE = 12;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const pct = Math.min(Math.max(percentage, 0), 100);
  const dashOffset = CIRC - (CIRC * pct) / 100;
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <SvgGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%"   stopColor="#a855f7" />
            <Stop offset="50%"  stopColor="#00d9f5" />
            <Stop offset="100%" stopColor="#00f5a0" />
          </SvgGradient>
        </Defs>
        <Circle cx={SIZE/2} cy={SIZE/2} r={R} stroke="rgba(168,85,247,0.12)" strokeWidth={STROKE} fill="none" />
        <Circle cx={SIZE/2} cy={SIZE/2} r={R} stroke="url(#ringGrad)" strokeWidth={STROKE} fill="none"
          strokeDasharray={CIRC} strokeDashoffset={dashOffset}
          strokeLinecap="round" rotation="-90" origin={`${SIZE/2}, ${SIZE/2}`} />
      </Svg>
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "800", color: T.text, letterSpacing: -1 }}>{Math.round(pct)}%</Text>
        <Text style={{ fontSize: 10, color: T.textSub, fontWeight: "600", letterSpacing: 1, marginTop: 2 }}>MASTERY</Text>
      </View>
    </View>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ icon, iconColor, iconBg, value, label, gradColors }) {
  return (
    <LinearGradient colors={gradColors} style={s.statCard}>
      <View style={[s.statIconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </LinearGradient>
  );
}

// ─── MAIN PROFILE ─────────────────────────────────────────────────────────────
export default function Profile() {
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile]       = useState({ name: "Explorer", email: "", avatar: "E", firstName: "", lastName: "" });
  const [stats, setStats]           = useState({ xp: 0, streak: 1, trophies: 0, mastery: 0 });
  const [milestones, setMilestones] = useState([]);

  // Vault modal state
  const [editVisible, setEditVisible] = useState(false);
  const [editFirst, setEditFirst]     = useState("");
  const [editLast, setEditLast]       = useState("");
  const [saving, setSaving]           = useState(false);

  // ── Save profile to Supabase ──────────────────────────────────────────────
  const saveProfile = async () => {
    if (!editFirst.trim()) { Alert.alert("Validation", "First name cannot be empty."); return; }
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase
        .from("profiles")
        .update({ first_name: editFirst.trim(), last_name: editLast.trim() })
        .eq("id", user.id);
      if (error) throw error;
      const newName = `${editFirst.trim()} ${editLast.trim()}`.trim();
      setProfile(p => ({ ...p, name: newName, avatar: newName.charAt(0).toUpperCase(), firstName: editFirst.trim(), lastName: editLast.trim() }));
      setEditVisible(false);
      Alert.alert("✅ Identity Updated", "Your profile has been saved.");
    } catch (e) {
      Alert.alert("Error", e.message || "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  // ── Load all data ─────────────────────────────────────────────────────────
  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fallback = user.email ? user.email.split("@")[0] : "Explorer";
        const { data: prof } = await supabase
          .from("profiles").select("first_name, last_name").eq("id", user.id).single();
        const name = prof?.first_name
          ? `${prof.first_name} ${prof.last_name || ""}`.trim()
          : fallback;
        setProfile({ name, email: user.email || "", avatar: name.charAt(0).toUpperCase(), firstName: prof?.first_name || "", lastName: prof?.last_name || "" });
        setEditFirst(prof?.first_name || "");
        setEditLast(prof?.last_name || "");
      }

      // Progress — RoadmapScreen stores { [subtopicId]: true } under user-scoped keys
      const { data: { session: progressSession } } = await supabase.auth.getSession();
      const progressUserId = progressSession?.user?.id ?? null;

      let totalXp = 0, doneSubs = 0, totalSubs = 0, completedMods = 0;
      let earnedMilestones = [];

      if (progressUserId) {
        for (const roadmap of ALL_ROADMAPS) {
          if (!roadmap.modules?.length) continue;
          const raw = await AsyncStorage.getItem(`roadmap_progress_${progressUserId}_${roadmap.id}`);
          const prog = raw ? JSON.parse(raw) : {};

          for (const mod of roadmap.modules) {
            const subs = mod.subTopics || [];
            if (!subs.length) continue;
            totalSubs += subs.length;
            const done = subs.filter(st => prog[st.id] === true).length;
            doneSubs += done;
            if (done === subs.length) {
              totalXp += mod.xp || 0;
              completedMods++;
              earnedMilestones.push({ id: mod.id, title: mod.title, icon: mod.icon || "star", color: roadmap.color || ["#a855f7", "#7c3aed"] });
            } else {
              totalXp += done * 10;
            }
          }
        }
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

      setStats({ xp: totalXp, streak, trophies: completedMods, mastery: totalSubs > 0 ? Math.round((doneSubs / totalSubs) * 100) : 0 });
      setMilestones(earnedMilestones.reverse().slice(0, 4));
    } catch (e) {
      console.error("Profile load error:", e);
    } finally {
      setLoading(false); setRefreshing(false);
    }
  };

  useFocusEffect(useCallback(() => { loadData(); }, []));
  const onRefresh = () => { setRefreshing(true); loadData(); };

  const handleLogout = () => {
    Alert.alert("Terminate Session", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: async () => { await supabase.auth.signOut(); router.replace("/login"); } },
    ]);
  };

  if (loading) {
    return (
      <LinearGradient colors={T.bg} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={T.purple} size="large" />
        <Text style={{ color: T.textSub, marginTop: 12, fontSize: 14 }}>Loading profile...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={T.bg} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView
          contentContainerStyle={s.scroll}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={T.purple} />}
          showsVerticalScrollIndicator={false}
        >
          {/* ── HEADER ─────────────────────────────────────────────── */}
          <View style={s.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.eyebrow}>YOUR PROFILE</Text>
              <Text style={s.nameText}>{profile.name}</Text>
              <Text style={s.emailText}>{profile.email}</Text>
            </View>
            <LinearGradient colors={["#a855f7", "#7c3aed"]} style={s.avatar}>
              <Text style={s.avatarText}>{profile.avatar}</Text>
            </LinearGradient>
          </View>

          {/* ── MASTERY RING ───────────────────────────────────────── */}
          <LinearGradient colors={T.cardDark} style={s.ringCard}>
            <View style={s.ringCardInner}>
              <MasteryRing percentage={stats.mastery} />
              <View style={s.ringLegend}>
                <Text style={s.ringLegendTitle}>Global Mastery</Text>
                <Text style={s.ringLegendSub}>
                  You have conquered {stats.mastery}% of all available knowledge across every roadmap.
                </Text>
                <View style={s.legendRow}>
                  {[{ color: "#a855f7", label: "In Progress" }, { color: "#00f5a0", label: "Completed" }].map(l => (
                    <View key={l.label} style={s.legendItem}>
                      <View style={[s.legendDot, { backgroundColor: l.color }]} />
                      <Text style={s.legendLabel}>{l.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* ── BENTO STATS ────────────────────────────────────────── */}
          <View style={s.bentoRow}>
            <StatCard icon="star"   iconColor={T.gold}    iconBg="rgba(245,158,11,0.12)"  value={stats.xp.toLocaleString()} label="Total XP"    gradColors={T.cardDark} />
            <StatCard icon="flame"  iconColor="#f97316"   iconBg="rgba(249,115,22,0.12)"  value={stats.streak}               label="Day Streak"  gradColors={T.cardDark} />
            <StatCard icon="trophy" iconColor={T.green}   iconBg={T.greenDim}             value={stats.trophies}             label="Modules"     gradColors={["#061a13","#071626"]} />
          </View>

          {/* ── MILESTONES ─────────────────────────────────────────── */}
          <View style={s.sectionCard}>
            <Text style={[s.eyebrow, { marginBottom: 16 }]}>RECENT MILESTONES</Text>
            {milestones.length === 0 ? (
              <View style={s.emptyWrap}>
                <Ionicons name="medal-outline" size={40} color={T.textMuted} />
                <Text style={s.emptyText}>Complete a full module to earn milestones</Text>
              </View>
            ) : (
              <View style={s.milestoneGrid}>
                {milestones.map((ms, i) => (
                  <View key={`ms-${i}`} style={s.msItem}>
                    <LinearGradient colors={ms.color} style={s.msIconBg}>
                      <Ionicons name={ms.icon} size={22} color="#fff" />
                    </LinearGradient>
                    <Text style={s.msTitle} numberOfLines={2}>{ms.title}</Text>
                  </View>
                ))}
                {Array.from({ length: Math.max(0, 4 - milestones.length) }).map((_, i) => (
                  <View key={`empty-${i}`} style={s.msItem}>
                    <View style={s.msIconBgEmpty}>
                      <Ionicons name="lock-closed" size={20} color={T.textMuted} />
                    </View>
                    <Text style={s.msTitleEmpty}>Locked</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* ── THE VAULT ──────────────────────────────────────────── */}
          <Text style={[s.eyebrow, { marginLeft: 4, marginBottom: 12, marginTop: 6 }]}>THE VAULT</Text>
          <LinearGradient colors={T.cardDark} style={s.vaultCard}>
            {/* Edit Identity */}
            <TouchableOpacity style={s.vaultRow} activeOpacity={0.7}
              onPress={() => { setEditFirst(profile.firstName); setEditLast(profile.lastName); setEditVisible(true); }}>
              <View style={[s.vaultIcon, { backgroundColor: T.purpleDim }]}>
                <Ionicons name="person-circle-outline" size={18} color={T.purple} />
              </View>
              <Text style={s.vaultLabel}>Edit Identity</Text>
              <Ionicons name="chevron-forward" size={15} color={T.textMuted} />
            </TouchableOpacity>
            <View style={s.divider} />

            {/* Signal Preferences */}
            <TouchableOpacity style={s.vaultRow} activeOpacity={0.7}
              onPress={() => Alert.alert("Signal Preferences", "Notification settings coming soon.")}>
              <View style={[s.vaultIcon, { backgroundColor: "rgba(0,217,245,0.08)" }]}>
                <Ionicons name="notifications-outline" size={18} color={T.cyan} />
              </View>
              <Text style={s.vaultLabel}>Signal Preferences</Text>
              <Ionicons name="chevron-forward" size={15} color={T.textMuted} />
            </TouchableOpacity>
            <View style={s.divider} />

            {/* Privacy & Security */}
            <TouchableOpacity style={s.vaultRow} activeOpacity={0.7}
              onPress={() => Alert.alert("Privacy & Security", "Privacy controls coming soon.")}>
              <View style={[s.vaultIcon, { backgroundColor: T.surface }]}>
                <Ionicons name="lock-closed-outline" size={18} color={T.textSub} />
              </View>
              <Text style={s.vaultLabel}>Privacy & Security</Text>
              <Ionicons name="chevron-forward" size={15} color={T.textMuted} />
            </TouchableOpacity>
            <View style={s.divider} />

            {/* Terminate Session */}
            <TouchableOpacity style={s.vaultRow} activeOpacity={0.7} onPress={handleLogout}>
              <View style={[s.vaultIcon, { backgroundColor: T.errorDim }]}>
                <Ionicons name="log-out-outline" size={18} color={T.error} />
              </View>
              <Text style={[s.vaultLabel, { color: T.error }]}>Terminate Session</Text>
              <Ionicons name="chevron-forward" size={15} color={T.error} />
            </TouchableOpacity>
          </LinearGradient>

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* ── EDIT IDENTITY MODAL ──────────────────────────────────── */}
        <Modal visible={editVisible} transparent animationType="slide" onRequestClose={() => setEditVisible(false)}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <TouchableOpacity style={s.modalBackdrop} activeOpacity={1} onPress={() => setEditVisible(false)} />
            <View style={s.modalSheet}>
              <LinearGradient colors={["#0f0f28", "#0a0a1e"]} style={s.modalInner}>
                <View style={s.modalHandle} />
                <View style={s.modalHeaderRow}>
                  <LinearGradient colors={["#a855f7", "#7c3aed"]} style={s.modalIconRing}>
                    <Ionicons name="person-circle-outline" size={22} color="#fff" />
                  </LinearGradient>
                  <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={s.modalTitle}>Edit Identity</Text>
                    <Text style={s.modalSubtitle}>Update your display name</Text>
                  </View>
                  <TouchableOpacity onPress={() => setEditVisible(false)} style={s.modalCloseBtn}>
                    <Ionicons name="close" size={18} color={T.textSub} />
                  </TouchableOpacity>
                </View>

                <Text style={s.inputLabel}>FIRST NAME</Text>
                <TextInput style={s.input} value={editFirst} onChangeText={setEditFirst}
                  placeholder="Enter first name" placeholderTextColor={T.textMuted} autoCapitalize="words" />

                <Text style={s.inputLabel}>LAST NAME</Text>
                <TextInput style={s.input} value={editLast} onChangeText={setEditLast}
                  placeholder="Enter last name" placeholderTextColor={T.textMuted} autoCapitalize="words" />

                <TouchableOpacity onPress={saveProfile} disabled={saving} activeOpacity={0.8}>
                  <LinearGradient colors={saving ? ["#44446a", "#44446a"] : ["#a855f7", "#7c3aed"]} style={s.saveBtn}>
                    {saving
                      ? <ActivityIndicator color="#fff" size="small" />
                      : <><Ionicons name="checkmark-circle-outline" size={18} color="#fff" /><Text style={s.saveBtnTxt}>Save Identity</Text></>
                    }
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  scroll: { padding: 22 },

  // Header
  headerRow:  { flexDirection: "row", alignItems: "center", marginBottom: 24, marginTop: 4 },
  eyebrow:    { fontSize: 10, fontWeight: "800", letterSpacing: 3, color: T.purple, marginBottom: 6 },
  nameText:   { fontSize: 26, fontWeight: "800", color: T.text, letterSpacing: -0.5, marginBottom: 2 },
  emailText:  { fontSize: 13, color: T.textSub },
  avatar:     { width: 62, height: 62, borderRadius: 31, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(168,85,247,0.4)" },
  avatarText: { fontSize: 26, fontWeight: "800", color: "#fff" },

  // Ring card
  ringCard:        { borderRadius: 20, padding: 20, marginBottom: 18, borderWidth: 1, borderColor: T.purpleBdr },
  ringCardInner:   { flexDirection: "row", alignItems: "center", gap: 20 },
  ringLegend:      { flex: 1 },
  ringLegendTitle: { fontSize: 15, fontWeight: "800", color: T.text, marginBottom: 8, letterSpacing: -0.3 },
  ringLegendSub:   { fontSize: 12, color: T.textSub, lineHeight: 18, marginBottom: 14 },
  legendRow:       { flexDirection: "row", gap: 12, flexWrap: "wrap" },
  legendItem:      { flexDirection: "row", alignItems: "center", gap: 5 },
  legendDot:       { width: 8, height: 8, borderRadius: 4 },
  legendLabel:     { fontSize: 11, color: T.textMuted },

  // Bento
  bentoRow:    { flexDirection: "row", marginBottom: 18 },
  statCard:    { flex: 1, borderRadius: 18, padding: 16, alignItems: "center", borderWidth: 1, borderColor: T.surfaceBdr, marginHorizontal: 4 },
  statIconWrap:{ width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  statValue:   { fontSize: 22, fontWeight: "800", color: T.text, marginBottom: 3, letterSpacing: -0.5 },
  statLabel:   { fontSize: 11, color: T.textSub, fontWeight: "600" },

  // Milestones
  sectionCard:   { backgroundColor: T.surface, borderRadius: 20, padding: 18, marginBottom: 18, borderWidth: 1, borderColor: T.surfaceBdr },
  emptyWrap:     { alignItems: "center", paddingVertical: 24, gap: 10 },
  emptyText:     { color: T.textMuted, fontSize: 13, textAlign: "center" },
  milestoneGrid: { flexDirection: "row", justifyContent: "space-between" },
  msItem:        { alignItems: "center", width: "23%" },
  msIconBg:      { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  msIconBgEmpty: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", marginBottom: 8, backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(60,60,100,0.3)" },
  msTitle:       { fontSize: 10, color: T.textSub, textAlign: "center", lineHeight: 14 },
  msTitleEmpty:  { fontSize: 10, color: T.textMuted, textAlign: "center" },

  // Vault
  vaultCard:  { borderRadius: 20, padding: 18, marginBottom: 18, borderWidth: 1, borderColor: T.purpleBdr },
  vaultRow:   { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  vaultIcon:  { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 14 },
  vaultLabel: { flex: 1, fontSize: 14, fontWeight: "600", color: T.text },
  divider:    { height: 1, backgroundColor: "rgba(168,85,247,0.08)", marginVertical: 2 },

  // Modal
  modalBackdrop:  { flex: 1, backgroundColor: "rgba(0,0,0,0.6)" },
  modalSheet:     { borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: "hidden", borderWidth: 1, borderColor: "rgba(168,85,247,0.25)", borderBottomWidth: 0 },
  modalInner:     { padding: 24, paddingBottom: 44 },
  modalHandle:    { width: 40, height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, alignSelf: "center", marginBottom: 24 },
  modalHeaderRow: { flexDirection: "row", alignItems: "center", marginBottom: 28 },
  modalIconRing:  { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  modalTitle:     { fontSize: 18, fontWeight: "800", color: T.text, letterSpacing: -0.3 },
  modalSubtitle:  { fontSize: 12, color: T.textSub, marginTop: 2 },
  modalCloseBtn:  { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },
  inputLabel:     { fontSize: 10, fontWeight: "800", color: T.textSub, letterSpacing: 1.5, marginBottom: 8, marginLeft: 2 },
  input:          { backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(168,85,247,0.2)", borderRadius: 14, padding: 14, fontSize: 15, color: T.text, marginBottom: 18 },
  saveBtn:        { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, padding: 16, borderRadius: 16, marginTop: 4 },
  saveBtnTxt:     { color: "#fff", fontWeight: "700", fontSize: 15 },
});
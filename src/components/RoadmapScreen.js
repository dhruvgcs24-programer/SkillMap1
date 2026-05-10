import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, Pressable, Dimensions, Linking, ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.54;
const SPINE_X = width / 2;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const STATUS_CFG = {
  completed: { ring: ["#00f5a0", "#00d9f5"], icon: "checkmark", iconColor: "#00f5a0", label: "Completed", labelColor: "#00f5a0", cardGrad: ["#061a13", "#071626"], border: "rgba(0,245,160,0.35)" },
  active:    { ring: ["#a855f7", "#7c3aed"], icon: "flash",      iconColor: "#c084fc", label: "In Progress", labelColor: "#c084fc", cardGrad: ["#120820", "#0c0c22"], border: "rgba(168,85,247,0.8)" },
  locked:    { ring: ["#222238", "#181830"], icon: "lock-closed", iconColor: "#3a3a5a", label: "Locked",      labelColor: "#3a3a5a", cardGrad: ["#0d0d1e", "#0a0a18"], border: "rgba(60,60,100,0.25)" },
};

const RESOURCE_CFG = {
  Course:   { icon: "school-outline",        color: "#a855f7", bg: "rgba(168,85,247,0.12)",  border: "rgba(168,85,247,0.2)" },
  Video:    { icon: "play-circle-outline",   color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.2)"  },
  Official: { icon: "document-text-outline", color: "#00d9f5", bg: "rgba(0,217,245,0.10)",   border: "rgba(0,217,245,0.2)"  },
};

// ─── STORAGE HELPERS ──────────────────────────────────────────────────────────
const storageKey = (roadmapId) => `skillmap_progress_${roadmapId}`;

async function loadProgress(roadmapId) {
  try {
    const raw = await AsyncStorage.getItem(storageKey(roadmapId));
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

async function saveProgress(roadmapId, progress) {
  try {
    await AsyncStorage.setItem(storageKey(roadmapId), JSON.stringify(progress));
  } catch {}
}

// ─── RESOURCE CHIP ────────────────────────────────────────────────────────────
function ResourceChip({ resource }) {
  const rc = RESOURCE_CFG[resource.type] || RESOURCE_CFG.Official;
  return (
    <TouchableOpacity
      style={[styles.resourceChip, { backgroundColor: rc.bg, borderColor: rc.border }]}
      onPress={() => Linking.openURL(resource.url)}
      activeOpacity={0.7}
    >
      <Ionicons name={rc.icon} size={15} color={rc.color} />
      <View style={styles.resourceTextWrap}>
        <Text style={[styles.resourceType, { color: rc.color }]}>{resource.type}</Text>
        <Text style={styles.resourceLabel} numberOfLines={1}>{resource.label}</Text>
      </View>
      <Ionicons name="open-outline" size={13} color="#44446a" />
    </TouchableOpacity>
  );
}

// ─── SUBTOPIC ROW (with checkbox) ─────────────────────────────────────────────
function SubTopicRow({ topic, checked, onToggle }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.subtopicCard, checked && styles.subtopicCardDone]}>
      {/* Header row */}
      <View style={styles.subtopicHeaderRow}>
        {/* Checkbox */}
        <TouchableOpacity
          onPress={onToggle}
          style={[styles.checkbox, checked && styles.checkboxChecked]}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {checked && <Ionicons name="checkmark" size={12} color="#fff" />}
        </TouchableOpacity>

        {/* Number badge */}
        <View style={[styles.topicNumBadge, checked && styles.topicNumBadgeDone]}>
          <Text style={[styles.topicNum, checked && styles.topicNumDone]}>{topic.number}</Text>
        </View>

        {/* Title */}
        <TouchableOpacity style={styles.subtopicTitleWrap} onPress={() => setExpanded(!expanded)} activeOpacity={0.7}>
          <Text style={[styles.subtopicTitle, checked && styles.subtopicTitleDone]} numberOfLines={expanded ? 0 : 2}>
            {topic.title}
          </Text>
        </TouchableOpacity>

        {/* Expand toggle */}
        <TouchableOpacity onPress={() => setExpanded(!expanded)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={15} color="#44446a" />
        </TouchableOpacity>
      </View>

      {/* Expanded body */}
      {expanded && (
        <View style={styles.subtopicBody}>
          <Text style={styles.subtopicDesc}>{topic.description}</Text>

          <View style={styles.resourcesHeader}>
            <Ionicons name="link-outline" size={13} color="#555577" />
            <Text style={styles.resourcesLabel}>LEARNING RESOURCES</Text>
          </View>

          {topic.resources.map((res, i) => (
            <ResourceChip key={i} resource={res} />
          ))}
        </View>
      )}
    </View>
  );
}

// ─── MODULE NODE (spine card) ─────────────────────────────────────────────────
function ModuleNode({ module, index, completedCount, onPress }) {
  const cfg = STATUS_CFG[module.status];
  const total = module.subTopics.length;
  const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const side = index === 0 ? "center" : index % 2 === 1 ? "left" : "right";
  const isCenter = side === "center";
  const isLeft = side === "left";

  return (
    <View style={[
      styles.nodeRow,
      isCenter && styles.nodeRowCenter,
      isLeft   && styles.nodeRowLeft,
      !isLeft && !isCenter && styles.nodeRowRight,
    ]}>
      {!isCenter && (
        <View style={[
          styles.connector,
          isLeft ? styles.connectorLeft : styles.connectorRight,
          module.status === "locked" && styles.connectorLocked,
        ]} />
      )}

      <TouchableOpacity
        onPress={() => module.status !== "locked" && onPress(module)}
        activeOpacity={module.status === "locked" ? 1 : 0.75}
        style={[styles.nodeCard, { borderColor: cfg.border }, module.status === "locked" && styles.nodeCardLocked]}
      >
        {module.status === "active" && <View style={styles.activePulse} />}

        <LinearGradient colors={cfg.cardGrad} style={styles.nodeGrad}>
          {/* Icon ring */}
          <LinearGradient colors={cfg.ring} style={styles.nodeIcon}>
            <Ionicons name={cfg.icon} size={15} color={cfg.iconColor} />
          </LinearGradient>

          <View style={styles.nodeInfo}>
            <Text style={styles.nodeTitle} numberOfLines={1}>{module.title}</Text>
            <Text style={styles.nodeSubtitle} numberOfLines={2}>{module.subtitle}</Text>

            {/* Mini progress bar */}
            {module.status !== "locked" && total > 0 && (
              <View style={styles.miniProgressTrack}>
                <View style={[styles.miniProgressFill, { width: `${pct}%`, backgroundColor: module.status === "completed" ? "#00f5a0" : "#a855f7" }]} />
              </View>
            )}

            <View style={styles.nodeFooter}>
              <View style={styles.xpBadge}>
                <Ionicons name="star" size={10} color="#f59e0b" />
                <Text style={styles.xpText}>{module.xp} XP</Text>
              </View>
              {module.status !== "locked" && total > 0 && (
                <Text style={[styles.progressFraction, { color: cfg.labelColor }]}>
                  {completedCount}/{total}
                </Text>
              )}
              {module.status === "locked" && (
                <Text style={[styles.statusLabel, { color: cfg.labelColor }]}>{cfg.label}</Text>
              )}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

// ─── MODULE DETAIL MODAL ──────────────────────────────────────────────────────
function ModuleModal({ module, progress, onToggle, onClose, roadmapColor }) {
  if (!module) return null;
  const cfg = STATUS_CFG[module.status];
  const total = module.subTopics.length;
  const doneCount = module.subTopics.filter(t => progress[t.id]).length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <Modal transparent animationType="slide" visible={!!module}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalSheet}>
          <LinearGradient colors={["#0e0e26", "#08081a"]} style={styles.modalGrad}>
            {/* Handle */}
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.modalHeader}>
              <LinearGradient colors={cfg.ring} style={styles.modalIconRing}>
                <Ionicons name={module.icon} size={26} color="#fff" />
              </LinearGradient>
              <View style={styles.modalHeaderText}>
                <Text style={styles.modalTitle}>{module.title}</Text>
                <Text style={styles.modalSubtitle}>{module.subtitle}</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={18} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Progress bar */}
            <View style={styles.modalProgressCard}>
              <View style={styles.modalProgressRow}>
                <Text style={styles.modalProgressLabel}>Module progress</Text>
                <Text style={[styles.modalProgressPct, { color: pct === 100 ? "#00f5a0" : "#a855f7" }]}>{pct}%</Text>
              </View>
              <View style={styles.modalProgressTrack}>
                <LinearGradient
                  colors={pct === 100 ? ["#00f5a0", "#00d9f5"] : roadmapColor}
                  style={[styles.modalProgressFill, { width: `${Math.max(pct, 2)}%` }]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                />
              </View>
              <Text style={styles.modalProgressSub}>{doneCount} of {total} topics completed · {module.xp} XP</Text>
            </View>

            {/* Overview */}
            <Text style={styles.overviewText}>{module.overview}</Text>

            {/* Subtopics label */}
            <View style={styles.subtopicsHeaderRow}>
              <Text style={styles.sectionLabel}>{total} TOPICS</Text>
              <Text style={styles.checkAllHint}>tap checkbox to mark complete</Text>
            </View>

            {/* Subtopics */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.subtopicsScroll} contentContainerStyle={{ paddingBottom: 50 }}>
              {module.subTopics.map((topic) => (
                <SubTopicRow
                  key={topic.id}
                  topic={topic}
                  checked={!!progress[topic.id]}
                  onToggle={() => onToggle(topic.id)}
                />
              ))}
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────────────────────────
export default function RoadmapScreen({ roadmap, onBack }) {
  const [selectedModule, setSelectedModule] = useState(null);
  const [progress, setProgress] = useState({});  // { topicId: true/false }
  const [loading, setLoading] = useState(true);

  // Load saved progress on mount
  useEffect(() => {
    loadProgress(roadmap.id).then((p) => { setProgress(p); setLoading(false); });
  }, [roadmap.id]);

  // Toggle a subtopic checkbox
  const handleToggle = useCallback(async (topicId) => {
    setProgress((prev) => {
      const next = { ...prev, [topicId]: !prev[topicId] };
      saveProgress(roadmap.id, next);
      return next;
    });
  }, [roadmap.id]);

  // Count completed subtopics per module
  const moduleCompletedCount = (module) =>
    module.subTopics.filter((t) => progress[t.id]).length;

  // Overall stats
  const totalTopics = roadmap.modules.reduce((acc, m) => acc + m.subTopics.length, 0);
  const doneTopics  = roadmap.modules.reduce((acc, m) => acc + moduleCompletedCount(m), 0);
  const overallPct  = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  if (loading) {
    return (
      <LinearGradient colors={["#06060f", "#0d0d1f"]} style={styles.loadingBg}>
        <ActivityIndicator color="#a855f7" size="large" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#06060f", "#0d0d1f", "#06060f"]} style={styles.bg}>
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          {/* ── Header ── */}
          <View style={styles.header}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                <Ionicons name="arrow-back" size={20} color="#a855f7" />
                <Text style={styles.backLabel}>Roadmaps</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.eyebrow}>LEARNING PATH</Text>
            <Text style={styles.headerTitle}>{roadmap.title}</Text>
            <Text style={styles.headerSub}>{roadmap.subtitle}</Text>

            {/* Progress card */}
            <LinearGradient colors={["#0e0e26", "#0a0a1e"]} style={styles.progressCard}>
              <View style={styles.progressRow}>
                <View>
                  <Text style={styles.progressLabel}>Overall Progress</Text>
                  <Text style={styles.progressSub}>{doneTopics} of {totalTopics} topics · {roadmap.modules.length} modules</Text>
                </View>
                <Text style={[styles.progressPct, { color: overallPct === 100 ? "#00f5a0" : "#a855f7" }]}>
                  {overallPct}%
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <LinearGradient
                  colors={overallPct === 100 ? ["#00f5a0", "#00d9f5"] : roadmap.color}
                  style={[styles.progressFill, { width: `${Math.max(overallPct, 1)}%` }]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                />
              </View>
            </LinearGradient>
          </View>

          {/* ── Spine ── */}
          <View style={styles.spineWrap}>
            <LinearGradient
              colors={[...roadmap.color, "rgba(0,0,0,0)"]}
              style={styles.spine}
              start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
            />

            {roadmap.modules.map((module, index) => (
              <ModuleNode
                key={module.id}
                module={module}
                index={index}
                completedCount={moduleCompletedCount(module)}
                onPress={setSelectedModule}
              />
            ))}
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </SafeAreaView>

      <ModuleModal
        module={selectedModule}
        progress={progress}
        onToggle={handleToggle}
        onClose={() => setSelectedModule(null)}
        roadmapColor={roadmap.color}
      />
    </LinearGradient>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1 },
  scroll: { paddingBottom: 20 },
  loadingBg: { flex: 1, alignItems: "center", justifyContent: "center" },

  // Header
  header: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 24 },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16, alignSelf: "flex-start" },
  backLabel: { color: "#a855f7", fontSize: 14, fontWeight: "600" },
  eyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 3, color: "#a855f7", marginBottom: 4 },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#f0f0ff", marginBottom: 4, letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: "#55557a", marginBottom: 20 },

  // Progress card
  progressCard: { borderRadius: 18, padding: 18, borderWidth: 1, borderColor: "rgba(168,85,247,0.2)" },
  progressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  progressLabel: { color: "#c0c0e0", fontSize: 14, fontWeight: "600", marginBottom: 2 },
  progressSub: { color: "#44446a", fontSize: 11 },
  progressPct: { fontSize: 26, fontWeight: "800" },
  progressTrack: { height: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 4 },

  // Spine
  spineWrap: { position: "relative", marginTop: 8 },
  spine: { position: "absolute", left: SPINE_X - 1, top: 0, bottom: 0, width: 2, opacity: 0.4 },

  // Node rows
  nodeRow: { marginVertical: 10, flexDirection: "row", alignItems: "center" },
  nodeRowCenter: { justifyContent: "center", paddingHorizontal: 22 },
  nodeRowLeft:   { justifyContent: "flex-start", paddingLeft: 14, paddingRight: SPINE_X + 10 },
  nodeRowRight:  { justifyContent: "flex-end",   paddingRight: 14, paddingLeft: SPINE_X + 10 },

  // Connector
  connector:        { position: "absolute", top: "50%", height: 2, width: 22, backgroundColor: "rgba(168,85,247,0.4)" },
  connectorLeft:    { right: SPINE_X - 14 - CARD_WIDTH / 2, left: SPINE_X },
  connectorRight:   { left: SPINE_X, width: 22 },
  connectorLocked:  { backgroundColor: "rgba(60,60,100,0.2)" },

  // Node card
  nodeCard: { width: CARD_WIDTH, borderRadius: 18, overflow: "hidden", borderWidth: 1.5 },
  nodeCardLocked: { opacity: 0.55 },
  activePulse: { position: "absolute", inset: 0, borderRadius: 18, borderWidth: 2, borderColor: "rgba(168,85,247,0.6)", zIndex: 1 },
  nodeGrad: { padding: 13, flexDirection: "row", alignItems: "center", gap: 10 },
  nodeIcon: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  nodeInfo: { flex: 1 },
  nodeTitle: { fontSize: 13, fontWeight: "700", color: "#f0f0ff", marginBottom: 2 },
  nodeSubtitle: { fontSize: 10, color: "#55557a", marginBottom: 6, lineHeight: 13 },
  miniProgressTrack: { height: 3, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden", marginBottom: 6 },
  miniProgressFill: { height: "100%", borderRadius: 2 },
  nodeFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  xpBadge: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(245,158,11,0.12)", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  xpText: { fontSize: 10, color: "#f59e0b", fontWeight: "600" },
  progressFraction: { fontSize: 10, fontWeight: "700" },
  statusLabel: { fontSize: 9, fontWeight: "700" },

  // Modal
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  modalSheet: { height: "90%", borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: "hidden", borderWidth: 1, borderColor: "rgba(168,85,247,0.2)", borderBottomWidth: 0 },
  modalGrad: { flex: 1, padding: 20 },
  handle: { width: 40, height: 4, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 2, alignSelf: "center", marginBottom: 20 },
  modalHeader: { flexDirection: "row", alignItems: "center", marginBottom: 18, gap: 14 },
  modalIconRing: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  modalHeaderText: { flex: 1 },
  modalTitle: { fontSize: 20, fontWeight: "800", color: "#f0f0ff", letterSpacing: -0.5 },
  modalSubtitle: { fontSize: 12, color: "#55557a", marginTop: 2 },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },

  // Modal progress
  modalProgressCard: { backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: "rgba(168,85,247,0.12)" },
  modalProgressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  modalProgressLabel: { color: "#8888aa", fontSize: 12 },
  modalProgressPct: { fontSize: 18, fontWeight: "800" },
  modalProgressTrack: { height: 6, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden", marginBottom: 8 },
  modalProgressFill: { height: "100%", borderRadius: 3 },
  modalProgressSub: { color: "#44446a", fontSize: 11 },

  overviewText: { color: "#7777aa", fontSize: 13, lineHeight: 20, marginBottom: 18 },

  subtopicsHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionLabel: { fontSize: 11, fontWeight: "800", letterSpacing: 2, color: "#444466" },
  checkAllHint: { fontSize: 10, color: "#333355", fontStyle: "italic" },
  subtopicsScroll: { flex: 1 },

  // Subtopic card
  subtopicCard: { backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: "rgba(168,85,247,0.1)", overflow: "hidden" },
  subtopicCardDone: { backgroundColor: "rgba(0,245,160,0.04)", borderColor: "rgba(0,245,160,0.2)" },
  subtopicHeaderRow: { flexDirection: "row", alignItems: "center", padding: 12, gap: 10 },

  // Checkbox
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: "#334", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  checkboxChecked: { backgroundColor: "#00c47a", borderColor: "#00c47a" },

  // Topic number badge
  topicNumBadge: { width: 26, height: 26, borderRadius: 8, backgroundColor: "rgba(168,85,247,0.12)", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  topicNumBadgeDone: { backgroundColor: "rgba(0,245,160,0.12)" },
  topicNum: { color: "#a855f7", fontSize: 10, fontWeight: "800" },
  topicNumDone: { color: "#00f5a0" },

  subtopicTitleWrap: { flex: 1 },
  subtopicTitle: { color: "#d0d0f0", fontSize: 13, fontWeight: "600", lineHeight: 18 },
  subtopicTitleDone: { color: "#00c47a", textDecorationLine: "line-through", opacity: 0.8 },

  // Subtopic body
  subtopicBody: { paddingHorizontal: 12, paddingBottom: 14, borderTopWidth: 1, borderTopColor: "rgba(168,85,247,0.07)" },
  subtopicDesc: { color: "#666688", fontSize: 12, lineHeight: 18, marginTop: 12, marginBottom: 14 },
  resourcesHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 },
  resourcesLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, color: "#444466" },

  // Resource chip
  resourceChip: { flexDirection: "row", alignItems: "center", gap: 10, padding: 10, borderRadius: 10, marginBottom: 8, borderWidth: 1 },
  resourceTextWrap: { flex: 1 },
  resourceType: { fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  resourceLabel: { color: "#c0c0e0", fontSize: 12, marginTop: 1 },
});
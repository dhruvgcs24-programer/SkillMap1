import React, { useState, useEffect, useCallback } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Modal, Dimensions, Linking, ActivityIndicator, Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.54;
const SPINE_X = width / 2;

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
const STATUS_CFG = {
  completed: {
    ring: ["#00f5a0", "#00d9f5"],
    icon: "checkmark-circle",
    iconColor: "#00f5a0",
    label: "Completed",
    labelColor: "#00f5a0",
    cardGrad: ["#061a13", "#071626"],
    border: "rgba(0,245,160,0.4)",
  },
  active: {
    ring: ["#a855f7", "#7c3aed"],
    icon: "flash",
    iconColor: "#c084fc",
    label: "In Progress",
    labelColor: "#c084fc",
    cardGrad: ["#120820", "#0c0c22"],
    border: "rgba(168,85,247,0.8)",
  },
  locked: {
    ring: ["#1e1e38", "#16162c"],
    icon: "lock-closed",
    iconColor: "#3a3a5a",
    label: "Locked",
    labelColor: "#3a3a5a",
    cardGrad: ["#0d0d1e", "#0a0a18"],
    border: "rgba(60,60,100,0.2)",
  },
};

const RESOURCE_CFG = {
  Course:   { icon: "school-outline",        color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
  Video:    { icon: "play-circle-outline",   color: "#ef4444", bg: "rgba(239,68,68,0.1)",  border: "rgba(239,68,68,0.2)"  },
  Official: { icon: "document-text-outline", color: "#00d9f5", bg: "rgba(0,217,245,0.08)", border: "rgba(0,217,245,0.2)"  },
};

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const storageKey = (id) => `skillmap_progress_${id}`;

async function loadProgress(id) {
  try {
    const raw = await AsyncStorage.getItem(storageKey(id));
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

async function saveProgress(id, progress) {
  try {
    await AsyncStorage.setItem(storageKey(id), JSON.stringify(progress));
  } catch {}
}

// ─── DYNAMIC STATUS ───────────────────────────────────────────────────────────
// Calculates whether a module is locked/active/completed based on checkbox progress
function getDynamicStatus(modules, index, progress) {
  const module = modules[index];
  const total = module.subTopics.length;
  if (total === 0) return "locked";

  const allDone = module.subTopics.every((t) => progress[t.id]);

  if (index === 0) {
    return allDone ? "completed" : "active";
  }

  // Check all previous modules are fully completed
  for (let i = 0; i < index; i++) {
    const prevDone = modules[i].subTopics.every((t) => progress[t.id]);
    if (!prevDone) return "locked";
  }

  return allDone ? "completed" : "active";
}

// ─── RESOURCE CHIP ────────────────────────────────────────────────────────────
function ResourceChip({ resource }) {
  const rc = RESOURCE_CFG[resource.type] || RESOURCE_CFG.Official;
  return (
    <TouchableOpacity
      style={[styles.resourceChip, { backgroundColor: rc.bg, borderColor: rc.border }]}
      onPress={() => Linking.openURL(resource.url)}
      activeOpacity={0.75}
    >
      <View style={[styles.resourceIconBox, { backgroundColor: rc.bg }]}>
        <Ionicons name={rc.icon} size={16} color={rc.color} />
      </View>
      <View style={styles.resourceTextWrap}>
        <Text style={[styles.resourceType, { color: rc.color }]}>{resource.type}</Text>
        <Text style={styles.resourceLabel} numberOfLines={1}>{resource.label}</Text>
      </View>
      <Ionicons name="arrow-forward-circle-outline" size={18} color="#33335a" />
    </TouchableOpacity>
  );
}

// ─── SUBTOPIC ROW ─────────────────────────────────────────────────────────────
function SubTopicRow({ topic, checked, onToggle }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.subtopicCard, checked && styles.subtopicCardDone]}>
      {/* Header */}
      <View style={styles.subtopicHeaderRow}>
        {/* Checkbox */}
        <TouchableOpacity
          onPress={onToggle}
          style={[styles.checkbox, checked && styles.checkboxChecked]}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {checked && <Ionicons name="checkmark" size={11} color="#fff" />}
        </TouchableOpacity>

        {/* Number */}
        <View style={[styles.numBadge, checked && styles.numBadgeDone]}>
          <Text style={[styles.numText, checked && styles.numTextDone]}>{topic.number}</Text>
        </View>

        {/* Title — tap to expand */}
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.7}
        >
          <Text style={[styles.subtopicTitle, checked && styles.subtopicTitleDone]} numberOfLines={expanded ? 0 : 2}>
            {topic.title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setExpanded(!expanded)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={14} color="#44446a" />
        </TouchableOpacity>
      </View>

      {/* Expanded body */}
      {expanded && (
        <View style={styles.subtopicBody}>
          <Text style={styles.subtopicDesc}>{topic.description}</Text>

          <View style={styles.resourcesHeaderRow}>
            <Ionicons name="book-outline" size={12} color="#444466" />
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

// ─── MODULE NODE (spine) ──────────────────────────────────────────────────────
function ModuleNode({ module, dynamicStatus, index, completedCount, onPress }) {
  const cfg = STATUS_CFG[dynamicStatus];
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
          dynamicStatus === "locked" && styles.connectorLocked,
        ]} />
      )}

      <TouchableOpacity
        onPress={() => dynamicStatus !== "locked" && onPress(module)}
        activeOpacity={dynamicStatus === "locked" ? 1 : 0.8}
        style={[
          styles.nodeCard,
          { borderColor: cfg.border },
          dynamicStatus === "locked" && styles.nodeCardLocked,
        ]}
      >
        {dynamicStatus === "active" && <View style={styles.activePulse} />}

        <LinearGradient colors={cfg.cardGrad} style={styles.nodeGrad}>
          <LinearGradient colors={cfg.ring} style={styles.nodeIconRing}>
            <Ionicons name={cfg.icon} size={16} color={cfg.iconColor} />
          </LinearGradient>

          <View style={{ flex: 1 }}>
            <Text style={styles.nodeTitle} numberOfLines={1}>{module.title}</Text>
            <Text style={styles.nodeSubtitle} numberOfLines={2}>{module.subtitle}</Text>

            {/* Progress bar */}
            {dynamicStatus !== "locked" && total > 0 && (
              <View style={styles.miniTrack}>
                <View style={[
                  styles.miniFill,
                  {
                    width: `${pct}%`,
                    backgroundColor: dynamicStatus === "completed" ? "#00f5a0" : "#a855f7",
                  },
                ]} />
              </View>
            )}

            <View style={styles.nodeFooter}>
              <View style={styles.xpBadge}>
                <Ionicons name="star" size={10} color="#f59e0b" />
                <Text style={styles.xpText}>{module.xp} XP</Text>
              </View>

              {dynamicStatus !== "locked" && total > 0 ? (
                <Text style={[styles.fraction, { color: cfg.labelColor }]}>
                  {completedCount}/{total}
                </Text>
              ) : (
                <View style={styles.lockRow}>
                  <Ionicons name="lock-closed" size={10} color="#3a3a5a" />
                  <Text style={[styles.fraction, { color: "#3a3a5a", marginLeft: 3 }]}>Locked</Text>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

// ─── MODULE MODAL ─────────────────────────────────────────────────────────────
function ModuleModal({ module, dynamicStatus, progress, onToggle, onMarkAll, onClose, roadmapColor }) {
  if (!module) return null;
  const cfg = STATUS_CFG[dynamicStatus];
  const total = module.subTopics.length;
  const doneCount = module.subTopics.filter((t) => progress[t.id]).length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const allDone = doneCount === total;

  return (
    <Modal transparent animationType="slide" visible={!!module}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalSheet}>
          <LinearGradient colors={["#0f0f28", "#08081a"]} style={styles.modalGrad}>
            {/* Handle */}
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.modalHeader}>
              <LinearGradient colors={cfg.ring} style={styles.modalIconRing}>
                <Ionicons name={module.icon} size={26} color="#fff" />
              </LinearGradient>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.modalTitle}>{module.title}</Text>
                <Text style={styles.modalSubtitle}>{module.subtitle}</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={18} color="#555" />
              </TouchableOpacity>
            </View>

            {/* Progress bar */}
            <View style={styles.modalProgressCard}>
              <View style={styles.modalProgressRow}>
                <Text style={styles.modalProgressLabel}>Module Progress</Text>
                <Text style={[styles.modalProgressPct, { color: pct === 100 ? "#00f5a0" : "#a855f7" }]}>
                  {pct}%
                </Text>
              </View>
              <View style={styles.modalTrack}>
                <LinearGradient
                  colors={pct === 100 ? ["#00f5a0", "#00d9f5"] : roadmapColor}
                  style={[styles.modalFill, { width: `${Math.max(pct, 2)}%` }]}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                />
              </View>
              <Text style={styles.modalProgressSub}>
                {doneCount} of {total} topics completed · {module.xp} XP reward
              </Text>
            </View>

            {/* Overview */}
            <Text style={styles.overviewText}>{module.overview}</Text>

            {/* Topics header + Mark All button */}
            <View style={styles.topicsHeaderRow}>
              <View>
                <Text style={styles.sectionLabel}>{total} TOPICS</Text>
                <Text style={styles.checkHint}>tap checkbox to mark complete</Text>
              </View>
              <TouchableOpacity
                onPress={() => onMarkAll(!allDone)}
                style={[styles.markAllBtn, allDone && styles.markAllBtnDone]}
              >
                <Ionicons
                  name={allDone ? "checkmark-circle" : "checkmark-circle-outline"}
                  size={14}
                  color={allDone ? "#00f5a0" : "#a855f7"}
                />
                <Text style={[styles.markAllText, allDone && styles.markAllTextDone]}>
                  {allDone ? "All Done!" : "Mark All"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Scrollable subtopics */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.subtopicsScroll}
              contentContainerStyle={{ paddingBottom: 50 }}
            >
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
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress(roadmap.id).then((p) => {
      setProgress(p);
      setLoading(false);
    });
  }, [roadmap.id]);

  // Toggle single subtopic
  const handleToggle = useCallback(async (topicId) => {
    setProgress((prev) => {
      const next = { ...prev, [topicId]: !prev[topicId] };
      saveProgress(roadmap.id, next);
      return next;
    });
  }, [roadmap.id]);

  // Mark all subtopics in currently open module
  const handleMarkAll = useCallback((markDone) => {
    if (!selectedModule) return;
    setProgress((prev) => {
      const next = { ...prev };
      selectedModule.subTopics.forEach((t) => { next[t.id] = markDone; });
      saveProgress(roadmap.id, next);
      return next;
    });
  }, [selectedModule, roadmap.id]);

  const completedCount = (module) =>
    module.subTopics.filter((t) => progress[t.id]).length;

  // Overall stats
  const totalTopics = roadmap.modules.reduce((acc, m) => acc + m.subTopics.length, 0);
  const doneTopics  = roadmap.modules.reduce((acc, m) => acc + completedCount(m), 0);
  const overallPct  = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  if (loading) {
    return (
      <LinearGradient colors={["#06060f", "#0d0d1f"]} style={styles.loadingBg}>
        <ActivityIndicator color="#a855f7" size="large" />
        <Text style={styles.loadingText}>Loading your progress...</Text>
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
                <Ionicons name="arrow-back" size={18} color="#a855f7" />
                <Text style={styles.backLabel}>All Roadmaps</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.eyebrow}>LEARNING PATH</Text>
            <Text style={styles.headerTitle}>{roadmap.title}</Text>
            <Text style={styles.headerSub}>{roadmap.subtitle}</Text>

            {/* Progress card */}
            <LinearGradient colors={["#0f0f28", "#0a0a1e"]} style={styles.progressCard}>
              <View style={styles.progressRow}>
                <View>
                  <Text style={styles.progressLabel}>Overall Progress</Text>
                  <Text style={styles.progressSub}>
                    {doneTopics}/{totalTopics} topics · {roadmap.modules.length} modules
                  </Text>
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

              {/* Legend */}
              <View style={styles.legend}>
                {[
                  { color: "#00f5a0", label: "Completed" },
                  { color: "#a855f7", label: "In Progress" },
                  { color: "#3a3a5a", label: "Locked" },
                ].map((item) => (
                  <View key={item.label} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                    <Text style={styles.legendLabel}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>

          {/* ── Spine + Nodes ── */}
          <View style={styles.spineWrap}>
            <LinearGradient
              colors={[...roadmap.color, "transparent"]}
              style={styles.spine}
              start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
            />

            {roadmap.modules.map((module, index) => {
              const dynStatus = getDynamicStatus(roadmap.modules, index, progress);
              return (
                <ModuleNode
                  key={module.id}
                  module={module}
                  dynamicStatus={dynStatus}
                  index={index}
                  completedCount={completedCount(module)}
                  onPress={(m) => {
                    setSelectedModule(m);
                    setSelectedStatus(dynStatus);
                  }}
                />
              );
            })}
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </SafeAreaView>

      <ModuleModal
        module={selectedModule}
        dynamicStatus={selectedStatus}
        progress={progress}
        onToggle={handleToggle}
        onMarkAll={handleMarkAll}
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
  loadingBg: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16 },
  loadingText: { color: "#666688", fontSize: 14 },

  // Header
  header: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 24 },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 18, alignSelf: "flex-start", backgroundColor: "rgba(168,85,247,0.1)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  backLabel: { color: "#a855f7", fontSize: 13, fontWeight: "600" },
  eyebrow: { fontSize: 10, fontWeight: "800", letterSpacing: 3, color: "#a855f7", marginBottom: 4 },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#f0f0ff", marginBottom: 4, letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: "#55557a", marginBottom: 20, lineHeight: 19 },

  // Progress card
  progressCard: { borderRadius: 18, padding: 18, borderWidth: 1, borderColor: "rgba(168,85,247,0.2)" },
  progressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  progressLabel: { color: "#c0c0e0", fontSize: 14, fontWeight: "600", marginBottom: 2 },
  progressSub: { color: "#44446a", fontSize: 11 },
  progressPct: { fontSize: 28, fontWeight: "800" },
  progressTrack: { height: 8, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden", marginBottom: 14 },
  progressFill: { height: "100%", borderRadius: 4 },
  legend: { flexDirection: "row", gap: 16 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { color: "#44446a", fontSize: 11 },

  // Spine
  spineWrap: { position: "relative", marginTop: 8 },
  spine: { position: "absolute", left: SPINE_X - 1, top: 0, bottom: 0, width: 2, opacity: 0.35 },

  // Node rows
  nodeRow: { marginVertical: 10, flexDirection: "row", alignItems: "center" },
  nodeRowCenter: { justifyContent: "center", paddingHorizontal: 22 },
  nodeRowLeft:   { justifyContent: "flex-start", paddingLeft: 14, paddingRight: SPINE_X + 10 },
  nodeRowRight:  { justifyContent: "flex-end",   paddingRight: 14, paddingLeft: SPINE_X + 10 },

  // Connector line
  connector:       { position: "absolute", top: "50%", height: 2, width: 22, backgroundColor: "rgba(168,85,247,0.4)" },
  connectorLeft:   { left: SPINE_X, right: "auto", width: 22 },
  connectorRight:  { right: SPINE_X, left: "auto", width: 22 },
  connectorLocked: { backgroundColor: "rgba(60,60,100,0.2)" },

  // Node card
  nodeCard: { width: CARD_WIDTH, borderRadius: 18, overflow: "hidden", borderWidth: 1.5 },
  nodeCardLocked: { opacity: 0.5 },
  activePulse: { position: "absolute", inset: 0, borderRadius: 18, borderWidth: 2, borderColor: "rgba(168,85,247,0.5)", zIndex: 1 },
  nodeGrad: { padding: 13, flexDirection: "row", alignItems: "flex-start", gap: 10 },
  nodeIconRing: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 },
  nodeTitle: { fontSize: 12, fontWeight: "700", color: "#f0f0ff", marginBottom: 2 },
  nodeSubtitle: { fontSize: 10, color: "#55557a", marginBottom: 6, lineHeight: 13 },
  miniTrack: { height: 3, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden", marginBottom: 6 },
  miniFill: { height: "100%", borderRadius: 2 },
  nodeFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  xpBadge: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "rgba(245,158,11,0.12)", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  xpText: { fontSize: 9, color: "#f59e0b", fontWeight: "700" },
  fraction: { fontSize: 10, fontWeight: "700" },
  lockRow: { flexDirection: "row", alignItems: "center" },

  // Modal
  modalBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.72)", justifyContent: "flex-end" },
  modalSheet: { height: "90%", borderTopLeftRadius: 28, borderTopRightRadius: 28, overflow: "hidden", borderWidth: 1, borderColor: "rgba(168,85,247,0.2)", borderBottomWidth: 0 },
  modalGrad: { flex: 1, padding: 20 },
  handle: { width: 40, height: 4, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, alignSelf: "center", marginBottom: 20 },

  // Modal header
  modalHeader: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  modalIconRing: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  modalTitle: { fontSize: 20, fontWeight: "800", color: "#f0f0ff", letterSpacing: -0.5, marginBottom: 2 },
  modalSubtitle: { fontSize: 12, color: "#55557a" },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.06)", alignItems: "center", justifyContent: "center" },

  // Modal progress
  modalProgressCard: { backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: "rgba(168,85,247,0.1)" },
  modalProgressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  modalProgressLabel: { color: "#8888aa", fontSize: 12 },
  modalProgressPct: { fontSize: 20, fontWeight: "800" },
  modalTrack: { height: 6, backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden", marginBottom: 8 },
  modalFill: { height: "100%", borderRadius: 3 },
  modalProgressSub: { color: "#44446a", fontSize: 11 },

  overviewText: { color: "#cbd5e1", fontSize: 14, lineHeight: 22, marginBottom: 18 },

  // Topics header
  topicsHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 2, color: "#94a3b8" },
  checkHint: { fontSize: 11, color: "#64748b", marginTop: 2 },

  // Mark All button
  markAllBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(168,85,247,0.1)", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: "rgba(168,85,247,0.2)" },
  markAllBtnDone: { backgroundColor: "rgba(0,245,160,0.08)", borderColor: "rgba(0,245,160,0.2)" },
  markAllText: { color: "#a855f7", fontSize: 12, fontWeight: "700" },
  markAllTextDone: { color: "#00f5a0" },

  subtopicsScroll: { flex: 1 },

  // Subtopic card
  subtopicCard: { backgroundColor: "rgba(255,255,255,0.03)", borderRadius: 14, marginBottom: 8, borderWidth: 1, borderColor: "rgba(168,85,247,0.1)", overflow: "hidden" },
  subtopicCardDone: { backgroundColor: "rgba(0,245,160,0.03)", borderColor: "rgba(0,245,160,0.18)" },
  subtopicHeaderRow: { flexDirection: "row", alignItems: "center", padding: 12, gap: 10 },

  // Checkbox
  checkbox: { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: "#2e2e50", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  checkboxChecked: { backgroundColor: "#00c47a", borderColor: "#00c47a" },

  // Number badge
  numBadge: { width: 26, height: 26, borderRadius: 8, backgroundColor: "rgba(168,85,247,0.12)", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  numBadgeDone: { backgroundColor: "rgba(0,245,160,0.1)" },
  numText: { color: "#a855f7", fontSize: 10, fontWeight: "800" },
  numTextDone: { color: "#00f5a0" },

  // Subtopic title
  subtopicTitle: { color: "#d0d0f0", fontSize: 13, fontWeight: "600", lineHeight: 18 },
  subtopicTitleDone: { color: "#00f5a0", textDecorationLine: "line-through", opacity: 0.9 },

  // Subtopic body
  subtopicBody: { paddingHorizontal: 12, paddingBottom: 14, borderTopWidth: 1, borderTopColor: "rgba(168,85,247,0.07)" },
  subtopicDesc: { color: "#8888aa", fontSize: 12, lineHeight: 18, marginTop: 12, marginBottom: 14 },
  resourcesHeaderRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 },
  resourcesLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, color: "#333355" },

  // Resource chip
  resourceChip: { flexDirection: "row", alignItems: "center", gap: 10, padding: 10, borderRadius: 12, marginBottom: 8, borderWidth: 1 },
  resourceIconBox: { width: 32, height: 32, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  resourceTextWrap: { flex: 1 },
  resourceType: { fontSize: 9, fontWeight: "800", letterSpacing: 1, marginBottom: 1 },
  resourceLabel: { color: "#c0c0e0", fontSize: 12 },
});
// ============================================================
// GeneratedRoadmap.tsx
// 📍 Place this file in: components/ui/GeneratedRoadmap.tsx
//
// Renders the AI-generated roadmap in 3 views:
//   1. Phases   — collapsible phase cards
//   2. Weekly   — horizontal scroll week cards
//   3. Checklist — flat task list with XP rewards
// ============================================================

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { getAllTasks, getAllWeeks } from "../roadmapAI";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------
interface Resource {
  title: string;
  url: string;
}

interface WeekTopic {
  id: string;
  week: number;
  phase: number;
  title: string;
  description: string;
  xp: number;
  tasks: string[];
  resources: Resource[];
}

interface Phase {
  id: string;
  name: string;
  weeks: string;
  color: string;
  description: string;
  topics: WeekTopic[];
}

interface Roadmap {
  title: string;
  topic: string;
  duration: string;
  level: string;
  goal: string;
  totalWeeks: number;
  xpTotal: number;
  phases: Phase[];
}

interface RoadmapTask {
  id: string;
  weekId: string;
  weekTitle: string;
  phaseColor: string;
  phaseName: string;
  task: string;
  xpReward: number;
}

interface GeneratedRoadmapProps {
  roadmap: Roadmap;
  onRegenerate: () => void;
  onBack?: () => void;
  backLabel?: string;
}

// -------------------------------------------------------------------
// Tab definitions
// -------------------------------------------------------------------
const TABS = [
  { key: "phases", label: "Phases", icon: "layers-outline" },
  { key: "weekly", label: "Weekly", icon: "calendar-outline" },
  { key: "checklist", label: "Checklist", icon: "checkbox-outline" },
];

// -------------------------------------------------------------------
// Sub-component: Stat Pill
// -------------------------------------------------------------------
function StatPill({
  icon,
  label,
  color,
}: {
  icon: string;
  label: string;
  color: string;
}) {
  return (
    <View style={[styles.statPill, { borderColor: color + "44" }]}>
      <Ionicons name={icon as any} size={13} color={color} />
      <Text style={[styles.statPillText, { color }]}>{label}</Text>
    </View>
  );
}

// -------------------------------------------------------------------
// PHASES VIEW
// -------------------------------------------------------------------
function PhasesView({ roadmap }: { roadmap: Roadmap }) {
  const [expandedPhase, setExpandedPhase] = useState<string>("phase-1");
  const [expandedWeek, setExpandedWeek] = useState<string | null>(null);

  const togglePhase = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPhase(expandedPhase === id ? "" : id);
  };

  const toggleWeek = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedWeek(expandedWeek === id ? null : id);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.tabContent}
    >
      {roadmap.phases.map((phase, phaseIndex) => {
        const isPhaseOpen = expandedPhase === phase.id;
        return (
          <View key={phase.id} style={styles.phaseCard}>
            {/* Phase header */}
            <TouchableOpacity
              onPress={() => togglePhase(phase.id)}
              activeOpacity={0.8}
              style={styles.phaseHeader}
            >
              <LinearGradient
                colors={[phase.color + "22", phase.color + "08"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
              {/* Phase number circle */}
              <View style={[styles.phaseNumber, { backgroundColor: phase.color + "33", borderColor: phase.color }]}>
                <Text style={[styles.phaseNumberText, { color: phase.color }]}>
                  {phaseIndex + 1}
                </Text>
              </View>

              <View style={styles.phaseHeaderInfo}>
                <Text style={styles.phaseName}>{phase.name}</Text>
                <Text style={styles.phaseWeeks}>Weeks {phase.weeks}</Text>
              </View>

              <Ionicons
                name={isPhaseOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color="#8888AA"
              />
            </TouchableOpacity>

            {/* Phase body */}
            {isPhaseOpen && (
              <View style={styles.phaseBody}>
                <Text style={styles.phaseDescription}>{phase.description}</Text>

                {phase.topics.map((week) => {
                  const isWeekOpen = expandedWeek === week.id;
                  return (
                    <View key={week.id} style={styles.weekItem}>
                      {/* Week row */}
                      <TouchableOpacity
                        onPress={() => toggleWeek(week.id)}
                        activeOpacity={0.8}
                        style={styles.weekRow}
                      >
                        {/* Week dot */}
                        <View style={[styles.weekDot, { backgroundColor: phase.color }]} />

                        <View style={styles.weekRowInfo}>
                          <Text style={styles.weekLabel}>Week {week.week}</Text>
                          <Text style={styles.weekTitle}>{week.title}</Text>
                        </View>

                        <View style={[styles.xpBadge, { backgroundColor: phase.color + "22" }]}>
                          <Ionicons name="star" size={11} color={phase.color} />
                          <Text style={[styles.xpBadgeText, { color: phase.color }]}>
                            {week.xp} XP
                          </Text>
                        </View>

                        <Ionicons
                          name={isWeekOpen ? "chevron-up" : "chevron-down"}
                          size={16}
                          color="#8888AA"
                          style={{ marginLeft: 6 }}
                        />
                      </TouchableOpacity>

                      {/* Week expanded detail */}
                      {isWeekOpen && (
                        <View style={styles.weekDetail}>
                          <Text style={styles.weekDescription}>{week.description}</Text>

                          <Text style={styles.detailSectionTitle}>Tasks</Text>
                          {week.tasks.map((task, i) => (
                            <View key={i} style={styles.taskRow}>
                              <View style={[styles.taskBullet, { backgroundColor: phase.color }]} />
                              <Text style={styles.taskText}>{task}</Text>
                            </View>
                          ))}

                          {week.resources.length > 0 && (
                            <>
                              <Text style={styles.detailSectionTitle}>Resources</Text>
                              {week.resources.map((res, i) => (
                                <View key={i} style={styles.resourceRow}>
                                  <Ionicons name="link-outline" size={13} color="#6C63FF" />
                                  <Text style={styles.resourceText} numberOfLines={1}>
                                    {res.title}
                                  </Text>
                                </View>
                              ))}
                            </>
                          )}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        );
      })}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

// -------------------------------------------------------------------
// WEEKLY VIEW
// -------------------------------------------------------------------
function WeeklyView({ roadmap }: { roadmap: Roadmap }) {
  const allWeeks = getAllWeeks(roadmap) as WeekTopic[];
  const [selectedWeek, setSelectedWeek] = useState(allWeeks[0]);

  // Find phase color for the selected week
  const phaseColor =
    roadmap.phases.find((p) => p.id === `phase-${selectedWeek.phase}`)?.color || "#6C63FF";

  return (
    <View style={{ flex: 1 }}>
      {/* Horizontal week picker */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekPicker}
      >
        {allWeeks.map((week) => {
          const color =
            roadmap.phases.find((p) => p.id === `phase-${week.phase}`)?.color || "#6C63FF";
          const isSelected = selectedWeek.id === week.id;
          return (
            <TouchableOpacity
              key={week.id}
              onPress={() => setSelectedWeek(week)}
              activeOpacity={0.8}
              style={[
                styles.weekChip,
                isSelected && { borderColor: color, backgroundColor: color + "22" },
              ]}
            >
              {isSelected && (
                <View style={[styles.weekChipDot, { backgroundColor: color }]} />
              )}
              <Text
                style={[styles.weekChipText, isSelected && { color, fontWeight: "700" }]}
              >
                W{week.week}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Selected week detail */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tabContent}
      >
        {/* Week card */}
        <View style={styles.weekDetailCard}>
          <LinearGradient
            colors={[phaseColor + "22", "#16162A"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.weekDetailCardGradient}
          />

          <View style={styles.weekDetailCardHeader}>
            <View>
              <Text style={[styles.weekDetailWeekNum, { color: phaseColor }]}>
                Week {selectedWeek.week}
              </Text>
              <Text style={styles.weekDetailTitle}>{selectedWeek.title}</Text>
            </View>
            <View style={[styles.xpBadgeLarge, { backgroundColor: phaseColor + "22", borderColor: phaseColor + "44" }]}>
              <Ionicons name="star" size={14} color={phaseColor} />
              <Text style={[styles.xpBadgeLargeText, { color: phaseColor }]}>
                {selectedWeek.xp} XP
              </Text>
            </View>
          </View>

          <Text style={styles.weekDetailDesc}>{selectedWeek.description}</Text>
        </View>

        {/* Tasks */}
        <Text style={styles.weekSectionTitle}>
          <Ionicons name="checkmark-circle-outline" size={15} color="#43D9AD" /> {""}
          Tasks this week
        </Text>
        {selectedWeek.tasks.map((task, i) => (
          <View key={i} style={styles.weekTaskCard}>
            <View style={[styles.weekTaskNumber, { backgroundColor: phaseColor + "22" }]}>
              <Text style={[styles.weekTaskNumberText, { color: phaseColor }]}>{i + 1}</Text>
            </View>
            <Text style={styles.weekTaskText}>{task}</Text>
          </View>
        ))}

        {/* Resources */}
        {selectedWeek.resources.length > 0 && (
          <>
            <Text style={styles.weekSectionTitle}>
              <Ionicons name="library-outline" size={15} color="#6C63FF" /> {""}
              Resources
            </Text>
            {selectedWeek.resources.map((res, i) => (
              <View key={i} style={styles.resourceCard}>
                <LinearGradient
                  colors={["#6C63FF22", "#9B5DE511"]}
                  style={StyleSheet.absoluteFill}
                />
                <Ionicons name="open-outline" size={16} color="#6C63FF" />
                <Text style={styles.resourceCardText} numberOfLines={2}>
                  {res.title}
                </Text>
                <Ionicons name="chevron-forward" size={14} color="#6C63FF88" />
              </View>
            ))}
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

// -------------------------------------------------------------------
// CHECKLIST VIEW
// -------------------------------------------------------------------
function ChecklistView({ roadmap }: { roadmap: Roadmap }) {
  const allTasks = getAllTasks(roadmap) as RoadmapTask[];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const totalXP = allTasks.reduce((sum: number, t: RoadmapTask) => (checked[t.id] ? sum + t.xpReward : sum), 0);
  const progress = Object.keys(checked).filter((k) => checked[k]).length / allTasks.length;

  const toggleTask = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.tabContent}
    >
      {/* XP Progress bar */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <Text style={styles.progressPercent}>
              {Math.round(progress * 100)}% Complete
            </Text>
          </View>
          <View style={styles.xpTotal}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.xpTotalText}>{totalXP} XP earned</Text>
          </View>
        </View>
        <View style={styles.progressBarBg}>
          <LinearGradient
            colors={["#6C63FF", "#43D9AD"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressBarFill, { width: `${Math.round(progress * 100)}%` }]}
          />
        </View>
        <Text style={styles.progressSubtext}>
          {Object.keys(checked).filter((k) => checked[k]).length} / {allTasks.length} tasks done
        </Text>
      </View>

      {/* Tasks grouped by week */}
      {roadmap.phases.map((phase) =>
        phase.topics.map((week) => {
          const weekTasks = allTasks.filter((t: RoadmapTask) => t.weekId === week.id);
          const weekDone = weekTasks.every((t: RoadmapTask) => checked[t.id]);
          return (
            <View key={week.id} style={styles.checklistGroup}>
              {/* Group header */}
              <View style={styles.checklistGroupHeader}>
                <View style={[styles.checklistGroupDot, { backgroundColor: phase.color }]} />
                <Text style={styles.checklistGroupTitle}>
                  Week {week.week} — {week.title}
                </Text>
                {weekDone && (
                  <View style={[styles.doneBadge, { backgroundColor: phase.color + "22" }]}>
                    <Ionicons name="checkmark-circle" size={13} color={phase.color} />
                    <Text style={[styles.doneBadgeText, { color: phase.color }]}>Done</Text>
                  </View>
                )}
              </View>

              {/* Task rows */}
              {weekTasks.map((t) => {
                const isChecked = !!checked[t.id];
                return (
                  <TouchableOpacity
                    key={t.id}
                    onPress={() => toggleTask(t.id)}
                    activeOpacity={0.75}
                    style={[styles.checklistRow, isChecked && styles.checklistRowDone]}
                  >
                    {/* Checkbox */}
                    <View
                      style={[
                        styles.checkbox,
                        isChecked && { backgroundColor: phase.color, borderColor: phase.color },
                      ]}
                    >
                      {isChecked && (
                        <Ionicons name="checkmark" size={13} color="#fff" />
                      )}
                    </View>

                    <Text
                      style={[styles.checklistTaskText, isChecked && styles.checklistTaskDone]}
                    >
                      {t.task}
                    </Text>

                    {/* XP reward */}
                    <View style={styles.taskXp}>
                      <Text style={[styles.taskXpText, isChecked && { color: "#FFD700" }]}>
                        +{t.xpReward}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

// -------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------
export default function GeneratedRoadmap({ roadmap, onRegenerate, onBack, backLabel = "Back" }: GeneratedRoadmapProps) {
  const [activeTab, setActiveTab] = useState("phases");

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0D0D1A", "#12122A", "#0D0D1A"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        {/* Back button row */}
        {onBack && (
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={16} color="#a855f7" />
            <Text style={styles.backBtnLabel}>{backLabel}</Text>
          </TouchableOpacity>
        )}

        {/* Roadmap title + meta */}
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.roadmapTitle} numberOfLines={1}>
              {roadmap.title}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.statRow}>
                <StatPill icon="time-outline" label={roadmap.duration} color="#43D9AD" />
                <StatPill icon="bar-chart-outline" label={roadmap.level} color="#6C63FF" />
                <StatPill icon="flag-outline" label={roadmap.goal} color="#FF6584" />
                <StatPill icon="calendar-outline" label={`${roadmap.totalWeeks} weeks`} color="#FFD700" />
              </View>
            </ScrollView>
          </View>

          {/* Regenerate button */}
          <TouchableOpacity onPress={onRegenerate} style={styles.regenBtn} activeOpacity={0.8}>
            <Ionicons name="refresh-outline" size={18} color="#6C63FF" />
          </TouchableOpacity>
        </View>

        {/* Tab bar */}
        <View style={styles.tabBar}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[styles.tab, isActive && styles.tabActive]}
                activeOpacity={0.8}
              >
                {isActive && (
                  <LinearGradient
                    colors={["#6C63FF", "#9B5DE5"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                  />
                )}
                <Ionicons
                  name={tab.icon as any}
                  size={15}
                  color={isActive ? "#fff" : "#8888AA"}
                />
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Tab content */}
      <View style={{ flex: 1 }}>
        {activeTab === "phases" && <PhasesView roadmap={roadmap} />}
        {activeTab === "weekly" && <WeeklyView roadmap={roadmap} />}
        {activeTab === "checklist" && <ChecklistView roadmap={roadmap} />}
      </View>
    </View>
  );
}

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D1A",
  },

  // Header
  header: {
    paddingTop: Platform.OS === "ios" ? 56 : 36,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A4A",
    backgroundColor: "#0D0D1Aee",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(168,85,247,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.2)",
    marginBottom: 14,
  },
  backBtnLabel: {
    color: "#a855f7",
    fontSize: 13,
    fontWeight: "600",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  roadmapTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#F0F0FF",
    marginBottom: 10,
    letterSpacing: -0.4,
  },
  statRow: {
    flexDirection: "row",
    gap: 8,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#16162A",
  },
  statPillText: {
    fontSize: 11,
    fontWeight: "600",
  },
  regenBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#16162A",
    borderWidth: 1,
    borderColor: "#2A2A4A",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  // Tab bar
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#16162A",
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 9,
    borderRadius: 9,
    overflow: "hidden",
  },
  tabActive: {
    overflow: "hidden",
  },
  tabLabel: {
    fontSize: 13,
    color: "#8888AA",
    fontWeight: "500",
  },
  tabLabelActive: {
    color: "#fff",
    fontWeight: "700",
  },

  tabContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // ---- PHASES VIEW ----
  phaseCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A4A",
    backgroundColor: "#16162A",
    marginBottom: 14,
    overflow: "hidden",
  },
  phaseHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
    overflow: "hidden",
  },
  phaseNumber: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  phaseNumberText: {
    fontSize: 15,
    fontWeight: "800",
  },
  phaseHeaderInfo: {
    flex: 1,
  },
  phaseName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F0F0FF",
    marginBottom: 2,
  },
  phaseWeeks: {
    fontSize: 12,
    color: "#8888AA",
  },
  phaseBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  phaseDescription: {
    fontSize: 13,
    color: "#8888AA",
    lineHeight: 20,
    marginBottom: 14,
  },
  weekItem: {
    marginBottom: 4,
  },
  weekRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#1E1E38",
    borderRadius: 10,
    gap: 10,
    marginBottom: 4,
  },
  weekDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  weekRowInfo: {
    flex: 1,
  },
  weekLabel: {
    fontSize: 11,
    color: "#8888AA",
    marginBottom: 1,
  },
  weekTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#C0C0E0",
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  xpBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  weekDetail: {
    backgroundColor: "#1A1A32",
    borderRadius: 10,
    padding: 14,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#2A2A4A",
  },
  weekDescription: {
    fontSize: 13,
    color: "#8888AA",
    lineHeight: 20,
    marginBottom: 12,
  },
  detailSectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6C63FF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 4,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 7,
  },
  taskBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 5,
  },
  taskText: {
    flex: 1,
    fontSize: 13,
    color: "#C0C0E0",
    lineHeight: 19,
  },
  resourceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  resourceText: {
    flex: 1,
    fontSize: 12,
    color: "#6C63FF",
  },

  // ---- WEEKLY VIEW ----
  weekPicker: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  weekChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2A2A4A",
    backgroundColor: "#16162A",
    gap: 5,
  },
  weekChipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  weekChipText: {
    fontSize: 13,
    color: "#8888AA",
    fontWeight: "500",
  },
  weekDetailCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A4A",
    overflow: "hidden",
    padding: 18,
    marginBottom: 20,
  },
  weekDetailCardGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  weekDetailCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  weekDetailWeekNum: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  weekDetailTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#F0F0FF",
    letterSpacing: -0.3,
  },
  xpBadgeLarge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 1,
  },
  xpBadgeLargeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  weekDetailDesc: {
    fontSize: 14,
    color: "#8888AA",
    lineHeight: 22,
  },
  weekSectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#C0C0E0",
    letterSpacing: 0.3,
    marginBottom: 10,
    marginTop: 4,
  },
  weekTaskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16162A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A4A",
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  weekTaskNumber: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  weekTaskNumberText: {
    fontSize: 13,
    fontWeight: "700",
  },
  weekTaskText: {
    flex: 1,
    fontSize: 13,
    color: "#C0C0E0",
    lineHeight: 19,
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#6C63FF33",
    padding: 14,
    marginBottom: 8,
    gap: 10,
    overflow: "hidden",
  },
  resourceCardText: {
    flex: 1,
    fontSize: 13,
    color: "#9B9BCC",
    lineHeight: 18,
  },

  // ---- CHECKLIST VIEW ----
  progressCard: {
    backgroundColor: "#16162A",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A4A",
    padding: 18,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  progressLabel: {
    fontSize: 12,
    color: "#8888AA",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: "800",
    color: "#F0F0FF",
  },
  xpTotal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFD70022",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFD70033",
  },
  xpTotalText: {
    color: "#FFD700",
    fontWeight: "700",
    fontSize: 13,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#2A2A4A",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
    minWidth: 8,
  },
  progressSubtext: {
    fontSize: 12,
    color: "#8888AA",
  },
  checklistGroup: {
    marginBottom: 18,
  },
  checklistGroupHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  checklistGroupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  checklistGroupTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#C0C0E0",
  },
  doneBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  doneBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16162A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A4A",
    padding: 14,
    marginBottom: 6,
    gap: 12,
  },
  checklistRowDone: {
    opacity: 0.6,
    backgroundColor: "#1A1A2E",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#4A4A6A",
    backgroundColor: "#1E1E38",
    justifyContent: "center",
    alignItems: "center",
  },
  checklistTaskText: {
    flex: 1,
    fontSize: 13,
    color: "#C0C0E0",
    lineHeight: 19,
  },
  checklistTaskDone: {
    textDecorationLine: "line-through",
    color: "#6666AA",
  },
  taskXp: {
    minWidth: 32,
    alignItems: "flex-end",
  },
  taskXpText: {
    fontSize: 12,
    color: "#6666AA",
    fontWeight: "600",
  },
});
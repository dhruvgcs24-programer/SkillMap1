// ============================================================
// RoadmapForm.tsx
// 📍 Place this file in: components/ui/RoadmapForm.tsx
//
// The AI Roadmap Generator input form.
// Collects: topic, duration, level, goal
// Calls generateRoadmap() from roadmapAI.js on submit.
// ============================================================

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { generateRoadmap } from "../roadmapAI";

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------
export interface RoadmapFormData {
  topic: string;
  duration: string;
  level: string;
  goal: string;
}

interface RoadmapFormProps {
  onRoadmapGenerated: (roadmap: any) => void;
  // Optional: if provided, the parent controls generation + loading screen.
  // The form calls this instead of calling generateRoadmap() itself.
  onGenerateStart?: (formData: RoadmapFormData) => void;
  externalLoading?: boolean;
}

// -------------------------------------------------------------------
// Picker options
// -------------------------------------------------------------------
const DURATION_OPTIONS = [
  { label: "1 Week", value: "1 week" },
  { label: "1 Month", value: "1 month" },
  { label: "3 Months", value: "3 months" },
  { label: "6 Months", value: "6 months" },
  { label: "1 Year", value: "1 year" },
];

const LEVEL_OPTIONS = [
  { label: "🌱 Beginner", value: "Beginner" },
  { label: "⚡ Intermediate", value: "Intermediate" },
  { label: "🔥 Advanced", value: "Advanced" },
];

const GOAL_OPTIONS = [
  { label: "💼 Get a Job", value: "Job-ready" },
  { label: "🛠 Build a Project", value: "Build a project" },
  { label: "📚 General Learning", value: "General curiosity" },
  { label: "🎓 Pass an Exam", value: "Pass an exam" },
];

// -------------------------------------------------------------------
// Sub-component: Option Pill selector
// -------------------------------------------------------------------
interface OptionPickerProps {
  options: { label: string; value: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

function OptionPicker({ options, selected, onSelect }: OptionPickerProps) {
  return (
    <View style={styles.pillRow}>
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onSelect(opt.value)}
            style={[styles.pill, isSelected && styles.pillSelected]}
            activeOpacity={0.75}
          >
            {isSelected && (
              <LinearGradient
                colors={["#6C63FF", "#9B5DE5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
            )}
            <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// -------------------------------------------------------------------
// Sub-component: Section label
// -------------------------------------------------------------------
function SectionLabel({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.sectionLabel}>
      <Ionicons name={icon as any} size={16} color="#6C63FF" />
      <Text style={styles.sectionLabelText}>{text}</Text>
    </View>
  );
}

// -------------------------------------------------------------------
// Main Form Component
// -------------------------------------------------------------------
export default function RoadmapForm({
  onRoadmapGenerated,
  onGenerateStart,
  externalLoading = false,
}: RoadmapFormProps) {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("3 months");
  const [level, setLevel] = useState("Beginner");
  const [goal, setGoal] = useState("Build a project");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use external loading state if parent is controlling the flow
  const isLoading = externalLoading || loading;

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic to learn.");
      return;
    }
    setError("");

    const formData = { topic: topic.trim(), duration, level, goal };

    // If parent wants to control the flow (show its own loading screen),
    // delegate entirely to it.
    if (onGenerateStart) {
      onGenerateStart(formData);
      return;
    }

    // Standalone mode — handle generation + loading internally
    setLoading(true);
    try {
      const roadmap = await generateRoadmap(formData);
      onRoadmapGenerated(roadmap);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={["#0D0D1A", "#12122A", "#0D0D1A"]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={["#6C63FF33", "#9B5DE522"]}
            style={styles.headerBadge}
          >
            <Ionicons name="sparkles" size={18} color="#6C63FF" />
            <Text style={styles.headerBadgeText}>AI Powered</Text>
          </LinearGradient>

          <Text style={styles.headerTitle}>Build Your{"\n"}Learning Roadmap</Text>
          <Text style={styles.headerSubtitle}>
            {"Tell us what you want to master and we'll plan the perfect path for you."}
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* Decorative top border */}
          <LinearGradient
            colors={["#6C63FF", "#9B5DE5", "#FF6584"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.cardTopBorder}
          />

          {/* Section 1 — Topic */}
          <View style={styles.section}>
            <SectionLabel icon="code-slash-outline" text="What do you want to learn?" />
            <View style={styles.inputWrapper}>
              <Ionicons
                name="search-outline"
                size={18}
                color="#6C63FF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="e.g. React Native, Python, Machine Learning..."
                placeholderTextColor="#4A4A6A"
                value={topic}
                onChangeText={(t) => {
                  setTopic(t);
                  if (error) setError("");
                }}
                returnKeyType="done"
                autoCapitalize="words"
              />
            </View>
            {error ? (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle-outline" size={14} color="#FF6584" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Section 2 — Duration */}
          <View style={styles.section}>
            <SectionLabel icon="time-outline" text="How much time do you have?" />
            <OptionPicker
              options={DURATION_OPTIONS}
              selected={duration}
              onSelect={setDuration}
            />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Section 3 — Level */}
          <View style={styles.section}>
            <SectionLabel icon="bar-chart-outline" text="What's your current level?" />
            <OptionPicker
              options={LEVEL_OPTIONS}
              selected={level}
              onSelect={setLevel}
            />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Section 4 — Goal */}
          <View style={styles.section}>
            <SectionLabel icon="flag-outline" text="What's your goal?" />
            <OptionPicker
              options={GOAL_OPTIONS}
              selected={goal}
              onSelect={setGoal}
            />
          </View>
        </View>

        {/* Summary preview */}
        {topic.trim() ? (
          <View style={styles.summaryCard}>
            <Ionicons name="information-circle-outline" size={16} color="#43D9AD" />
            <Text style={styles.summaryText}>
              Generating a{" "}
              <Text style={styles.summaryHighlight}>{duration}</Text> roadmap for{" "}
              <Text style={styles.summaryHighlight}>{topic}</Text>,{" "}
              {level.toLowerCase()} level, focused on{" "}
              <Text style={styles.summaryHighlight}>{goal.toLowerCase()}</Text>.
            </Text>
          </View>
        ) : null}

        {/* Generate Button */}
        <TouchableOpacity
          onPress={handleGenerate}
          disabled={isLoading}
          activeOpacity={0.85}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={isLoading ? ["#2A2A4A", "#2A2A4A"] : ["#6C63FF", "#9B5DE5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            {isLoading ? (
              <View style={styles.buttonInner}>
                <ActivityIndicator size="small" color="#6C63FF" />
                <Text style={styles.buttonTextLoading}>Generating your roadmap...</Text>
              </View>
            ) : (
              <View style={styles.buttonInner}>
                <Ionicons name="sparkles-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Generate My Roadmap</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D1A",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },

  // Header
  header: {
    marginBottom: 24,
  },
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#6C63FF44",
  },
  headerBadgeText: {
    color: "#6C63FF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#F0F0FF",
    lineHeight: 40,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#8888AA",
    lineHeight: 22,
  },

  // Card
  card: {
    backgroundColor: "#16162A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2A2A4A",
    overflow: "hidden",
    marginBottom: 16,
  },
  cardTopBorder: {
    height: 3,
    width: "100%",
  },

  // Sections
  section: {
    padding: 20,
  },
  sectionLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  sectionLabelText: {
    color: "#C0C0E0",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  divider: {
    height: 1,
    backgroundColor: "#2A2A4A",
    marginHorizontal: 20,
  },

  // Text input
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E38",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A4A",
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#F0F0FF",
    fontSize: 15,
    fontWeight: "500",
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  errorText: {
    color: "#FF6584",
    fontSize: 12,
  },

  // Pills
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2A2A4A",
    backgroundColor: "#1E1E38",
    overflow: "hidden",
  },
  pillSelected: {
    borderColor: "#6C63FF",
  },
  pillText: {
    color: "#8888AA",
    fontSize: 13,
    fontWeight: "500",
  },
  pillTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },

  // Summary
  summaryCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#43D9AD15",
    borderWidth: 1,
    borderColor: "#43D9AD33",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  summaryText: {
    flex: 1,
    color: "#8888AA",
    fontSize: 13,
    lineHeight: 20,
  },
  summaryHighlight: {
    color: "#43D9AD",
    fontWeight: "700",
  },

  // Button
  buttonWrapper: {
    borderRadius: 16,
    overflow: "hidden",
  },
  button: {
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  buttonTextLoading: {
    color: "#6C63FF",
    fontSize: 15,
    fontWeight: "600",
  },
});
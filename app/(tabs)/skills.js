// ============================================================
// skills.js
// 📍 Replace your existing: app/(tabs)/skills.js
//
// Main entry point for the AI Roadmap Generator tab.
// Manages 3 states:
//   "form"      → RoadmapForm (user fills inputs)
//   "loading"   → Animated loading screen (2s mock delay)
//   "result"    → GeneratedRoadmap (viewer with 3 tabs)
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import RoadmapForm from "../../components/ui/RoadmapForm";
import GeneratedRoadmap from "../../components/ui/GeneratedRoadmap";

const { width } = Dimensions.get("window");

// -------------------------------------------------------------------
// Loading Screen — shown during the 2s mock AI delay
// -------------------------------------------------------------------
function LoadingScreen({ topic }) {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  const LOADING_STEPS = [
    { icon: "search-outline",      text: "Analysing your topic..." },
    { icon: "git-branch-outline",  text: "Mapping dependencies..." },
    { icon: "layers-outline",      text: "Structuring phases..." },
    { icon: "calendar-outline",    text: "Planning weekly goals..." },
    { icon: "library-outline",     text: "Curating resources..." },
    { icon: "sparkles-outline",    text: "Finalising your roadmap..." },
  ];

  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Bounce dots
    const bounceDot = (dot, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -8, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0,  duration: 300, useNativeDriver: true }),
          Animated.delay(400),
        ])
      ).start();

    bounceDot(dot1, 0);
    bounceDot(dot2, 150);
    bounceDot(dot3, 300);

    // Glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1,   duration: 900, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.4, duration: 900, useNativeDriver: true }),
      ])
    ).start();

    // Step cycle
    const interval = setInterval(() => {
      setStepIndex((i) => (i + 1) % LOADING_STEPS.length);
    }, 330);

    return () => clearInterval(interval);
  }, []);

  const currentStep = LOADING_STEPS[stepIndex];

  return (
    <View style={styles.loadingContainer}>
      <LinearGradient
        colors={["#0D0D1A", "#12122A", "#0D0D1A"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Glow circle */}
      <Animated.View style={[styles.glowCircle, { opacity: glowAnim }]}>
        <LinearGradient
          colors={["#6C63FF55", "#9B5DE533", "#00000000"]}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* Icon */}
      <View style={styles.loadingIconWrapper}>
        <LinearGradient
          colors={["#6C63FF", "#9B5DE5"]}
          style={styles.loadingIconBg}
        >
          <Ionicons name={currentStep.icon} size={32} color="#fff" />
        </LinearGradient>
      </View>

      {/* Title */}
      <Text style={styles.loadingTitle}>Building your roadmap</Text>
      <Text style={styles.loadingTopic} numberOfLines={1}>
        {topic}
      </Text>

      {/* Step text */}
      <Text style={styles.loadingStep}>{currentStep.text}</Text>

      {/* Bouncing dots */}
      <View style={styles.dotsRow}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, { transform: [{ translateY: dot }] }]}
          />
        ))}
      </View>
    </View>
  );
}

// -------------------------------------------------------------------
// Main Skills Tab
// -------------------------------------------------------------------
export default function SkillsScreen() {
  // "form" | "loading" | "result"
  const [screen, setScreen] = useState("form");
  const [roadmap, setRoadmap]   = useState(null);
  const [formTopic, setFormTopic] = useState("");

  // Fade transition
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const transitionTo = (nextScreen, data = null) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (data) setRoadmap(data);
      setScreen(nextScreen);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  // Called by RoadmapForm when the user taps "Generate"
  // generateRoadmap() inside RoadmapForm handles the mock delay,
  // then fires this callback with the full roadmap object.
  const handleRoadmapGenerated = (generatedRoadmap) => {
    transitionTo("result", generatedRoadmap);
  };

  // Called when form starts generating (to show loading screen)
  // We achieve this by watching when form topic changes + submit fires.
  // Since RoadmapForm manages its own loading state internally,
  // we show the loading screen by intercepting with a wrapper.
  const handleFormSubmitStart = (topic) => {
    setFormTopic(topic);
    transitionTo("loading");
  };

  // Called by GeneratedRoadmap's regenerate button
  const handleRegenerate = () => {
    transitionTo("form");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        {screen === "form" && (
          <RoadmapFormWrapper
            onSubmitStart={handleFormSubmitStart}
            onRoadmapGenerated={handleRoadmapGenerated}
          />
        )}

        {screen === "loading" && (
          <LoadingScreen topic={formTopic} />
        )}

        {screen === "result" && roadmap && (
          <GeneratedRoadmap
            roadmap={roadmap}
            onRegenerate={handleRegenerate}
          />
        )}
      </Animated.View>
    </View>
  );
}

// -------------------------------------------------------------------
// RoadmapFormWrapper
// Wraps RoadmapForm to intercept the submit moment so we can
// show the LoadingScreen while the mock delay runs.
// -------------------------------------------------------------------
function RoadmapFormWrapper({ onSubmitStart, onRoadmapGenerated }) {
  const { generateRoadmap } = require("../../components/roadmapAI");
  const [loading, setLoading] = useState(false);

  // We pass a custom onGenerate to RoadmapForm that:
  // 1. Tells parent to switch to loading screen
  // 2. Awaits the mock delay
  // 3. Tells parent to switch to result screen
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
    <RoadmapForm
      onRoadmapGenerated={onRoadmapGenerated}
      onGenerateStart={handleGenerate}
      externalLoading={loading}
    />
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

  // Loading screen
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  glowCircle: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    alignSelf: "center",
    top: "25%",
    overflow: "hidden",
  },
  loadingIconWrapper: {
    marginBottom: 28,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 10,
  },
  loadingIconBg: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#F0F0FF",
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  loadingTopic: {
    fontSize: 16,
    color: "#6C63FF",
    fontWeight: "700",
    marginBottom: 28,
    maxWidth: width - 80,
    textAlign: "center",
  },
  loadingStep: {
    fontSize: 14,
    color: "#8888AA",
    marginBottom: 28,
    textAlign: "center",
    minHeight: 20,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#6C63FF",
  },
});
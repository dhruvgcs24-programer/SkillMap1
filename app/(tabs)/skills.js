import { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";

import { supabase } from "../../src/services/supabase";

export default function SkillsScreen() {
  const [skillName, setSkillName] =
    useState("");

  const [progress, setProgress] =
    useState("");

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } =
      await supabase
        .from("skills")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

    if (!error) {
      setSkills(data);
    }
  };

  const addSkill = async () => {
    if (!skillName || !progress) {
      alert("Enter all fields");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } =
      await supabase.from("skills").insert({
        user_id: user.id,
        skill_name: skillName,
        progress: Number(progress),
      });

    if (error) {
      alert(error.message);
      return;
    }

    setSkillName("");
    setProgress("");

    fetchSkills();
  };

  const deleteSkill = async (id) => {
    await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    fetchSkills();
  };

  const renderSkill = ({ item }) => {
    return (
      <View style={styles.skillCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.skillName}>
            {item.skill_name}
          </Text>

          <TouchableOpacity
            onPress={() =>
              deleteSkill(item.id)
            }
          >
            <Ionicons
              name="trash"
              size={22}
              color="#EF4444"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.progressText}>
          {item.progress}% Completed
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${item.progress}%`,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#020617", "#111827"]}
      style={styles.container}
    >
      <Text style={styles.title}>
        My Skills
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Skill Name"
          placeholderTextColor="#94A3B8"
          value={skillName}
          onChangeText={setSkillName}
          style={styles.input}
        />

        <TextInput
          placeholder="Progress %"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={progress}
          onChangeText={setProgress}
          style={styles.input}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={addSkill}
        >
          <LinearGradient
            colors={["#3B82F6", "#8B5CF6"]}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>
              Add Skill
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={skills}
        keyExtractor={(item) => item.id}
        renderItem={renderSkill}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 24,
  },

  inputContainer: {
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 58,
    color: "white",
    marginBottom: 14,
    fontSize: 16,
  },

  addButton: {
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  skillCard: {
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
  },

  skillName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  progressText: {
    color: "#CBD5E1",
    marginTop: 12,
    marginBottom: 10,
  },

  progressBar: {
    width: "100%",
    height: 12,
    backgroundColor: "#334155",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 10,
  },
});
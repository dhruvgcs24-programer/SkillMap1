import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "../src/services/supabase";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.replace("/(tabs)");
    }
  };

const signInWithGoogle = async () => {
  const redirectTo =
    "https://auth.expo.io/@dhyansirigerics24/SkillMap";

  const { data, error } =
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

  if (error) {
    alert(error.message);
    return;
  }

  const result =
    await WebBrowser.openAuthSessionAsync(
      data?.url,
      redirectTo
    );

  if (result.type === "success") {
    router.replace("/(tabs)");
  }
};

  const forgotPassword = async () => {
    if (!email) {
      alert("Enter email first");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      alert(error.message);
    } else {
      alert("Password reset email sent");
    }
  };

  return (
    <LinearGradient
      colors={["#0F172A", "#111827", "#020617"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
          <Ionicons
            name="map"
            size={60}
            color="#60A5FA"
          />

          <Text style={styles.logoText}>
            SkillMap
          </Text>

          <Text style={styles.subtitle}>
            Chart Your Success
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            Welcome Back
          </Text>

          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={22}
              color="#94A3B8"
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#94A3B8"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity
            onPress={forgotPassword}
          >
            <Text style={styles.forgot}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={login}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#3B82F6", "#8B5CF6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={signInWithGoogle}
            activeOpacity={0.8}
            style={{
              marginTop: 18,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 18,
                borderRadius: 18,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="logo-google"
                size={22}
                color="black"
              />

              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push("/signup")
            }
          >
            <Text style={styles.signup}>
              Don&apos;t have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  logoText: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#94A3B8",
    marginTop: 6,
    fontSize: 16,
  },

  card: {
    backgroundColor: "rgba(30,41,59,0.95)",
    borderRadius: 28,
    padding: 28,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 28,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 18,
    height: 62,
  },

  input: {
    flex: 1,
    color: "white",
    marginLeft: 12,
    fontSize: 16,
  },

  forgot: {
    color: "#60A5FA",
    alignSelf: "flex-end",
    marginBottom: 24,
    fontWeight: "600",
  },

  button: {
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  signup: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 28,
    fontSize: 15,
  },
});
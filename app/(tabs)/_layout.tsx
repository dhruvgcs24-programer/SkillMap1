import { Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#09090f",
          borderTopWidth: 1,
          borderTopColor: "rgba(168,85,247,0.15)",
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#a855f7",
        tabBarInactiveTintColor: "#44446a",
        tabBarLabelStyle: { fontSize: 10, fontWeight: "700" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="roadmap"
        options={{
          title: "Roadmaps",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="map"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="skills"
        options={{
          title: "Skills",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="bar-chart"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
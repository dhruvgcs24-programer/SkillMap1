// ============================================================
// roadmapAI.js
// 📍 Place this file in: components/roadmapAI.js
//
// 🚧 MOCK MODE — No API calls, no cost.
// To plug in real AI later, replace the body of generateRoadmap()
// with an actual fetch() call to your preferred LLM API.
// The returned JSON shape stays exactly the same.
// ============================================================

// -------------------------------------------------------------------
// MOCK DATA — A realistic "Learn React Native in 3 months" roadmap
// This is what the AI would return. All UI is built against this shape.
// -------------------------------------------------------------------
const MOCK_ROADMAP = {
  title: "React Native Mastery",
  topic: "React Native",
  duration: "3 months",
  level: "Beginner",
  goal: "Build a project",
  totalWeeks: 12,
  xpTotal: 1200,
  phases: [
    {
      id: "phase-1",
      name: "Phase 1 – Foundations",
      weeks: "1–4",
      color: "#6C63FF",
      description: "Get your environment set up and understand the core building blocks of React Native.",
      topics: [
        {
          id: "week-1",
          week: 1,
          phase: 1,
          title: "Environment & Hello World",
          description: "Set up Expo, run your first app, and understand the project structure.",
          xp: 100,
          tasks: [
            "Install Node.js, Expo CLI, and Expo Go on your phone",
            "Run npx create-expo-app MyApp and explore the file structure",
            "Understand the difference between React and React Native",
            "Modify App.js and see live reload in action",
          ],
          resources: [
            { title: "Expo Official Docs – Getting Started", url: "https://docs.expo.dev/get-started/introduction/" },
            { title: "React Native in 100 Seconds – Fireship", url: "https://www.youtube.com/watch?v=gvkqT_Uoahw" },
          ],
        },
        {
          id: "week-2",
          week: 2,
          phase: 1,
          title: "Core Components & Styling",
          description: "Learn View, Text, Image, ScrollView and how StyleSheet works.",
          xp: 100,
          tasks: [
            "Use View, Text, Image, and ScrollView in a sample app",
            "Understand Flexbox layout in React Native",
            "Create a profile card UI using StyleSheet",
            "Explore Platform-specific styling",
          ],
          resources: [
            { title: "Core Components – React Native Docs", url: "https://reactnative.dev/docs/components-and-apis" },
            { title: "Flexbox in React Native", url: "https://reactnative.dev/docs/flexbox" },
          ],
        },
        {
          id: "week-3",
          week: 3,
          phase: 1,
          title: "State, Props & Hooks",
          description: "Understand how data flows in React Native with useState and useEffect.",
          xp: 100,
          tasks: [
            "Build a counter app using useState",
            "Pass data between components using props",
            "Fetch data from a public API using useEffect + fetch()",
            "Display a loading spinner while fetching",
          ],
          resources: [
            { title: "useState – React Docs", url: "https://react.dev/reference/react/useState" },
            { title: "useEffect Explained – Web Dev Simplified", url: "https://www.youtube.com/watch?v=0ZJgIjIuY7U" },
          ],
        },
        {
          id: "week-4",
          week: 4,
          phase: 1,
          title: "Navigation with Expo Router",
          description: "Set up file-based navigation and move between screens.",
          xp: 100,
          tasks: [
            "Install and configure Expo Router",
            "Create a tab-based navigation layout",
            "Pass params between screens",
            "Add a stack navigator for nested screens",
          ],
          resources: [
            { title: "Expo Router Docs", url: "https://docs.expo.dev/router/introduction/" },
            { title: "Expo Router Crash Course – notJust.dev", url: "https://www.youtube.com/watch?v=RglRiycD0oQ" },
          ],
        },
      ],
    },
    {
      id: "phase-2",
      name: "Phase 2 – Building Real Features",
      weeks: "5–8",
      color: "#FF6584",
      description: "Build real app features: lists, forms, storage, and API integration.",
      topics: [
        {
          id: "week-5",
          week: 5,
          phase: 2,
          title: "Lists & FlatList",
          description: "Render large datasets efficiently with FlatList and SectionList.",
          xp: 100,
          tasks: [
            "Build a contacts list using FlatList",
            "Add pull-to-refresh functionality",
            "Implement search/filter on a list",
            "Use SectionList for grouped data",
          ],
          resources: [
            { title: "FlatList – React Native Docs", url: "https://reactnative.dev/docs/flatlist" },
          ],
        },
        {
          id: "week-6",
          week: 6,
          phase: 2,
          title: "Forms & User Input",
          description: "Handle text inputs, validation, and keyboard behaviour.",
          xp: 100,
          tasks: [
            "Build a login form with TextInput",
            "Handle keyboard avoiding view",
            "Add basic form validation",
            "Show error messages inline",
          ],
          resources: [
            { title: "TextInput – React Native Docs", url: "https://reactnative.dev/docs/textinput" },
          ],
        },
        {
          id: "week-7",
          week: 7,
          phase: 2,
          title: "AsyncStorage & Local Persistence",
          description: "Save and load data locally on the device.",
          xp: 100,
          tasks: [
            "Install @react-native-async-storage/async-storage",
            "Save user preferences to device storage",
            "Load saved data on app start",
            "Build a simple notes app with persistence",
          ],
          resources: [
            { title: "AsyncStorage Docs", url: "https://react-native-async-storage.github.io/async-storage/" },
          ],
        },
        {
          id: "week-8",
          week: 8,
          phase: 2,
          title: "REST APIs & Axios",
          description: "Connect your app to a real backend and handle async data properly.",
          xp: 100,
          tasks: [
            "Install Axios and make GET/POST requests",
            "Handle loading, success, and error states",
            "Display data from a public REST API",
            "Add request headers and authentication tokens",
          ],
          resources: [
            { title: "Axios – GitHub", url: "https://github.com/axios/axios" },
            { title: "REST API in React Native – Traversy Media", url: "https://www.youtube.com/watch?v=iM2D5PQu5EE" },
          ],
        },
      ],
    },
    {
      id: "phase-3",
      name: "Phase 3 – Polish & Ship",
      weeks: "9–12",
      color: "#43D9AD",
      description: "Add animations, authentication, and get your app ready to publish.",
      topics: [
        {
          id: "week-9",
          week: 9,
          phase: 3,
          title: "Animations with Reanimated",
          description: "Add fluid, performant animations using React Native Reanimated.",
          xp: 100,
          tasks: [
            "Install React Native Reanimated",
            "Build a fade-in entrance animation",
            "Add a swipe-to-delete gesture",
            "Create a bottom sheet with spring animation",
          ],
          resources: [
            { title: "Reanimated Docs", url: "https://docs.swmansion.com/react-native-reanimated/" },
          ],
        },
        {
          id: "week-10",
          week: 10,
          phase: 3,
          title: "Supabase Authentication",
          description: "Add real user login and signup with Supabase.",
          xp: 100,
          tasks: [
            "Set up a Supabase project and get API keys",
            "Implement email/password signup and login",
            "Protect routes based on auth state",
            "Handle session persistence",
          ],
          resources: [
            { title: "Supabase + Expo Guide", url: "https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native" },
          ],
        },
        {
          id: "week-11",
          week: 11,
          phase: 3,
          title: "Performance & Best Practices",
          description: "Optimize your app for production — faster loads, fewer re-renders.",
          xp: 100,
          tasks: [
            "Use React.memo and useCallback to reduce re-renders",
            "Lazy load screens with Suspense",
            "Optimize images with expo-image",
            "Profile your app with Flipper or React DevTools",
          ],
          resources: [
            { title: "Performance – React Native Docs", url: "https://reactnative.dev/docs/performance" },
          ],
        },
        {
          id: "week-12",
          week: 12,
          phase: 3,
          title: "Build & Publish with EAS",
          description: "Create a production build and submit to the App Store / Play Store.",
          xp: 100,
          tasks: [
            "Configure app.json with icons and splash screen",
            "Install and configure EAS CLI",
            "Run eas build for Android and iOS",
            "Submit your app using eas submit",
          ],
          resources: [
            { title: "EAS Build Docs", url: "https://docs.expo.dev/build/introduction/" },
          ],
        },
      ],
    },
  ],
};

// -------------------------------------------------------------------
// generateRoadmap(formData) — Main export
//
// formData shape:
// {
//   topic: string,       e.g. "React Native"
//   duration: string,    e.g. "3 months"
//   level: string,       e.g. "Beginner"
//   goal: string,        e.g. "Build a project"
// }
//
// Returns: Promise<Roadmap>
// -------------------------------------------------------------------

// Calculate total weeks from duration string
function getTotalWeeks(duration) {
  if (duration.includes("week")) return parseInt(duration) * 1;
  if (duration.includes("month")) return parseInt(duration) * 4;
  if (duration.includes("year")) return parseInt(duration) * 52;
  return 12;
}

// Build the prompt sent to the AI
function buildPrompt(formData) {
  const totalWeeks = getTotalWeeks(formData.duration);
  const numPhases = totalWeeks <= 4 ? 2 : 3;

  return `You are an expert technical learning coach. Generate a detailed, realistic learning roadmap.

Student details:
- Topic: ${formData.topic}
- Duration: ${formData.duration} (${totalWeeks} weeks total)
- Current level: ${formData.level}
- Goal: ${formData.goal}

Return ONLY a valid JSON object. No explanation, no markdown, no backticks. Just raw JSON.

The JSON must exactly follow this structure:
{
  "title": "<Topic> Mastery",
  "topic": "${formData.topic}",
  "duration": "${formData.duration}",
  "level": "${formData.level}",
  "goal": "${formData.goal}",
  "totalWeeks": ${totalWeeks},
  "xpTotal": ${totalWeeks * 100},
  "phases": [
    {
      "id": "phase-1",
      "name": "Phase 1 – <phase name>",
      "weeks": "<start>–<end>",
      "color": "#6C63FF",
      "description": "<2 sentence description>",
      "topics": [
        {
          "id": "week-1",
          "week": 1,
          "phase": 1,
          "title": "<week focus title>",
          "description": "<1-2 sentence description>",
          "xp": 100,
          "tasks": [
            "<concrete actionable task 1>",
            "<concrete actionable task 2>",
            "<concrete actionable task 3>",
            "<concrete actionable task 4>"
          ],
          "resources": [
            { "title": "<resource name>", "url": "<real url>" },
            { "title": "<resource name>", "url": "<real url>" }
          ]
        }
      ]
    }
  ]
}

Rules:
- Use exactly ${numPhases} phases
- Distribute ${totalWeeks} weeks evenly across phases
- Phase colors must be exactly: phase 1 = "#6C63FF", phase 2 = "#FF6584", phase 3 = "#43D9AD"
- Each week must have exactly 4 tasks — specific, actionable, and measurable
- Resources must have real, working URLs (official docs, YouTube, etc.)
- Tasks must be appropriate for a ${formData.level} level learner
- The roadmap must be goal-oriented toward: ${formData.goal}
- Week IDs: "week-1", "week-2", etc. (sequential across all phases)
- Phase IDs: "phase-1", "phase-2", etc.
- xp for each week = 100
- Return ONLY the JSON. Nothing else.`;
}

export async function generateRoadmap(formData) {
  const apiKey = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;

  // Safety check — fall back to mock if no key found
  if (!apiKey) {
    console.warn("⚠️ No OpenRouter API key found. Using mock data.");
    await new Promise((r) => setTimeout(r, 2000));
    return {
      ...MOCK_ROADMAP,
      topic: formData.topic || MOCK_ROADMAP.topic,
      duration: formData.duration || MOCK_ROADMAP.duration,
      level: formData.level || MOCK_ROADMAP.level,
      goal: formData.goal || MOCK_ROADMAP.goal,
      title: `${formData.topic || "React Native"} Mastery`,
    };
  }

  try {
    console.log("🚀 Calling OpenRouter API...");
    console.log("🔑 API key present:", !!apiKey, "| Key prefix:", apiKey?.slice(0, 12));

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://skillmap.app",
        "X-Title": "SkillMap",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: buildPrompt(formData),
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter error ${response.status}: ${errText}`);
    }

    const data = await response.json();

    // Extract the text content from the response
    const rawText = data.choices?.[0]?.message?.content || "";

    // Strip any accidental markdown fences the model might add
    const cleaned = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const roadmap = JSON.parse(cleaned);

    // Validate the response has the required shape
    if (!roadmap.phases || !Array.isArray(roadmap.phases)) {
      throw new Error("Invalid roadmap structure from AI");
    }

    return roadmap;

  } catch (error) {
    console.error("❌ AI generation failed:", error.message);
    console.error("❌ Full error:", JSON.stringify(error, null, 2));

    // Graceful fallback to mock data so the app never crashes
    console.warn("↩️ Falling back to mock roadmap.");
    return {
      ...MOCK_ROADMAP,
      topic: formData.topic || MOCK_ROADMAP.topic,
      duration: formData.duration || MOCK_ROADMAP.duration,
      level: formData.level || MOCK_ROADMAP.level,
      goal: formData.goal || MOCK_ROADMAP.goal,
      title: `${formData.topic || "React Native"} Mastery`,
    };
  }
}

// -------------------------------------------------------------------
// Helper: flatten all weeks from all phases into a single array
// Useful for the Checklist view
// -------------------------------------------------------------------
export function getAllWeeks(roadmap) {
  return roadmap.phases.flatMap((phase) => phase.topics);
}

// -------------------------------------------------------------------
// Helper: flatten all tasks across all weeks
// Returns: [{ weekId, weekTitle, task, phase, xp }, ...]
// -------------------------------------------------------------------
export function getAllTasks(roadmap) {
  return roadmap.phases.flatMap((phase) =>
    phase.topics.flatMap((week) =>
      week.tasks.map((task, index) => ({
        id: `${week.id}-task-${index}`,
        weekId: week.id,
        weekTitle: week.title,
        phaseColor: phase.color,
        phaseName: phase.name,
        task,
        xpReward: Math.floor(week.xp / week.tasks.length),
      }))
    )
  );
}
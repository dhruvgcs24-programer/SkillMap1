# SkillMap 🚀
**Your personal roadmap to technical mastery.**

SkillMap is a high-performance, visually stunning mobile application built with **React Native** and **Expo**. It provides developers with structured, interactive learning paths (roadmaps) to navigate the complex world of modern technology. Whether you're aspiring to be a Frontend Developer, Backend Engineer, or an AI Specialist, SkillMap guides you through every step with curated resources and progress tracking.

---

## ✨ Key Features

- 🗺 **Comprehensive Roadmaps**: Role-based (Frontend, Backend, etc.) and Skill-based (Python, JavaScript, etc.) paths designed for all levels.
- 📈 **Gamified Progress**: Track your learning journey with XP points, daily streaks, and mastery percentages.
- 📚 **Curated Resources**: Every topic comes with high-quality links to official documentation (MDN, Python.org), video tutorials (freeCodeCamp, Corey Schafer), and interactive courses.
- 🔐 **Secure Authentication**: Full login and signup system powered by **Supabase**.
- 🎨 **Premium UI/UX**: A sleek, dark-themed interface featuring glassmorphic elements, smooth gradients, and micro-animations.
- 💾 **Offline Caching**: Fast performance with local progress persistence using AsyncStorage.

---

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based navigation)
- **Backend**: [Supabase](https://supabase.com/) (Authentication & Real-time Database)
- **UI Components**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/), [Expo Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
- **Icons**: [Ionicons](https://icons.expo.fyi/Index) (@expo/vector-icons)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your mobile device (optional for physical testing)

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your Supabase credentials:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Running the App
Start the development server:
```bash
npx expo start
```
- Press `a` for Android Emulator
- Press `i` for iOS Simulator
- Scan the QR code with Expo Go to run on a physical device

---

## 📂 Project Structure

```text
SkillMap/
├── app/               # Expo Router pages (Screens & Layouts)
│   ├── (tabs)/        # Main tab-based navigation
│   ├── login.js       # Authentication screens
│   └── _layout.tsx    # Root layout with providers
├── src/
│   ├── components/    # Reusable UI components
│   ├── data/          # Roadmap definitions (roadmapData.js)
│   ├── services/      # Supabase and API clients
│   └── constants/     # Theme and styling constants
├── assets/            # Images, fonts, and static files
└── components/        # Shared application components
```

---

## 🗺 Current Roadmaps

| Category | Available Paths |
| :--- | :--- |
| **Role-based** | Backend Developer, Frontend Developer, AI Engineer (Coming Soon), DevOps (Coming Soon) |
| **Skill-based** | Python Mastery, JavaScript, SQL & Databases, React Native |

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add a new roadmap or improve an existing one, please check `src/data/roadmapData.js` to see the structure for modules and resources.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ for the Developer Community.


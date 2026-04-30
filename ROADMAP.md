# ROADMAP.md — Hercules Feature Status

## Status key
- ✅ Done
- 🔧 In progress / needs fix
- 📋 Planned
- 💡 Ideas / maybe later

---

## Core app

### Plans
- ✅ Create a plan (name, category, rest time, training days)
- ✅ Edit a plan
- ✅ Delete a plan
- ✅ Default plan pre-loaded (Push-ups + Squats)
- ✅ Training days picker (SU–SA)
- ✅ Rest between exercises (stepper)
- 🔧 Add exercise to plan — UI exists but missing confirm "ADD" button
- ✅ Remove exercise from plan
- ✅ Per-exercise sets / reps / rest steppers
- ✅ Plans persisted in localStorage

### Session / Workout
- ✅ Start session from plan
- ✅ Step through exercises and sets
- ✅ Rep counter display
- ✅ Rest timer between sets (circular countdown)
- ✅ Skip rest button
- ✅ Session complete screen
- ✅ XP earned on completion
- 🔧 Video animation (pushup.mp4 wired, others pending)
- 📋 Preloader on app launch (HERCULES wordmark)
- 📋 Video preload on app start (silent, background)
- 📋 Inline spinner if video not ready when session starts

### Exercise library
- ✅ Exercise list displayed (strength / cardio / boxing)
- 📋 Exercise detail view (description, muscles, tips)
- 📋 More exercise videos from Kling

### Gamification
- ✅ XP system
- ✅ Level progression
- ✅ Streak tracking
- ✅ Achievements / badges
- 📋 Weekly progress view
- 📋 Personal records (best set, most reps in a session)

### Profile
- 📋 Profile screen (name, avatar, stats summary)
- 📋 Edit profile

### PWA
- ✅ manifest.json
- ✅ Service worker (sw.js)
- ✅ Icons (192, 512, apple-touch-icon)
- ✅ Deployed on Vercel
- ✅ Installable on Android
- 📋 Test on iOS (Safari "Add to Home Screen")

### UX / Design
- ✅ Light / dark theme toggle
- ✅ Theme persisted in localStorage
- 📋 App preloader (branded, 1 second)
- 📋 Smooth video loop (reverse + stitch done in CapCut)

---

## Backlog — maybe later
- 💡 Sound effects (optional, toggleable)
- 💡 Cloud sync (if more family members use it)
- 💡 Share workout summary (screenshot-friendly completion card)
- 💡 Custom exercise creation (user-defined, not from library)
- 💡 Rest day / recovery tracking
- 💡 Weight/height input for BMI tracking (teens)

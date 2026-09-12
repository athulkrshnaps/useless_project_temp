<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# ElephantFit 🐘🏋️ — The World's Most Useless Fitness Tracker (for Elephants)


## Basic Details
### Team Name: DA


### Team Members
- Team Lead: ATHULKRISHNA PS - VJEC
- Member 2: DIYON AJU - VJEC
- Member 3: [Name] - [College]

### Project Description
ElephantFit is a fully interactive 3D fitness tracking web app built for a 5.2-ton African elephant named Jumbo. It features a real-time animated 3D elephant model on a stone turntable, 6 workout routines with physically accurate anatomical deformations (trunk curls, squats, ear flaps, walks, and mud-pool recovery), a peanut addiction tracker, a motivational AI coach named Trompo, and authentic elephant audio (rumble + trumpet). Nobody asked for this. We built it anyway.

### The Problem (that doesn't exist)
Elephants are dangerously unfit. There are ZERO fitness apps on the market designed for a 5-ton pachyderm. No step counter supports hooves. No calorie tracker accounts for 200kg of daily vegetation intake. And absolutely no gym coach understands the biomechanics of a trunk curl with a 150kg acacia log. This is a crisis that nobody is talking about.

### The Solution (that nobody asked for)
A beautifully over-engineered React + Three.js web application where you manage an elephant's fitness journey — complete with 3D animated workouts, a "Peanut Overload" meter (elephants love peanuts too much), a Coach Trompo who yells motivational compliments every 7 seconds, infrasonic rumble sound effects, and the ability to reset everything and start fresh with a brand-new elephant. It's the Peloton of the savanna. You're welcome.

## Technical Details
### Technologies/Components Used
For Software:
- **Languages:** JavaScript (ES6+), HTML5, CSS3
- **Frameworks:** React 18, Vite 6, Tailwind CSS 3
- **Libraries:** Three.js (WebGL 3D rendering), three-stdlib GLTFLoader (3D model loading), Lucide React (icons), Web Audio API (procedural elephant sounds)
- **Tools:** Node.js, npm, Git, GitHub

### Implementation
For Software:

# Installation
```bash
git clone https://github.com/athulkrshnaps/useless_project_temp.git
cd useless_project_temp
npm install
```

# Run
```bash
npm run dev
```
Then open http://localhost:5173 in your browser.

# Build for Production
```bash
npm run build
```

## Features
- 🐘 **Real 3D Elephant Model** — Authentic `.glb` model rendered on a circular stone turntable with savanna backdrop
- 🏋️ **6 Animated Workouts** — Trunk Curls (150kg Acacia Log), 5-Ton Squats, Ear Flap Aerobics, Forest Walk, Distance Walk, Mud-Pool Recovery
- 🎽 **Coach Trompo** — Context-aware AI coach that shouts motivational compliments based on Jumbo's stats (rotates every 7 seconds)
- 🥜 **Peanut Addiction Tracker** — Monitors unhealthy snacking. Hit 90% and Jumbo trembles in a Peanut Overload meltdown
- 🔊 **Authentic Audio** — Custom `rumble.mp3` and `trumpet.mp3` support with Web Audio synthesis fallback
- 📐 **360° Interactive Turntable** — Drag to rotate, scroll to zoom, 5 camera presets (Front, 3/4 Angle, Back, Side, Reset)
- 🔄 **Reset / New Elephant** — Wipe all stats and start fresh from the navbar profile dropdown
- 📱 **Fully Responsive** — Works on desktop and mobile

### Project Documentation
For Software:

# Screenshots (Add at least 3)
<img width="1917" height="918" alt="Home Page" src="https://github.com/user-attachments/assets/db6a6f5a-9ea0-446d-96ba-9aa2d3366c97" />

*Home page — 3D animated Jumbo on stone turntable with glassmorphic stats card and Coach Trompo motivational bubble*

<img width="1908" height="965" alt="image" src="https://github.com/user-attachments/assets/7c66832c-4a53-4623-b197-28d4b406c6f1" />

*Trunk Curls workout — Jumbo lifting a 150kg Acacia Log with anatomically accurate trunk deformation*

<img width="1917" height="915" alt="image" src="https://github.com/user-attachments/assets/9684d032-c03c-4285-819a-67a9865c2052" />

*Peanut Overload — Jumbo trembling after eating too many peanuts, Coach Trompo yelling to stop*

# Diagrams
![Workflow](Add your workflow/architecture diagram here)
*Architecture: React Context (state) → HomePage (3D stage + Coach) → Jumbo3DViewer (Three.js + vertex deformation) → SoundEngine (preloaded audio pool)*

### Project Demo
# Video
[Add your demo video link here]
*Full walkthrough: 3D elephant on turntable → Trunk Curls workout → Peanut feeding → Coach Trompo motivational messages → Reset to new elephant*

# Additional Demos
[Add any extra demo materials/links]

## Team Contributions
- Athulkrishna PS: Project lead, concept design, 3D implementation, workout animations, audio engine
- Diyon Aju: UI/UX design, component architecture, testing
- [Name 3]: [Specific contributions]

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)

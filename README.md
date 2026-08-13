# Official Documentation: MLSC VCET Website

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mlsc-website-kappa.vercel.app/)

> **🌐 Live Web App**: [https://mlsc-website-kappa.vercel.app/](https://mlsc-website-kappa.vercel.app/)  
> **📹 Live Demo Video**: [Watch Demo Video](DevSolanki13_MLSC-website_%20Official%20MLSC%20VCET%20Website%20build%20with%20React%20and%20Firebase.%20-%20Google%20Chrome%202026-08-14%2002-22-34.mp4)

Welcome to the official documentation for the **Microsoft Learn Student Club (MLSC) VCET Website**! This repository powers the official club platform, showcasing flagship workshops, open-source student projects, club leadership, data insights, and interactive student utilities.

---

## 🌟 Newly Integrated Features & Enhancements

### 1. 📌 My MLSC Favorites System (`/favorites`)
* **Custom Hook (`useFavorites`) & Context (`FavoritesContext`)**: A reactive state management wrapper around `localStorage` (`mlsc_favorites_v1`) with cross-tab browser synchronization (`storage` event listener).
* **Bookmark & Heart Action Buttons**: Integrated accessible bookmark buttons on all Event Cards and Project Tiles (`aria-pressed`, `aria-label`, `tabIndex={0}`).
* **Dedicated Favorites Dashboard**: Route `/favorites` displaying saved items in a responsive grid, equipped with category filter tabs (*All Items*, *Events*, *Projects*) and friendly empty-state CTAs (*"Browse Events"*, *"Explore Projects"*).
* **Click Propagation Safeguards**: Project tiles utilize `e.stopPropagation()` on bookmark and share clicks to prevent accidental navigation to item detail pages.

### 2. 🔗 One-Click Share System
* **Native Web Share & Clipboard Fallback**: Share buttons on all Event Cards and Project Tiles. Uses `navigator.share()` on mobile devices or copies the direct URL to the clipboard with an instant confirmation toast alert (*"Copied link for 'ReactJS Workshop' to clipboard!"*).

### 3. 📊 MLSC Impact Dashboard ("MLSC in Numbers")
* **Data-Driven Aggregate Insights**: Mines real JSON data from `eventsData`, `projectData.json`, and `data.json` to tell a compelling story of community reach.
* **Top 4 KPI Counter Cards**: Animated metric numbers for *Students Impacted* (880+), *Flagship Workshops* (6+), *Technical Projects Built* (10+), and *Core Team Leads* (28+) using `react-countup`.
* **Animated Project Category Bar Chart**: Glowing progress bars visualizing project distribution across *Web Development*, *AI & Machine Learning*, and *Mobile Apps*.
* **Interactive Event Milestone Timeline**: A vertical connected timeline of major club events. **Clicking any milestone card pops up the full Event Details Modal**!

### 4. 🔮 High-End UX Polish & Accessibility
* **Undo Toast Notifications**: Floating toast notification system with a 4-second **"Undo"** button when an item is un-bookmarked.
* **Dynamic Route Titles**: Per-page document title updates (`Home | MLSC VCET`, `Events & Workshops | MLSC VCET`, `My MLSC | Saved Items`).
* **Floating Scroll-To-Top**: Smooth floating action button appearing after 300px scroll depth.
* **Shimmer Skeleton Loader**: Animated card skeleton loader replacing static spinners for seamless visual loading (`loading.jsx`).

---

## 🛠️ System Architecture & Data Flow

```
                           ┌─────────────────────────────┐
                           │   FavoritesContext Provider │
                           │   (localStorage Sync Engine)│
                           └──────────────┬──────────────┘
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
   ┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
   │  Event / Project │          │   Navbar Badge   │          │   My MLSC Page   │
   │ Bookmark & Share │          │  Count Indicator │          │   (/favorites)   │
   └────────┬─────────┘          └──────────────────┘          └────────┬─────────┘
            │                                                           │
            └───────────────────►  Toast Alert System  ◄────────────────┘
                                  (with 4s Undo Option)
```

---

## 📦 Technologies Used

- `Vite` & `React.js`
- `React Router v6`
- `Context API & Custom Hooks`
- `GSAP` & `Vanta.js`
- `React CountUp`
- `React Icons`
- `Firebase` & `Vercel`

---

## 💻 Running the MLSC VCET Website Locally

### Prerequisites
- **Node.js:** Make sure Node.js is installed. Download it from [here](https://nodejs.org/).

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Microsoft-Learn-Students-Club/MLSC-website.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd MLSC-website
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run the application:**
   ```bash
   npm run dev
   ```
   This command starts the development server at [http://localhost:5173](http://localhost:5173).

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 👥 Maintainers

The MLSC VCET Website is actively maintained and developed by the club web team:

- **Paarth Baradia** — MLSA - Club Lead
- **Mukesh Billa** — GitHub: [bmukesh23](https://github.com/bmukesh23)
- **Adarsh Gupta** — GitHub: [Adarsh7825](https://github.com/Adarsh7825)

# MLSC VCET — New Features & System Documentation

> **Official Feature Specification & Technical Architecture Guide**  
> *Microsoft Learn Student Club (MLSC) VCET Web Platform*

---

## 📋 Executive Summary

This document details the architecture, design patterns, data schemas, and user workflows for all newly integrated features on the **MLSC VCET Website**. These additions enhance real student utility, data visualization, accessibility, and platform polish.

---

## 📌 Feature 1: My MLSC Favorites System (`/favorites`)

### 1. Overview
Allows students to bookmark upcoming workshops, flagship events, and student projects to revisit later. Saved items persist across browser sessions and synchronize in real-time across open browser tabs.

### 2. Technical Architecture
* **State Engine (`FavoritesContext.jsx`)**: Global React Context provider managing state `{ events: string[], projects: string[] }`.
* **Custom Hook (`useFavorites.js`)**: Exposes `favorites`, `toggleFavorite(id, type, title)`, `isFavorited(id, type)`, `favoritesCount`, and `shareItem(title, path)`.
* **Storage Schema (`localStorage`)**:
  ```json
  {
    "events": ["reactjs-workshop", "sql-workshop-kantascrypt"],
    "projects": ["mlsc-website", "feedback-chatbot"]
  }
  ```
* **Cross-Tab Synchronization**: Uses a `storage` event listener to automatically update saved items if modified in another tab.

### 3. Component Integrations
* **Event Cards (`Events.jsx`)**: Action bar featuring a interactive **Save / Saved** bookmark button with state icons (`FaBookmark` / `FaRegBookmark`).
* **Project Tiles (`Projects.jsx`)**: Floating circular bookmark icon button with `e.stopPropagation()` to prevent accidental modal navigation.
* **Dedicated Route (`/favorites`)**:
  - Filter tabs: *All Items*, *Events*, *Projects*.
  - Empty-state view with direct CTAs (*"Browse Events"*, *"Explore Projects"*).

---

## 📌 Feature 2: One-Click Web Share & Clipboard System

### 1. Overview
Enables students to easily share MLSC workshops and open-source projects with classmates on social media and messaging platforms.

### 2. Implementation
* **Native Web Share API**: Invokes `navigator.share()` on supported mobile browsers.
* **Clipboard Fallback**: On desktop browsers, copies the direct URL (`window.location.origin + path`) to the clipboard.
* **Toast Feedback**: Triggers an instant toast confirmation alert: *"Copied link for '[Title]' to clipboard!"*.

---

## 📌 Feature 3: Live Navigation Bar Counter Badge

### 1. Overview
A real-time numerical badge indicator on the top navigation bar (`Navbar.jsx`).

### 2. Behavior
* Displays next to the **"My MLSC"** nav link.
* Updates dynamically whenever an item is bookmarked or removed from anywhere on the site.

---

## 📌 Feature 4: MLSC Impact Dashboard ("MLSC in Numbers")

### 1. Overview
A data-driven analytics section integrated into the Home page that aggregates data from `eventsData`, `projectData.json`, and `data.json`.

### 2. Core Visual Layers
1. **Top 4 KPI Counter Cards**:
   - *Students Impacted*: 880+ (Animated using `react-countup`)
   - *Flagship Workshops*: 6+
   - *Technical Projects Built*: 10+
   - *Core Team Leads*: 28+
2. **Animated Project Category Bar Chart**:
   - Visual progress bars for *Web Development*, *AI & Machine Learning*, and *Mobile Apps*.
3. **Interactive Event Milestone Timeline**:
   - Connected vertical timeline showing attendance numbers and event dates.
   - **Click Event Handler**: Clicking any timeline milestone card pops up the full **Event Details Modal**!

---

## 📌 Feature 5: Comprehensive UX Polish & Accessibility

### 1. Floating Toast Notifications with "Undo" Support
* **Location**: Floating alert at bottom-right of the screen.
* **Undo Functionality**: On un-bookmarking, displays a **4-second "Undo"** button that restores the removed item instantly if clicked.

### 2. Per-Route Dynamic Page Titles
* Automatically updates `document.title` on route changes:
  - `/`: `Home | MLSC VCET`
  - `/events`: `Events & Workshops | MLSC VCET`
  - `/projects`: `Student Projects | MLSC VCET`
  - `/favorites`: `My MLSC | Saved Items`

### 3. Floating "Scroll to Top" Button
* Bottom-left floating action button that appears when scrolled down > 300px, providing smooth scrolling back to the top of the page.

### 4. Shimmer Skeleton Loading State
* Modern animated skeleton card placeholders (`loading.jsx`) replacing static spinners during content load.

---

## 📐 System Architecture Diagram

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

## 🔍 Verification & Quality Control Summary

| Test Case | Method | Status |
| :--- | :--- | :---: |
| **Production Build** | `npm run build` | ✅ PASSED (0 errors) |
| **Persistence Sync** | Refresh browser & cross-tab test | ✅ PASSED |
| **Undo Toast Action** | Un-bookmark & click Undo | ✅ PASSED |
| **Timeline Event Modal** | Click timeline milestone item | ✅ PASSED |
| **Accessibility Audit** | `aria-pressed`, `aria-label`, focus states | ✅ PASSED |

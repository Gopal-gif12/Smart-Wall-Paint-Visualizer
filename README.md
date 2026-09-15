# 🎨 Smart Wall Paint Visualizer

> **MEAN Stack Virtual Room Paint & Design Preview Application**  
> An interior visualization solution designed to preview authentic paint colors, sheen finishes, and wallpaper patterns directly onto real room photos before painting.

---

## 🌟 Overview & Problem Solved
Choosing the right wall paint color is one of the most critical and expensive home improvement decisions. Physical shade cards and showroom displays fail to represent how colors appear in actual rooms due to differences in natural lighting, room dimensions, and surface shadows.

**Smart Wall Paint Visualizer** solves this problem by allowing users to:
1. Upload real room photographs (or test with architectural room templates).
2. Manually isolate wall areas with high-precision **polygon** and **brush** selection tools.
3. Apply 60+ authentic shades (inspired by **Behr®**, **Asian Paints®**, and **Dulux®**) using realistic **luminance-preserving blending** that keeps natural shadows and lighting gradients intact.
4. Simulate realistic paint finishes (**Matte**, **Eggshell**, **Satin**, **Semi-Gloss**, **Glossy**) and dual-tone walls.
5. Compare original and painted rooms with an interactive **Before & After Split Slider**.
6. Save projects to an account and export painter-ready high-resolution plans with color swatch legends.
7. Manage color catalogs and monitor usage metrics through an **Admin Analytics Dashboard**.

---

## 🛠️ Technology Stack (MEAN)

| Layer | Technologies |
|---|---|
| **Frontend** | **Angular 20+** (Standalone Components, Signals, Reactive Architecture), **HTML5 Canvas 2D Engine**, **TypeScript**, **CSS3 Custom Design System** |
| **Backend** | **Node.js**, **Express.js**, RESTful APIs, **Multer** (Media Uploads), **JWT Authentication**, **Bcrypt.js** |
| **Database** | **MongoDB** via Mongoose + **Zero-Config Persistent Fallback Store** (Runs out-of-the-box even without a local MongoDB service) |
| **Design Aesthetics** | Obsidian dark luxe palette, glassmorphism, Google Fonts (`Outfit` & `Inter`), FontAwesome icons |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ or v20+ recommended)
- `npm`

### Step 1: Clone or Navigate to Directory
```powershell
cd C:\Users\Lucky\.gemini\antigravity-ide\scratch\smart-wall-paint-visualizer
```

### Step 2: Install Dependencies
```powershell
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 3: Run the Backend API Server
```powershell
cd server
node server.js
```
The server will start on **http://localhost:5000**.  
*(It will automatically connect to MongoDB if available, or seamlessly activate the built-in zero-config persistent datastore)*.

### Step 4: Run the Angular Frontend
In a separate terminal window:
```powershell
cd client
npm start
```
The Angular application will open at **http://localhost:4200**.

---

## 🔑 Default Credentials

The system seeds default test accounts on first launch:

| Role | Email | Password | Access |
|---|---|---|---|
| **Administrator** | `admin@visualizer.com` | `admin123` | Full admin analytics, add/edit/delete paint colors, wallpaper management |
| **Demo User** | `user@visualizer.com` | `user123` | Save room designs, favorite shades, visualizer studio |

*(You can also use the **1-Click Demo Login** buttons on the navigation bar or Sign In page for instant access!)*

---

## 📐 Application Architecture & Functional Pages

### 1. Landing / Home (`/`)
- Hero section with a **live interactive wall color simulator**.
- Value proposition cards (Polygon Tool, Shadow-Preserving Blending, Dual-Tone, Painter Export).
- Architectural sample room showcase (Living Room, Bedroom, Dining Room, Kitchen) with 1-click launch into the studio.

### 2. Visualizer Studio (`/visualizer`)
- **HTML5 Canvas Engine**:
  - **Polygon Selection Tool**: Click corners to mark wall perimeters; click the green start handle to close. Movable vertex handles for fine-tuning.
  - **Brush & Eraser Tools**: Freehand painting and touch-ups.
  - **Wall Layers**: Add multiple independent wall zones (e.g. Wall 1 - Main Accent, Wall 2 - Side Wall, Wall 3 - Ceiling).
  - **Sheen Finishes**: Matte (diffuse reflection), Eggshell, Satin, Semi-Gloss, and High-Gloss (specular highlights).
  - **Dual-Tone Walls**: Horizontal or vertical split lines with adjustable split ratios and secondary color selection.
  - **History Stack**: Multi-step Undo (`Ctrl+Z`) and Redo.
  - **Export High-Res Plan**: Generates downloadable PNG with attached color card legend (shade name, code, brand, and finish).

### 3. Before & After Comparison (`/compare`)
- Interactive **Draggable Vertical Split Slider**: Drag across the room to reveal the transformation from original to painted.
- **Side-by-Side View**: Compare both rooms concurrently.
- Comparison snapshot export.

### 4. Color & Pattern Explorer (`/colors`)
- Search by shade name, code, or HEX.
- Filter by color family (Warm Neutrals, Ocean Blues, Forest Greens, Terracotta, Pastels, Modern Greys, Royal Accents).
- Filter by brand (Behr, Asian Paints, Dulux).
- 1-Click HEX copy to clipboard.
- Bookmark favorite colors to user account.
- "Try in Studio" button to instantly test a shade.
- Seamless decorative wallpaper patterns tab (Nordic Hex, Chevron, Brick, Woven Linen, Acoustic Slats).

### 5. My Saved Designs (`/projects`)
- Portfolio grid of user's saved room projects.
- Displays room type, date, and color swatch indicators.
- One-click actions: **Re-open in Studio**, **Download Image**, and **Delete**.

### 6. Admin Management & KPI Dashboard (`/admin`)
- Real-time KPI summary cards: Total room uploads, saved designs, registered users, and active catalog shades.
- **Color Shade Manager**: Add new shade with live color picker, edit details, or remove shades.
- **Pattern Texture Manager**: Add/remove wallpaper patterns.
- **User Activity Log**: Real-time record of user room mockups.

### 7. Interactive Step-by-Step Guide
- Accessible from the header **"Guide"** button at any time.
- 4-step illustrated modal walking users through photo upload, polygon outlining, paint application, and export.

---

## 📡 RESTful API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user/admin
- `POST /api/auth/login` - Authenticate and return JWT
- `GET /api/auth/me` - Get current user profile (JWT protected)
- `POST /api/auth/favorite` - Toggle user's favorite color shade

### Colors (`/api/colors`)
- `GET /api/colors` - List shades (query: `category`, `brand`, `search`, `popular`)
- `GET /api/colors/:id` - Get single shade
- `POST /api/colors` - Add new shade *(Admin only)*
- `PUT /api/colors/:id` - Update shade *(Admin only)*
- `DELETE /api/colors/:id` - Delete shade *(Admin only)*

### Patterns (`/api/patterns`)
- `GET /api/patterns` - List wallpaper patterns
- `POST /api/patterns` - Create pattern *(Admin only)*
- `DELETE /api/patterns/:id` - Delete pattern *(Admin only)*

### Projects (`/api/projects`)
- `GET /api/projects` - Get user's saved room designs (JWT protected)
- `GET /api/projects/samples/rooms` - Get pre-configured architectural sample rooms
- `GET /api/projects/:id` - Get specific room project
- `POST /api/projects` - Save new room project (JWT protected)
- `PUT /api/projects/:id` - Update room project
- `DELETE /api/projects/:id` - Delete room project

### Admin (`/api/admin`)
- `GET /api/admin/stats` - Retrieve KPI statistics and analytics *(Admin only)*

### Media Uploads (`/api/upload`)
- `POST /api/upload` - Upload room image (accepts JPG, PNG, WebP via Multer)

---

## 🎨 Design System & Color Tokens

- **Primary Brand Gradient**: `linear-gradient(135deg, #6366F1, #3B82F6, #06B6D4)`
- **Luxe Background Surfaces**: `#090D16`, `#101623`, `#161F31`
- **Typography**: Google Fonts `Outfit` (Headings) and `Inter` (Body text)
- **Glassmorphism**: Backdrop blur with subtle borders (`rgba(255, 255, 255, 0.08)`)

---

## 📄 License & Credits
Developed as a full-stack MEAN demonstration application based on the **Unified Mentor** specification and **Behr Paint Visualizer** reference.

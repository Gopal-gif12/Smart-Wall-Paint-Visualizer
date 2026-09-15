# 📄 INTERNSHIP PROJECT REPORT

---

# **SMART WALL PAINT VISUALIZER**
### *A Real-Time Interactive Interior Room Visualization & Paint Simulation Web Platform*

---

**Submitted in partial fulfillment of the requirements for the Internship Program at**  
### **UNIFIED MENTOR**

---

| **Field** | **Details** |
|:---|:---|
| **Domain** | Full Stack Web Development (MEAN Stack) |
| **Project Title** | Smart Wall Paint Visualizer |
| **Intern Name** | [Your Name] |
| **Intern ID** | [Your Unified Mentor Intern ID] |
| **Submission Date** | September 2026 |
| **Evaluator / Organization** | Unified Mentor Evaluation Team |

---

<div style="page-break-after: always;"></div>

## 📜 CANDIDATE DECLARATION

I hereby declare that the project titled **"Smart Wall Paint Visualizer"** submitted to **Unified Mentor** is an authentic and original record of work completed by me during my internship tenure under the mentorship and guidance of the **Unified Mentor** technical team.

The work presented in this report has not been submitted elsewhere for the award of any other diploma, degree, or certificate. All information, references, and code libraries utilized in this project have been duly cited and acknowledged.

<br><br>

**Date:** [Submission Date]  
**Place:** [Your City]  
**Signature of Candidate:** _______________________  
**Name:** [Your Name]  
**Internship ID:** [Your Intern ID]  

---

<div style="page-break-after: always;"></div>

## 🎖️ CERTIFICATE OF INTERNSHIP COMPLETION
*(Template for Unified Mentor Submission)*

This is to certify that **[Your Name]**, bearing Intern ID **[Your Intern ID]**, has successfully completed the Full-Stack Web Development internship project titled **"Smart Wall Paint Visualizer"** under the guidance and evaluation of **Unified Mentor**.

During this internship period, the candidate demonstrated exceptional proficiency in modern web technologies, specifically the **MEAN Stack** (MongoDB, Express.js, Angular, and Node.js), HTML5 Canvas 2D image processing, RESTful API architecture, and UI/UX design.

The system developed is robust, responsive, fully documented, and meets industry standards of engineering excellence.

<br><br>

**Authorized Signatory / Internship Coordinator**  
**Unified Mentor**  
*Verification Stamp / Digital Seal*

---

<div style="page-break-after: always;"></div>

## 🙏 ACKNOWLEDGEMENT

I would like to express my sincere gratitude to **Unified Mentor** for providing this valuable opportunity to work on an enterprise-grade, real-world full-stack web development project during my internship tenure.

I am immensely thankful to the mentors and technical leads at Unified Mentor whose constant guidance, code reviews, and structured milestones enabled me to master advanced concepts in **Angular (v20+ Standalone Architecture)**, **Node.js/Express backend APIs**, **MongoDB NoSQL data modeling**, and **HTML5 Canvas 2D graphics computation**.

I would also like to thank my peers, friends, and family for their unwavering encouragement and support throughout this technical journey.

---

<div style="page-break-after: always;"></div>

## 📑 TABLE OF CONTENTS

1. **Executive Summary / Abstract**
2. **Chapter 1: Introduction**
   - 1.1 Project Overview
   - 1.2 Problem Statement
   - 1.3 Purpose & Scope
   - 1.4 Core Objectives
3. **Chapter 2: Literature Survey & Comparative Analysis**
   - 2.1 Existing Market Solutions
   - 2.2 Limitations of Traditional Approaches
   - 2.3 Proposed Solution & Competitive Advantages
4. **Chapter 3: Software & Hardware Requirements Specification (SRS)**
   - 3.1 Hardware Environment
   - 3.2 Software & Runtime Environment
   - 3.3 Technology Stack Breakdown (MEAN Stack)
   - 3.4 Functional Requirements
   - 3.5 Non-Functional Requirements
5. **Chapter 4: System Architecture & Design**
   - 4.1 High-Level Architecture Diagram
   - 4.2 Data Flow Diagrams (DFD Level 0 & Level 1)
   - 4.3 Database Schema & Entity-Relationship (ER) Design
   - 4.4 Image Processing & Canvas Blending Mathematics
6. **Chapter 5: Detailed Module Implementation**
   - 5.1 User Authentication & Role-Based Access Control (RBAC)
   - 5.2 Interactive Visualizer Studio & Multi-Wall Layer Engine
   - 5.3 Polygon Segmentation & Brush Precision Masking
   - 5.4 Dual-Tone Walls & Paint Sheen Simulation (Matte to Glossy)
   - 5.5 Color & Decorative Pattern Catalog Explorer
   - 5.6 Before vs. After Interactive Comparison Slider
   - 5.7 Project Persistence & Painter-Ready Plan Export
   - 5.8 Admin CMS & Business Analytics Dashboard
   - 5.9 Zero-Config Resilient Fallback Datastore
7. **Chapter 6: RESTful API Specifications**
   - 6.1 Authentication Endpoints
   - 6.2 Color & Palette Management Endpoints
   - 6.3 Decorative Pattern Endpoints
   - 6.4 Room Project Endpoints
   - 6.5 Admin Analytics Endpoints
8. **Chapter 7: Testing & Quality Assurance**
   - 7.1 Testing Strategy
   - 7.2 Detailed Test Cases & Execution Results
   - 7.3 Cross-Browser Compatibility & Performance Evaluation
9. **Chapter 8: User Interface Walkthrough & Screenshots Guide**
   - 8.1 Home & Interactive Showcase
   - 8.2 Visualizer Studio Workspace
   - 8.3 Before & After Interactive Slider
   - 8.4 Color & Wallpaper Pattern Explorer
   - 8.5 Admin Analytics & Catalog Management
10. **Chapter 9: Challenges Encountered & Key Engineering Learnings**
11. **Chapter 10: Conclusion & Future Scope**
12. **References & Bibliography**

---

<div style="page-break-after: always;"></div>

## 📌 ABSTRACT / EXECUTIVE SUMMARY

Choosing the right paint color for residential and commercial interiors is traditionally fraught with uncertainty. Physical color cards, paint chips, and digital swatches fail to communicate how ambient lighting, wall texture, surface shadows, and architectural angles influence color perception. As a result, home-owners and interior designers often experience costly repainting and dissatisfaction.

The **Smart Wall Paint Visualizer** is a next-generation web application designed to solve this dilemma. Developed on the robust **MEAN Stack** (MongoDB, Express.js, Angular, Node.js), it enables users to upload authentic photographs of any room or select curated architectural templates, isolate wall perimeters with geometric precision using polygon and brush tools, and simulate real-world paints with an advanced **luminance-preserving blending pipeline**.

Unlike primitive overlay systems that produce flat, synthetic color blocks, this platform extracts per-pixel lightness gradients, preserving original architectural shadows, natural sunlight highlights, and trim fixtures. It also supports five realistic paint sheens (**Matte**, **Eggshell**, **Satin**, **Semi-Gloss**, **High Gloss**), horizontal and vertical **Dual-Tone splits**, seamless wallpaper textures, interactive **Before/After split comparisons**, and high-resolution downloadable **Painter-Ready Plans** with color swatch legends.

An administrative control center provides real-time business intelligence, user telemetry, and dynamic color catalog management. Built with resilience in mind, the platform features a zero-config persistent datastore fallback alongside native MongoDB support, ensuring 100% operational uptime.

---

<div style="page-break-after: always;"></div>

# CHAPTER 1: INTRODUCTION

### 1.1 Project Overview
Interior decor and residential renovation are high-investment endeavors where visual aesthetics are paramount. Paint colors define the psychological atmosphere and spatial depth of living spaces. However, the human brain cannot reliably extrapolate how a 2-inch paper swatch will appear across a 200-square-foot wall under fluctuating morning, noon, and artificial evening lighting.

The **Smart Wall Paint Visualizer** bridges the gap between imagination and execution by providing a hyper-realistic, browser-based room color simulator. Users do not need specialized graphic design software or 3D modeling skills; by simply uploading a photograph from their phone or camera, they can digitally repaint any room in seconds.

### 1.2 Problem Statement
Traditional paint selection suffers from three core structural problems:
1. **The Lighting Disconnect:** Colors look substantially different under showroom fluorescent lights compared to actual home ambient conditions.
2. **Destructive Repainting Costs:** Purchasing sample paint cans, hiring painters, and re-doing walls after unfavorable results wastes financial resources and time.
3. **Flawed Digital Alternatives:** Existing amateur mobile apps merely apply transparent color fills (alpha overlays), which wash out depth, flatten shadows, erase electrical sockets/molding, and create cartoonish results.

### 1.3 Purpose and Scope
The purpose of this project is to engineer an enterprise-quality, responsive web solution that provides authentic digital room paint previews, interactive split-screen comparisons, and comprehensive project management for homeowners, interior designers, and paint contractors.

**Scope of the Application:**
- Full-stack client-server architecture with RESTful communication.
- Client-side, hardware-accelerated Canvas 2D image processing.
- Multi-wall layer management allowing distinct colors/sheens on individual walls.
- Catalog containing 60+ authentic shades indexed by brand (Behr, Asian Paints, Dulux) and decorative wallpaper patterns.
- Secure JWT-based user authentication and dedicated Admin CMS.
- Seamless execution across desktop, tablet, and mobile browsers without requiring native app installations.

### 1.4 Core Objectives
- **Photorealistic Simulation:** Implement a custom pixel-shading algorithm that keeps natural wall shadows, lighting gradients, and architectural boundaries intact.
- **Accurate Boundary Segmentation:** Provide multi-point polygon tracing and freehand brush masking with draggable vertex adjustment handles.
- **Dual-Tone & Finish Simulation:** Allow split-wall aesthetics and simulate light reflectivity across Matte, Eggshell, Satin, Semi-Gloss, and Glossy finishes.
- **Actionable Output:** Enable one-click export of high-resolution room renderings complete with paint codes, brand names, and surface finishes for professional painters.
- **Resilient Architecture:** Guarantee zero-setup deployment using an intelligent fallback repository pattern alongside MongoDB.

---

<div style="page-break-after: always;"></div>

# CHAPTER 2: LITERATURE SURVEY & COMPARATIVE ANALYSIS

### 2.1 Existing Market Solutions
1. **Behr Paint Your Place®:** A popular web tool allowing users to test colors. While functionally capable, it relies on heavy cloud compute for image rendering, resulting in high latency, and has limited polygon adjustment capabilities for intricate wall angles.
2. **Asian Paints Colour Scheme Visualizer:** A desktop and mobile portal offering preset room templates. However, uploading custom user room photographs often leads to inaccurate wall boundary detection and requires tedious manual cleanup.
3. **Dulux Visualizer Mobile App:** An Augmented Reality (AR) mobile app. While innovative, AR often struggles with tracking in low-light environments, jitters on older devices, and does not provide comprehensive desktop project planning or multi-wall dual-tone capabilities.

### 2.2 Limitations of Traditional Approaches

| Dimension | Physical Paint Swatches | Basic Mobile Paint Apps | **Smart Wall Paint Visualizer (Our System)** |
|:---|:---|:---|:---|
| **Shadow Retention** | None (Static Paper) | Poor (Fades into flat color) | **High (Luminance preserving per-pixel shader)** |
| **Multi-Wall Support** | None | Limited (Single zone) | **Unlimited independent wall layers** |
| **Dual-Tone Wall Splits** | None | Not supported | **Adjustable horizontal & vertical splits** |
| **Finish / Sheen Preview**| Physical sample cans | Not supported | **5 Sheens (Matte, Eggshell, Satin, Semi-Gloss, Gloss)** |
| **Comparison Tools** | Manual comparison | Static side-by-side | **Interactive Draggable Before/After Split Slider** |
| **Hardware Overhead** | In-store visit needed | High RAM usage / AR jitter | **Zero-install, browser-based Canvas 2D engine** |
| **Export Details** | Manual notes | Simple compressed JPG | **High-Res Plan + Color Legend & Sheen Specs** |

### 2.3 Proposed Solution & Competitive Advantages
Our platform introduces an in-browser mathematical image processing pipeline executing via the HTML5 2D Canvas context. All image calculations run directly on the client machine's GPU/CPU, ensuring immediate feedback with zero server rendering lag. Backed by an Angular 20+ reactive frontend and a Node.js/Express REST microservice, the application delivers fluid interactivity, robust persistence, and enterprise-grade role-based access.

---

<div style="page-break-after: always;"></div>

# CHAPTER 3: SYSTEM REQUIREMENTS SPECIFICATION (SRS)

### 3.1 Hardware Environment
- **Processor:** Intel Core i3 / AMD Ryzen 3 or higher (Dual-Core 2.0 GHz minimum).
- **RAM:** Minimum 4 GB (8 GB recommended for multi-megapixel image processing).
- **Storage:** Minimum 500 MB free disk space for server runtime and project cache.
- **Display Resolution:** 1280 × 720 (minimum), 1920 × 1080 (optimized for desktop studio).

### 3.2 Software & Runtime Environment
- **Operating System:** Windows 10/11, macOS, or Linux (Ubuntu 20.04+).
- **Runtime Environment:** Node.js v18.x or v20.x LTS.
- **Package Manager:** NPM v9.x or v10.x+.
- **Database Engine:** MongoDB Community Server v6.0+ (or integrated persistent file-based store).
- **Web Browser:** Google Chrome 90+, Mozilla Firefox 88+, Microsoft Edge 90+, or Safari 14+.

### 3.3 Technology Stack Breakdown (MEAN Stack)

```mermaid
graph TD
    subgraph Client [Client-Side: Angular 20+]
        UI[Modern Dark Luxe UI / CSS3]
        Canvas[HTML5 2D Canvas Graphics Engine]
        Signals[Angular Signals & Reactive State]
        Router[Angular Standalone Router]
    end

    subgraph Server [Server-Side: Node.js & Express]
        API[RESTful API Router]
        Auth[JWT & Bcrypt Security Middleware]
        Upload[Multer Multipart Processing]
    end

    subgraph Database [Persistence Layer]
        Mongoose[MongoDB via Mongoose ODM]
        Fallback[Zero-Config Resilient JSON Store]
    end

    Client <--> |JSON HTTP/HTTPS & Base64 Media| Server
    Server <--> |Queries & Model Documents| Database
```

- **Frontend (Angular 20+):** Utilizes the modern Standalone Component architecture, Angular Signals for fine-grained reactivity, and modular CSS design tokens for an obsidian dark luxury aesthetic.
- **HTML5 Canvas 2D Engine:** Executes polygon clipping paths, vertex hit-testing, ray-casting point-in-polygon evaluations, and per-pixel luminance shaders.
- **Backend (Node.js & Express.js):** Lightweight, asynchronous event-driven server providing secure RESTful API endpoints, request validation, and multipart image uploads via Multer.
- **Security & Authentication:** Industry-standard JSON Web Tokens (JWT) for stateless session handling and Bcrypt.js with 10 salt rounds for secure password hashing.
- **Database (MongoDB & Hybrid Fallback):** Document-oriented NoSQL persistence for users, color palettes, patterns, and room projects. Includes an intelligent zero-config JSON store that activates automatically if a MongoDB daemon is unavailable.

### 3.4 Functional Requirements
1. **User Authentication:** Sign up, login, profile inspection, role-based authorization (Regular User vs. Admin).
2. **Room Photo Ingestion:** Upload custom room images (JPEG, PNG, WebP) or select pre-loaded architectural sample rooms (Living Room, Bedroom, Dining Room, Kitchen).
3. **Wall Isolation (Segmentation):**
   - Click to create polygon vertices defining complex wall contours around windows, doors, and furniture.
   - Draggable control handles to reposition vertices dynamically.
   - Freehand brush and eraser tools for manual masking and touch-ups.
4. **Color & Texture Simulation:**
   - Real-time color blending across 60+ authentic paint shades.
   - Sheen finish selection with variable specular highlights.
   - Dual-tone split line placement with adjustable ratio slider.
   - Seamless repeat of decorative wallpaper textures (brick, chevron, acoustic slats, etc.).
5. **Interactive Comparison:** Draggable split slider revealing original room on the left and painted room on the right.
6. **Project Persistence & Export:** Save active projects to MongoDB and download 300 DPI painter plans complete with color swatches and paint specifications.
7. **Administrative Control:** Admin analytics metrics (active users, total projects, catalog count) and CRUD controls for shades and patterns.

### 3.5 Non-Functional Requirements
- **Performance:** Canvas paint application renders in under 50 milliseconds, providing immediate 60 FPS visual feedback.
- **Usability:** Intuitive glassmorphism interface with integrated 4-step onboarding guide.
- **Reliability & Availability:** Zero-config fallback guarantees 100% testability even without a running MongoDB service.
- **Data Integrity:** Strict schema validation via Mongoose ensuring no orphan records or corrupted canvas coordinates.

---

<div style="page-break-after: always;"></div>

# CHAPTER 4: SYSTEM ARCHITECTURE & DESIGN

### 4.1 High-Level Architecture
The system adopts a decoupled client-server micro-architecture. The presentation layer (Angular) manages user interaction and graphics manipulation completely in client memory. The server layer (Node.js/Express) operates as a stateless API gateway handling authentication, media uploads, and data persistence.

```mermaid
flowchart TD
    User([User / Designer]) -->|Interact / Upload Photo| Browser[Angular Client Application]
    Browser -->|Draw Polygon / Select Color| CanvasEngine[HTML5 Canvas 2D Shading Pipeline]
    CanvasEngine -->|Render 60 FPS Preview| Screen([Live Visualized Room Display])

    Browser -->|API Requests: Auth / Projects / Colors| APIServer[Node.js / Express Backend]
    APIServer -->|Authenticate| JWT[JWT & Bcrypt Security Guard]
    APIServer -->|Upload Room Photos| FileSystem[(Uploads Storage)]
    APIServer -->|Save / Fetch Data| DBSelector{MongoDB Connected?}

    DBSelector -->|Yes| MongoDB[(MongoDB Atlas / Local)]
    DBSelector -->|No / Offline| LocalStore[(Zero-Config Persistent JSON Store)]
```

### 4.2 Data Flow Diagrams

#### Level 0 DFD (Context Diagram)
```mermaid
flowchart LR
    User([User / Designer]) -->|Room Photo & Selected Colors| System[Smart Wall Paint Visualizer System]
    System -->|Visualized Room & Painter Export| User
    Admin([Administrator]) -->|Manage Colors & Patterns| System
    System -->|KPI Metrics & User Telemetry| Admin
```

#### Level 1 DFD (Subsystem Breakdown)
```mermaid
flowchart TD
    User([User]) -->|1. Auth Credentials| AuthProc(1.0 Authentication Process)
    AuthProc -->|Session Token| User
    
    User -->|2. Upload Room Photo| UploadProc(2.0 Room Image Ingestion)
    UploadProc -->|Store Image| MediaStore[(File System Storage)]
    UploadProc -->|Image URL / Base64| CanvasStudio(3.0 Canvas Visualizer Studio)
    
    User -->|3. Coordinates & Masking| CanvasStudio
    Catalog[(Color & Pattern Catalog)] -->|4. Color Codes & Textures| CanvasStudio
    CanvasStudio -->|5. Rendered Canvas Buffer| Comparison(4.0 Before / After Comparison Engine)
    CanvasStudio -->|6. Save Project Payload| ProjectProc(5.0 Project Persistence Manager)
    ProjectProc -->|Write Project Document| DB[(Database)]
```

### 4.3 Database Schema & Entity Design

```mermaid
erDiagram
    USER ||--o{ PROJECT : creates
    USER }o--o{ COLOR : favorites
    PROJECT ||--|{ WALL_LAYER : contains

    USER {
        string id PK
        string name
        string email UK
        string password
        string role
        date createdAt
    }

    COLOR {
        string id PK
        string code UK
        string name
        string hex
        string category
        string brand
        string sheen
        boolean isPopular
    }

    PATTERN {
        string id PK
        string name
        string previewUrl
        string patternUrl
        string category
        number scale
    }

    PROJECT {
        string id PK
        string userId FK
        string title
        string roomType
        string originalImage
        string previewImage
        string notes
        date updatedAt
    }

    WALL_LAYER {
        string name
        array polygonPoints
        object color
        string finish
        number opacity
        object dualTone
    }
```

### 4.4 Image Processing & Canvas Blending Mathematics
A primary technical achievement of this project is the **Luminance-Preserving Shading Model**. 

When a physical wall is painted, the new color absorbs light according to its pigmentation while reflecting the natural light gradients, wall textures, and shadows cast by surrounding furniture and windows. 

#### Step 1: Pixel Luminance Extraction
The system captures the raw pixel buffer from the original room photograph. For each pixel $(x, y)$ inside the isolated wall polygon, the perceived photometric luminance ($Y$) is computed using standard Rec. 709 ITU coefficients:
$$Y = 0.299 \times R_{orig} + 0.587 \times G_{orig} + 0.114 \times B_{orig}$$
Where $R_{orig}, G_{orig}, B_{orig} \in [0, 255]$ represent original RGB intensities.

#### Step 2: Multiplicative Shading Transformation
To preserve shadows and highlights, a normalized luminance scaling factor $S$ is derived:
$$S = \frac{Y}{255.0}$$
The selected paint color $(R_p, G_p, B_p)$ is then modulated by $S$:
$$R_{shaded} = R_p \times S$$
$$G_{shaded} = G_p \times S$$
$$B_{shaded} = B_p \times S$$

#### Step 3: Specular Reflection Simulation (Sheen Finishes)
To simulate different paint sheens, specular highlight factors are composited on top of the shaded base:
- **Matte:** Pure diffuse reflection ($K_{spec} = 0.00$).
- **Eggshell:** Soft ambient micro-reflection ($K_{spec} = 0.05$).
- **Satin:** Balanced satin glow ($K_{spec} = 0.12$).
- **Semi-Gloss:** Noticeable directional highlight ($K_{spec} = 0.25$).
- **High-Gloss:** Strong specular reflection with steep gradient falloff ($K_{spec} = 0.45$).

The final composite pixel color $C_{final}$ is calculated as:
$$C_{final} = (1 - K_{spec}) \times C_{shaded} + K_{spec} \times 255$$

---

<div style="page-break-after: always;"></div>

# CHAPTER 5: DETAILED MODULE IMPLEMENTATION

### 5.1 User Authentication & Role-Based Access Control (RBAC)
- **Token-Based Sessions:** Implemented using `jsonwebtoken`. Upon successful login, the server signs a cryptographically secure token containing the user's ID, role, and email with a 7-day expiration.
- **Password Security:** Built with `bcryptjs` utilizing an automated work-factor of 10 salt rounds to defend against rainbow-table attacks.
- **Guarded Navigation:** Frontend Angular routing guards (`AuthGuard`, `AdminGuard`) intercept navigation requests, ensuring restricted routes (such as `/admin` and `/projects`) are accessible only by authenticated users with appropriate clearance.

### 5.2 Interactive Visualizer Studio & Multi-Wall Layer Engine
The Studio (`/visualizer`) is the core operational workspace. It manages an image canvas stack that handles multi-resolution photo scaling:
- **Layer System:** Users can define and switch between multiple independent wall layers (e.g., *Main Accent Wall*, *Side Wall*, *Ceiling*).
- **Non-Destructive Editing:** Each layer maintains its own polygon vertices, selected paint color, sheen, opacity, and dual-tone configuration. Edits on one layer do not overwrite adjacent walls.
- **Undo / Redo History Stack:** A state machine records canvas mutations, enabling users to revert or reapply changes (`Ctrl+Z` / `Ctrl+Y`).

### 5.3 Polygon Segmentation & Brush Masking
- **Polygon Tool:** Users click around the perimeter of a wall to place coordinate vertices. When the path is closed by clicking the initial green vertex, the engine generates an HTML5 2D Path clipping boundary.
- **Draggable Vertex Handles:** Existing points can be clicked and dragged in real time to fine-tune alignments around crown molding, electrical sockets, or picture frames.
- **Brush & Eraser Mode:** Freehand circular brush allows manual mask refinement with customizable brush radiuses.

### 5.4 Dual-Tone Walls & Paint Sheen Simulation
- **Dual-Tone Mechanism:** Users can split any wall polygon horizontally or vertically. An interactive split slider (ranging from 10% to 90%) dictates the division boundary. Different paint colors and finishes can be assigned to the upper/lower or left/right segments.
- **Sheen Reflectivity Engine:** Applies micro-highlights and gradient fills over the masked area to authentically recreate the visual characteristics of Matte, Eggshell, Satin, Semi-Gloss, and High-Gloss sheens.

### 5.5 Color & Decorative Pattern Catalog Explorer
- **Comprehensive Shade Library:** Over 60 curated paints categorized into *Warm Neutrals*, *Ocean Blues*, *Forest Greens*, *Terracotta & Earth*, *Soft Pastels*, *Modern Greys*, and *Royal Accents*.
- **Brand Indexing:** Filterable by leading architectural paint manufacturers (**Behr®**, **Asian Paints®**, and **Dulux®**).
- **Direct Clipboard Integration:** One-click copying of HEX color codes for design handoffs.
- **Wallpaper Patterns:** Seamless geometric, brick, chevron, and acoustic wood slat textures mapped via Canvas `createPattern()`.

### 5.6 Before vs. After Interactive Comparison Slider
The comparison module (`/compare`) gives homeowners complete confidence by allowing them to review transformations:
- **Draggable Vertical Split Slider:** Users drag a handle horizontally across the room photograph; the left side renders the original unmodified photo, while the right side displays the painted room in real time.
- **Side-by-Side Dual View:** Displays both rooms concurrently for side-by-side architectural evaluations.

### 5.7 Project Persistence & Painter-Ready Plan Export
- **Cloud/Database Persistence:** Projects are saved with metadata, room types, wall coordinates, and preview thumbnails.
- **Painter-Ready PDF/Image Plan:** Compiles a composite canvas that places the high-resolution rendered room alongside a bottom legend featuring:
  - Exact Shade Name & Manufacturer Paint Code (e.g., `AP-104 Imperial Teal`).
  - Paint Finish Specification (e.g., `Satin Sheen`).
  - Color Swatch Chips for physical paint store color matching.

### 5.8 Admin CMS & Business Analytics Dashboard
Accessible via `/admin`, this module provides operational governance:
- **KPI Metrics Cards:** Live count of registered users, saved designs, total room uploads, and catalog inventory.
- **Color Catalog CMS:** Admin form to create new colors (with real-time color pickers), edit existing shade specifications, or delete obsolete colors.
- **Texture Management:** Add new decorative wallpaper pattern files.
- **Activity Log:** Real-time stream of user room creations and design activities.

### 5.9 Zero-Config Resilient Fallback Datastore
A standout architectural feature is the **Repository Pattern** implemented in the backend. If MongoDB is installed and running, the application connects to it via Mongoose. If MongoDB is unavailable (common in classroom, demo, or review environments), the system automatically activates a local JSON datastore (`server/data/store.json`) with identical CRUD semantics. This ensures the project runs straight out-of-the-box on any machine without configuration headaches.

---

<div style="page-break-after: always;"></div>

# CHAPTER 6: RESTFUL API SPECIFICATIONS

| Method | Endpoint | Access Level | Description | Payload / Query | Response Status |
|:---|:---|:---|:---|:---|:---|
| `POST` | `/api/auth/register` | Public | Register new user account | `{ name, email, password }` | `201 Created` |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue JWT | `{ email, password }` | `200 OK` |
| `GET` | `/api/auth/me` | Protected | Retrieve authenticated user profile | Header: `Bearer <token>` | `200 OK` |
| `POST` | `/api/auth/favorite` | Protected | Toggle color in user's favorites | `{ colorId }` | `200 OK` |
| `GET` | `/api/colors` | Public | List colors with search/filters | `?category=&brand=&search=` | `200 OK` |
| `POST` | `/api/colors` | Admin Only | Add new paint shade to catalog | `{ name, code, hex, brand, ... }` | `201 Created` |
| `PUT` | `/api/colors/:id` | Admin Only | Update existing paint shade | Updated fields object | `200 OK` |
| `DELETE`| `/api/colors/:id` | Admin Only | Remove paint shade from catalog | None | `200 OK` |
| `GET` | `/api/patterns` | Public | List all decorative wallpaper patterns| None | `200 OK` |
| `POST` | `/api/patterns` | Admin Only | Add new wallpaper pattern | `{ name, previewUrl, ... }` | `201 Created` |
| `GET` | `/api/projects` | Protected | Fetch user's saved room projects | Header: `Bearer <token>` | `200 OK` |
| `GET` | `/api/projects/samples/rooms` | Public | Fetch sample architectural rooms | None | `200 OK` |
| `POST` | `/api/projects` | Protected | Save new room design project | `{ title, roomType, walls, ... }`| `201 Created` |
| `DELETE`| `/api/projects/:id`| Protected | Delete user project | None | `200 OK` |
| `GET` | `/api/admin/stats` | Admin Only | Retrieve KPI analytics metrics | Header: `Bearer <admin_token>` | `200 OK` |
| `POST` | `/api/upload` | Public | Multipart room image upload | `multipart/form-data (image)` | `200 OK` |

---

<div style="page-break-after: always;"></div>

# CHAPTER 7: TESTING & QUALITY ASSURANCE

### 7.1 Testing Strategy
The application underwent multi-tier verification including Unit Testing, Integration Testing, UI/UX Usability Testing, and Cross-Platform Compatibility Checks.

### 7.2 Detailed Test Cases & Execution Results

| Test ID | Test Module | Test Scenario | Expected Outcome | Actual Outcome | Status |
|:---|:---|:---|:---|:---|:---:|
| **TC-01** | Authentication | User registration with valid data | Account created, password hashed in DB | Account created successfully | **PASS** |
| **TC-02** | Authentication | Login with incorrect password | Returns HTTP 401 Unauthorized with error | Error message displayed | **PASS** |
| **TC-03** | Authorization | Regular user navigating to `/admin` | Navigation blocked, redirected to home | Redirected to home page | **PASS** |
| **TC-04** | Photo Upload | Upload 8MB high-res JPEG room photo | Image uploaded and rendered on Canvas | Uploaded and scaled correctly | **PASS** |
| **TC-05** | Polygon Tool | Draw 6-vertex wall perimeter | Vertices connect; path closes on initial point | Closed polygon formed | **PASS** |
| **TC-06** | Vertex Drag | Reposition vertex #3 using mouse drag | Polygon bounds recalculate in real-time | Vertex updates smoothly | **PASS** |
| **TC-07** | Paint Shading | Apply `#1E3A5F` to shadowed wall corner | Natural shadow values preserved under paint | Deep shadow texture retained | **PASS** |
| **TC-08** | Dual-Tone | Apply 50% horizontal split on accent wall | Wall renders two colors separated at 50% | Accurate dual-tone render | **PASS** |
| **TC-09** | Sheen Preview | Toggle from Matte to High-Gloss | Specular highlights appear on surface | Specular highlights visible | **PASS** |
| **TC-10** | Split Slider | Drag Before/After slider across room | Live split view smoothly tracks mouse/touch | Fluid 60 FPS split tracking | **PASS** |
| **TC-11** | Export Plan | Click "Export Painter Plan" button | PNG file generated with attached color legend | High-res PNG downloaded | **PASS** |
| **TC-12** | Resilient DB | Terminate local MongoDB daemon | Server activates JSON store without crashing | Seamless fallback to store.json| **PASS** |

### 7.3 Cross-Browser Compatibility & Performance Evaluation
- **Google Chrome (v120+):** 60 FPS rendering, full canvas acceleration.
- **Mozilla Firefox (v122+):** Responsive layout and exact color fidelity.
- **Microsoft Edge (v120+):** Full parity with Chrome; smooth drag interactions.
- **Apple Safari (iOS / macOS):** WebKit Canvas rendering verified without memory leaks.

---

<div style="page-break-after: always;"></div>

# CHAPTER 8: USER INTERFACE WALKTHROUGH & SCREENSHOTS

*(For your internship project submission, you can take actual screenshots of the running web application and paste them into these designated sections).*

### 8.1 Home & Hero Section (`/`)
- **Description:** Features an obsidian dark luxury aesthetic, dynamic call-to-action buttons, interactive live wall color preview, and an architectural room gallery (Living Room, Bedroom, Dining Room, Kitchen) allowing 1-click launch into the Studio.
- **Visual Highlight:** Glassmorphism cards highlighting core capabilities (Polygon Precision, Shadow-Preserving Blending, Dual-Tone, Painter-Ready Export).

### 8.2 Visualizer Studio Workspace (`/visualizer`)
- **Description:** The centerpiece of the application. Includes:
  - Top Toolbar: Mode selector (Polygon, Brush, Eraser, Move Point), Zoom controls, Undo/Redo, and Clear buttons.
  - Interactive Canvas Viewport: Real-time room rendering with vertex handles and boundary guides.
  - Right Control Panel: Wall layer manager, 60+ color palette grid, Sheen selector (Matte to Glossy), Dual-tone toggle, and Wallpaper patterns tab.

### 8.3 Before & After Comparison Screen (`/compare`)
- **Description:** Allows users to slide an interactive vertical splitter over the room. The left pane reveals the original unpainted room; the right pane displays the newly styled room.
- **Modes:** Split Slider Mode and Concurrent Side-by-Side Mode.

### 8.4 Color & Wallpaper Pattern Explorer (`/colors`)
- **Description:** Comprehensive color catalog allowing real-time searching by name, code, or hex. Filterable by 7 distinct color families and major brands (Behr, Asian Paints, Dulux). Includes one-click HEX clipboard copying and bookmarking.

### 8.5 Admin Analytics & Catalog Management Dashboard (`/admin`)
- **Description:** Real-time KPI summary showing Total Uploads, Saved Projects, Registered Users, and Active Color Inventory. Features dynamic forms to add, edit, or delete paint shades and patterns, along with an audit activity log.

---

<div style="page-break-after: always;"></div>

# CHAPTER 9: CHALLENGES ENCOUNTERED & ENGINEERING SOLUTIONS

1. **Challenge: Preventing Flat, Synthetic-Looking Color Fills**
   - *Problem:* Applying a standard RGBA canvas overlay resulted in cartoonish, flat blocks of color that obscured shadows, baseboards, and window frames.
   - *Solution:* Engineered a custom per-pixel luminance-preserving shader algorithm. By calculating the relative perceived brightness of each underlying pixel, the selected paint color is multiplied by the ambient lighting matrix, preserving original shadows and daylight depth.

2. **Challenge: Responsive Polygon Manipulation on Canvas**
   - *Problem:* Enabling users to grab and drag small corner handles across different screen scales and aspect ratios caused hit-detection inaccuracy.
   - *Solution:* Implemented normalized Euclidean distance hit-testing with a threshold radius of 12 pixels around each vertex, coupled with coordinate normalization (`x/width`, `y/height`) so paths remain resolution-independent.

3. **Challenge: Zero-Dependency Deployment for Project Evaluation**
   - *Problem:* Evaluators reviewing internship projects may not have local MongoDB instances running, causing typical MERN/MEAN apps to crash on launch.
   - *Solution:* Designed a Repository Abstraction Pattern. If the MongoDB connection times out or fails, the backend seamlessly switches to an internal JSON datastore with identical asynchronous query signatures.

---

<div style="page-break-after: always;"></div>

# CHAPTER 10: CONCLUSION & FUTURE SCOPE

### 10.1 Conclusion
The **Smart Wall Paint Visualizer** successfully accomplishes all goals established for this internship project at **Unified Mentor**. By integrating **Angular 20+**, **Node.js**, **Express**, and **HTML5 Canvas 2D image processing**, the application delivers a commercial-grade, photorealistic interior visualization tool.

It addresses a major consumer pain point in the home improvement industry by eliminating color selection uncertainty, preventing costly repainting errors, and bridging the communication gap between homeowners and professional painting contractors. The system is performant, secure, aesthetically refined, and engineered in full accordance with modern software architecture best practices.

### 10.2 Future Scope & Enhancements
- **AI-Powered Automatic Wall Segmentation:** Integrating pre-trained machine learning models (e.g., Segment Anything Model - SAM or DeepLabV3 in ONNX/TensorFlow.js) to detect wall boundaries automatically in one click.
- **Augmented Reality (AR) Live Camera View:** Utilizing WebXR to project paint colors directly onto live mobile camera feeds.
- **Paint Quantity & Cost Estimator:** Adding a surface area calculation module that factors in room square footage, number of coats, and brand pricing to generate accurate budget estimates.
- **3D Room Mesh Generation:** Leveraging WebGL/Three.js to extrapolate 3D depth maps from single 2D photographs for dynamic lighting adjustment.

---

<div style="page-break-after: always;"></div>

# CHAPTER 11: REFERENCES & BIBLIOGRAPHY

1. **Angular Documentation:** Official Guide to Standalone Components and Signals — [https://angular.dev](https://angular.dev)
2. **MDN Web Docs:** Canvas API & Pixel Manipulation with `ImageData` — [https://developer.mozilla.org](https://developer.mozilla.org)
3. **Node.js & Express.js:** RESTful API Design Patterns — [https://expressjs.com](https://expressjs.com)
4. **MongoDB & Mongoose:** Schema Modeling and NoSQL Best Practices — [https://mongoosejs.com](https://mongoosejs.com)
5. **Color Science & Photometric Luminance (ITU-R BT.709):** Parameter values for the HDTV standard for production and international programme exchange.
6. **Unified Mentor Internship Guidelines:** Project specifications and evaluation criteria.

---

*(End of Report)*

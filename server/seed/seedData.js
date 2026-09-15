const colors = [
  // Warm Neutrals
  {
    code: "WN-101",
    name: "Tuscan Beige",
    hex: "#E8D8C8",
    rgb: "232, 216, 200",
    brand: "Asian Paints",
    category: "Warm Neutrals",
    finishOptions: ["matte", "eggshell", "satin"],
    popular: true,
    tags: ["Living Room", "Hallway", "Warm"]
  },
  {
    code: "WN-102",
    name: "Almond Cream",
    hex: "#F5EFEB",
    rgb: "245, 239, 235",
    brand: "Behr",
    category: "Warm Neutrals",
    finishOptions: ["matte", "satin"],
    popular: true,
    tags: ["Bedroom", "Minimalist"]
  },
  {
    code: "WN-103",
    name: "Caramel Latte",
    hex: "#C8A785",
    rgb: "200, 167, 133",
    brand: "Dulux",
    category: "Warm Neutrals",
    finishOptions: ["matte", "satin", "glossy"],
    popular: false,
    tags: ["Accent Wall", "Cozy"]
  },
  {
    code: "WN-104",
    name: "Desert Sandstone",
    hex: "#D3BBA5",
    rgb: "211, 187, 165",
    brand: "Asian Paints",
    category: "Warm Neutrals",
    finishOptions: ["matte", "eggshell"],
    popular: false,
    tags: ["Dining Room", "Earthy"]
  },
  {
    code: "WN-105",
    name: "Linen White",
    hex: "#FAF0E6",
    rgb: "250, 240, 230",
    brand: "Behr",
    category: "Warm Neutrals",
    finishOptions: ["matte", "eggshell", "satin", "glossy"],
    popular: true,
    tags: ["Ceiling", "All Rooms"]
  },

  // Ocean & Sky Blues
  {
    code: "BL-201",
    name: "Pacific Navy",
    hex: "#1E3A5F",
    rgb: "30, 58, 95",
    brand: "Behr",
    category: "Ocean Blues",
    finishOptions: ["matte", "satin", "semi-gloss"],
    popular: true,
    tags: ["Accent Wall", "Study", "Dramatic"]
  },
  {
    code: "BL-202",
    name: "Aegean Breeze",
    hex: "#5B84B1",
    rgb: "91, 132, 177",
    brand: "Dulux",
    category: "Ocean Blues",
    finishOptions: ["matte", "satin"],
    popular: true,
    tags: ["Bedroom", "Calm"]
  },
  {
    code: "BL-203",
    name: "Morning Mist Blue",
    hex: "#B8C9D9",
    rgb: "184, 201, 217",
    brand: "Asian Paints",
    category: "Ocean Blues",
    finishOptions: ["matte", "eggshell"],
    popular: false,
    tags: ["Living Room", "Airy"]
  },
  {
    code: "BL-204",
    name: "Deep Teal Horizon",
    hex: "#104E5B",
    rgb: "16, 78, 91",
    brand: "Behr",
    category: "Ocean Blues",
    finishOptions: ["matte", "satin", "glossy"],
    popular: true,
    tags: ["Accent Wall", "Modern"]
  },
  {
    code: "BL-205",
    name: "Coastal Aqua",
    hex: "#76A5AF",
    rgb: "118, 165, 175",
    brand: "Dulux",
    category: "Ocean Blues",
    finishOptions: ["matte", "eggshell", "satin"],
    popular: false,
    tags: ["Bathroom", "Kitchen"]
  },

  // Forest & Sage Greens
  {
    code: "GR-301",
    name: "Eucalyptus Sage",
    hex: "#8F9E8B",
    rgb: "143, 158, 139",
    brand: "Asian Paints",
    category: "Forest & Sage Greens",
    finishOptions: ["matte", "eggshell", "satin"],
    popular: true,
    tags: ["Living Room", "Relaxing", "Nature"]
  },
  {
    code: "GR-302",
    name: "Evergreen Forest",
    hex: "#2D4739",
    rgb: "45, 71, 57",
    brand: "Behr",
    category: "Forest & Sage Greens",
    finishOptions: ["matte", "satin"],
    popular: true,
    tags: ["Accent Wall", "Luxury", "Study"]
  },
  {
    code: "GR-303",
    name: "Olive Grove",
    hex: "#6B7B4E",
    rgb: "107, 123, 78",
    brand: "Dulux",
    category: "Forest & Sage Greens",
    finishOptions: ["matte", "satin"],
    popular: false,
    tags: ["Dining Room", "Organic"]
  },
  {
    code: "GR-304",
    name: "Mint Whisper",
    hex: "#D0E1D4",
    rgb: "208, 225, 212",
    brand: "Asian Paints",
    category: "Forest & Sage Greens",
    finishOptions: ["matte", "eggshell"],
    popular: false,
    tags: ["Bedroom", "Kids Room"]
  },
  {
    code: "GR-305",
    name: "Wild Fern",
    hex: "#4E7355",
    rgb: "78, 115, 85",
    brand: "Behr",
    category: "Forest & Sage Greens",
    finishOptions: ["matte", "satin", "semi-gloss"],
    popular: false,
    tags: ["Accent Wall", "Fresh"]
  },

  // Warm Terracotta & Sunset
  {
    code: "TC-401",
    name: "Moroccan Terracotta",
    hex: "#C26D53",
    rgb: "194, 109, 83",
    brand: "Behr",
    category: "Terracotta & Warmth",
    finishOptions: ["matte", "eggshell"],
    popular: true,
    tags: ["Accent Wall", "Boho", "Living Room"]
  },
  {
    code: "TC-402",
    name: "Spiced Clay",
    hex: "#A35C45",
    rgb: "163, 92, 69",
    brand: "Asian Paints",
    category: "Terracotta & Warmth",
    finishOptions: ["matte", "satin"],
    popular: false,
    tags: ["Dining Room", "Rustic"]
  },
  {
    code: "TC-403",
    name: "Golden Ochre",
    hex: "#D9A04B",
    rgb: "217, 160, 75",
    brand: "Dulux",
    category: "Terracotta & Warmth",
    finishOptions: ["matte", "satin", "glossy"],
    popular: true,
    tags: ["Kitchen", "Warm Accent"]
  },
  {
    code: "TC-404",
    name: "Peach Sunset",
    hex: "#F4B29E",
    rgb: "244, 178, 158",
    brand: "Asian Paints",
    category: "Terracotta & Warmth",
    finishOptions: ["matte", "eggshell"],
    popular: false,
    tags: ["Bedroom", "Soothing"]
  },

  // Pastels & Blushes
  {
    code: "PK-501",
    name: "Dusty Rose",
    hex: "#C99A9C",
    rgb: "201, 154, 156",
    brand: "Dulux",
    category: "Pastels & Blushes",
    finishOptions: ["matte", "eggshell", "satin"],
    popular: true,
    tags: ["Bedroom", "Romantic", "Chic"]
  },
  {
    code: "PK-502",
    name: "Blush Champagne",
    hex: "#EED7D1",
    rgb: "238, 215, 209",
    brand: "Asian Paints",
    category: "Pastels & Blushes",
    finishOptions: ["matte", "eggshell"],
    popular: true,
    tags: ["Dressing Room", "Living Room"]
  },
  {
    code: "PK-503",
    name: "Lilac Haze",
    hex: "#B9A7C7",
    rgb: "185, 167, 199",
    brand: "Behr",
    category: "Pastels & Blushes",
    finishOptions: ["matte", "satin"],
    popular: false,
    tags: ["Creative Studio", "Bedroom"]
  },

  // Crisp Whites & Modern Greys
  {
    code: "GY-601",
    name: "Chantilly Pure White",
    hex: "#F8F9FA",
    rgb: "248, 249, 250",
    brand: "Behr",
    category: "Crisp Whites & Greys",
    finishOptions: ["matte", "eggshell", "satin", "glossy"],
    popular: true,
    tags: ["All Rooms", "Ceiling", "Modern"]
  },
  {
    code: "GY-602",
    name: "Urban Slate Grey",
    hex: "#4A5568",
    rgb: "74, 85, 104",
    brand: "Asian Paints",
    category: "Crisp Whites & Greys",
    finishOptions: ["matte", "satin", "semi-gloss"],
    popular: true,
    tags: ["Accent Wall", "Contemporary", "Living Room"]
  },
  {
    code: "GY-603",
    name: "Cool Ash",
    hex: "#A0AEC0",
    rgb: "160, 174, 192",
    brand: "Dulux",
    category: "Crisp Whites & Greys",
    finishOptions: ["matte", "eggshell", "satin"],
    popular: false,
    tags: ["Hallway", "Office"]
  },
  {
    code: "GY-604",
    name: "Charcoal Velvet",
    hex: "#2D3748",
    rgb: "45, 55, 72",
    brand: "Behr",
    category: "Crisp Whites & Greys",
    finishOptions: ["matte", "satin"],
    popular: true,
    tags: ["Media Room", "Accent Wall", "Luxury"]
  },

  // Royal & Dramatic Accents
  {
    code: "DR-701",
    name: "Imperial Plum",
    hex: "#4B2840",
    rgb: "75, 40, 64",
    brand: "Dulux",
    category: "Royal & Dramatic",
    finishOptions: ["matte", "satin"],
    popular: false,
    tags: ["Dining Room", "Statement"]
  },
  {
    code: "DR-702",
    name: "Midnight Sapphire",
    hex: "#132238",
    rgb: "19, 34, 56",
    brand: "Asian Paints",
    category: "Royal & Dramatic",
    finishOptions: ["matte", "satin", "glossy"],
    popular: true,
    tags: ["Master Bedroom", "Luxury"]
  },
  {
    code: "DR-703",
    name: "Emerald Sovereign",
    hex: "#0F382A",
    rgb: "15, 56, 42",
    brand: "Behr",
    category: "Royal & Dramatic",
    finishOptions: ["matte", "satin"],
    popular: true,
    tags: ["Library", "Accent Wall"]
  }
];

const patterns = [
  {
    code: "PAT-001",
    name: "Nordic Geometric Hex",
    category: "Geometric",
    style: "Modern Minimalist",
    description: "Subtle interlocking hexagonal geometric pattern for contemporary accent walls",
    type: "geometric",
    scale: 40,
    blendMode: "multiply",
    svgPattern: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 0 L40 11.5 L40 34.5 L20 46 L0 34.5 L0 11.5 Z" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="1.5"/></svg>`
  },
  {
    code: "PAT-002",
    name: "Herringbone Chevron",
    category: "Geometric",
    style: "Classic Nordic",
    description: "Elegant angled chevron zigzag pattern ideal for living room and hallway walls",
    type: "chevron",
    scale: 30,
    blendMode: "multiply",
    svgPattern: `<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M0 0 L15 15 L30 0 M0 15 L15 30 L30 15" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="2"/></svg>`
  },
  {
    code: "PAT-003",
    name: "Exposed Brick Loft",
    category: "Textured",
    style: "Industrial Loft",
    description: "Realistic masonry brick outline pattern for rustic and industrial interior styles",
    type: "brick",
    scale: 48,
    blendMode: "multiply",
    svgPattern: `<svg width="48" height="24" viewBox="0 0 48 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="46" height="10" rx="1" fill="none" stroke="rgba(0,0,0,0.16)" stroke-width="1.5"/><rect x="-23" y="13" width="46" height="10" rx="1" fill="none" stroke="rgba(0,0,0,0.16)" stroke-width="1.5"/><rect x="25" y="13" width="46" height="10" rx="1" fill="none" stroke="rgba(0,0,0,0.16)" stroke-width="1.5"/></svg>`
  },
  {
    code: "PAT-004",
    name: "Subtle Woven Linen",
    category: "Textured",
    style: "Organic Fabric",
    description: "Fine cross-weave fabric texture that gives walls an organic tactile look",
    type: "linen",
    scale: 12,
    blendMode: "overlay",
    svgPattern: `<svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M0 6 L12 6 M6 0 L6 12" stroke="rgba(0,0,0,0.12)" stroke-width="1"/></svg>`
  },
  {
    code: "PAT-005",
    name: "Vertical Acoustic Slats",
    category: "Wood & Panels",
    style: "Architectural Wood",
    description: "Modern vertical fluted wood slat aesthetic for high-end accent walls",
    type: "slats",
    scale: 24,
    blendMode: "multiply",
    svgPattern: `<svg width="24" height="60" viewBox="0 0 24 60" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="12" height="60" fill="rgba(0,0,0,0.15)"/><rect x="12" y="0" width="12" height="60" fill="rgba(255,255,255,0.08)"/><line x1="12" y1="0" x2="12" y2="60" stroke="rgba(0,0,0,0.3)" stroke-width="1"/></svg>`
  },
  {
    code: "PAT-006",
    name: "Botanical Damask Floral",
    category: "Floral",
    style: "Vintage Luxury",
    description: "Graceful leaf and floral flourishes for luxurious master bedrooms and dining rooms",
    type: "floral",
    scale: 60,
    blendMode: "soft-light",
    svgPattern: `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M30 10 C35 20, 45 25, 30 40 C15 25, 25 20, 30 10 Z M30 40 C30 50, 40 55, 30 60 C20 55, 30 50, 30 40 Z" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="1.8"/></svg>`
  }
];

const sampleRooms = [
  {
    id: "sample-living-1",
    name: "Contemporary Living Room",
    type: "Living Room",
    description: "Bright open space with large accent wall, sofa, and natural window lighting",
    // Base SVG Room with distinct wall polygons predefined
    aspectRatio: "16:9",
    suggestedWalls: [
      {
        name: "Main Accent Wall",
        polygon: [
          { x: 0.18, y: 0.12 },
          { x: 0.82, y: 0.12 },
          { x: 0.82, y: 0.72 },
          { x: 0.18, y: 0.72 }
        ],
        defaultColor: "#5B84B1",
        defaultFinish: "matte"
      },
      {
        name: "Left Feature Wall",
        polygon: [
          { x: 0.05, y: 0.08 },
          { x: 0.18, y: 0.12 },
          { x: 0.18, y: 0.80 },
          { x: 0.05, y: 0.88 }
        ],
        defaultColor: "#E8D8C8",
        defaultFinish: "satin"
      }
    ]
  },
  {
    id: "sample-bedroom-1",
    name: "Serene Master Bedroom",
    type: "Bedroom",
    description: "Cozy bedroom with headboard wall and recessed ceiling cove",
    aspectRatio: "4:3",
    suggestedWalls: [
      {
        name: "Headboard Wall",
        polygon: [
          { x: 0.20, y: 0.15 },
          { x: 0.80, y: 0.15 },
          { x: 0.80, y: 0.68 },
          { x: 0.20, y: 0.68 }
        ],
        defaultColor: "#8F9E8B",
        defaultFinish: "eggshell"
      }
    ]
  },
  {
    id: "sample-dining-1",
    name: "Nordic Minimalist Dining",
    type: "Dining Room",
    description: "Clean aesthetic with modern dining table and expansive wall canvas",
    aspectRatio: "16:9",
    suggestedWalls: [
      {
        name: "Back Dining Wall",
        polygon: [
          { x: 0.10, y: 0.14 },
          { x: 0.90, y: 0.14 },
          { x: 0.90, y: 0.75 },
          { x: 0.10, y: 0.75 }
        ],
        defaultColor: "#C26D53",
        defaultFinish: "matte"
      }
    ]
  },
  {
    id: "sample-kitchen-1",
    name: "Modern Kitchen & Breakfast Bar",
    type: "Kitchen",
    description: "Kitchen nook with wall space around floating shelves",
    aspectRatio: "16:9",
    suggestedWalls: [
      {
        name: "Kitchen Splash Wall",
        polygon: [
          { x: 0.15, y: 0.18 },
          { x: 0.85, y: 0.18 },
          { x: 0.85, y: 0.60 },
          { x: 0.15, y: 0.60 }
        ],
        defaultColor: "#104E5B",
        defaultFinish: "semi-gloss"
      }
    ]
  }
];

module.exports = {
  colors,
  patterns,
  sampleRooms
};

const plantCareConfig = {
  Indoor: [
    {
      title: "Needs low light",
      icon: "🌤",
      description:
        "Indoor plants thrive 5–6 feet away from a window. They like bright but indirect sunlight.",
    },
    {
      title: "Beginner friendly",
      icon: "🌱",
      description:
        "Indoor plants are easy to maintain and perfect for people starting with plant care.",
    },
    {
      title: "Watering",
      icon: "💧",
      description:
        "Water only when the top soil feels dry. Avoid overwatering to prevent root rot.",
    },
  ],

  Outdoor: [
    {
      title: "Needs full sunlight",
      icon: "☀️",
      description: "Outdoor plants require 4–6 hours of direct sunlight.",
    },
    {
      title: "Water regularly",
      icon: "💦",
      description:
        "Water every 2–3 days depending on climate. Soil should remain slightly moist.",
    },
    {
      title: "Weather impact",
      icon: "🌧",
      description:
        "Protect from heavy rains and strong winds during monsoon seasons.",
    },
  ],

  Flowering: [
    {
      title: "Needs morning sunlight",
      icon: "🌞",
      description:
        "Flowering plants bloom best when they receive morning sunlight for 3–4 hours.",
    },
    {
      title: "Bloom cycle",
      icon: "🌸",
      description:
        "Most flowering plants bloom seasonally. Deadhead dried flowers for better growth.",
    },
    {
      title: "Watering",
      icon: "💧",
      description:
        "Keep the soil moist but not soggy. Water when the top layer dries.",
    },
  ],

  Succulent: [
    {
      title: "Loves bright light",
      icon: "🔆",
      description:
        "Succulents need bright, indirect light to maintain color and growth.",
    },
    {
      title: "Minimal watering",
      icon: "💧",
      description:
        "Water once every 10–15 days. Let soil dry completely between watering.",
    },
    {
      title: "Avoid humidity",
      icon: "💨",
      description:
        "Succulents prefer dry air. Avoid placing in bathrooms or humid areas.",
    },
  ],

  "Air Purifying": [
    {
      title: "Improves indoor air",
      icon: "🍃",
      description:
        "These plants absorb toxins and release oxygen, improving home air quality.",
    },
    {
      title: "Low maintenance",
      icon: "🪴",
      description:
        "Most air-purifying plants survive in low light and require minimal care.",
    },
    {
      title: "Water weekly",
      icon: "💧",
      description: "Water once a week when soil is partially dry.",
    },
  ],

  Herbal: [
    {
      title: "Needs partial sunlight",
      icon: "🌿",
      description:
        "Herbal plants like tulsi, mint, and lemongrass grow best in 3–4 hours of sunlight.",
    },
    {
      title: "Frequent watering",
      icon: "💦",
      description:
        "Keep the soil consistently moist. Do not let herbal plants dry out.",
    },
    {
      title: "Pruning required",
      icon: "✂️",
      description:
        "Trim leaves regularly to maintain shape and encourage fresh growth.",
    },
  ],

  Fruit: [
    {
      title: "Needs strong sunlight",
      icon: "☀️",
      description: "Fruit plants need 5–7 hours of sunlight for fruiting.",
    },
    {
      title: "Fertilize monthly",
      icon: "🧪",
      description:
        "Use organic fertilizer every month to boost fruit development.",
    },
    {
      title: "Water deeply",
      icon: "💧",
      description:
        "Fruit plants require deep watering so moisture reaches the roots.",
    },
  ],

  Bonsai: [
    {
      title: "Needs bright light",
      icon: "🔆",
      description:
        "Place bonsai where it receives bright, indirect light throughout the day.",
    },
    {
      title: "Daily misting",
      icon: "🌫",
      description:
        "Bonsai trees love humidity. Mist leaves daily for healthy growth.",
    },
    {
      title: "Skill required",
      icon: "🪴",
      description:
        "Bonsai care requires pruning and wiring. Ideal for intermediate plant keepers.",
    },
  ],

  Seasonal: [
    {
      title: "Short life cycle",
      icon: "⏳",
      description:
        "Seasonal plants bloom only during their specific season and fade after.",
    },
    {
      title: "Water daily",
      icon: "💦",
      description: "Water regularly to maintain blooming through the season.",
    },
    {
      title: "Needs sunlight",
      icon: "🌞",
      description: "Seasonal plants grow fast with 3–4 hours of sunlight.",
    },
  ],

  Climber: [
    {
      title: "Needs support",
      icon: "🪜",
      description:
        "Climber plants need a stick, rope, or trellis to grow upward.",
    },
    {
      title: "Medium watering",
      icon: "💧",
      description:
        "Water 2–3 times a week. Soil should remain slightly moist.",
    },
    {
      title: "Indirect light",
      icon: "🌤",
      description:
        "Climbers prefer bright, indirect sunlight for healthy growth.",
    },
  ],
};


const plantTaglines = {
  Indoor: [
    "Perfect for any room",
    "Low-light friendly companion",
    "Bring nature inside your home",
  ],

  Outdoor: [
    "Loves the open sky",
    "Thrives in sunlight",
    "Perfect for balconies & gardens",
  ],

  Flowering: [
    "Bright blooms for your home",
    "Colorful flowers all season",
    "Make your space vibrant",
  ],

  Succulent: [
    "Loves sunlight and minimal water",
    "Low-maintenance beauty",
    "Perfect for desks and shelves",
  ],

  "Air Purifying": [
    "Cleans your indoor air naturally",
    "Freshens your living space",
    "Ideal for bedrooms & offices",
  ],

  Herbal: [
    "Fresh aroma for your kitchen",
    "Healthy and natural herbs",
    "Grow your own herbal garden",
  ],

  Fruit: [
    "Sweet and fresh home-grown fruits",
    "Perfect for sunny areas",
    "Grow your mini orchard at home",
  ],

  Bonsai: [
    "Artistic miniature tree",
    "Perfect for decor enthusiasts",
    "Symbol of patience & balance",
  ],

  Seasonal: [
    "Perfect color for the season",
    "Short but beautiful life cycle",
    "Blooms that match the weather",
  ],

  Climber: [
    "Grows beautifully with support",
    "Perfect for walls & trellises",
    "Bring vertical greenery home",
  ],
};

// this unction returns a random tagline for any category
const getCategoryTagline = (category) => {
  const list = plantTaglines[category];
  if (!list) return "";
  return list[Math.floor(Math.random() * list.length)];
};

export { plantCareConfig, getCategoryTagline };
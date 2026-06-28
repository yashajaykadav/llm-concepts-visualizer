export const wordClusters = {
  Royalty: [
    { word: "King", x: 2.5, y: 8.0 },
    { word: "Queen", x: 3.0, y: 8.2 },
    { word: "Prince", x: 2.2, y: 7.5 },
    { word: "Castle", x: 1.5, y: 7.0 },
    { word: "Throne", x: 3.4, y: 7.8 },
  ],

  Technology: [
    { word: "Computer", x: 8.0, y: 2.0 },
    { word: "Software", x: 8.5, y: 2.5 },
    { word: "AI", x: 9.0, y: 3.0 },
    { word: "Database", x: 7.8, y: 1.5 },
    { word: "Cloud", x: 8.8, y: 1.8 },
  ],

  Nature: [
    { word: "Forest", x: 5.0, y: 5.0 },
    { word: "River", x: 5.5, y: 4.8 },
    { word: "Tree", x: 4.8, y: 5.5 },
    { word: "Mountain", x: 6.0, y: 5.8 },
    { word: "Ocean", x: 6.2, y: 5.2 },
  ],
};

export const presetComparisons = [
  {
    pair: "King ↔ Queen",
    similarity: 94,
    desc: "Very close vectors because both represent royalty concepts",
  },

  {
    pair: "Computer ↔ AI",
    similarity: 89,
    desc: "Strong contextual relationship in technology domain",
  },

  {
    pair: "Tree ↔ Forest",
    similarity: 92,
    desc: "High similarity because both belong to nature concepts",
  },

  {
    pair: "Apple ↔ Concept",
    similarity: 41,
    desc: "Depends on context (fruit vs company)",
  },

  {
    pair: "King ↔ Database",
    similarity: 12,
    desc: "Different semantic regions in vector space",
  },
];

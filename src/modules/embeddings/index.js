// Word clusters for embedding visualization
export const wordClusters = {
  Royalty: [
    { word: "King", x: 25, y: 70 },
    { word: "Queen", x: 20, y: 65 },
    { word: "Prince", x: 30, y: 75 },
    { word: "Princess", x: 25, y: 60 },
    { word: "Crown", x: 35, y: 70 },
  ],
  Technology: [
    { word: "Computer", x: 70, y: 30 },
    { word: "Software", x: 65, y: 25 },
    { word: "Hardware", x: 75, y: 35 },
    { word: "Algorithm", x: 60, y: 20 },
    { word: "Data", x: 80, y: 30 },
  ],
  Nature: [
    { word: "Forest", x: 30, y: 25 },
    { word: "Ocean", x: 25, y: 20 },
    { word: "Mountain", x: 35, y: 30 },
    { word: "River", x: 40, y: 25 },
    { word: "Tree", x: 20, y: 30 },
  ],
};

// Preset semantic comparisons
export const presetComparisons = [
  {
    pair: "King ↔ Queen",
    similarity: 92,
    desc: "Royalty terms are semantically very close in vector space",
  },
  {
    pair: "Computer ↔ Software",
    similarity: 85,
    desc: "Technology concepts share strong semantic relationships",
  },
  {
    pair: "Forest ↔ Ocean",
    similarity: 65,
    desc: "Nature terms are moderately related in meaning",
  },
  {
    pair: "King ↔ Computer",
    similarity: 15,
    desc: "Unrelated concepts are far apart in vector space",
  },
  {
    pair: "Queen ↔ Princess",
    similarity: 78,
    desc: "Similar royalty terms cluster together semantically",
  },
];
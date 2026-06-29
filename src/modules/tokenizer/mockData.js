// src/modules/tokenizer/mockData.js

export const mockTokenDatabase = {
  "learninggenerativeaiisfascinating": [
    { text: "learning", id: 3421, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { text: "gener", id: 8934, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    { text: "ative", id: 5621, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    { text: "ai", id: 7312, color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
    { text: "is", id: 456, color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { text: "fascin", id: 1234, color: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
    { text: "ating", id: 5678, color: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
  ],
  "tokenizersbreaktextintopieces": [
    { text: "token", id: 8912, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { text: "izers", id: 3456, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { text: "break", id: 7890, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    { text: "text", id: 2345, color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
    { text: "into", id: 6789, color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { text: "pieces", id: 1234, color: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
  ],
  "thequickbrownfoxjumpsoverthelazydog": [
    { text: "the", id: 101, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { text: "quick", id: 202, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    { text: "brown", id: 303, color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    { text: "fox", id: 404, color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
    { text: "jumps", id: 505, color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { text: "over", id: 606, color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
    { text: "the", id: 102, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { text: "lazy", id: 707, color: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
    { text: "dog", id: 808, color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  ],
};

// Fallback logic for arbitrary user entries without tracking whitespace
export const generateFallbackTokens = (text) => {
  if (!text) return [];
  
  // Since spaces are already stripped, split into chunks of fixed character width (e.g., chunks of 4 characters)
  const chunks = text.match(/.{1,4}/g) || [];
  let idCounter = 6000;

  const colors = [
    "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "bg-pink-500/20 text-pink-300 border-pink-500/30",
    "bg-amber-500/20 text-amber-300 border-amber-500/30",
  ];

  return chunks.map((chunk, index) => ({
    text: chunk,
    id: idCounter + index,
    color: colors[index % colors.length],
  }));
};
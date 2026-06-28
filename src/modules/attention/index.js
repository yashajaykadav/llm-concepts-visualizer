export const sampleSentences = [
  {
    id: "bank",
    text: "The bank was near the river",
    words: ["The", "bank", "was", "near", "the", "river"],
    attention: [
      [0.8, 0.05, 0.05, 0.03, 0.05, 0.02],
      [0.02, 0.3, 0.02, 0.05, 0.01, 0.6],
      [0.05, 0.02, 0.8, 0.05, 0.03, 0.05],
      [0.03, 0.1, 0.02, 0.7, 0.05, 0.1],
      [0.1, 0.02, 0.03, 0.05, 0.7, 0.1],
      [0.01, 0.5, 0.01, 0.08, 0.01, 0.39],
    ],
  },
  {
    id: "apple",
    text: "Apple released a new iPhone",
    words: ["Apple", "released", "a", "new", "iPhone"],
    attention: [
      [0.6, 0.2, 0.05, 0.05, 0.1],
      [0.15, 0.5, 0.05, 0.1, 0.2],
      [0.1, 0.05, 0.7, 0.1, 0.05],
      [0.05, 0.1, 0.1, 0.6, 0.15],
      [0.1, 0.15, 0.05, 0.1, 0.6],
    ],
  },
  {
    id: "cat",
    text: "The cat sat on the mat",
    words: ["The", "cat", "sat", "on", "the", "mat"],
    attention: [
      [0.7, 0.1, 0.05, 0.03, 0.1, 0.02],
      [0.02, 0.5, 0.3, 0.02, 0.01, 0.15],
      [0.01, 0.25, 0.4, 0.04, 0.05, 0.25],
      [0.03, 0.02, 0.05, 0.7, 0.1, 0.1],
      [0.05, 0.02, 0.03, 0.05, 0.7, 0.15],
      [0.01, 0.2, 0.15, 0.04, 0.1, 0.5],
    ],
  },
  {
    id: "ai",
    text: "Artificial intelligence is transforming the world",
    words: ["Artificial", "intelligence", "is", "transforming", "the", "world"],
    attention: [
      [0.5, 0.3, 0.05, 0.05, 0.05, 0.05],
      [0.25, 0.4, 0.05, 0.15, 0.05, 0.1],
      [0.05, 0.05, 0.6, 0.2, 0.05, 0.05],
      [0.05, 0.15, 0.05, 0.4, 0.1, 0.25],
      [0.05, 0.05, 0.05, 0.1, 0.6, 0.15],
      [0.05, 0.1, 0.05, 0.3, 0.1, 0.4],
    ],
  },
];

export const multiHeadData = {
  heads: [
    { id: 1, name: "Head 1: Syntactic", color: "from-blue-400 to-blue-600" },
    { id: 2, name: "Head 2: Semantic", color: "from-purple-400 to-purple-600" },
    { id: 3, name: "Head 3: Positional", color: "from-green-400 to-green-600" },
    { id: 4, name: "Head 4: Contextual", color: "from-pink-400 to-pink-600" },
  ],
};

export const attentionConcepts = [
  {
    title: "What is Attention?",
    icon: "👁️",
    description:
      "Attention allows the model to focus on relevant parts of the input when generating each output token.",
    details:
      "Think of it like reading a sentence - when you see a pronoun, your brain 'attends' to the noun it refers to.",
  },
  {
    title: "Self-Attention",
    icon: "🔄",
    description:
      "Each word in a sequence looks at all other words to understand context and relationships.",
    details:
      "For example, in 'The bank is near the river', 'bank' pays attention to 'river' to understand it's a river bank, not a financial bank.",
  },
  {
    title: "Multi-Head Attention",
    icon: "🎯",
    description:
      "Multiple attention mechanisms running in parallel, each learning different types of relationships.",
    details:
      "Some heads focus on syntax, others on semantics, and others on positional relationships.",
  },
  {
    title: "Softmax Weights",
    icon: "📊",
    description:
      "Attention weights are normalized using softmax, ensuring they sum to 1 for each token.",
    details:
      "This creates a probability distribution over all tokens, showing which ones are most important.",
  },
];

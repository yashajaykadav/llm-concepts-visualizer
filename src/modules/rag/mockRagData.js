export const knowledgeBase = [
  { 
    id: "c1", 
    text: "Fluxen is a premium music player application featuring dynamic theming.", 
    relevance: { q1: 0.95, q2: 0.12 } 
  },
  { 
    id: "c2", 
    text: "Fluxen utilizes organic UI movement and fluid animations for playback.", 
    relevance: { q1: 0.88, q2: 0.15 } 
  },
  { 
    id: "c3", 
    text: "Quick CNG is a real-time crowdsourced platform for monitoring fuel availability.", 
    relevance: { q1: 0.10, q2: 0.92 } 
  },
  { 
    id: "c4", 
    text: "Quick CNG allows users to monitor station queue times to avoid long waits.", 
    relevance: { q1: 0.14, q2: 0.89 } 
  },
  { 
    id: "c5", 
    text: "The system is built on Cloudflare Workers for a scalable serverless backend.", 
    relevance: { q1: 0.30, q2: 0.75 } 
  }
];

export const presetQueries = [
  { 
    id: "q1", 
    text: "What are the main features of the Fluxen app?", 
    targetIds: ["c1", "c2"], 
    answer: "Based on the retrieved context, Fluxen is a premium music player that features dynamic theming, organic UI movement, and fluid animations for playback." 
  },
  { 
    id: "q2", 
    text: "How does Quick CNG help drivers?", 
    targetIds: ["c3", "c4", "c5"], 
    answer: "Quick CNG helps drivers by providing a real-time, crowdsourced platform to monitor fuel availability and station queue times. It operates on a scalable serverless backend." 
  }
];
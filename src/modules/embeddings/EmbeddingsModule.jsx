import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  HelpCircle,
  Layers,
  Info,
  Search,
  Sparkles,
} from "lucide-react";

import { wordClusters, presetComparisons } from "./mockEmbeddingsData";

export default function EmbeddingsModule() {
  const [selectedPair, setSelectedPair] = useState(presetComparisons[0]);
  const [highlightedCluster, setHighlightedCluster] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  const cardStyle = "bg-slate-950 border border-slate-800 rounded-xl p-6";

  const clusterColors = {
    Royalty: "bg-pink-500/10 text-pink-400 border-pink-500/30",
    Technology: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    Nature: "bg-green-500/10 text-green-400 border-green-500/30",
  };

  const vectorExample = [
    "0.2341",
    "-0.532",
    "0.891",
    "0.121",
    "...",
    "1536 dimensions",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Database className="text-indigo-400" />
          Module 2: Vector Embeddings
        </h1>
        <p className="text-slate-400 mt-3">
          Embeddings convert tokens into mathematical vectors where similar
          meanings stay close together.
        </p>
      </div>

      {/* PIPELINE */}
      <div className={cardStyle}>
        <h2 className="font-semibold text-slate-300 mb-5">
          Embedding Pipeline
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
          {[
            "Text",
            "Tokenizer",
            "Token IDs",
            "Embedding Model",
            "Vector",
            "Vector DB",
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-lg p-4"
            >
              <div className="text-indigo-400 font-bold">{index + 1}</div>
              <p className="text-sm mt-2 text-slate-300">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT AREA */}
        <div className="lg:col-span-2 space-y-6">
          {/* VECTOR MAP */}
          <div className={cardStyle}>
            <h3 className="font-semibold text-slate-300 mb-4">
              2D Projection of High Dimensional Vector Space
            </h3>

            <p className="text-xs text-slate-500 mb-4">
              Real embeddings contain hundreds/thousands of dimensions. This
              visualization is a simplified 2D projection.
            </p>

            <div className="relative h-[380px] bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
              <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="border border-slate-700" />
                ))}
              </div>

              {Object.entries(wordClusters).map(([cluster, points]) =>
                points.map((pt, index) => {
                  const isDimmed = highlightedCluster && highlightedCluster !== cluster;

                  return (
                    <motion.button
                      key={`${cluster}-${index}`}
                      onClick={() => setSelectedWord(pt.word)}
                      animate={{
                        left: `${pt.x * 10}%`,
                        bottom: `${pt.y * 10}%`,
                        opacity: isDimmed ? 0.2 : 1,
                        scale: isDimmed ? 0.8 : 1,
                      }}
                      className={`absolute -translate-x-1/2 
                      -translate-y-1/2 px-3 py-2 rounded-lg
                      border text-xs font-mono
                      ${clusterColors[cluster]}`}
                    >
                      ● {pt.word}
                    </motion.button>
                  );
                }),
              )}
            </div>

            <div className="flex gap-3 mt-5 flex-wrap">
              {Object.keys(wordClusters).map((cluster) => (
                <button
                  key={cluster}
                  onClick={() =>
                    setHighlightedCluster(
                      highlightedCluster === cluster ? null : cluster,
                    )
                  }
                  className={`px-3 py-1 rounded border text-xs
                  ${clusterColors[cluster]}`}
                >
                  {cluster}
                </button>
              ))}
            </div>
          </div>

          {/* VECTOR PREVIEW */}
          {selectedWord && (
            <div className={cardStyle}>
              <h3 className="flex items-center gap-2">
                <Sparkles className="text-yellow-400" />
                Vector Representation
              </h3>

              <div className="mt-4 bg-black/40 p-4 rounded-lg font-mono text-xs">
                <p>
                  Word:
                  <span className="text-cyan-400"> {selectedWord}</span>
                </p>

                <p className="mt-3 text-slate-400">Embedding Vector:</p>

                <p className="text-green-400">[{vectorExample.join(", ")}]</p>
              </div>
            </div>
          )}

          {/* SIMILARITY */}
          <div className={cardStyle}>
            <h3 className="font-semibold mb-4">Semantic Similarity</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                {presetComparisons.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPair(item)}
                    className="w-full p-3 rounded-lg bg-slate-900
                    border border-slate-800 text-left"
                  >
                    {item.pair}
                  </button>
                ))}
              </div>

              <div className="bg-slate-900 p-5 rounded-lg">
                <p className="text-slate-400 text-sm">Cosine Similarity</p>

                <div className="text-4xl text-indigo-400 font-bold">
                  {selectedPair.similarity}%
                </div>

                <p className="text-sm text-slate-400 mt-3">
                  {selectedPair.desc}
                </p>

                <div className="mt-4 h-3 bg-slate-800 rounded">
                  <motion.div
                    animate={{
                      width: `${selectedPair.similarity}%`,
                    }}
                    className="h-full bg-indigo-500 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={`${cardStyle} space-y-6`}>
          <h3 className="flex gap-2 items-center">
            <HelpCircle className="text-cyan-400" />
            Concept
          </h3>

          <ul className="text-sm text-slate-400 space-y-3">
            <li>Text is converted into numbers that represent meaning.</li>
            <li>Similar meanings create nearby vectors.</li>
            <li>
              Vector databases search these numbers instead of exact words.
            </li>
          </ul>

          <div className="bg-slate-900 p-4 rounded-lg">
            <div className="flex gap-2 items-center text-yellow-400">
              <Layers size={16} />
              RAG Example
            </div>

            <p className="text-xs mt-3 text-slate-400">
              PDF → Chunk → Embedding → Vector DB → Retrieve → LLM Answer
            </p>
          </div>

          <div className="bg-cyan-950/30 border border-cyan-900 p-4 rounded-lg">
            <div className="flex gap-2 items-center">
              <Search size={16} />
              Vector Search
            </div>

            <p className="text-xs text-cyan-300 mt-3">
              Query vector compares distance with stored vectors and returns the
              closest meaning.
            </p>
          </div>

          <div className="bg-indigo-950/30 p-4 rounded-lg">
            <div className="flex gap-2 items-center">
              <Info size={16} />
            </div>
            <p className="text-xs text-slate-300 mt-2">
              Cosine similarity measures angle between vectors. Smaller angle =
              more similar meaning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
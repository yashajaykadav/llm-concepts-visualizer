import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Layers,
  Type,
  Hash,
  Sparkles,
  Info,
  Cpu,
  Database
} from "lucide-react";

import {
  mockTokenDatabase,
  generateFallbackTokens
} from "./mockData";

export default function TokenizerModule() {
  const defaultText = "learning generative ai is fascinating";
  const [inputText, setInputText] = useState(defaultText);
  const [tokens, setTokens] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [stats, setStats] = useState({
    chars: 0,
    tokens: 0,
    avg: 0
  });

  useEffect(() => {
    const processed = inputText.toLowerCase();
    const data = mockTokenDatabase[processed] || generateFallbackTokens(processed);
    setTokens(data);
    setStats({
      chars: inputText.length,
      tokens: data.length,
      avg: data.length ? (inputText.length / data.length).toFixed(2) : 0
    });
  }, [inputText]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-8 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Layers className="text-indigo-400"/>
            Tokenizer
            <span className="text-sm bg-slate-800 px-3 py-1 rounded-full text-slate-400">
              Module 1
            </span>
          </h1>
          <p className="mt-3 text-slate-400">
            Tokenizer converts human language into smaller pieces called
            tokens before the model processes them.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <div className="flex justify-between mb-3">
                <h3 className="flex gap-2 items-center">
                  <Type size={18}/>
                  Input Text
                </h3>
                <span className="text-xs text-slate-400">
                  {stats.chars} characters
                </span>
              </div>

              <textarea
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="w-full h-36 bg-slate-900 border border-slate-700 rounded-xl p-4"
              />

              <div className="mt-4 flex gap-2 flex-wrap">
                {[
                  "learning generative ai",
                  "hello world",
                  "transformers are powerful"
                ].map(x => (
                  <button
                    key={x}
                    onClick={() => setInputText(x)}
                    className="px-3 py-1 bg-slate-800 rounded-lg text-xs"
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            {/* TOKENS */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold flex gap-2 mb-4">
                <Sparkles size={18}/>
                Token Segmentation
              </h3>

              <div className="bg-slate-900 p-5 rounded-xl flex flex-wrap gap-3">
                <AnimatePresence>
                  {tokens.map((token, index) => (
                    <motion.div
                      key={index}
                      initial={{scale: 0}}
                      animate={{scale: 1}}
                      onMouseEnter={() => setHovered(index)}
                      onMouseLeave={() => setHovered(null)}
                      className={`px-3 py-2 rounded-lg border cursor-pointer ${token.color} ${hovered === index ? "scale-110 ring-2 ring-white/30" : ""}`}
                    >
                      {token.text}
                      {hovered === index && (
                        <span className="text-xs ml-2">
                          ID:{token.id}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* IDS */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h3 className="flex gap-2 mb-4">
                <Hash size={18}/>
                Token IDs
              </h3>
              <div className="bg-black/40 p-4 rounded-xl font-mono text-cyan-400">
                [
                {tokens.map((t, i) => (
                  <span key={i}>
                    {t.id}
                    {i !== tokens.length - 1 ? ", " : ""}
                  </span>
                ))}
                ]
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <h3 className="flex gap-2 mb-5">
                <HelpCircle className="text-cyan-400"/>
                How Tokenization Works
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <b>1. Text</b>
                  <p className="text-slate-400 mt-2">
                    "hello world"
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg">
                  <b>2. Tokenizer</b>
                  <p className="text-slate-400 mt-2">
                    BPE splits text into useful pieces
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg">
                  <b>3. Token IDs</b>
                  <p className="text-slate-400 mt-2">
                    Tokens become numbers the model understands
                  </p>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg">
                  <b>4. Embedding</b>
                  <p className="text-slate-400 mt-2">
                    IDs are converted into vectors
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-5">
              <h3 className="flex gap-2">
                <Cpu size={18}/>
                Important Concepts
              </h3>

              <ul className="mt-4 text-sm text-slate-300 space-y-3">
                <li>• Models do not read words directly.</li>
                <li>• They process token IDs.</li>
                <li>
                  • One word can become multiple tokens.
                  Example: "unbelievable" ↓ "un" + "believ" + "able"
                </li>
                <li>
                  • Spaces may become part of tokens.
                  Example: " hello" is different from "hello"
                </li>
              </ul>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-5">
              <h3 className="flex gap-2">
                <Database size={18}/>
                Connection With Next Modules
              </h3>
              <p className="text-sm text-slate-300 mt-3">
                Tokens → Token IDs → Embeddings → Vector Database → RAG → LLM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
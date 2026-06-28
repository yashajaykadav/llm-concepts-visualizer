import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockTokenDatabase, generateFallbackTokens } from "./mockData";
import { HelpCircle, Layers, Type, Hash, Sparkles, AlertCircle } from "lucide-react";

export default function TokenizerModule() {
  const defaultText = "learning generative ai is fascinating";
  const [inputText, setInputText] = useState(defaultText);
  const [tokens, setTokens] = useState([]);
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState(null);
  const [stats, setStats] = useState({ chars: 0, tokens: 0, avgSize: 0 });

  useEffect(() => {
    const cleaned = inputText.trim().toLowerCase();
    const tokenData = mockTokenDatabase[cleaned] || generateFallbackTokens(inputText);
    setTokens(tokenData);
    
    const totalChars = inputText.length;
    const totalTokens = tokenData.length;
    const avgSize = totalTokens > 0 ? (totalChars / totalTokens) : 0;
    setStats({ chars: totalChars, tokens: totalTokens, avgSize });
  }, [inputText]);

  const handleExampleClick = (text) => setInputText(text);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <Layers className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                Tokenization
                <span className="text-sm font-normal text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">Module 1</span>
              </h1>
              <p className="text-slate-300 mt-3 leading-relaxed max-w-3xl">
                LLMs don't understand raw text directly—they split it into smaller units called <strong className="text-indigo-400">tokens</strong> and convert them into numerical IDs.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* INPUT */}
            <div className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-slate-200 font-semibold flex items-center gap-2">
                  <Type className="w-4 h-4 text-indigo-400" /> Enter text to tokenize
                </label>
                <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                  {stats.chars} characters
                </span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-40 resize-none bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
                placeholder="Type a sentence to see how it gets tokenized..."
              />
              <div className="flex flex-wrap gap-2 mt-4">
                <button onClick={() => handleExampleClick("learning generative ai is fascinating")} className="px-3 py-1.5 rounded-lg text-xs bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600 transition-all hover:scale-105">✨ Example 1</button>
                <button onClick={() => handleExampleClick("tokenizers break text into pieces")} className="px-3 py-1.5 rounded-lg text-xs bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600 transition-all hover:scale-105">🧩 Example 2</button>
                <button onClick={() => handleExampleClick("the quick brown fox jumps over the lazy dog")} className="px-3 py-1.5 rounded-lg text-xs bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600 transition-all hover:scale-105">🦊 Example 3</button>
              </div>
            </div>

            {/* TOKENS */}
            <div className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-colors space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-200 font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Token Segmentation
                  </h3>
                  <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">{tokens.length} tokens</span>
                </div>
                <div className="min-h-[100px] bg-slate-900/50 rounded-xl border border-slate-800/50 p-5 flex flex-wrap items-center gap-2">
                  <AnimatePresence mode="popLayout">
                    {tokens.length > 0 ? tokens.map((token, index) => (
                      <motion.span
                        key={`${token.id}-${index}`}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onMouseEnter={() => setHoveredTokenIndex(index)}
                        onMouseLeave={() => setHoveredTokenIndex(null)}
                        className={`px-3 py-2 rounded-lg border font-mono text-sm font-semibold cursor-pointer transition-colors ${token.color} ${hoveredTokenIndex === index ? "ring-2 ring-white/30 shadow-xl z-10 scale-110" : "hover:scale-105"}`}
                      >
                        {token.text === " " ? "␣" : token.text}
                        {hoveredTokenIndex === index && <span className="ml-2 text-[10px] opacity-60">#{token.id}</span>}
                      </motion.span>
                    )) : <span className="text-slate-500 text-sm">No tokens to display</span>}
                  </AnimatePresence>
                </div>
              </div>

              {/* TOKEN IDS */}
              <div>
                <h3 className="text-slate-200 font-semibold mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-cyan-400" /> Token IDs
                  <span className="text-xs font-normal text-slate-500 ml-2">(sent to model)</span>
                </h3>
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-5 font-mono flex flex-wrap items-center gap-1 min-h-[60px]">
                  <span className="text-indigo-400 font-bold">[</span>
                  <AnimatePresence mode="popLayout">
                    {tokens.map((token, index) => (
                      <motion.span
                        key={`id-${token.id}-${index}`}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`transition-all duration-200 px-1 ${hoveredTokenIndex === index ? "text-white font-bold scale-110" : "text-cyan-400"}`}
                      >
                        {token.id}{index !== tokens.length - 1 && <span className="text-slate-600 mx-0.5">,</span>}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                  {tokens.length === 0 && <span className="text-slate-500 text-sm font-sans">No tokens</span>}
                  <span className="text-indigo-400 font-bold">]</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (Restored) */}
          <div className="space-y-6">
            <div className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-colors h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white font-semibold">How Tokenization Works</h3>
              </div>

              <div className="space-y-4 flex-1">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 text-sm font-bold">↗</span>
                  </div>
                  <p className="text-sm text-slate-300">Words can split into <strong className="text-purple-400">sub-tokens</strong> for better handling of new words.</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-400 text-sm font-bold">∞</span>
                  </div>
                  <p className="text-sm text-slate-300">This allows models to handle <strong className="text-green-400">unknown words</strong> by breaking them down.</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-sm font-bold">#</span>
                  </div>
                  <p className="text-sm text-slate-300">Every token gets a <strong className="text-blue-400">unique numerical ID</strong> for the model to process.</p>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-br from-indigo-950/30 to-cyan-950/30 border border-indigo-900/50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Total Tokens</p>
                    <p className="text-2xl font-bold text-indigo-400 mt-1">{stats.tokens}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Avg Token Size</p>
                    <p className="text-2xl font-bold text-cyan-400 mt-1">
                      {stats.avgSize > 0 ? stats.avgSize.toFixed(1) : '0'} 
                      <span className="text-sm font-normal text-slate-400 ml-1">chars</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-amber-950/20 border border-amber-900/30 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-300/80"><strong className="text-amber-200">Tip:</strong> Hover over tokens to see their IDs and highlight relationships.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
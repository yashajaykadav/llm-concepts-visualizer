import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Cpu, FileText, Sparkles, ArrowRight, RefreshCcw } from 'lucide-react';
import { knowledgeBase, presetQueries } from './mockRagData';

export default function RagModule() {
  const [activeQuery, setActiveQuery] = useState(presetQueries[0]);
  const [simulationStep, setSimulationStep] = useState(0); 
  // Steps: 0: Idle, 1: Embedding/Searching, 2: Retrieving, 3: Generating, 4: Done
  const [displayedAnswer, setDisplayedAnswer] = useState("");

  const runSimulation = () => {
    setSimulationStep(1);
    setDisplayedAnswer("");
  };

  const resetSimulation = () => {
    setSimulationStep(0);
    setDisplayedAnswer("");
  };

  useEffect(() => {
    let timeout;
    if (simulationStep === 1) {
      timeout = setTimeout(() => setSimulationStep(2), 1500);
    } else if (simulationStep === 2) {
      timeout = setTimeout(() => setSimulationStep(3), 2000);
    } else if (simulationStep === 3) {
      // Typewriter effect for the answer
      let i = 0;
      const typeWriter = setInterval(() => {
        setDisplayedAnswer(activeQuery.answer.slice(0, i + 1));
        i++;
        if (i >= activeQuery.answer.length) {
          clearInterval(typeWriter);
          setSimulationStep(4);
        }
      }, 30);
      return () => clearInterval(typeWriter);
    }
    return () => clearTimeout(timeout);
  }, [simulationStep, activeQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8 flex items-start gap-4 flex-wrap">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <Search className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              Retrieval-Augmented Generation
              <span className="text-sm font-normal text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">Module 4</span>
            </h1>
            <p className="text-slate-300 mt-3 leading-relaxed max-w-3xl">
              RAG improves LLM responses by fetching relevant facts from an external <strong className="text-emerald-400">Vector Database</strong> and injecting them into the prompt before generating an answer.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {presetQueries.map(q => (
                <button
                  key={q.id}
                  disabled={simulationStep > 0 && simulationStep < 4}
                  onClick={() => { setActiveQuery(q); resetSimulation(); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeQuery.id === q.id 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                      : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  "{q.text}"
                </button>
              ))}
            </div>
            <button
              onClick={simulationStep === 4 ? resetSimulation : runSimulation}
              disabled={simulationStep > 0 && simulationStep < 4}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {simulationStep === 4 ? <><RefreshCcw className="w-4 h-4" /> Reset</> : <><Sparkles className="w-4 h-4" /> Run Pipeline</>}
            </button>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Prompt & Generation */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Context Assembly */}
            <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 min-h-[300px] flex flex-col">
              <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" /> Prompt Context Window
              </h3>
              
              <div className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-xl p-5 space-y-4 relative overflow-hidden">
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">System Prompt</p>
                <div className="text-sm text-slate-300 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  You are a helpful assistant. Answer the user's query strictly based on the provided context below.
                </div>
                
                <AnimatePresence>
                  {simulationStep >= 2 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                      <p className="text-sm text-emerald-400 uppercase tracking-wider font-semibold flex items-center gap-2">
                        Retrieved Context <Sparkles className="w-3 h-3 animate-pulse" />
                      </p>
                      <div className="space-y-2">
                        {activeQuery.targetIds.map(id => {
                          const chunk = knowledgeBase.find(c => c.id === id);
                          return (
                            <motion.div 
                              layoutId={`chunk-${id}`} 
                              key={id}
                              className="text-sm text-emerald-100 bg-emerald-900/30 p-3 rounded-lg border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                            >
                              "{chunk.text}"
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-sm text-blue-400 uppercase tracking-wider font-semibold mt-4">User Query</p>
                <div className="text-sm text-white font-medium bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
                  {activeQuery.text}
                </div>
              </div>
            </div>

            {/* LLM Output */}
            <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 relative overflow-hidden">
              {simulationStep < 3 && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                  <Cpu className={`w-8 h-8 text-slate-600 mb-2 ${simulationStep === 2 ? 'animate-bounce text-indigo-400' : ''}`} />
                  <p className="text-sm text-slate-500">{simulationStep === 2 ? 'Processing Augmented Prompt...' : 'Waiting for prompt...'}</p>
                </div>
              )}
              <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" /> LLM Generation
              </h3>
              <div className="min-h-[100px] text-base text-slate-200 leading-relaxed">
                {displayedAnswer}
                {simulationStep === 3 && <span className="inline-block w-2 h-4 bg-indigo-400 ml-1 animate-pulse" />}
              </div>
            </div>
          </div>

          {/* Right Column: Vector Database */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-200 font-semibold flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" /> Vector Database
                </h3>
                {simulationStep === 1 && (
                  <span className="text-xs text-emerald-400 animate-pulse flex items-center gap-1">
                    <Search className="w-3 h-3" /> Searching...
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-3 relative">
                {knowledgeBase.map((chunk) => {
                  const isTarget = activeQuery.targetIds.includes(chunk.id);
                  const isSearching = simulationStep === 1;
                  const isRetrieved = simulationStep >= 2;
                  
                  let stateClasses = "bg-slate-900/50 border-slate-800/50 text-slate-400";
                  if (isSearching) {
                    stateClasses = isTarget ? "bg-emerald-900/20 border-emerald-500/30 text-emerald-200" : "bg-slate-900/30 border-slate-800/30 text-slate-600 opacity-50";
                  } else if (isRetrieved && isTarget) {
                    stateClasses = "bg-slate-900/30 border-emerald-500/10 text-slate-600 opacity-20"; // Dimmed after extraction
                  }

                  return (
                    <motion.div
                      key={chunk.id}
                      layoutId={isRetrieved && isTarget ? undefined : `chunk-${chunk.id}`}
                      className={`p-4 rounded-xl border transition-all duration-500 relative ${stateClasses}`}
                    >
                      <div className="text-xs font-mono mb-2 opacity-60 flex justify-between">
                        <span>ID: {chunk.id}</span>
                        {isSearching && (
                          <span className={isTarget ? "text-emerald-400" : "text-slate-500"}>
                            Sim: {(chunk.relevance[activeQuery.id] * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                      <p className="text-sm">{chunk.text}</p>
                      
                      {/* Search scan line animation */}
                      {isSearching && isTarget && (
                        <motion.div 
                          initial={{ left: 0, opacity: 0 }}
                          animate={{ left: "100%", opacity: [0, 1, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="absolute top-0 bottom-0 w-1 bg-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
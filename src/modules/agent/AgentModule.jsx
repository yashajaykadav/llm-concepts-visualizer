// src/modules/agent/AgentModule.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Wrench, Terminal, Play, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { availableTools, agentQueries } from './mockAgentData';

export default function AgentModule() {
  const [activeQuery, setActiveQuery] = useState(agentQueries[0]);
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const nextStep = () => {
    if (currentStepIdx < activeQuery.steps.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    } else {
      setIsAutoPlaying(false);
    }
  };

  const resetAgent = () => {
    setCurrentStepIdx(-1);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    let timer;
    if (isAutoPlaying && currentStepIdx < activeQuery.steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIdx(prev => prev + 1);
      }, 1800);
    } else if (currentStepIdx === activeQuery.steps.length - 1) {
      setIsAutoPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStepIdx, activeQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-8 px-4 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Module Header */}
        <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8 flex items-start gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <Cpu className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              AI Agents & Tool Use
              <span className="text-sm font-normal text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">Module 5</span>
            </h1>
            <p className="text-slate-300 mt-3 leading-relaxed max-w-3xl">
              Agents expand LLM capabilities using a **Reasoning Loop**. Instead of raw guessing, the model evaluates a goal, chooses an operational tool from its registry, intercepts the JSON output, and absorbs the environmental feedback.
            </p>
          </div>
        </div>

        {/* Dynamic Controls */}
        <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {agentQueries.map(q => (
              <button
                key={q.id}
                disabled={isAutoPlaying || (currentStepIdx >= 0 && currentStepIdx < activeQuery.steps.length - 1)}
                onClick={() => { setActiveQuery(q); resetAgent(); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeQuery.id === q.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                    : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50'
                } disabled:opacity-40`}
              >
                "{q.text}"
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsAutoPlaying(true)}
              disabled={isAutoPlaying || currentStepIdx === activeQuery.steps.length - 1}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-all disabled:opacity-40"
            >
              <Play className="w-4 h-4" /> Run Agent Loop
            </button>
            <button
              onClick={resetAgent}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold border border-slate-700 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Tool Registry */}
          <div className="lg:col-span-4 bg-slate-950/50 border border-slate-800/50 rounded-2xl p-6 space-y-4">
            <h3 className="text-slate-200 font-semibold flex items-center gap-2 border-b border-slate-800 pb-3">
              <Wrench className="w-4 h-4 text-amber-400" /> Tool System Registry
            </h3>
            <p className="text-xs text-slate-400">These declarations are injected explicitly into the LLM configuration header context.</p>
            <div className="space-y-3">
              {availableTools.map(tool => {
                const isBeingUsed = currentStepIdx >= 0 && activeQuery.steps[currentStepIdx]?.toolCall?.name === tool.name;
                return (
                  <div 
                    key={tool.name} 
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      isBeingUsed 
                        ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white' 
                        : 'bg-slate-900/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-sm font-semibold ${isBeingUsed ? 'text-amber-400' : 'text-slate-200'}`}>
                        {tool.name}()
                      </span>
                      {isBeingUsed && <span className="text-[10px] uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded animate-pulse">Active Call</span>}
                    </div>
                    <p className="text-xs mt-1.5 leading-relaxed">{tool.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Execution Live Log */}
          <div className="lg:col-span-8 bg-slate-950/50 border border-slate-800/50 rounded-2xl p-6 flex flex-col min-h-[450px]">
            <h3 className="text-slate-200 font-semibold flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <Terminal className="w-4 h-4 text-emerald-400" /> Agent Processing Trace
            </h3>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {currentStepIdx === -1 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm py-12">
                  <Cpu className="w-10 h-10 mb-2 opacity-30 animate-pulse" />
                  Click "Run Agent Loop" to trace the execution frames.
                </div>
              )}

              <AnimatePresence>
                {activeQuery.steps.map((step, idx) => {
                  if (idx > currentStepIdx) return null;

                  let cardStyle = "bg-slate-900/60 border-slate-800 text-slate-300";
                  let prefix = "THOUGHT";
                  let badgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";

                  if (step.type === 'tool_call') {
                    cardStyle = "bg-amber-500/5 border-amber-500/30 text-amber-200";
                    prefix = "TOOL CALL ENGINE";
                    badgeColor = "bg-amber-500/20 text-amber-300 border-amber-500/30";
                  } else if (step.type === 'observation') {
                    cardStyle = "bg-purple-500/5 border-purple-500/30 text-purple-200";
                    prefix = "OBSERVATION FEEDBACK";
                    badgeColor = "bg-purple-500/20 text-purple-300 border-purple-500/30";
                  } else if (step.type === 'final_answer') {
                    cardStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.05)]";
                    prefix = "FINAL RESPONSE";
                    badgeColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
                  }

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 rounded-xl border text-sm space-y-2 transition-all ${cardStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${badgeColor}`}>
                          {prefix}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">Frame {idx + 1}</span>
                      </div>
                      
                      <p className="leading-relaxed">{step.message}</p>

                      {step.toolCall && (
                        <pre className="text-xs bg-black/40 border border-slate-800 p-3 rounded-lg font-mono text-amber-300 overflow-x-auto">
                          {`{ "tool": "${step.toolCall.name}", "arguments": ${JSON.stringify(step.toolCall.args)} }`}
                        </pre>
                      )}

                      {step.toolOutput && (
                        <pre className="text-xs bg-black/40 border border-slate-800 p-3 rounded-lg font-mono text-purple-300 overflow-x-auto">
                          {`{ "tool_response": ${JSON.stringify(step.toolOutput)} }`}
                        </pre>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { 
  Eye, 
  Brain, 
  Network, 
  ArrowRight, 
  Layers, 
  HelpCircle, 
  Sparkles,
  TrendingUp,
  Hash,
  GitBranch,
  Target
} from 'lucide-react';
import { sampleSentences, multiHeadData, attentionConcepts } from './index';

export default function AttentionModule() {
  const [selectedSentence, setSelectedSentence] = useState(sampleSentences[0]);
  const [hoveredWordIndex, setHoveredWordIndex] = useState(null);
  const [activeHead, setActiveHead] = useState(1);
  const [showDetails, setShowDetails] = useState(true);

  // Get attention weights for a specific word
  const getAttentionWeights = (wordIndex) => {
    if (wordIndex === null || !selectedSentence.attention[wordIndex]) return [];
    return selectedSentence.attention[wordIndex];
  };

  // Calculate max attention for scaling
  const getMaxAttention = () => {
    let max = 0;
    selectedSentence.attention.forEach(row => {
      row.forEach(val => {
        if (val > max) max = val;
      });
    });
    return max;
  };

  const maxAttention = getMaxAttention();

  // Render attention heatmap
  const renderAttentionHeatmap = () => {
    const words = selectedSentence.words;
    const attention = selectedSentence.attention;

    return (
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="grid" style={{ 
            gridTemplateColumns: `auto repeat(${words.length}, minmax(60px, 1fr))`,
            gap: '2px'
          }}>
            {/* Header */}
            <div className="p-2 text-xs text-slate-500 font-semibold">Source →</div>
            {words.map((word, i) => (
              <div key={`header-${i}`} className="p-2 text-xs text-slate-300 font-mono text-center bg-slate-800/50 rounded-t-lg">
                {word}
              </div>
            ))}

            {/* Attention Matrix */}
            {attention.map((row, i) => (
              <React.Fragment key={`row-${i}`}>
                <div className="p-2 text-xs text-slate-300 font-mono text-right bg-slate-800/50 rounded-l-lg">
                  {words[i]}
                </div>
                {row.map((weight, j) => {
                  const isHovered = hoveredWordIndex === i || hoveredWordIndex === j;
                  const intensity = weight / maxAttention;
                  const isSelf = i === j;
                  
                  return (
                    <div
                      key={`cell-${i}-${j}`}
                      className={`
                        p-2 text-center text-[10px] font-mono transition-all cursor-pointer
                        ${isHovered ? 'scale-105 z-10' : ''}
                        ${isSelf ? 'ring-1 ring-white/20' : ''}
                      `}
                      style={{
                        backgroundColor: `rgba(99, 102, 241, ${intensity * 0.8})`,
                        opacity: isHovered ? 1 : 0.7,
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={() => setHoveredWordIndex(i)}
                      onMouseLeave={() => setHoveredWordIndex(null)}
                    >
                      {weight > 0.05 ? `${(weight * 100).toFixed(0)}%` : ''}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render attention visualization (word connections)
  const renderAttentionGraph = () => {
    const words = selectedSentence.words;
    const attention = selectedSentence.attention;
    const hoveredWeights = getAttentionWeights(hoveredWordIndex);

    return (
      <div className="relative min-h-[300px] bg-slate-900/50 rounded-xl border border-slate-800/50 p-6">
        {/* Word nodes */}
        <div className="flex justify-around items-center h-full flex-wrap gap-4">
          {words.map((word, i) => {
            const isHovered = hoveredWordIndex === i;
            const totalWeight = hoveredWeights[i] || 0;
            
            return (
              <div
                key={i}
                className={`
                  relative flex flex-col items-center transition-all duration-300
                  ${isHovered ? 'scale-110' : ''}
                `}
                onMouseEnter={() => setHoveredWordIndex(i)}
                onMouseLeave={() => setHoveredWordIndex(null)}
              >
                {/* Word bubble */}
                <div className={`
                  px-4 py-2 rounded-lg font-mono text-sm font-semibold cursor-pointer
                  transition-all duration-300
                  ${isHovered 
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-110' 
                    : 'bg-slate-800/80 text-slate-300 border border-slate-700/50 hover:bg-slate-700/80'
                  }
                `}>
                  {word}
                </div>
                
                {/* Attention weight indicator */}
                {hoveredWordIndex !== null && hoveredWordIndex !== i && (
                  <div className="mt-2 text-[10px] text-indigo-400 font-mono">
                    {(totalWeight * 100).toFixed(0)}%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Connection lines (simplified) */}
        {hoveredWordIndex !== null && (
          <div className="absolute inset-0 pointer-events-none">
            {words.map((_, i) => {
              if (i === hoveredWordIndex) return null;
              const weight = hoveredWeights[i] || 0;
              if (weight < 0.05) return null;
              
              return (
                <div
                  key={`line-${i}`}
                  className="absolute border-t border-indigo-400/30"
                  style={{
                    top: '50%',
                    left: `${(hoveredWordIndex / words.length) * 100 + 10}%`,
                    right: `${(i / words.length) * 100 + 10}%`,
                    opacity: weight * 3,
                    transform: 'translateY(-50%)',
                    borderWidth: `${weight * 4}px`,
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-8">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <Brain className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                Attention Mechanism
                <span className="text-sm font-normal text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                  Module 3
                </span>
                <span className="text-xs font-normal bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                  Interactive
                </span>
              </h1>
              <p className="text-slate-300 mt-3 leading-relaxed max-w-3xl">
                The <strong className="text-indigo-400">Attention Mechanism</strong> is the core innovation of Transformers. 
                It allows models to focus on relevant parts of the input, understanding context and relationships between words.
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sentence Selector */}
            <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
              <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Select a Sentence to Analyze
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {sampleSentences.map((sentence) => (
                  <button
                    key={sentence.id}
                    onClick={() => {
                      setSelectedSentence(sentence);
                      setHoveredWordIndex(null);
                    }}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${selectedSentence.id === sentence.id
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                        : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50'
                      }
                    `}
                  >
                    "{sentence.text}"
                  </button>
                ))}
              </div>
            </div>

            {/* Attention Visualization */}
            <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-200 font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  Attention Visualization
                  <span className="text-xs font-normal text-slate-500 ml-2">
                    (Hover over a word)
                  </span>
                </h3>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
              </div>

              {/* Word Graph */}
              {renderAttentionGraph()}

              {/* Heatmap */}
              {showDetails && (
                <div className="mt-6">
                  <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
                    Attention Weight Matrix
                  </h4>
                  {renderAttentionHeatmap()}
                </div>
              )}
            </div>

            {/* Multi-Head Attention */}
            <div className="bg-slate-950/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
              <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                Multi-Head Attention
                <span className="text-xs font-normal text-slate-500 ml-2">
                  Different heads capture different relationships
                </span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {multiHeadData.heads.map((head) => (
                  <button
                    key={head.id}
                    onClick={() => setActiveHead(head.id)}
                    className={`
                      p-3 rounded-lg border transition-all text-center
                      ${activeHead === head.id
                        ? `bg-gradient-to-r ${head.color} border-transparent text-white shadow-lg`
                        : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-700/50'
                      }
                    `}
                  >
                    <div className="text-sm font-semibold">Head {head.id}</div>
                    <div className="text-[10px] opacity-80">{head.name}</div>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-800/50">
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Active: </strong>
                  {multiHeadData.heads.find(h => h.id === activeHead)?.name}
                  <span className="block text-xs text-slate-400 mt-1">
                    Each attention head learns to focus on different aspects of the input, 
                    like syntax, semantics, or positional relationships.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Info panel */}
          <div className="space-y-6">
            {/* Key Concepts */}
            <div className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <h3 className="text-white font-semibold">Key Concepts</h3>
              </div>

              <div className="space-y-4">
                {attentionConcepts.map((concept, index) => (
                  <div key={index} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50 hover:border-slate-700/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{concept.icon}</div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{concept.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{concept.description}</p>
                        {showDetails && (
                          <p className="text-xs text-slate-500 mt-2 border-t border-slate-800/50 pt-2">
                            {concept.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats & Info */}
            <div className="bg-slate-950/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-6">
              <div className="space-y-3">
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Current Sentence</span>
                    <span className="text-xs text-slate-300 font-mono">{selectedSentence.words.length} tokens</span>
                  </div>
                  <p className="text-sm text-white mt-1">"{selectedSentence.text}"</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Max Attention</span>
                    <span className="text-xs text-indigo-400 font-mono">{(maxAttention * 100).toFixed(0)}%</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all"
                      style={{ width: `${(maxAttention) * 100}%` }}
                    />
                  </div>
                </div>

                {hoveredWordIndex !== null && (
                  <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-lg p-3 animate-fadeIn">
                    <p className="text-xs text-indigo-300">
                      <strong className="text-white">Focus on:</strong> "{selectedSentence.words[hoveredWordIndex]}"
                      <span className="block text-[10px] text-indigo-400/70 mt-1">
                        This word is paying attention to other words in the sentence
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Tip */}
              <div className="mt-4 bg-amber-950/20 border border-amber-900/30 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-300/80">
                    <strong className="text-amber-200">Tip:</strong> Hover over words to see attention patterns. 
                    Brighter colors = stronger attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
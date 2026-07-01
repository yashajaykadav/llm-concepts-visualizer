import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Search,
  Cpu,
  FileText,
  Sparkles,
  RefreshCcw,
  Layers,
  ArrowDown,
} from "lucide-react";

import { knowledgeBase, presetQueries } from "./mockRagData";

export default function RagModule() {
  const [activeQuery, setActiveQuery] = useState(presetQueries[0]);

  const [step, setStep] = useState(0);

  /*
    0 idle
    1 query embedding
    2 vector search
    3 retrieval
    4 prompt augmentation
    5 generation
    6 done
  */

  const [answer, setAnswer] = useState("");

  const run = () => {
    setAnswer("");

    setStep(1);
  };

  const reset = () => {
    setStep(0);

    setAnswer("");
  };

  useEffect(() => {
    let timer;

    if (step === 1) {
      timer = setTimeout(() => setStep(2), 1800);
    } else if (step === 2) {
      timer = setTimeout(() => setStep(3), 2200);
    } else if (step === 3) {
      timer = setTimeout(() => setStep(4), 1800);
    } else if (step === 4) {
      timer = setTimeout(() => setStep(5), 1500);
    } else if (step === 5) {
      let index = 0;

      const interval = setInterval(() => {
        setAnswer(activeQuery.answer.slice(0, index + 1));

        index++;

        if (index >= activeQuery.answer.length) {
          clearInterval(interval);

          setStep(6);
        }
      }, 35);

      return () => clearInterval(interval);
    }

    return () => clearTimeout(timer);
  }, [step, activeQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-5 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h1 className="text-4xl font-bold flex gap-3 items-center">
            <Sparkles className="text-emerald-400" />
            Retrieval Augmented Generation
            <span className="text-sm bg-slate-800 px-3 py-1 rounded-full text-slate-400">
              Module 4
            </span>
          </h1>

          <p className="mt-3 text-slate-400">
            RAG allows LLMs to use external knowledge by retrieving relevant
            information from vector databases before generating answers.
          </p>
        </div>

        {/* PIPELINE */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="font-semibold mb-5">RAG Pipeline</h2>

          <div className="grid md:grid-cols-7 gap-3">
            {[
              "Document",

              "Chunking",

              "Embedding",

              "Vector DB",

              "Search",

              "Context",

              "LLM",
            ].map((x, i) => (
              <div
                key={x}
                className={`p-4 rounded-lg text-center border

${
  step > i
    ? "border-emerald-400 bg-emerald-900/20"
    : "border-slate-700 bg-slate-800"
}

`}
              >
                <div className="text-emerald-400 font-bold">{i + 1}</div>

                <p className="text-xs mt-2">{x}</p>
              </div>
            ))}
          </div>
        </div>

        {/* QUERY CONTROL */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between flex-wrap gap-4">
          <div className="flex gap-2 flex-wrap">
            {presetQueries.map((q) => (
              <button
                key={q.id}
                onClick={() => {
                  setActiveQuery(q);

                  reset();
                }}
                className={`px-4 py-2 rounded-lg text-sm

${activeQuery.id === q.id ? "bg-emerald-600" : "bg-slate-800"}

`}
              >
                {q.text}
              </button>
            ))}
          </div>

          <button
            onClick={step === 6 ? reset : run}
            disabled={step > 0 && step < 6}
            className="px-6 py-2 rounded-lg bg-indigo-600 flex gap-2 items-center"
          >
            {step === 6 ? (
              <>
                <RefreshCcw size={16} />
                Reset
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Run RAG
              </>
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT */}

          <div className="space-y-6">
            {/* QUERY EMBEDDING */}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold flex gap-2">
                <Search size={18} />
                Query Embedding
              </h3>

              <AnimatePresence>
                {step >= 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 bg-black/40 p-4 rounded-lg font-mono text-xs"
                  >
                    User Query:
                    <p className="text-cyan-400">{activeQuery.text}</p>
                    <br />
                    Vector:
                    <p className="text-green-400">[0.231,-0.443,0.892,...]</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PROMPT WINDOW */}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold flex gap-2">
                <FileText size={18} />
                Augmented Prompt
              </h3>

              <div className="mt-4 bg-black/30 p-4 rounded-lg text-sm">
                <p className="text-slate-400">System:</p>

                <p>Answer using provided context only.</p>

                <AnimatePresence>
                  {step >= 3 && (
                    <div className="mt-4 text-emerald-300">
                      Retrieved Context:
                      {activeQuery.targetIds.map((id) => {
                        const c = knowledgeBase.find((x) => x.id === id);

                        return (
                          <p
                            key={id}
                            className="mt-2 bg-emerald-900/30 p-2 rounded"
                          >
                            {c.text}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* OUTPUT */}

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="font-semibold flex gap-2">
                <Cpu size={18} />
                LLM Response
              </h3>

              <div className="mt-4 min-h-[100px] text-slate-200">
                {answer}

                {step === 5 && <span className="animate-pulse">|</span>}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="font-semibold flex gap-2">
              <Database size={18} />
              Vector Database
            </h3>

            <div className="mt-5 space-y-3">
              {knowledgeBase.map((chunk) => {
                const selected = activeQuery.targetIds.includes(chunk.id);

                return (
                  <motion.div
                    key={chunk.id}
                    className={`p-4 rounded-xl border


${
  selected && step >= 2
    ? "border-emerald-400 bg-emerald-900/20"
    : "border-slate-700 bg-slate-800"
}


`}
                  >
                    <div className="text-xs text-slate-400 flex justify-between">
                      <span>{chunk.id}</span>

                      {step >= 2 && (
                        <span className="text-emerald-400">
                          Similarity
                          {Math.round(chunk.relevance[activeQuery.id] * 100)}%
                        </span>
                      )}
                    </div>

                    <p className="text-sm mt-2">{chunk.text}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 bg-indigo-900/20 border border-indigo-500/30 p-5 rounded-xl">
              <h4 className="flex gap-2">
                <Layers size={18} />
                How RAG prevents hallucination
              </h4>

              <p className="text-sm text-slate-300 mt-3">
                Instead of guessing from training data, LLM receives verified
                context retrieved from your database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

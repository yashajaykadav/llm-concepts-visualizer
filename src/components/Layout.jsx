import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import {
  BookOpen,
  Binary,
  Database,
  Cpu,
  Lock,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import TokenizerModule from "../modules/tokenizer/TokenizerModule";
import EmbeddingsModule from "../modules/embeddings/EmbeddingsModule";
import AttentionModule from "../modules/attention/AttentionModule";
import RagModule from "../modules/rag/ragModule";

export default function Layout() {
  const [activeModule, setActiveModule] = useState("tokenizer");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(null);

  const menuItems = [
    {
      id: "tokenizer",
      name: "Text Tokenization",
      icon: Binary,
      description: "Understanding how text is broken down",
      status: "active",
    },
    {
      id: "embeddings",
      name: "Vector Embeddings",
      icon: Database,
      description: "Converting words to vectors",
      status: "active",
    },
    {
      id: "attention",
      name: "Attention Mechanism",
      icon: Cpu,
      description: "How models focus on important parts",
      status: "active",
    },
    {
      id: "rag",
      name: "RAG Pipeline",
      icon: Search,
      description: "Retrieving data to augment generation",
      status: "active",
    },
  ];

  const getModuleStatus = (status) => {
    switch (status) {
      case "active":
        return {
          bg: "bg-emerald-500/20",
          text: "text-emerald-400",
          label: "Active",
        };
      case "upcoming":
        return {
          bg: "bg-amber-500/20",
          text: "text-amber-400",
          label: "Coming Soon",
        };
      default:
        return {
          bg: "bg-slate-700/30",
          text: "text-slate-500",
          label: "Locked",
        };
    }
  };

  const getModuleContent = () => {
    switch (activeModule) {
      case "tokenizer":
        return <TokenizerModule />;
      case "embeddings":
        return <EmbeddingsModule />;
      case "attention":
        return <AttentionModule />;
      case 'rag':
        return <RagModule />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <Cpu className="w-16 h-16 text-slate-600 mx-auto" />
              <h2 className="text-2xl font-bold text-slate-400 mt-4">
                Module Coming Soon
              </h2>
            </div>
          </div>
        );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100 font-sans overflow-hidden">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700/50 hover:bg-slate-700 transition-all"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <aside
        className={`fixed lg:relative z-40 w-72 lg:w-80 bg-slate-950/95 lg:bg-slate-950 border-r border-slate-800/50 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} h-full backdrop-blur-sm lg:backdrop-blur-none`}
      >
        <div className="p-6 border-b border-slate-800/50 flex items-center gap-3 bg-gradient-to-r from-slate-950 to-slate-900/50">
          <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <BookOpen className="text-indigo-400 w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent block">
              GenAI Core Lab
            </span>
            <span className="text-xs text-slate-500">
              Interactive Learning Platform
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold px-3">
              Learning Modules
            </p>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            const isLocked = item.status === "locked";
            const status = getModuleStatus(item.status);

            return (
              <button
                key={item.id}
                disabled={isLocked}
                onMouseEnter={() => setIsHovered(item.id)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => {
                  if (!isLocked) {
                    setActiveModule(item.id);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group ${isActive && !isLocked ? "bg-gradient-to-r from-indigo-600/30 to-indigo-600/10 text-white shadow-lg shadow-indigo-600/10 border border-indigo-500/30" : isLocked ? "text-slate-600 cursor-not-allowed opacity-60" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 hover:border-slate-700/50"}`}
              >
                <div
                  className={`p-2 rounded-lg transition-all ${isActive && !isLocked ? "bg-indigo-500/20 text-indigo-400" : isLocked ? "bg-slate-800/30 text-slate-600" : "bg-slate-800/50 text-slate-500 group-hover:text-slate-300"}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    {isLocked && (
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </div>
                  <p
                    className={`text-xs truncate ${isActive ? "text-indigo-300/70" : "text-slate-500"}`}
                  >
                    {item.description}
                  </p>
                </div>
                <div
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${status.bg} ${status.text} ${isActive ? "ring-1 ring-indigo-400/30" : ""}`}
                >
                  {status.label}
                </div>
                {isActive && !isLocked && (
                  <div className="absolute right-3 w-1.5 h-8 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400/30" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        <div className="min-h-full p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:hidden flex items-center justify-between mb-4 pt-12">
              <div>
                <h1 className="text-xl font-bold text-white">
                  {menuItems.find((item) => item.id === activeModule)?.name ||
                    "Module"}
                </h1>
                <p className="text-sm text-slate-400">
                  {menuItems.find((item) => item.id === activeModule)
                    ?.description || ""}
                </p>
              </div>
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <BookOpen className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div className="animate-fadeIn">{getModuleContent()}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

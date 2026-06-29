import React, { useState } from 'react';
import { Binary, Database, Cpu, Search, Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import TokenizerModule from '../modules/tokenizer/TokenizerModule';
import EmbeddingsModule from '../modules/embeddings/EmbeddingsModule';
import AttentionModule from '../modules/attention/AttentionModule';
import RagModule from '../modules/rag/ragModule'
import AgentModule from '../modules/agent/AgentModule';

export default function Layout() {
  const [activeModule, setActiveModule] = useState('tokenizer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'tokenizer', name: 'Tokenization', icon: Binary },
    { id: 'embeddings', name: 'Vector Embeddings', icon: Database },
    { id: 'attention', name: 'Attention Mechanism', icon: Cpu },
    { id: 'rag', name: 'RAG Pipeline', icon: Search },
    { id: 'agent', name: 'AI Agents Loop', icon: Cpu },
  ];

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        className="lg:hidden fixed top-6 right-6 z-[60] text-slate-400"
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        menuItems={menuItems} 
      />

      <main className="flex-1 h-full overflow-y-auto scrollbar-hide">
        <div className="p-6 lg:p-12 max-w-6xl mx-auto">
          <div className="animate-in fade-in duration-700">
            {activeModule === 'tokenizer' && <TokenizerModule />}
            {activeModule === 'embeddings' && <EmbeddingsModule />}
            {activeModule === 'attention' && <AttentionModule />}
            {activeModule === 'rag' && <RagModule />}
            {activeModule === 'agent' && <AgentModule />}
          </div>
        </div>
      </main>
    </div>
  );
}
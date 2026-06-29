import React from 'react';
import { motion } from 'framer-motion';

export default function Sidebar({ activeModule, setActiveModule, isMobileMenuOpen, setIsMobileMenuOpen, menuItems }) {
  return (
    <>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      <aside className={`fixed lg:relative z-50 w-72 h-full bg-[#080808] border-r border-white/5 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8">
          <h2 className="text-xl font-bold tracking-tight text-white">GenAI <span className="text-gradient">Lab</span></h2>
          <p className="text-[10px] text-slate-600 uppercase tracking-widest mt-1">Core Architecture</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveModule(item.id); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-white/5 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-600'}`} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
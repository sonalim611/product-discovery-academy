// src/components/AssumptionsMapper.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw, Compass } from 'lucide-react';

interface Assumption {
  id: string;
  text: string;
  type: 'Value' | 'Usability' | 'Feasibility' | 'Viability';
  importance: number; // 1 to 10 (Y-axis: Marginal -> Critical)
  evidence: number; // 1 to 10 (X-axis: Unknown -> Known)
}

export default function AssumptionsMapper() {
  const [assumptions, setAssumptions] = useState<Assumption[]>([
    { id: '1', text: 'Users are willing to pay $10/month', type: 'Value', importance: 9, evidence: 2 },
    { id: '2', text: 'API response will be under 200ms', type: 'Feasibility', importance: 5, evidence: 8 },
    { id: '3', text: 'Users can complete checkout in under 30s', type: 'Usability', importance: 7, evidence: 4 },
  ]);

  const [text, setText] = useState('');
  const [type, setType] = useState<Assumption['type']>('Value');
  const [importance, setImportance] = useState(5);
  const [evidence, setEvidence] = useState(5);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newAssumption: Assumption = {
      id: Date.now().toString(),
      text,
      type,
      importance,
      evidence,
    };

    setAssumptions([...assumptions, newAssumption]);
    setText('');
    setImportance(5);
    setEvidence(5);
  };

  const handleDelete = (id: string) => {
    setAssumptions(assumptions.filter((a) => a.id !== id));
  };

  const handleReset = () => {
    setAssumptions([
      { id: '1', text: 'Users are willing to pay $10/month', type: 'Value', importance: 9, evidence: 2 },
      { id: '2', text: 'API response will be under 200ms', type: 'Feasibility', importance: 5, evidence: 8 },
      { id: '3', text: 'Users can complete checkout in under 30s', type: 'Usability', importance: 7, evidence: 4 },
    ]);
  };

  const getTypeColor = (t: Assumption['type']) => {
    switch (t) {
      case 'Value':
        return 'bg-indigo-500 text-white';
      case 'Usability':
        return 'bg-violet-500 text-white';
      case 'Feasibility':
        return 'bg-sky-500 text-white';
      case 'Viability':
        return 'bg-emerald-500 text-white';
    }
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-border-card bg-bg-card/40 my-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border-card/50 pb-4 gap-4">
        <div className="flex items-center space-x-2">
          <Compass className="w-5 h-5 text-indigo-400" />
          <h3 className="font-display font-bold text-lg text-white">Interactive Assumptions Mapping Grid</h3>
        </div>
        <button 
          onClick={handleReset}
          className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-bg-main hover:bg-border-card border border-border-card text-xs font-bold text-gray-300 transition duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Grid</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Input & Form */}
        <div className="lg:col-span-5 space-y-5">
          <form onSubmit={handleAdd} className="space-y-4 bg-bg-main/30 p-4 rounded-xl border border-border-card/50">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Add Assumption</h4>
            
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-gray-400">Assumption Statement</label>
              <input 
                type="text" 
                placeholder="E.g., Users will connect their calendars..." 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-bg-main border border-border-card rounded-lg px-3 py-1.5 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400">Risk Type</label>
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value as Assumption['type'])}
                  className="w-full bg-bg-main border border-border-card rounded-lg px-2 py-1.5 text-xs text-gray-300 focus:outline-none"
                >
                  <option value="Value">Value (Desirability)</option>
                  <option value="Usability">Usability</option>
                  <option value="Feasibility">Feasibility</option>
                  <option value="Viability">Viability</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400">Importance ({importance})</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={importance}
                  onChange={(e) => setImportance(Number(e.target.value))}
                  className="w-full accent-brand-primary h-1.5 bg-bg-main rounded-lg appearance-none cursor-pointer mt-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-gray-400">Evidence ({evidence})</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={evidence}
                  onChange={(e) => setEvidence(Number(e.target.value))}
                  className="w-full accent-brand-secondary h-1.5 bg-bg-main rounded-lg appearance-none cursor-pointer mt-3"
                />
              </div>
              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center space-x-1 py-1.5 rounded-lg bg-brand-primary hover:bg-brand-primary/85 text-xs font-bold text-white transition duration-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Map Risk</span>
                </button>
              </div>
            </div>
          </form>

          {/* List */}
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Mapped Risks ({assumptions.length})</h4>
            <div className="space-y-2">
              {assumptions.map((a) => (
                <div key={a.id} className="flex items-center justify-between p-2.5 rounded-lg bg-bg-main/20 border border-border-card/50 text-xs">
                  <div className="space-y-1 max-w-[80%]">
                    <p className="text-gray-200 font-medium truncate">{a.text}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-1.5 py-0.5 rounded-[4px] text-[9px] font-bold ${getTypeColor(a.type)}`}>
                        {a.type}
                      </span>
                      <span className="text-[9px] text-gray-500 font-mono">
                        Imp: {a.importance} | Ev: {a.evidence}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(a.id)}
                    className="p-1 text-gray-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2x2 Grid Map */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square max-w-[340px] md:max-w-[400px] border-2 border-border-card bg-bg-main/50 rounded-xl overflow-hidden shadow-inner">
            
            {/* Quadrant Labels */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 text-[9px] font-extrabold uppercase pointer-events-none p-4 select-none">
              {/* Top Left: Critical + Unknown */}
              <div className="border-r border-b border-border-card/25 text-rose-500/80 bg-rose-950/5 p-1">
                Leap-of-Faith (Test First)
              </div>
              {/* Top Right: Critical + Known */}
              <div className="border-b border-border-card/25 text-emerald-500/80 bg-emerald-950/5 p-1 pl-3 text-right">
                Safe (Build / Scale)
              </div>
              {/* Bottom Left: Marginal + Unknown */}
              <div className="border-r border-border-card/25 text-gray-500/80 p-1 flex items-end">
                Defer / Monitor
              </div>
              {/* Bottom Right: Marginal + Known */}
              <div className="text-gray-500/80 p-1 flex items-end justify-end">
                Ignore / Archive
              </div>
            </div>

            {/* Grid Axes lines */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-border-card" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-border-card" />

            {/* Plotting points */}
            {assumptions.map((a) => {
              // Convert 1-10 to percentage (X: evidence, Y: importance)
              // X-axis: 1 (left) to 10 (right) -> 5% to 95%
              // Y-axis: 1 (bottom) to 10 (top) -> 95% to 5% (flipped coordinates)
              const left = 5 + ((a.evidence - 1) / 9) * 90;
              const top = 95 - ((a.importance - 1) / 9) * 90;

              return (
                <div 
                  key={a.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/marker z-10 cursor-pointer"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <div className={`
                    w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-bg-main shadow-lg text-[8px] font-black
                    ${getTypeColor(a.type)}
                    hover:scale-125 transition duration-200
                  `}>
                    {a.type[0]}
                  </div>

                  {/* Tooltip on marker hover */}
                  <div className="invisible group-hover/marker:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 rounded bg-bg-sidebar border border-border-card text-[9px] text-gray-200 z-50 text-center shadow-xl">
                    <p className="font-bold">{a.text}</p>
                    <p className="text-gray-500 text-[8px] mt-0.5">{a.type} Risk</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Axes legends */}
          <div className="w-full max-w-[400px] mt-3 flex items-center justify-between px-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <span>← Unknown (No Evidence)</span>
            <span>Evidence</span>
            <span>Known (Has Evidence) →</span>
          </div>
          
          <div className="w-full max-w-[400px] mt-1 text-[9px] text-center text-gray-500">
            Vertical axis: Importance (Top: Critical, Bottom: Marginal)
          </div>
        </div>
      </div>
    </div>
  );
}

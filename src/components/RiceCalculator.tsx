// src/components/RiceCalculator.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Trash2, ArrowUpDown, HelpCircle, RefreshCw, Calculator } from 'lucide-react';

interface FeatureRow {
  id: string;
  name: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
}

export default function RiceCalculator() {
  const [features, setFeatures] = useState<FeatureRow[]>([
    { id: '1', name: 'Interactive onboarding wizard', reach: 5000, impact: 2, confidence: 0.8, effort: 1.5 },
    { id: '2', name: 'One-click checkout buttons', reach: 8000, impact: 1, confidence: 0.5, effort: 0.5 },
    { id: '3', name: 'AI report generation module', reach: 1200, impact: 3, confidence: 0.3, effort: 4.0 },
  ]);

  const [newFeatureName, setNewFeatureName] = useState('');

  const calculateScore = (f: FeatureRow) => {
    if (f.effort <= 0) return 0;
    return Math.round((f.reach * f.impact * f.confidence) / f.effort);
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeatureName.trim()) return;
    
    const newRow: FeatureRow = {
      id: Date.now().toString(),
      name: newFeatureName,
      reach: 1000,
      impact: 1,
      confidence: 0.8,
      effort: 1.0,
    };
    
    setFeatures([...features, newRow]);
    setNewFeatureName('');
  };

  const handleUpdate = (id: string, field: keyof FeatureRow, value: string | number) => {
    setFeatures(features.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleDelete = (id: string) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const sortByScore = () => {
    const sorted = [...features].sort((a, b) => calculateScore(b) - calculateScore(a));
    setFeatures(sorted);
  };

  const resetCalculator = () => {
    setFeatures([
      { id: '1', name: 'Interactive onboarding wizard', reach: 5000, impact: 2, confidence: 0.8, effort: 1.5 },
      { id: '2', name: 'One-click checkout buttons', reach: 8000, impact: 1, confidence: 0.5, effort: 0.5 },
      { id: '3', name: 'AI report generation module', reach: 1200, impact: 3, confidence: 0.3, effort: 4.0 },
    ]);
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-6 border border-border-card bg-bg-card/40 my-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border-card/50 pb-4 gap-4">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-indigo-400" />
          <h3 className="font-display font-bold text-lg text-white">Interactive RICE Scoring Sandbox</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={sortByScore}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition duration-200"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort by Score</span>
          </button>
          <button 
            onClick={resetCalculator}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-bg-main hover:bg-border-card border border-border-card text-xs font-bold text-gray-300 transition duration-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Feature addition form */}
      <form onSubmit={handleAddFeature} className="flex gap-2">
        <input 
          type="text" 
          placeholder="Type a solution idea..." 
          value={newFeatureName}
          onChange={(e) => setNewFeatureName(e.target.value)}
          className="flex-1 bg-bg-main border border-border-card rounded-xl px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-brand-primary"
        />
        <button 
          type="submit"
          className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-brand-secondary hover:bg-brand-secondary/85 text-xs font-bold text-white transition duration-200 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Idea</span>
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border-card/50 text-gray-400">
              <th className="py-2.5 px-2">Solution Idea</th>
              <th className="py-2.5 px-2 w-24">
                <span className="flex items-center">
                  Reach
                  <HelpTooltip text="Number of users affected per month." />
                </span>
              </th>
              <th className="py-2.5 px-2 w-28">
                <span className="flex items-center">
                  Impact
                  <HelpTooltip text="3 = Massive, 2 = High, 1 = Med, 0.5 = Low, 0.25 = Minimal" />
                </span>
              </th>
              <th className="py-2.5 px-2 w-28">
                <span className="flex items-center">
                  Confidence
                  <HelpTooltip text="How confident are you in these numbers? 100%, 80%, 50%." />
                </span>
              </th>
              <th className="py-2.5 px-2 w-24">
                <span className="flex items-center">
                  Effort (mo)
                  <HelpTooltip text="Estimated person-months to implement." />
                </span>
              </th>
              <th className="py-2.5 px-2 w-20 text-center font-bold text-indigo-300">RICE</th>
              <th className="py-2.5 px-2 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-card/30">
            {features.map((f) => {
              const score = calculateScore(f);
              return (
                <tr key={f.id} className="hover:bg-bg-main/20 group transition-all">
                  <td className="py-3 px-2 font-medium text-white max-w-[200px] truncate">
                    <input 
                      type="text" 
                      value={f.name}
                      onChange={(e) => handleUpdate(f.id, 'name', e.target.value)}
                      className="bg-transparent border-b border-transparent focus:border-indigo-500 focus:outline-none w-full text-white truncate"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <input 
                      type="number" 
                      min="0"
                      value={f.reach}
                      onChange={(e) => handleUpdate(f.id, 'reach', Number(e.target.value))}
                      className="bg-bg-main border border-border-card rounded px-2 py-1 w-20 focus:outline-none text-white font-mono"
                    />
                  </td>
                  <td className="py-3 px-2">
                    <select
                      value={f.impact}
                      onChange={(e) => handleUpdate(f.id, 'impact', Number(e.target.value))}
                      className="bg-bg-main border border-border-card rounded px-1.5 py-1 w-24 focus:outline-none text-white"
                    >
                      <option value={3}>3 (Massive)</option>
                      <option value={2}>2 (High)</option>
                      <option value={1}>1 (Medium)</option>
                      <option value={0.5}>0.5 (Low)</option>
                      <option value={0.25}>0.25 (Minimal)</option>
                    </select>
                  </td>
                  <td className="py-3 px-2">
                    <select
                      value={f.confidence}
                      onChange={(e) => handleUpdate(f.id, 'confidence', Number(e.target.value))}
                      className="bg-bg-main border border-border-card rounded px-1.5 py-1 w-24 focus:outline-none text-white"
                    >
                      <option value={1.0}>100% (High)</option>
                      <option value={0.8}>80% (Medium)</option>
                      <option value={0.5}>50% (Low)</option>
                      <option value={0.2}>20% (Speculative)</option>
                    </select>
                  </td>
                  <td className="py-3 px-2">
                    <input 
                      type="number" 
                      min="0.1" 
                      step="0.1"
                      value={f.effort}
                      onChange={(e) => handleUpdate(f.id, 'effort', Number(e.target.value))}
                      className="bg-bg-main border border-border-card rounded px-2 py-1 w-16 focus:outline-none text-white font-mono"
                    />
                  </td>
                  <td className="py-3 px-2 text-center text-sm font-black text-indigo-400 font-mono">
                    {score}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button 
                      onClick={() => handleDelete(f.id)}
                      className="p-1 text-gray-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all rounded"
                      title="Delete idea"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {features.length === 0 && (
        <p className="text-center text-gray-500 text-xs py-4">No solutions added. Type one above and click &quot;Add Idea&quot;!</p>
      )}
    </div>
  );
}

function HelpTooltip({ text }: { text: string }) {
  return (
    <div className="relative group/tooltip inline-block ml-1">
      <HelpCircle className="w-3 h-3 text-gray-500 hover:text-gray-300 cursor-help shrink-0" />
      <span className="invisible group-hover/tooltip:visible absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-48 p-2 rounded bg-bg-sidebar border border-border-card text-[10px] text-gray-300 font-normal leading-relaxed text-center shadow-xl">
        {text}
      </span>
    </div>
  );
}

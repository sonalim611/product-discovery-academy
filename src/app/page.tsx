// src/app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  BarChart2, 
  ShieldCheck, 
  CheckCircle2, 
  Trophy, 
  BookOpen, 
  Zap, 
  Target
} from 'lucide-react';
import { syllabus } from '@/data/syllabus';
import { useProgress } from '@/context/ProgressContext';

export default function Home() {
  const { 
    completedLessons, 
    quizScores, 
    getModuleProgress, 
    isHydrated 
  } = useProgress();

  const getModuleIcon = (iconName: string, sizeClass = "w-6 h-6") => {
    switch (iconName) {
      case 'search':
        return <Search className={`${sizeClass} text-indigo-400`} />;
      case 'chart':
        return <BarChart2 className={`${sizeClass} text-violet-400`} />;
      case 'shield':
        return <ShieldCheck className={`${sizeClass} text-sky-400`} />;
      default:
        return <BookOpen className={`${sizeClass} text-indigo-400`} />;
    }
  };

  // Calculate statistics
  const totalLessons = syllabus.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessonsCount = completedLessons.length;
  const totalQuizzes = syllabus.length;
  const completedQuizzesCount = Object.keys(quizScores).length;

  const averageQuizScore = completedQuizzesCount > 0
    ? Math.round(Object.values(quizScores).reduce((acc, s) => acc + s, 0) / completedQuizzesCount)
    : 0;

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 md:py-16 space-y-12 animate-fade-in-up">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-border-card bg-gradient-to-br from-bg-card/85 to-indigo-950/15 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-[80px] -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-secondary/10 rounded-full blur-[80px] -z-10" />
        
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-semibold text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Learning Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
            Master the Art of <span className="gradient-text-primary">Product Discovery</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Stop falling into the solution trap. Learn to uncover deep customer pain points, size market opportunities, and validate solutions before writing a single line of code.
          </p>

          <div className="pt-2">
            <Link 
              href={`/modules/${syllabus[0].id}/${syllabus[0].lessons[0].id}`}
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Start Learning Journey</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Summary */}
      {isHydrated && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <BookOpen className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">{completedLessonsCount}/{totalLessons}</span>
              <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Lessons Read</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
              <Trophy className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">{completedQuizzesCount}/{totalQuizzes}</span>
              <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Quizzes Taken</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
              <Target className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">{averageQuizScore}%</span>
              <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Avg Quiz Score</span>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
              <Zap className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">
                {Math.round(((completedLessonsCount + completedQuizzesCount) / (totalLessons + totalQuizzes)) * 100)}%
              </span>
              <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Total Mastery</span>
            </div>
          </div>
        </section>
      )}

      {/* Modules List */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-display font-extrabold text-white">Academy Curriculum</h2>
          <p className="text-sm text-gray-400">Step-by-step guides to master the core pillars of product discovery.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {syllabus.map((mod) => {
            const progress = isHydrated ? getModuleProgress(mod.id) : 0;
            const isCompleted = progress === 100;
            const firstLessonId = mod.lessons[0].id;

            return (
              <div 
                key={mod.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-bg-main/90 border border-border-card flex items-center justify-center shadow-inner">
                      {getModuleIcon(mod.icon, "w-6 h-6")}
                    </div>
                    {isCompleted && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-success/15 border border-success/20 text-[10px] font-bold text-success">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-display font-extrabold text-white tracking-tight leading-snug group-hover:text-brand-primary transition-colors">
                      {mod.title.replace(/^\d+\.\s+/, '')}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border-card/50 space-y-4">
                  {/* Progress Indicator */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-gray-400">
                      <span>Module Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-bg-main h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <Link 
                    href={`/modules/${mod.id}/${firstLessonId}`}
                    className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl bg-bg-main hover:bg-brand-primary hover:text-white border border-border-card hover:border-brand-primary transition-all duration-300 text-xs font-bold text-gray-200"
                  >
                    <span>{progress > 0 ? 'Resume Module' : 'Start Module'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Methodology Explainer */}
      <section className="glass-panel rounded-3xl p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h3 className="text-xl font-display font-extrabold text-white">Why Product Discovery?</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            In modern product organizations, teams must address four core product risks concurrently:
          </p>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 mr-2 shrink-0" />
              <span><strong>Value Risk</strong>: Will the customer choose to buy or use it? (Pillar 1)</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 mr-2 shrink-0" />
              <span><strong>Usability Risk</strong>: Can the user figure out how to use it? (Pillar 3)</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 mr-2 shrink-0" />
              <span><strong>Feasibility Risk</strong>: Can we build it with our current technology and time constraint? (Pillar 3)</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 mr-2 shrink-0" />
              <span><strong>Business Viability Risk</strong>: Does this solution match our business model, legal constraints, and brand? (Pillar 2)</span>
            </li>
          </ul>
        </div>
        <div className="border border-border-card/60 rounded-2xl bg-bg-main/60 p-6 space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <Sparkles className="w-5 h-5 animate-pulse-subtle" />
            <h4 className="font-display font-bold text-sm text-white">Active Discovery Toolkit</h4>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            This academy goes beyond reading. Explore the interactive PM tools embedded in the lessons, such as:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded bg-bg-card/40 border border-border-card text-gray-300">
              <span className="font-bold text-indigo-400 block mb-0.5">RICE Calculator</span>
              Grade opportunities mathematically.
            </div>
            <div className="p-2.5 rounded bg-bg-card/40 border border-border-card text-gray-300">
              <span className="font-bold text-violet-400 block mb-0.5">Assumptions Grid</span>
              Prioritize unknown risks.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

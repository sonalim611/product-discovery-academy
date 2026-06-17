// src/components/MainLayout.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Search, 
  BarChart2, 
  ShieldCheck, 
  CheckCircle2, 
  Circle, 
  Award, 
  Menu, 
  X, 
  RotateCcw,
  Sparkles,
  Trophy
} from 'lucide-react';
import { syllabus, Module } from '@/data/syllabus';
import { useProgress } from '@/context/ProgressContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { 
    getModuleProgress, 
    isLessonCompleted, 
    quizScores, 
    resetProgress, 
    completedLessons,
    isHydrated 
  } = useProgress();

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'search':
        return <Search className="w-5 h-5 text-indigo-400" />;
      case 'chart':
        return <BarChart2 className="w-5 h-5 text-violet-400" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-400" />;
    }
  };

  // Calculate global progress
  const totalLessons = syllabus.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.length;
  
  // Quiz completions
  const totalQuizzes = syllabus.length;
  const completedQuizzesCount = Object.keys(quizScores).length;

  // Weighted global percentage: (completed lessons + completed quizzes) / (total lessons + total quizzes)
  const globalProgress = totalLessons + totalQuizzes > 0
    ? Math.round(((completedCount + completedQuizzesCount) / (totalLessons + totalQuizzes)) * 100)
    : 0;

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all your progress, including lesson completions and quiz scores?')) {
      resetProgress();
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen bg-bg-main text-gray-100 antialiased font-sans">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 glass-panel border-b border-border-card flex items-center justify-between px-6 z-40">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse-subtle" />
          <span className="font-display font-bold tracking-tight text-white">Discovery Academy</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          aria-label="Open Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-45"
        />
      )}

      {/* Sidebar navigation */}
      <aside className={`
        fixed inset-y-0 left-0 w-80 bg-bg-sidebar border-r border-border-card z-50 flex flex-col transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:flex
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-border-card flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-display font-extrabold tracking-tight text-white block text-sm">Product Discovery</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 block -mt-1">Academy</span>
            </div>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 text-gray-400 hover:text-white rounded-lg"
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Progress Bar */}
        <div className="px-6 py-5 border-b border-border-card bg-bg-card/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">Your Progress</span>
            <span className="text-sm font-bold text-brand-primary">{globalProgress}%</span>
          </div>
          <div className="w-full bg-border-card h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500 ease-out"
              style={{ width: `${isHydrated ? globalProgress : 0}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-3 text-[11px] text-gray-400">
            <div className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-success mr-1" />
              <span>{completedCount}/{totalLessons} Lessons</span>
            </div>
            <div className="flex items-center">
              <Trophy className="w-3.5 h-3.5 text-warning mr-1" />
              <span>{completedQuizzesCount}/{totalQuizzes} Quizzes</span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {syllabus.map((mod: Module) => {
            const modProgress = isHydrated ? getModuleProgress(mod.id) : 0;
            const hasQuizScore = isHydrated && quizScores[mod.quiz.id] !== undefined;
            const quizScore = hasQuizScore ? quizScores[mod.quiz.id] : null;

            return (
              <div key={mod.id} className="space-y-2">
                {/* Module Heading */}
                <div className="flex items-start justify-between px-2">
                  <div className="flex items-center space-x-2">
                    {getModuleIcon(mod.icon)}
                    <span className="font-display font-bold text-sm text-gray-200">{mod.title}</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-400/90">{modProgress}%</span>
                </div>

                {/* Lessons list */}
                <ul className="space-y-1.5 pl-7">
                  {mod.lessons.map((lesson) => {
                    const isCurrent = pathname === `/modules/${mod.id}/${lesson.id}`;
                    const isCompleted = isHydrated && isLessonCompleted(lesson.id);

                    return (
                      <li key={lesson.id}>
                        <Link 
                          href={`/modules/${mod.id}/${lesson.id}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`
                            group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200
                            ${isCurrent 
                              ? 'bg-brand-primary/10 text-white border border-brand-primary/20 font-semibold shadow-inner' 
                              : 'text-gray-400 hover:text-white hover:bg-bg-card/40 border border-transparent'
                            }
                          `}
                        >
                          <span className="truncate pr-2">{lesson.title}</span>
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-500 shrink-0" />
                          )}
                        </Link>
                      </li>
                    );
                  })}

                  {/* Quiz link */}
                  <li>
                    <Link
                      href={`/modules/${mod.id}/quiz`}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                        group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200
                        ${pathname === `/modules/${mod.id}/quiz`
                          ? 'bg-brand-secondary/15 text-white border border-brand-secondary/20 shadow-inner'
                          : 'text-gray-300 hover:text-white hover:bg-bg-card/40 border border-transparent'
                        }
                      `}
                    >
                      <span className="flex items-center space-x-1.5">
                        <Award className="w-3.5 h-3.5 text-warning shrink-0" />
                        <span>Module Quiz</span>
                      </span>
                      {hasQuizScore ? (
                        <span className="text-[10px] bg-warning/10 text-warning px-1.5 py-0.5 rounded border border-warning/20">
                          {quizScore}%
                        </span>
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-500 shrink-0" />
                      )}
                    </Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border-card bg-bg-sidebar/80">
          <button 
            onClick={handleReset}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-bg-card/40 hover:bg-rose-950/20 border border-border-card hover:border-rose-950 text-gray-400 hover:text-rose-400 transition-all duration-200 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Progress</span>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 flex flex-col md:h-screen md:overflow-hidden pt-16 md:pt-0">
        <div className="flex-1 overflow-y-auto flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}

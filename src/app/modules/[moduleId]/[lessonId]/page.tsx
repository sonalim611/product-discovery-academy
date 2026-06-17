// src/app/modules/[moduleId]/[lessonId]/page.tsx
'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { syllabus } from '@/data/syllabus';
import { useProgress } from '@/context/ProgressContext';
import RiceCalculator from '@/components/RiceCalculator';
import AssumptionsMapper from '@/components/AssumptionsMapper';

interface LessonPageProps {
  params: Promise<{
    moduleId: string;
    lessonId: string;
  }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { moduleId, lessonId } = use(params);
  const router = useRouter();
  const { isLessonCompleted, markLessonComplete, markLessonIncomplete, isHydrated } = useProgress();

  // Find module and lesson
  const currentModule = syllabus.find(m => m.id === moduleId);
  if (!currentModule) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Module Not Found</h2>
        <Link href="/" className="text-brand-primary hover:underline text-sm">Return to Dashboard</Link>
      </div>
    );
  }

  const lessonIndex = currentModule.lessons.findIndex(l => l.id === lessonId);
  const currentLesson = currentModule.lessons[lessonIndex];

  if (!currentLesson) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Lesson Not Found</h2>
        <Link href="/" className="text-brand-primary hover:underline text-sm">Return to Dashboard</Link>
      </div>
    );
  }

  const isCompleted = isHydrated && isLessonCompleted(currentLesson.id);

  // Pagination helpers
  const prevLesson = lessonIndex > 0 ? currentModule.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < currentModule.lessons.length - 1 ? currentModule.lessons[lessonIndex + 1] : null;

  const handleToggleComplete = () => {
    if (isCompleted) {
      markLessonIncomplete(currentLesson.id);
    } else {
      markLessonComplete(currentLesson.id);
    }
  };

  const handleNextClick = () => {
    // Automatically mark current lesson complete when clicking "Next"
    if (!isCompleted) {
      markLessonComplete(currentLesson.id);
    }
    
    if (nextLesson) {
      router.push(`/modules/${moduleId}/${nextLesson.id}`);
    } else {
      // Go to quiz if it's the last lesson
      router.push(`/modules/${moduleId}/quiz`);
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-8 md:py-12 flex flex-col min-h-full justify-between">
      {/* Breadcrumb Trail */}
      <div className="space-y-4">
        <nav className="flex items-center space-x-1.5 text-xs font-semibold text-gray-400">
          <Link href="/" className="hover:text-white transition">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-300 truncate max-w-[120px] md:max-w-none">{currentModule.title}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-primary truncate max-w-[150px] md:max-w-none">{currentLesson.title}</span>
        </nav>

        {/* Lesson Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-border-card/40 pb-6 gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight text-white leading-tight">
              {currentLesson.title}
            </h1>
            <div className="flex items-center space-x-4 text-xs font-semibold text-gray-400">
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 text-indigo-400 mr-1.5" />
                {currentLesson.duration} read
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-border-card" />
              <span className="flex items-center">
                <BookOpen className="w-3.5 h-3.5 text-violet-400 mr-1.5" />
                Lesson {lessonIndex + 1} of {currentModule.lessons.length}
              </span>
            </div>
          </div>

          {/* Quick Mark Complete Button */}
          {isHydrated && (
            <button
              onClick={handleToggleComplete}
              className={`
                self-start md:self-auto flex items-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 border
                ${isCompleted
                  ? 'bg-success/10 text-success border-success/30 hover:bg-success/15'
                  : 'bg-bg-card hover:bg-border-card text-gray-300 border-border-card hover:text-white'
                }
              `}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-gray-500" />
                  <span>Mark as Completed</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Lesson Body */}
      <div className="flex-1 py-8">
        <div dangerouslySetInnerHTML={{ __html: currentLesson.contentHtml }} />

        {/* Dynamic Interactive Tools integration */}
        {currentLesson.id === 'rice-scoring' && <RiceCalculator />}
        {currentLesson.id === 'assumptions-mapping' && <AssumptionsMapper />}
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-border-card/40 pt-8 mt-12 grid grid-cols-2 gap-4">
        <div>
          {prevLesson ? (
            <Link 
              href={`/modules/${moduleId}/${prevLesson.id}`}
              className="group flex flex-col space-y-1 p-4 rounded-xl border border-border-card/60 bg-bg-card/25 hover:bg-bg-card/45 hover:border-brand-primary/40 transition duration-200 text-left"
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 flex items-center">
                <ArrowLeft className="w-3 h-3 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                Previous Lesson
              </span>
              <span className="text-xs font-semibold text-white truncate">{prevLesson.title}</span>
            </Link>
          ) : (
            <Link 
              href="/"
              className="group flex flex-col space-y-1 p-4 rounded-xl border border-border-card/60 bg-bg-card/25 hover:bg-bg-card/45 hover:border-brand-primary/40 transition duration-200 text-left"
            >
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 flex items-center">
                <ArrowLeft className="w-3 h-3 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                Dashboard
              </span>
              <span className="text-xs font-semibold text-white truncate">Curriculum Overview</span>
            </Link>
          )}
        </div>

        <div className="text-right">
          <button 
            onClick={handleNextClick}
            className="w-full group flex flex-col space-y-1 p-4 rounded-xl border border-brand-primary/30 bg-brand-primary/5 hover:bg-brand-primary/10 hover:border-brand-primary/60 transition duration-200 text-right items-end"
          >
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 flex items-center">
              {nextLesson ? 'Next Lesson' : 'Module Quiz'}
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="text-xs font-bold text-white truncate">
              {nextLesson ? nextLesson.title : `${currentModule.title.replace(/^\d+\.\s+/, '')} Quiz`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

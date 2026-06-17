/* eslint-disable react-hooks/set-state-in-effect */
// src/context/ProgressContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { syllabus } from '@/data/syllabus';

interface ProgressContextType {
  completedLessons: string[];
  quizScores: Record<string, number>;
  markLessonComplete: (lessonId: string) => void;
  markLessonIncomplete: (lessonId: string) => void;
  setQuizScore: (quizId: string, score: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  getModuleProgress: (moduleId: string) => number;
  resetProgress: () => void;
  isHydrated: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedLessons = localStorage.getItem('pd_completed_lessons');
      const storedScores = localStorage.getItem('pd_quiz_scores');

      if (storedLessons) {
        setCompletedLessons(JSON.parse(storedLessons));
      }
      if (storedScores) {
        setQuizScores(JSON.parse(storedScores));
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('pd_completed_lessons', JSON.stringify(completedLessons));
    } catch (error) {
      console.error('Failed to save completed lessons:', error);
    }
  }, [completedLessons, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('pd_quiz_scores', JSON.stringify(quizScores));
    } catch (error) {
      console.error('Failed to save quiz scores:', error);
    }
  }, [quizScores, isHydrated]);

  const markLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) return prev;
      return [...prev, lessonId];
    });
  };

  const markLessonIncomplete = (lessonId: string) => {
    setCompletedLessons((prev) => prev.filter((id) => id !== lessonId));
  };

  const setQuizScore = (quizId: string, score: number) => {
    setQuizScores((prev) => ({
      ...prev,
      [quizId]: score,
    }));
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  const getModuleProgress = (moduleId: string) => {
    const targetModule = syllabus.find((m) => m.id === moduleId);
    if (!targetModule) return 0;

    const lessonsInModule = targetModule.lessons;
    if (lessonsInModule.length === 0) return 0;

    const completedInModule = lessonsInModule.filter((l) =>
      completedLessons.includes(l.id)
    ).length;

    // Weight quiz completion as 1 extra unit of progress
    const hasQuizScore = quizScores[targetModule.quiz.id] !== undefined;
    const totalUnits = lessonsInModule.length + 1;
    const completedUnits = completedInModule + (hasQuizScore ? 1 : 0);

    return Math.round((completedUnits / totalUnits) * 100);
  };

  const resetProgress = () => {
    setCompletedLessons([]);
    setQuizScores({});
    try {
      localStorage.removeItem('pd_completed_lessons');
      localStorage.removeItem('pd_quiz_scores');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  };

  return (
    <ProgressContext.Provider
      value={{
        completedLessons,
        quizScores,
        markLessonComplete,
        markLessonIncomplete,
        setQuizScore,
        isLessonCompleted,
        getModuleProgress,
        resetProgress,
        isHydrated,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

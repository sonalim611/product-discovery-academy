// src/app/modules/[moduleId]/quiz/page.tsx
'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Trophy, 
  ChevronRight, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { syllabus } from '@/data/syllabus';
import { useProgress } from '@/context/ProgressContext';

interface QuizPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default function QuizPage({ params }: QuizPageProps) {
  const { moduleId } = use(params);
  const { setQuizScore, quizScores } = useProgress();

  // Find module
  const currentModule = syllabus.find(m => m.id === moduleId);
  
  // Quiz states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  if (!currentModule) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Module Not Found</h2>
        <Link href="/" className="text-brand-primary hover:underline text-sm">Return to Dashboard</Link>
      </div>
    );
  }

  const quiz = currentModule.quiz;
  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedOptionIdx === null || isSubmitted) return;
    
    setIsSubmitted(true);
    
    // Track answer
    const newAnswers = { ...answers, [currentQuestionIdx]: selectedOptionIdx };
    setAnswers(newAnswers);

    // Update score
    const isCorrect = selectedOptionIdx === currentQuestion.correctOptionIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsSubmitted(false);
    } else {
      // Finished!
      setIsQuizFinished(true);
      const finalPercentage = Math.round(((score + (selectedOptionIdx === currentQuestion.correctOptionIndex ? 1 : 0)) / questions.length) * 100);
      
      // Save score to local storage context (only if it is higher than the previous score, or if no score exists)
      const existingScore = quizScores[quiz.id];
      if (existingScore === undefined || finalPercentage > existingScore) {
        setQuizScore(quiz.id, finalPercentage);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setScore(0);
    setAnswers({});
    setIsQuizFinished(false);
  };

  // Find next module in syllabus
  const activeModuleIdx = syllabus.findIndex(m => m.id === moduleId);
  const nextModule = activeModuleIdx < syllabus.length - 1 ? syllabus[activeModuleIdx + 1] : null;

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-6 py-8 md:py-12 flex flex-col min-h-full justify-between">
      {/* Breadcrumb Trail */}
      <div className="space-y-4">
        <nav className="flex items-center space-x-1.5 text-xs font-semibold text-gray-400">
          <Link href="/" className="hover:text-white transition">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-300 truncate max-w-[120px] md:max-w-none">{currentModule.title}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-secondary truncate max-w-[150px] md:max-w-none">Module Quiz</span>
        </nav>

        {/* Quiz Title */}
        <div className="flex items-center justify-between border-b border-border-card/40 pb-4">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-warning" />
            <h1 className="text-xl md:text-2xl font-display font-extrabold text-white">
              {quiz.title}
            </h1>
          </div>
          {!isQuizFinished && (
            <span className="text-xs font-semibold text-gray-400">
              Question {currentQuestionIdx + 1} of {questions.length}
            </span>
          )}
        </div>
      </div>

      {/* Main Quiz Card Area */}
      <div className="flex-grow py-8 flex items-center justify-center">
        {!isQuizFinished ? (
          <div className="w-full glass-panel rounded-2xl p-6 md:p-8 space-y-6 border border-border-card/75 bg-bg-card/30 animate-fade-in-up">
            {/* Quiz progress line */}
            <div className="w-full bg-bg-main h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-300"
                style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-1 text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Knowledge Check</span>
              </div>
              <h2 className="text-base md:text-lg font-display font-bold text-white leading-snug">
                {currentQuestion.question}
              </h2>
            </div>

            {/* Options list */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOptionIdx === idx;
                const isCorrect = idx === currentQuestion.correctOptionIndex;
                
                let optionStyle = "border-border-card bg-bg-main/30 text-gray-300 hover:border-border-card hover:bg-bg-card/50";
                
                if (isSubmitted) {
                  if (isCorrect) {
                    optionStyle = "border-success/50 bg-success/10 text-success font-semibold";
                  } else if (isSelected) {
                    optionStyle = "border-error/50 bg-error/10 text-error font-semibold";
                  } else {
                    optionStyle = "border-border-card/20 bg-bg-main/10 text-gray-500 opacity-60";
                  }
                } else if (isSelected) {
                  optionStyle = "border-brand-primary bg-brand-primary/10 text-white font-semibold shadow-[0_0_15px_rgba(99,102,241,0.15)]";
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleOptionSelect(idx)}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-xl text-left border text-xs md:text-sm transition-all duration-200
                      ${optionStyle}
                    `}
                  >
                    <span>{option}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-success shrink-0 ml-3" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-error shrink-0 ml-3" />}
                  </button>
                );
              })}
            </div>

            {/* Explanatory feedback box */}
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-indigo-950/20 border border-brand-primary/20 text-xs text-gray-300 leading-relaxed animate-fade-in-up">
                <span className="font-bold text-indigo-400 block mb-1">Explanation:</span>
                {currentQuestion.explanation}
              </div>
            )}

            {/* Submit / Next Button */}
            <div className="pt-2">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOptionIdx === null}
                  className="w-full flex items-center justify-center py-3.5 px-6 rounded-xl font-bold transition duration-200 text-sm bg-brand-primary text-white hover:bg-brand-primary/85 disabled:bg-border-card disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center space-x-1.5 py-3.5 px-6 rounded-xl font-bold transition duration-200 text-sm bg-gradient-to-r from-brand-primary to-brand-secondary text-white hover:shadow-lg hover:shadow-brand-primary/10"
                >
                  <span>{currentQuestionIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finish Results Screen */
          <div className="w-full glass-panel rounded-2xl p-8 md:p-12 text-center space-y-6 border border-border-card/75 bg-bg-card/30 animate-fade-in-up flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center border border-warning/20">
                <Trophy className="w-10 h-10 text-warning animate-pulse-subtle" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center border-2 border-bg-main animate-bounce">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white">Quiz Completed!</h2>
              <p className="text-sm text-gray-400">
                You scored <span className="font-bold text-warning">{score} out of {questions.length}</span> correct answers.
              </p>
            </div>

            {/* Score Ring / Bar */}
            <div className="bg-bg-main/50 border border-border-card rounded-2xl px-6 py-4 space-y-1.5 min-w-[200px]">
              <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Final Grade</span>
              <span className="block text-3xl font-black text-white font-mono">
                {Math.round((score / questions.length) * 100)}%
              </span>
            </div>

            <p className="text-xs text-gray-300 max-w-md leading-relaxed">
              {score === questions.length 
                ? "Excellent job! You got a perfect score and successfully de-risked this module's opportunity space!" 
                : "Good attempt! Review the lessons in this module and retake the quiz to aim for a perfect 100%!"
              }
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
              <button
                onClick={handleRestart}
                className="flex items-center justify-center space-x-1.5 py-3 px-6 rounded-xl bg-bg-main border border-border-card hover:bg-border-card text-xs font-bold text-gray-300 transition duration-200"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              {nextModule ? (
                <Link
                  href={`/modules/${nextModule.id}/${nextModule.lessons[0].id}`}
                  className="flex items-center justify-center space-x-1.5 py-3 px-6 rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition duration-200"
                >
                  <span>Next Module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  href="/"
                  className="flex items-center justify-center space-x-1.5 py-3 px-6 rounded-xl bg-brand-primary text-white text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition duration-200"
                >
                  <span>Return to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer back link */}
      {!isQuizFinished && (
        <div className="border-t border-border-card/40 pt-6 mt-8 flex justify-start">
          <Link 
            href={`/modules/${moduleId}/${questions[0].id.split('-')[0]}`} // Fallback to first lesson
            className="flex items-center space-x-1 text-xs font-semibold text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Module Lessons</span>
          </Link>
        </div>
      )}
    </div>
  );
}

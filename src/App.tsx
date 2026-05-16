/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Settings, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ChevronLeft, 
  Lock, 
  CheckCircle, 
  XCircle,
  Lightbulb,
  BookOpen,
  Info
} from 'lucide-react';
import { problems } from './data/problems';
import { Difficulty, Problem } from './types';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<Difficulty>(Difficulty.EASY);
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [appleSum, setAppleSum] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const problem = problems[currentLevel];

  // Medium Level Interactive Logic
  const handleAppleClick = (val: number) => {
    setAppleSum(prev => (prev === val ? 0 : prev + val)); // Simple toggle or sum logic
    // Actually, Bebras Medium request: "누적해보는 상자 실험도구"
    // Let's make it a selection-based sum
  };

  const [selectedApples, setSelectedApples] = useState<number[]>([]);
  const toggleApple = (val: number) => {
    if (selectedApples.includes(val)) {
      setSelectedApples(prev => prev.filter(v => v !== val));
    } else {
      setSelectedApples(prev => [...prev, val]);
    }
  };

  useEffect(() => {
    setAppleSum(selectedApples.reduce((a, b) => a + b, 0));
  }, [selectedApples]);

  const handleTeacherToggle = () => {
    if (!isTeacherMode) {
      setShowPasswordModal(true);
    } else {
      setIsTeacherMode(false);
    }
  };

  const verifyPassword = () => {
    if (passwordInput === "7777") {
      setIsTeacherMode(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const selectOption = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [currentLevel]: optionId }));
  };

  const getProblemStatus = (level: Difficulty) => {
    const userAnswer = answers[level];
    if (!userAnswer) return 'not-started';
    if (!isTeacherMode) return 'submitted';
    return userAnswer === problems[level].correct ? 'correct' : 'incorrect';
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans text-slate-800 overflow-hidden">
      {/* Top Navigation / Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-slate-200">
            B
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 hidden md:block">
            Bebras AI Challenge Manager
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <nav className="flex gap-2">
            {(Object.keys(problems) as Difficulty[]).map((level) => {
              const isActive = currentLevel === level;
              let styleCls = "";
              if (level === Difficulty.EASY) styleCls = isActive ? "bg-emerald-500 text-white shadow-sm" : "bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200";
              if (level === Difficulty.MEDIUM) styleCls = isActive ? "bg-amber-500 text-white shadow-sm" : "bg-amber-100 text-amber-700 border border-amber-200 hover:bg-amber-200";
              if (level === Difficulty.HARD) styleCls = isActive ? "bg-slate-900 text-white shadow-sm" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50";

              return (
                <button
                  key={level}
                  onClick={() => setCurrentLevel(level)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${styleCls}`}
                >
                  {level}
                </button>
              );
            })}
          </nav>
          
          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          <div className="flex items-center bg-slate-100 p-1 rounded-full">
            <button 
              onClick={() => isTeacherMode && setIsTeacherMode(false)}
              className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full ${
                !isTeacherMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              STUDENT
            </button>
            <button 
              onClick={handleTeacherToggle}
              className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full flex items-center gap-2 ${
                isTeacherMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isTeacherMode ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`}></span>
              TEACHER
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar (Problem Metadata) */}
        <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 shrink-0 overflow-y-auto hidden lg:flex">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">
              Current Problem
            </label>
            <h2 className="text-xl font-bold text-slate-900 leading-tight italic bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">
              {problem.title}
            </h2>
            <span className={`inline-block mt-3 px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wide border ${
              currentLevel === Difficulty.EASY ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
              currentLevel === Difficulty.MEDIUM ? 'bg-amber-50 text-amber-700 border-amber-100' :
              'bg-slate-50 text-slate-700 border-slate-200'
            }`}>
              {problem.difficulty}
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm text-slate-500 leading-relaxed italic">
                이 브리핑 자료는 해당 레벨의 핵심 알고리즘 개념을 함축하고 있습니다. 문제의 스토리라인에 집중해 보세요.
              </p>
            </div>
          </div>

          {isTeacherMode && (
            <div className="mt-auto">
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">교사용 힌트</span>
                </div>
                <p className="text-xs text-indigo-900 italic leading-relaxed">
                  "{problem.hint}"
                </p>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <section className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto bg-slate-50">
          {/* Story & Visual Section */}
          <motion.div 
            key={currentLevel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-8"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-indigo-600 mb-4">
                 <span className="text-[10px] font-bold uppercase tracking-widest">Case Scenario</span>
                 <div className="h-px flex-1 bg-indigo-50"></div>
              </div>
              <div 
                className="text-lg text-slate-700 leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: problem.story }}
              />
              <p className="font-bold text-slate-900 text-xl flex items-start gap-2">
                <span className="shrink-0 mt-1"><ChevronRight className="w-5 h-5 text-indigo-600" /></span>
                {problem.question}
              </p>
            </div>
            
            <div className="shrink-0 flex items-center justify-center lg:justify-end">
              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300 shadow-inner">
                <div 
                  dangerouslySetInnerHTML={{ __html: problem.svg }} 
                  className="transform scale-90 sm:scale-100 origin-center"
                />
              </div>
            </div>
          </motion.div>

          {/* Experiment Tool Area */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-3 h-3" /> [실험도구] 상자 조합을 시뮬레이션해 보세요
              </h3>
              <div className="px-5 py-2 bg-slate-900 rounded-xl text-white font-mono text-lg shadow-lg flex items-center gap-3">
                <span className="text-xs text-slate-500 uppercase font-bold">TOTAL</span>
                <span className="text-amber-400 font-bold">{currentLevel === Difficulty.MEDIUM ? appleSum : '0'}</span>
              </div>
            </div>

            {currentLevel === Difficulty.MEDIUM ? (
              <div className="flex flex-wrap gap-4">
                {[8, 4, 2, 1].map((val) => {
                  const isSelected = selectedApples.includes(val);
                  return (
                    <button
                      key={val}
                      onClick={() => toggleApple(val)}
                      className={`flex-1 min-w-[120px] h-20 border-2 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 relative group overflow-hidden ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-50 scale-[0.98]' 
                          : 'border-slate-100 hover:border-amber-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-amber-600' : 'text-slate-400'}`}>
                        Binary Weight {val}
                      </span>
                      <span className={`text-xl font-bold ${isSelected ? 'text-slate-900' : 'text-slate-300'}`}>
                        📦 {val}개
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full shadow-sm shadow-amber-200" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div 
                className="p-4 bg-slate-50 rounded-xl border border-slate-100"
                dangerouslySetInnerHTML={{ __html: problem.customVisual }}
              />
            )}
          </div>

          {/* Options and Feedback Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start mb-8">
            {/* Multiple Choice Options */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-2">
                Select Final Answer
              </label>
              {problem.options.map((option) => {
                const isSelected = answers[currentLevel] === option.id;
                const isCorrect = isTeacherMode && option.id === problem.correct;
                const isWrong = isTeacherMode && isSelected && option.id !== problem.correct;

                return (
                  <button
                    key={option.id}
                    onClick={() => selectOption(option.id)}
                    className={`w-full p-4 border rounded-xl flex items-center gap-4 transition-all duration-300 relative group ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-4 ring-indigo-50' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full border shrink-0 flex items-center justify-center font-bold transition-colors ${
                      isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-slate-400 bg-white'
                    }`}>
                      {option.id}
                    </span>
                    <span className={`text-left font-medium transition-colors ${isSelected ? 'text-indigo-900 font-bold' : 'text-slate-700'}`}>
                      {option.text}
                    </span>
                    
                    {isTeacherMode && isCorrect && (
                      <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle className="w-3 h-3" /> Correct
                      </div>
                    )}
                    {isTeacherMode && isWrong && (
                      <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        <XCircle className="w-3 h-3" /> Incorrect
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Teacher's Hidden View (Explanation) */}
            <AnimatePresence>
              {isTeacherMode ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900 text-white rounded-2xl p-8 h-full flex flex-col shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Trophy className="w-32 h-32" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-glow shadow-emerald-400"></div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400">Teacher Insights Dashboard</h4>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                    <div className="mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <BookOpen className="w-3 h-3" /> 문제 핵심 해설
                      </h5>
                      <div className="text-sm text-indigo-100 leading-relaxed text-slate-300">
                        <div dangerouslySetInnerHTML={{ __html: problem.explanation.split('<h4>🖥️')[0].replace('<h4>✏️ 문제 핵심 해설</h4>', '') }} />
                      </div>
                    </div>
                    
                    <div className="p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                      <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Settings className="w-3 h-3" /> 컴퓨터 과학 개념
                      </h5>
                      <div className="text-sm text-indigo-50 text-slate-300 leading-relaxed">
                         <div dangerouslySetInnerHTML={{ __html: '<h4>' + problem.explanation.split('<h4>🖥️')[1] }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-slate-800 rounded">
                        <Lock className="w-3 h-3 text-slate-500" />
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono tracking-tighter">SECURE_AUTH: ROLE_BEBRAS_ADMIN(7777)</span>
                    </div>
                    <button 
                      onClick={() => setIsTeacherMode(false)}
                      className="text-[10px] font-bold uppercase tracking-widest bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-4 py-2 rounded-lg transition-all"
                    >
                      Disable Teacher Mode
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-slate-200 h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Lock className="w-6 h-6 text-slate-300" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-widest">Dashboard Hidden</h4>
                  <p className="text-xs text-slate-400 max-w-[240px]">
                    Detailed feedback and educational metrics are restricted to teacher authorization.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-slate-900 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between px-8 uppercase font-bold tracking-[0.1em] shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          Bebras Challenge Standard Compliant (ISO/CS-EDU-2026)
        </div>
        <div className="flex gap-6">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600">Session</span>
            <span className="text-slate-300">Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-600">Protocol</span>
            <span className="text-emerald-500">Secure</span>
          </div>
        </div>
      </footer>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-10 max-w-sm w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600"></div>
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                  <Lock className="text-indigo-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  Manager Authentication
                </h3>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                  Teacher Mode Access
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <input
                    type="password"
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && verifyPassword()}
                    placeholder="ENTER PIN CODE"
                    className={`w-full px-6 py-4 rounded-2xl border-2 text-center text-xl font-mono tracking-[0.5em] outline-none transition-all ${
                      passwordError 
                        ? 'border-rose-500 bg-rose-50 ring-4 ring-rose-50' 
                        : 'border-slate-100 bg-slate-50 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-50'
                    }`}
                  />
                  {passwordError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                      className="text-rose-500 text-[10px] mt-3 font-bold uppercase tracking-widest text-center"
                    >
                      Invalid Credentials. Access Denied.
                    </motion.p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={verifyPassword}
                    className="w-full py-4 bg-slate-900 text-white text-sm font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Authenticate
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setPasswordInput('');
                      setPasswordError(false);
                    }}
                    className="w-full py-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-colors"
                  >
                    Cancel Request
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

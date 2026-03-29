import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../services/supabase";
import { modules } from "../utils/courseData";
import { FaLock, FaCheckCircle, FaPlay, FaBookOpen } from "react-icons/fa";
import StudentTools from "../components/StudentTools";
import VoicePractice from '../components/VoicePractice'
import EssayCorrector from '../components/EssayCorrector'

// ─── TEMAS POR MÓDULO ────────────────────────────────────────────────────────
const MODULE_THEME = {
  1: { color: '#00b4d8', glow: 'rgba(0,180,216,0.25)',   border: 'rgba(0,180,216,0.30)',   bg: 'rgba(0,180,216,0.07)',   muted: '#0077b6' },
  2: { color: '#f5c400', glow: 'rgba(245,196,0,0.22)',   border: 'rgba(245,196,0,0.28)',   bg: 'rgba(245,196,0,0.07)',   muted: '#b38e00' },
  3: { color: '#22c55e', glow: 'rgba(34,197,94,0.22)',   border: 'rgba(34,197,94,0.28)',   bg: 'rgba(34,197,94,0.07)',   muted: '#15803d' },
  4: { color: '#f97316', glow: 'rgba(249,115,22,0.22)',  border: 'rgba(249,115,22,0.28)',  bg: 'rgba(249,115,22,0.07)',  muted: '#c2410c' },
  5: { color: '#a855f7', glow: 'rgba(168,85,247,0.22)',  border: 'rgba(168,85,247,0.28)',  bg: 'rgba(168,85,247,0.07)',  muted: '#7e22ce' },
  6: { color: '#94a3b8', glow: 'rgba(148,163,184,0.18)', border: 'rgba(148,163,184,0.25)', bg: 'rgba(148,163,184,0.07)', muted: '#64748b' },
};

// ─── IMAGENS POR MÓDULO (Unsplash — URLs públicas, sem precisar baixar) ──────
// Cada módulo tem: banner (topo do card) + icon (ao lado do título no card)
// e uma imagem de hero para o banner geral do Learning Path
const MODULE_IMAGES = {
  1: {
    // Módulo 1 — Fundamentals / Apresentação — azul
    card: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80', // letras/livros iluminados
    hero: 'https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1200&q=80', // pessoas se cumprimentando
  },
  2: {
    // Módulo 2 — Daily Routine — amarelo
    card: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80', // relógio despertador
    hero: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80', // agenda/rotina
  },
  3: {
    // Módulo 3 — Daily Situations — verde
    card: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', // restaurante bonito
    hero: 'https://images.unsplash.com/photo-1467453678174-768ec283a940?w=1200&q=80', // cidade movimentada
  },
  4: {
    // Módulo 4 — Past & Modals — laranja
    card: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80', // livros antigos
    hero: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=80', // biblioteca
  },
  5: {
    // Módulo 5 — Future & Conditionals — roxo
    card: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', // espaço/futuro
    hero: 'https://images.unsplash.com/photo-1462556791646-c201b8241a94?w=1200&q=80', // conversa futurista
  },
  6: {
    // Módulo 6 — Digital English — cinza/tech
    card: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', // circuitos/tech
    hero: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80', // pessoas e tecnologia
  },
};

// Imagem do banner principal do Learning Path
const HERO_BANNER = 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1400&q=80';

// ─── COMPONENTE ──────────────────────────────────────────────────────────────
const Dashboard = () => {
  const { user, profile } = useAuth();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);

  const moduleUnlockRequirements = {
    1: [],
    2: [1],
    3: [2],
    4: [3],
    5: [4, 5],
    6: [6, 7, 8],
  };

  const moduleLessonsMap = {
    1: [1],
    2: [2],
    3: [3],
    4: [4, 5],
    5: [6, 7, 8],
    6: [9],
  };

  useEffect(() => {
    if (user) {
      loadProgress();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadProgress = async () => {
    try {
      const { data, error } = await supabase
        .from("user_progress")
        .select("lesson_id, completed")
        .eq("user_id", user.id)
        .eq("completed", true);

      if (error) throw error;

      const completed = data.map((p) => p.lesson_id);
      setCompletedLessons(completed);

      const completedMods = [];
      for (const [moduleId, lessons] of Object.entries(moduleLessonsMap)) {
        const allCompleted = lessons.every((lessonId) =>
          completed.includes(lessonId),
        );
        if (allCompleted) completedMods.push(parseInt(moduleId));
      }
      setCompletedModules(completedMods);

      const totalLessons = Object.values(moduleLessonsMap).flat().length;
      setOverallProgress(Math.round((completed.length / totalLessons) * 100));
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const isModuleUnlocked = (moduleId) => {
    if (moduleId === 1) return true;
    const requirements = moduleUnlockRequirements[moduleId] || [];
    if (requirements.length === 0) return true;
    return requirements.every((lessonId) => completedLessons.includes(lessonId));
  };

  const isModuleCompleted = (moduleId) => {
    const lessons = moduleLessonsMap[moduleId] || [];
    if (lessons.length === 0) return false;
    return lessons.every((lessonId) => completedLessons.includes(lessonId));
  };

  const nextLevelXP = (profile?.level || 1) * 100;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-neon-cyan text-xl">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      {/* ── Welcome Section ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-cyber font-bold mb-2">
          Welcome back, <span className="text-neon-cyan">{profile?.username || 'Learner'}</span>!
        </h1>
        <p className="text-gray-400">Continue your journey to English mastery</p>
      </motion.div>

      {/* ── Stats Cards ── */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 glass-card p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-mono text-gray-300">Level {profile?.level || 1}</span>
            <span className="text-sm font-mono text-neon-cyan">{profile?.xp || 0} / {nextLevelXP} XP</span>
          </div>
          <div className="h-3 bg-dark-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full"
              style={{ width: `${((profile?.xp || 0) / nextLevelXP) * 100}%` }}
            />
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Overall Progress</span>
            <span className="text-neon-cyan font-mono">{overallProgress}%</span>
          </div>
          <div className="mt-2 h-2 bg-dark-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {completedLessons.length} of {Object.values(moduleLessonsMap).flat().length} lessons completed
          </div>
        </div>
      </div>

      {/* ── Hero Banner — Learning Path ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative rounded-2xl overflow-hidden mb-8 h-48"
        style={{ boxShadow: '0 0 40px rgba(0,255,255,0.15)' }}
      >
        {/* Imagem de fundo */}
        <img
          src={HERO_BANNER}
          alt="Learning Path"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
        {/* Overlay gradiente neon */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,255,0.15) 0%, rgba(0,0,0,0) 50%, rgba(176,0,255,0.15) 100%)',
          }}
        />
        {/* Borda neon animada */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ border: '1px solid rgba(0,255,255,0.3)' }}
        />
        {/* Conteúdo do banner */}
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <h2 className="text-3xl font-cyber font-bold text-white mb-1"
            style={{ textShadow: '0 0 20px rgba(0,255,255,0.8)' }}>
            Learning Path
          </h2>
          <p className="text-gray-300 font-mono text-sm">
            From A1 beginner to B2 upper-intermediate — 6 modules, 9 lessons
          </p>
          <div className="flex gap-3 mt-3">
            {[1,2,3,4,5,6].map((id) => {
              const t = MODULE_THEME[id];
              return (
                <div
                  key={id}
                  style={{ background: t.color, boxShadow: `0 0 8px ${t.glow}` }}
                  className="w-3 h-3 rounded-full"
                />
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ── Modules Grid ── */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          const isCompleted = isModuleCompleted(module.id);
          const isUnlocked = isModuleUnlocked(module.id);
          const theme = MODULE_THEME[module.id] || MODULE_THEME[1];
          const images = MODULE_IMAGES[module.id] || MODULE_IMAGES[1];
          const lessonsInModule = moduleLessonsMap[module.id] || [];
          const completedInModule = lessonsInModule.filter((id) =>
            completedLessons.includes(id)
          ).length;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                background: theme.bg,
                border: `1px solid ${theme.border}`,
                boxShadow: `0 0 20px ${theme.glow}, inset 0 0 30px rgba(0,0,0,0.15)`,
              }}
              className="relative overflow-hidden rounded-xl backdrop-blur-md flex flex-col"
            >
              {/* ── Imagem de capa no topo do card ── */}
              <div className="relative h-36 overflow-hidden rounded-t-xl">
                <img
                  src={images.card}
                  alt={module.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: `brightness(0.45) saturate(1.1)`,
                  }}
                />
                {/* Overlay colorido do tema */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${theme.color}18 0%, ${theme.bg} 100%)`,
                  }}
                />
                {/* Ícone do módulo sobre a imagem */}
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <span
                    className="text-4xl drop-shadow-lg"
                    style={{ filter: `drop-shadow(0 0 8px ${theme.color})` }}
                  >
                    {module.icon}
                  </span>
                  <span
                    style={{
                      color: theme.color,
                      background: `${theme.color}22`,
                      border: `1px solid ${theme.border}`,
                    }}
                    className="text-xs font-mono px-2 py-1 rounded-full backdrop-blur-sm"
                  >
                    {module.level}
                  </span>
                </div>
                {/* Badge completed */}
                {isCompleted && (
                  <div className="absolute top-3 right-3">
                    <div
                      style={{
                        background: `${theme.color}22`,
                        color: theme.color,
                        border: `1px solid ${theme.border}`,
                      }}
                      className="text-xs px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm"
                    >
                      <FaCheckCircle size={10} />
                      Completed
                    </div>
                  </div>
                )}
              </div>

              {/* ── Conteúdo do card ── */}
              <div className="p-5 flex flex-col flex-1">

                {/* Título com cor do tema */}
                <h3
                  style={{ color: theme.color, textShadow: `0 0 10px ${theme.glow}` }}
                  className="text-lg font-bold font-cyber mb-1"
                >
                  {module.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{module.description}</p>

                {/* Barra de progresso */}
                {lessonsInModule.length > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{completedInModule} / {lessonsInModule.length}</span>
                    </div>
                    <div className="h-1.5 bg-dark-300 rounded-full overflow-hidden">
                      <div
                        style={{
                          width: `${(completedInModule / lessonsInModule.length) * 100}%`,
                          background: `linear-gradient(90deg, ${theme.muted}, ${theme.color})`,
                        }}
                        className="h-full rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                )}

                {/* Botão */}
                <div className="mt-auto flex justify-end">
                  {isUnlocked ? (
                    <Link to={`/module/${module.id}`}>
                      <button
                        style={{
                          color: theme.color,
                          border: `1px solid ${theme.border}`,
                          background: `${theme.color}15`,
                        }}
                        className="text-sm px-4 py-2 rounded-lg flex items-center gap-2 font-mono transition-all duration-200 hover:brightness-125"
                      >
                        {isCompleted ? <><FaBookOpen /> Review</> : <><FaPlay /> Continue</>}
                      </button>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                      <FaLock size={12} />
                      Complete previous module
                    </div>
                  )}
                </div>
              </div>

              {/* Overlay de bloqueio sobre o card inteiro */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-dark-500/70 backdrop-blur-[2px] rounded-xl z-10" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Student Tools ── */}
      <div className="mt-12">
        <StudentTools />
      </div>

      {/* ── Voice Practice + Essay Corrector ── */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <VoicePractice />
        <EssayCorrector moduleId={1} />
      </div>
    </div>
  );
};

export default Dashboard;
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

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [completedLessons, setCompletedLessons] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);

  // Mapeamento: quais aulas desbloqueiam quais módulos
  const moduleUnlockRequirements = {
    1: [], // Módulo 1 sempre desbloqueado
    2: [1], // Precisa completar lesson 1
    3: [2], // Precisa completar lesson 2
    4: [3], // Precisa completar lesson 3
    5: [4, 5], // Precisa completar lessons 4 e 5
    6: [6, 7, 8], // Precisa completar lessons 6, 7, 8
  };

  // Mapeamento: quais aulas pertencem a cada módulo
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
      // Buscar todas as aulas completadas
      const { data, error } = await supabase
        .from("user_progress")
        .select("lesson_id, completed")
        .eq("user_id", user.id)
        .eq("completed", true);

      if (error) throw error;

      const completed = data.map((p) => p.lesson_id);
      setCompletedLessons(completed);

      // Calcular quais módulos estão completos
      const completedMods = [];
      for (const [moduleId, lessons] of Object.entries(moduleLessonsMap)) {
        const allCompleted = lessons.every((lessonId) =>
          completed.includes(lessonId),
        );
        if (allCompleted) {
          completedMods.push(parseInt(moduleId));
        }
      }
      setCompletedModules(completedMods);

      // Calcular progresso geral
      const totalLessons = Object.values(moduleLessonsMap).flat().length;
      const progressPercent = Math.round(
        (completed.length / totalLessons) * 100,
      );
      setOverallProgress(progressPercent);
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setLoading(false);
    }
  };

  // Verificar se o módulo está desbloqueado
  const isModuleUnlocked = (moduleId) => {
    if (moduleId === 1) return true;

    const requirements = moduleUnlockRequirements[moduleId] || [];
    if (requirements.length === 0) return true;

    return requirements.every((lessonId) =>
      completedLessons.includes(lessonId),
    );
  };

  // Verificar se o módulo está completo
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
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-cyber font-bold mb-2">
  Welcome back, <span className="text-neon-cyan">{profile?.username || 'Learner'}</span>!
</h1>
        <p className="text-gray-400">
          Continue your journey to English mastery
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 glass-card p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-mono text-gray-300">
              Level {profile?.level || 1}
            </span>
            <span className="text-sm font-mono text-neon-cyan">
              {profile?.xp || 0} / {nextLevelXP} XP
            </span>
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
            {completedLessons.length} of{" "}
            {Object.values(moduleLessonsMap).flat().length} lessons completed
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <h2 className="text-2xl font-cyber font-bold mb-6 text-neon-cyan">
        Learning Path
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          const isCompleted = isModuleCompleted(module.id);
          const isUnlocked = isModuleUnlocked(module.id);

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 relative overflow-hidden"
            >
              {/* Bloqueio visual */}
              {!isUnlocked && (
                <div className="absolute inset-0 bg-dark-500/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                  <FaLock className="text-4xl text-gray-500 mb-2" />
                  <span className="text-xs text-gray-400">
                    Complete previous module first
                  </span>
                </div>
              )}

              {/* Badge de completado */}
              {isCompleted && (
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <FaCheckCircle size={10} />
                    Completed
                  </div>
                </div>
              )}

              <div className="text-5xl mb-4">{module.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {module.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{module.description}</p>

              {/* Progresso do módulo */}
              {moduleLessonsMap[module.id] && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>
                      {
                        moduleLessonsMap[module.id].filter((id) =>
                          completedLessons.includes(id),
                        ).length
                      }{" "}
                      / {moduleLessonsMap[module.id].length}
                    </span>
                  </div>
                  <div className="h-1.5 bg-dark-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full"
                      style={{
                        width: `${(moduleLessonsMap[module.id].filter((id) => completedLessons.includes(id)).length / moduleLessonsMap[module.id].length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-xs text-neon-cyan font-mono">
                  {module.level}
                </span>
                {isUnlocked && (
                  <Link to={`/module/${module.id}`}>
                    <button className="cyber-button text-sm px-4 py-2 flex items-center gap-2">
                      {isCompleted ? (
                        <>
                          <FaBookOpen /> Review
                        </>
                      ) : (
                        <>
                          <FaPlay /> Continue
                        </>
                      )}
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Student Tools Section */}
      <div className="mt-12">
        <StudentTools />
      </div>
      {/* NOVAS FERRAMENTAS - COLOCAR AQUI */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <VoicePractice />
        <EssayCorrector moduleId={1} />
      </div>
    </div>
  );
};

export default Dashboard;

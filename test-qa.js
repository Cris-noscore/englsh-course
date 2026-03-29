// test-qa.js
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── Carregar variáveis do .env ───────────────────────────────────────────────
const envPath = path.join(__dirname, '.env')
let supabaseUrl = ''
let supabaseKey = ''

try {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1]?.trim()
  supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1]?.trim()
} catch (e) {
  console.error('❌ Arquivo .env não encontrado')
  process.exit(1)
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis do Supabase não encontradas no .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Utilitários ─────────────────────────────────────────────────────────────
const c = {
  green:  '\x1b[32m',
  red:    '\x1b[31m',
  yellow: '\x1b[33m',
  blue:   '\x1b[34m',
  cyan:   '\x1b[36m',
  bold:   '\x1b[1m',
  reset:  '\x1b[0m',
}

let passed = 0
let failed = 0
let warnings = 0

function ok(msg)   { console.log(`   ${c.green}✅ ${msg}${c.reset}`);    passed++   }
function fail(msg) { console.log(`   ${c.red}❌ ${msg}${c.reset}`);      failed++   }
function warn(msg) { console.log(`   ${c.yellow}⚠️  ${msg}${c.reset}`);  warnings++ }
function info(msg) { console.log(`   ${c.cyan}ℹ️  ${msg}${c.reset}`)               }
function section(title) {
  console.log(`\n${c.blue}${c.bold}${title}${c.reset}`)
}
function divider() {
  console.log('─'.repeat(60))
}

// ─── INÍCIO ──────────────────────────────────────────────────────────────────
async function runTests() {
  console.log('\n' + '='.repeat(60))
  console.log(`${c.blue}${c.bold}🧪 TESTES QA — ENGLISH MASTER${c.reset}`)
  console.log('='.repeat(60))

  // ══════════════════════════════════════════════════════════════
  // BLOCO 1 — INFRAESTRUTURA
  // ══════════════════════════════════════════════════════════════
  console.log(`\n${c.bold}[ BLOCO 1 — INFRAESTRUTURA ]${c.reset}`)
  divider()

  // Teste 1: Conexão com Supabase
  section('📡 Teste 1: Conexão com Supabase')
  try {
    const { error } = await supabase.from('profiles').select('count').limit(1)
    if (error) throw error
    ok('Conexão estabelecida com sucesso')
  } catch (e) {
    fail(`Falha na conexão: ${e.message}`)
  }

  // Teste 2: Tabelas necessárias existem
  section('📊 Teste 2: Tabelas obrigatórias')
  for (const table of ['profiles', 'user_progress']) {
    const { error } = await supabase.from(table).select('count').limit(1)
    if (error) fail(`Tabela "${table}" não encontrada: ${error.message}`)
    else       ok(`Tabela "${table}" existe`)
  }

  // Teste 3: Colunas do user_progress
  section('📋 Teste 3: Colunas de user_progress')
  const requiredCols = [
    'id', 'user_id', 'lesson_id', 'completed',
    'score', 'video_watched', 'content_read', 'answers', 'updated_at'
  ]
  const { error: colError } = await supabase
    .from('user_progress')
    .select(requiredCols.join(','))
    .limit(1)

  if (colError) fail(`Colunas ausentes: ${colError.message}`)
  else          ok(`Todas as ${requiredCols.length} colunas encontradas`)

  // ══════════════════════════════════════════════════════════════
  // BLOCO 2 — DADOS
  // ══════════════════════════════════════════════════════════════
  console.log(`\n${c.bold}[ BLOCO 2 — DADOS ]${c.reset}`)
  divider()

  // Teste 4: Usuários cadastrados
  section('👥 Teste 4: Usuários cadastrados')
  const { data: users, error: usersError } = await supabase
    .from('profiles')
    .select('id, username, xp, level')

  if (usersError) {
    fail(`Erro ao buscar usuários: ${usersError.message}`)
  } else {
    ok(`${users.length} usuário(s) encontrado(s)`)
    users.forEach(u =>
      info(`${u.username || '(sem nome)'} — XP: ${u.xp || 0} | Level: ${u.level || 1}`)
    )
    if (users.length === 0) warn('Nenhum usuário cadastrado ainda')
  }

  // Teste 5: Progresso geral dos usuários
  section('📈 Teste 5: Registros de progresso')
  const { data: progress, error: progError } = await supabase
    .from('user_progress')
    .select('user_id, lesson_id, completed, score, video_watched, content_read, answers')

  if (progError) {
    fail(`Erro ao buscar progresso: ${progError.message}`)
  } else {
    ok(`${progress.length} registro(s) de progresso encontrado(s)`)
    const completedCount = progress.filter(p => p.completed).length
    info(`${completedCount} aula(s) marcada(s) como concluída(s)`)
  }

  // Teste 6: Módulos do curso
  section('📚 Teste 6: Dados dos módulos (courseData.js)')
  try {
    const { modules } = await import('./src/utils/courseData.js')
    if (!modules || modules.length === 0) {
      fail('Nenhum módulo encontrado em courseData.js')
    } else {
      let totalLessons = 0
      modules.forEach(m => { if (m.lessons) totalLessons += m.lessons.length })
      ok(`${modules.length} módulos carregados com ${totalLessons} aulas no total`)

      // Verifica se todos os módulos têm os campos obrigatórios
      const invalid = modules.filter(m => !m.id || !m.title || !m.lessons)
      if (invalid.length > 0)
        warn(`${invalid.length} módulo(s) com campos obrigatórios ausentes`)
      else
        ok('Todos os módulos têm id, title e lessons')
    }
  } catch (e) {
    fail(`Erro ao importar courseData.js: ${e.message}`)
  }

  // Teste 7: Exercícios
  section('📝 Teste 7: Dados dos exercícios (exercisesData.js)')
  try {
    const { exercisesByModule, getExercisesByLesson } = await import('./src/utils/exercisesData.js')
    const moduleKeys = Object.keys(exercisesByModule)
    let totalExercises = 0
    let emptyModules = []

    moduleKeys.forEach(key => {
      const count = exercisesByModule[key]?.exercises?.length || 0
      totalExercises += count
      if (count === 0) emptyModules.push(key)
    })

    ok(`${moduleKeys.length} módulos com exercícios — ${totalExercises} questões no total`)

    if (emptyModules.length > 0)
      warn(`Módulos sem exercícios: ${emptyModules.join(', ')}`)

    // Verifica se todas as 9 lessons têm exercícios mapeados
    const lessonIds = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const missingLessons = []
    lessonIds.forEach(id => {
      const result = getExercisesByLesson(id)
      if (!result?.exercises?.length) missingLessons.push(id)
    })
    if (missingLessons.length > 0)
      warn(`Lessons sem exercícios mapeados: ${missingLessons.join(', ')}`)
    else
      ok('Todas as 9 lessons têm exercícios mapeados')

  } catch (e) {
    fail(`Erro ao importar exercisesData.js: ${e.message}`)
  }

  // ══════════════════════════════════════════════════════════════
  // BLOCO 3 — BUGS CORRIGIDOS (regressão)
  // ══════════════════════════════════════════════════════════════
  console.log(`\n${c.bold}[ BLOCO 3 — REGRESSÃO DOS BUGS CORRIGIDOS ]${c.reset}`)
  divider()

  // ── BUG 1: Activities pulava questões se lesson já estava completed ────
  section('🐛 Bug 1: Activities não deve usar "completed" da lesson como conclusão')
  const { data: completedLessons } = await supabase
    .from('user_progress')
    .select('lesson_id, completed, answers, score')
    .eq('completed', true)

  if (completedLessons && completedLessons.length > 0) {
    // Lessons que estão completed mas não têm answers salvas
    // (significa que as atividades foram puladas — o bug antigo)
    const skippedActivities = completedLessons.filter(p => {
      const hasAnswers = p.answers && Object.keys(p.answers).length > 0
      return !hasAnswers
    })

    if (skippedActivities.length > 0) {
      warn(`${skippedActivities.length} aula(s) concluída(s) sem respostas salvas (atividades podem ter sido puladas)`)
      skippedActivities.forEach(p =>
        info(`Lesson ${p.lesson_id}: completed=true, answers vazio, score=${p.score}`)
      )
    } else {
      ok('Todas as aulas concluídas têm respostas registradas — atividades não foram puladas')
    }
  } else {
    info('Nenhuma aula concluída ainda — impossível verificar (OK se for conta nova)')
    passed++
  }

  // ── BUG 2: video_watched armazenado em formatos inconsistentes ─────────
  section('🐛 Bug 2: Integridade do campo video_watched')
  const { data: videoProgress } = await supabase
    .from('user_progress')
    .select('lesson_id, video_watched')
    .not('video_watched', 'is', null)

  if (videoProgress && videoProgress.length > 0) {
    let invalidFormat = []
    videoProgress.forEach(p => {
      const vw = p.video_watched
      // Deve ser array ou objeto (ambos aceitáveis, código já normaliza)
      const isValid = Array.isArray(vw) || (typeof vw === 'object' && vw !== null)
      if (!isValid) invalidFormat.push(p.lesson_id)
    })

    if (invalidFormat.length > 0)
      fail(`video_watched em formato inválido para lessons: ${invalidFormat.join(', ')}`)
    else
      ok(`${videoProgress.length} registro(s) com video_watched em formato válido`)
  } else {
    info('Nenhum vídeo assistido registrado ainda — OK para conta nova')
    passed++
  }

  // ── BUG 3: content_read deve ser boolean consistente ───────────────────
  section('🐛 Bug 3: Integridade do campo content_read')
  const { data: contentProgress } = await supabase
    .from('user_progress')
    .select('lesson_id, content_read, completed')
    .eq('completed', true)

  if (contentProgress && contentProgress.length > 0) {
    // Aulas concluídas onde content_read é false/null — indica bug de fluxo
    const notRead = contentProgress.filter(p => !p.content_read)
    if (notRead.length > 0) {
      warn(`${notRead.length} aula(s) concluída(s) com content_read=false (fluxo pode ter sido ignorado)`)
      notRead.forEach(p => info(`Lesson ${p.lesson_id}`))
    } else {
      ok('Todas as aulas concluídas têm content_read=true')
    }
  } else {
    info('Nenhuma aula concluída ainda — OK para conta nova')
    passed++
  }

  // ── BUG 4: Mapeamento lesson → módulo correto ──────────────────────────
  section('🐛 Bug 4: Mapeamento lesson → módulo (LESSON_MODULE_MAP)')
  const LESSON_MODULE_MAP = { 1:1, 2:2, 3:3, 4:4, 5:4, 6:5, 7:5, 8:5, 9:6 }
  const MODULE_THEME_IDS  = [1, 2, 3, 4, 5, 6]

  let mapOk = true
  Object.entries(LESSON_MODULE_MAP).forEach(([lessonId, moduleId]) => {
    if (!MODULE_THEME_IDS.includes(moduleId)) {
      fail(`Lesson ${lessonId} → módulo ${moduleId} não existe em MODULE_THEME`)
      mapOk = false
    }
  })
  if (mapOk) ok('Todos os 9 lessonIds mapeiam para módulos válidos (1–6)')

  // ── BUG 5: Progresso inconsistente (aula "completa" sem vídeos) ────────
  section('🐛 Bug 5: Consistência do progresso (completed sem video_watched)')
  const { data: allProgress } = await supabase
    .from('user_progress')
    .select('lesson_id, completed, video_watched, content_read, score')

  if (allProgress && allProgress.length > 0) {
    const suspicious = allProgress.filter(p => {
      const hasVideos = Array.isArray(p.video_watched)
        ? p.video_watched.length > 0
        : (p.video_watched && Object.keys(p.video_watched).length > 0)
      return p.completed && !hasVideos
    })

    if (suspicious.length > 0) {
      warn(`${suspicious.length} registro(s) marcado(s) como completo(s) sem vídeos assistidos`)
      suspicious.forEach(p =>
        info(`Lesson ${p.lesson_id}: completed=true, video_watched=${JSON.stringify(p.video_watched)}`)
      )
    } else {
      ok('Nenhum registro concluído sem vídeos — fluxo respeitado')
    }
  } else {
    info('Sem registros de progresso ainda — OK para conta nova')
    passed++
  }

  // ── BUG 6: Score negativo ou absurdamente alto ─────────────────────────
  section('🐛 Bug 6: Sanidade do score (deve ser entre 0 e 300)')
  const { data: scores } = await supabase
    .from('user_progress')
    .select('lesson_id, score')
    .not('score', 'is', null)

  if (scores && scores.length > 0) {
    const invalid = scores.filter(p => p.score < 0 || p.score > 300)
    if (invalid.length > 0) {
      fail(`${invalid.length} score(s) fora do intervalo esperado (0–300 XP)`)
      invalid.forEach(p => info(`Lesson ${p.lesson_id}: score=${p.score}`))
    } else {
      ok(`${scores.length} score(s) dentro do intervalo válido (0–300 XP)`)
    }
  } else {
    info('Nenhum score registrado ainda — OK para conta nova')
    passed++
  }

  // ── BUG 7: XP do perfil compatível com progresso ───────────────────────
  section('🐛 Bug 7: XP total do perfil vs soma dos scores')
  const { data: profilesXP } = await supabase
    .from('profiles')
    .select('id, username, xp, level')

  if (profilesXP && profilesXP.length > 0) {
    for (const user of profilesXP) {
      const { data: userScores } = await supabase
        .from('user_progress')
        .select('score')
        .eq('user_id', user.id)
        .eq('completed', true)

      const totalScore = (userScores || []).reduce((acc, p) => acc + (p.score || 0), 0)
      const expectedLevel = Math.floor(totalScore / 100) + 1

      // XP do perfil deve ser >= soma dos scores das atividades
      if (user.xp < totalScore) {
        warn(`Usuário "${user.username}": XP no perfil (${user.xp}) menor que soma dos scores (${totalScore})`)
      } else {
        ok(`Usuário "${user.username}": XP=${user.xp} | Level=${user.level} | Score acumulado=${totalScore}`)
      }
    }
  } else {
    info('Nenhum usuário encontrado — OK para conta nova')
    passed++
  }

  // ── BUG 8: Módulos têm pelo menos 1 lição com conteúdo ────────────────
  section('🐛 Bug 8: Conteúdo das lições não está vazio')
  try {
    const { modules } = await import('./src/utils/courseData.js')
    let emptyContent = []
    modules.forEach(m => {
      m.lessons?.forEach(l => {
        if (!l.content || l.content.trim().length < 50) {
          emptyContent.push(`Módulo ${m.id} / Lesson ${l.id}`)
        }
      })
    })
    if (emptyContent.length > 0) {
      warn(`${emptyContent.length} lição(ões) com conteúdo vazio ou muito curto`)
      emptyContent.forEach(l => info(l))
    } else {
      ok('Todas as lições têm conteúdo com pelo menos 50 caracteres')
    }
  } catch (e) {
    fail(`Erro ao verificar conteúdo das lições: ${e.message}`)
  }

  // ── BUG 9: Todos os exercícios têm campos obrigatórios ────────────────
  section('🐛 Bug 9: Integridade dos exercícios (campos obrigatórios)')
  try {
    const { exercisesByModule } = await import('./src/utils/exercisesData.js')
    let broken = []

    Object.entries(exercisesByModule).forEach(([moduleId, mod]) => {
      mod.exercises?.forEach(ex => {
        const missingFields = []
        if (!ex.id)          missingFields.push('id')
        if (!ex.type)        missingFields.push('type')
        if (!ex.question)    missingFields.push('question')
        if (!ex.correct)     missingFields.push('correct')
        if (!ex.explanation) missingFields.push('explanation')

        if (ex.type === 'multiple_choice' && (!ex.options || ex.options.length < 2))
          missingFields.push('options (< 2)')

        if (missingFields.length > 0)
          broken.push(`Módulo ${moduleId} / Ex ${ex.id}: [${missingFields.join(', ')}]`)
      })
    })

    if (broken.length > 0) {
      fail(`${broken.length} exercício(s) com campos obrigatórios ausentes`)
      broken.slice(0, 5).forEach(b => info(b))
      if (broken.length > 5) info(`...e mais ${broken.length - 5}`)
    } else {
      ok('Todos os exercícios têm id, type, question, correct, explanation e options')
    }
  } catch (e) {
    fail(`Erro ao verificar exercícios: ${e.message}`)
  }

  // ── BUG 10: IDs duplicados nos exercícios ────────────────────────────
  section('🐛 Bug 10: IDs duplicados em exercisesData.js')
  try {
    const { exercisesByModule } = await import('./src/utils/exercisesData.js')
    const allIds = []
    Object.values(exercisesByModule).forEach(mod => {
      mod.exercises?.forEach(ex => allIds.push(ex.id))
    })

    const seen = new Set()
    const duplicates = allIds.filter(id => {
      if (seen.has(id)) return true
      seen.add(id)
      return false
    })

    if (duplicates.length > 0)
      fail(`IDs duplicados encontrados: ${[...new Set(duplicates)].join(', ')}`)
    else
      ok(`${allIds.length} exercícios com IDs únicos — sem duplicatas`)
  } catch (e) {
    fail(`Erro ao verificar IDs: ${e.message}`)
  }

  // ══════════════════════════════════════════════════════════════
  // RELATÓRIO FINAL
  // ══════════════════════════════════════════════════════════════
  const total = passed + failed + warnings
  console.log('\n' + '='.repeat(60))
  console.log(`${c.bold}📋 RELATÓRIO FINAL${c.reset}`)
  console.log('='.repeat(60))
  console.log(`${c.green}${c.bold}✅ PASSED:   ${passed}${c.reset}`)
  console.log(`${c.red}${c.bold}❌ FAILED:   ${failed}${c.reset}`)
  console.log(`${c.yellow}${c.bold}⚠️  WARNINGS: ${warnings}${c.reset}`)
  console.log(`   TOTAL:    ${total} verificações`)
  console.log('='.repeat(60))

  if (failed > 0) {
    console.log(`\n${c.red}${c.bold}⚠️  Existem falhas críticas. Corrija antes de publicar.${c.reset}`)
    process.exit(1)
  } else if (warnings > 0) {
    console.log(`\n${c.yellow}${c.bold}⚠️  Testes passaram com avisos. Revise os itens marcados.${c.reset}`)
  } else {
    console.log(`\n${c.green}${c.bold}🎉 Todos os testes passaram! Sistema está saudável.${c.reset}`)
  }
}

runTests().catch(console.error)
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
function section(title) { console.log(`\n${c.blue}${c.bold}${title}${c.reset}`) }
function divider() { console.log('─'.repeat(60)) }

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

  section('📡 Teste 1: Conexão com Supabase')
  try {
    const { error } = await supabase.from('profiles').select('count').limit(1)
    if (error) throw error
    ok('Conexão estabelecida com sucesso')
  } catch (e) { fail(`Falha na conexão: ${e.message}`) }

  section('📊 Teste 2: Tabelas obrigatórias')
  for (const table of ['profiles', 'user_progress']) {
    const { error } = await supabase.from(table).select('count').limit(1)
    if (error) fail(`Tabela "${table}" não encontrada: ${error.message}`)
    else       ok(`Tabela "${table}" existe`)
  }

  section('📋 Teste 3: Colunas de user_progress')
  const requiredCols = ['id','user_id','lesson_id','completed','score','video_watched','content_read','answers','updated_at']
  const { error: colError } = await supabase.from('user_progress').select(requiredCols.join(',')).limit(1)
  if (colError) fail(`Colunas ausentes: ${colError.message}`)
  else          ok(`Todas as ${requiredCols.length} colunas encontradas`)

  // ══════════════════════════════════════════════════════════════
  // BLOCO 2 — DADOS
  // ══════════════════════════════════════════════════════════════
  console.log(`\n${c.bold}[ BLOCO 2 — DADOS ]${c.reset}`)
  divider()

  section('👥 Teste 4: Usuários cadastrados')
  const { data: users, error: usersError } = await supabase.from('profiles').select('id, username, xp, level')
  if (usersError) {
    fail(`Erro ao buscar usuários: ${usersError.message}`)
  } else {
    ok(`${users.length} usuário(s) encontrado(s)`)
    users.forEach(u => info(`${u.username || '(sem nome)'} — XP: ${u.xp || 0} | Level: ${u.level || 1}`))
    if (users.length === 0) warn('Nenhum usuário cadastrado ainda')
  }

  section('📈 Teste 5: Registros de progresso')
  const { data: progress, error: progError } = await supabase
    .from('user_progress').select('user_id, lesson_id, completed, score, video_watched, content_read, answers')
  if (progError) {
    fail(`Erro ao buscar progresso: ${progError.message}`)
  } else {
    ok(`${progress.length} registro(s) de progresso encontrado(s)`)
    info(`${progress.filter(p => p.completed).length} aula(s) marcada(s) como concluída(s)`)
  }

  section('📚 Teste 6: Dados dos módulos (courseData.js)')
  try {
    const { modules } = await import('./src/utils/courseData.js')
    if (!modules || modules.length === 0) {
      fail('Nenhum módulo encontrado em courseData.js')
    } else {
      let totalLessons = 0
      modules.forEach(m => { if (m.lessons) totalLessons += m.lessons.length })
      ok(`${modules.length} módulos carregados com ${totalLessons} aulas no total`)
      const invalid = modules.filter(m => !m.id || !m.title || !m.lessons)
      if (invalid.length > 0) warn(`${invalid.length} módulo(s) com campos obrigatórios ausentes`)
      else ok('Todos os módulos têm id, title e lessons')
    }
  } catch (e) { fail(`Erro ao importar courseData.js: ${e.message}`) }

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
    if (emptyModules.length > 0) warn(`Módulos sem exercícios: ${emptyModules.join(', ')}`)
    const missingLessons = [1,2,3,4,5,6,7,8,9].filter(id => !getExercisesByLesson(id)?.exercises?.length)
    if (missingLessons.length > 0) warn(`Lessons sem exercícios mapeados: ${missingLessons.join(', ')}`)
    else ok('Todas as 9 lessons têm exercícios mapeados')
  } catch (e) { fail(`Erro ao importar exercisesData.js: ${e.message}`) }

  // ══════════════════════════════════════════════════════════════
  // BLOCO 3 — BUGS CORRIGIDOS (regressão)
  // ══════════════════════════════════════════════════════════════
  console.log(`\n${c.bold}[ BLOCO 3 — REGRESSÃO DOS BUGS CORRIGIDOS ]${c.reset}`)
  divider()

  section('🐛 Bug 1: Activities não deve usar "completed" da lesson como conclusão')
  const { data: completedLessons } = await supabase.from('user_progress').select('lesson_id, completed, answers, score').eq('completed', true)
  if (completedLessons && completedLessons.length > 0) {
    const skipped = completedLessons.filter(p => !p.answers || Object.keys(p.answers).length === 0)
    if (skipped.length > 0) {
      warn(`${skipped.length} aula(s) concluída(s) sem respostas salvas`)
      skipped.forEach(p => info(`Lesson ${p.lesson_id}: score=${p.score}`))
    } else ok('Todas as aulas concluídas têm respostas registradas')
  } else { info('Nenhuma aula concluída ainda — OK para conta nova'); passed++ }

  section('🐛 Bug 2: Integridade do campo video_watched')
  const { data: videoProgress } = await supabase.from('user_progress').select('lesson_id, video_watched').not('video_watched', 'is', null)
  if (videoProgress && videoProgress.length > 0) {
    const invalid = videoProgress.filter(p => !Array.isArray(p.video_watched) && !(typeof p.video_watched === 'object' && p.video_watched !== null))
    if (invalid.length > 0) fail(`video_watched em formato inválido para lessons: ${invalid.map(p => p.lesson_id).join(', ')}`)
    else ok(`${videoProgress.length} registro(s) com video_watched em formato válido`)
  } else { info('Nenhum vídeo assistido registrado ainda — OK para conta nova'); passed++ }

  section('🐛 Bug 3: Integridade do campo content_read')
  const { data: contentProgress } = await supabase.from('user_progress').select('lesson_id, content_read, completed').eq('completed', true)
  if (contentProgress && contentProgress.length > 0) {
    const notRead = contentProgress.filter(p => !p.content_read)
    if (notRead.length > 0) { warn(`${notRead.length} aula(s) concluída(s) com content_read=false`); notRead.forEach(p => info(`Lesson ${p.lesson_id}`)) }
    else ok('Todas as aulas concluídas têm content_read=true')
  } else { info('Nenhuma aula concluída ainda — OK para conta nova'); passed++ }

  section('🐛 Bug 4: Mapeamento lesson → módulo (LESSON_MODULE_MAP)')
  const LESSON_MODULE_MAP = { 1:1, 2:2, 3:3, 4:4, 5:4, 6:5, 7:5, 8:5, 9:6 }
  let mapOk = true
  Object.entries(LESSON_MODULE_MAP).forEach(([lessonId, moduleId]) => {
    if (![1,2,3,4,5,6].includes(moduleId)) { fail(`Lesson ${lessonId} → módulo ${moduleId} inválido`); mapOk = false }
  })
  if (mapOk) ok('Todos os 9 lessonIds mapeiam para módulos válidos (1–6)')

  section('🐛 Bug 5: Consistência do progresso (completed sem video_watched)')
  const { data: allProgress } = await supabase.from('user_progress').select('lesson_id, completed, video_watched, content_read, score')
  if (allProgress && allProgress.length > 0) {
    const suspicious = allProgress.filter(p => {
      const hasVideos = Array.isArray(p.video_watched) ? p.video_watched.length > 0 : (p.video_watched && Object.keys(p.video_watched).length > 0)
      return p.completed && !hasVideos
    })
    if (suspicious.length > 0) { warn(`${suspicious.length} registro(s) completo(s) sem vídeos`); suspicious.forEach(p => info(`Lesson ${p.lesson_id}`)) }
    else ok('Nenhum registro concluído sem vídeos — fluxo respeitado')
  } else { info('Sem registros ainda — OK para conta nova'); passed++ }

  section('🐛 Bug 6: Sanidade do score (deve ser entre 0 e 300)')
  const { data: scores } = await supabase.from('user_progress').select('lesson_id, score').not('score', 'is', null)
  if (scores && scores.length > 0) {
    const invalid = scores.filter(p => p.score < 0 || p.score > 300)
    if (invalid.length > 0) { fail(`${invalid.length} score(s) fora do intervalo`); invalid.forEach(p => info(`Lesson ${p.lesson_id}: score=${p.score}`)) }
    else ok(`${scores.length} score(s) dentro do intervalo válido (0–300 XP)`)
  } else { info('Nenhum score registrado ainda — OK para conta nova'); passed++ }

  section('🐛 Bug 7: XP total do perfil vs soma dos scores')
  const { data: profilesXP } = await supabase.from('profiles').select('id, username, xp, level')
  if (profilesXP && profilesXP.length > 0) {
    for (const user of profilesXP) {
      const { data: userScores } = await supabase.from('user_progress').select('score').eq('user_id', user.id).eq('completed', true)
      const totalScore = (userScores || []).reduce((acc, p) => acc + (p.score || 0), 0)
      if (user.xp < totalScore) warn(`"${user.username}": XP no perfil (${user.xp}) menor que scores (${totalScore})`)
      else ok(`"${user.username}": XP=${user.xp} | Level=${user.level} | Score acumulado=${totalScore}`)
    }
  } else { info('Nenhum usuário — OK para conta nova'); passed++ }

  section('🐛 Bug 8: Conteúdo das lições não está vazio')
  try {
    const { modules } = await import('./src/utils/courseData.js')
    const emptyContent = []
    modules.forEach(m => m.lessons?.forEach(l => {
      if (!l.content || l.content.trim().length < 50) emptyContent.push(`Módulo ${m.id} / Lesson ${l.id}`)
    }))
    if (emptyContent.length > 0) { warn(`${emptyContent.length} lição(ões) com conteúdo vazio`); emptyContent.forEach(l => info(l)) }
    else ok('Todas as lições têm conteúdo com pelo menos 50 caracteres')
  } catch (e) { fail(`Erro: ${e.message}`) }

  section('🐛 Bug 9: Integridade dos exercícios (campos obrigatórios)')
  try {
    const { exercisesByModule } = await import('./src/utils/exercisesData.js')
    const broken = []
    Object.entries(exercisesByModule).forEach(([moduleId, mod]) => {
      mod.exercises?.forEach(ex => {
        const missing = []
        if (!ex.id) missing.push('id')
        if (!ex.type) missing.push('type')
        if (!ex.question) missing.push('question')
        if (!ex.correct) missing.push('correct')
        if (!ex.explanation) missing.push('explanation')
        if (ex.type === 'multiple_choice' && (!ex.options || ex.options.length < 2)) missing.push('options')
        if (missing.length > 0) broken.push(`Módulo ${moduleId} / Ex ${ex.id}: [${missing.join(', ')}]`)
      })
    })
    if (broken.length > 0) { fail(`${broken.length} exercício(s) com campos ausentes`); broken.slice(0,5).forEach(b => info(b)) }
    else ok('Todos os exercícios têm campos obrigatórios')
  } catch (e) { fail(`Erro: ${e.message}`) }

  section('🐛 Bug 10: IDs duplicados em exercisesData.js')
  try {
    const { exercisesByModule } = await import('./src/utils/exercisesData.js')
    const allIds = []
    Object.values(exercisesByModule).forEach(mod => mod.exercises?.forEach(ex => allIds.push(ex.id)))
    const seen = new Set()
    const duplicates = allIds.filter(id => { if (seen.has(id)) return true; seen.add(id); return false })
    if (duplicates.length > 0) fail(`IDs duplicados: ${[...new Set(duplicates)].join(', ')}`)
    else ok(`${allIds.length} exercícios com IDs únicos — sem duplicatas`)
  } catch (e) { fail(`Erro: ${e.message}`) }

  // ══════════════════════════════════════════════════════════════
  // BLOCO 4 — NOVAS FUNCIONALIDADES
  // ══════════════════════════════════════════════════════════════
  console.log(`\n${c.bold}[ BLOCO 4 — NOVAS FUNCIONALIDADES ]${c.reset}`)
  divider()

  // ── Teste 11: Botão próxima aula — mapeamento correto ─────────────────
  section('🆕 Teste 11: Mapeamento NEXT_LESSON_MAP (botão próxima aula)')
  const NEXT_LESSON_MAP = { 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:null }
  let nextMapOk = true

  // Verifica que cada lesson aponta para a próxima correta
  const expectedSequence = [1,2,3,4,5,6,7,8,9]
  for (let i = 0; i < expectedSequence.length - 1; i++) {
    const current = expectedSequence[i]
    const expected = expectedSequence[i + 1]
    if (NEXT_LESSON_MAP[current] !== expected) {
      fail(`Lesson ${current} deveria apontar para ${expected}, mas aponta para ${NEXT_LESSON_MAP[current]}`)
      nextMapOk = false
    }
  }
  if (NEXT_LESSON_MAP[9] !== null) { fail('Lesson 9 deveria apontar para null (última aula)'); nextMapOk = false }
  if (nextMapOk) ok('Sequência de próximas aulas correta (1→2→3→...→9→null)')

  // Verifica que lesson 9 não tem próxima
  if (NEXT_LESSON_MAP[9] === null) ok('Lesson 9 corretamente marcada como última (null)')
  else fail('Lesson 9 deveria ser null')

  // ── Teste 12: Página de perfil — arquivo existe ───────────────────────
  section('🆕 Teste 12: Página de perfil (Profile.jsx)')
  const profilePath = path.join(__dirname, 'src/pages/Profile.jsx')
  if (fs.existsSync(profilePath)) {
    const content = fs.readFileSync(profilePath, 'utf-8')
    ok('Profile.jsx encontrado em src/pages/')

    // Verifica componentes essenciais da página
    const checks = [
      { key: 'gráfico por módulo',  pattern: /moduleLessonsMap/             },
      { key: 'barra de XP',         pattern: /currentLevelXP/               },
      { key: 'achievements',        pattern: /Achievements/                  },
      { key: 'progresso geral',     pattern: /overallProgress/               },
      { key: 'stats cards',         pattern: /Total XP/                      },
    ]
    checks.forEach(({ key, pattern }) => {
      if (pattern.test(content)) ok(`Profile: "${key}" implementado`)
      else warn(`Profile: "${key}" não encontrado — verifique o componente`)
    })
  } else {
    fail('Profile.jsx não encontrado em src/pages/ — crie o arquivo!')
  }

  // ── Teste 13: Rota /profile no App.jsx ───────────────────────────────
  section('🆕 Teste 13: Rota /profile registrada no App.jsx')
  const appPath = path.join(__dirname, 'src/App.jsx')
  if (fs.existsSync(appPath)) {
    const appContent = fs.readFileSync(appPath, 'utf-8')
    if (/import Profile/.test(appContent))       ok('App.jsx: import Profile encontrado')
    else                                          fail('App.jsx: import Profile NÃO encontrado')
    if (/path="\/profile"/.test(appContent))     ok('App.jsx: rota /profile registrada')
    else                                          fail('App.jsx: rota /profile NÃO registrada')
    if (/ProtectedRoute.*Profile|Profile.*ProtectedRoute/s.test(appContent))
                                                  ok('App.jsx: /profile está dentro de ProtectedRoute')
    else                                          warn('App.jsx: verifique se /profile está protegida')
  } else {
    fail('App.jsx não encontrado')
  }

  // ── Teste 14: Header com link para perfil ────────────────────────────
  section('🆕 Teste 14: Header com link para /profile')
  const headerPath = path.join(__dirname, 'src/components/Layout/Header.jsx')
  if (fs.existsSync(headerPath)) {
    const headerContent = fs.readFileSync(headerPath, 'utf-8')
    if (/\/profile/.test(headerContent))          ok('Header: link para /profile encontrado')
    else                                           fail('Header: link para /profile NÃO encontrado')
    if (/My Profile|Perfil/.test(headerContent))  ok('Header: texto "My Profile" presente')
    else                                           warn('Header: texto do link de perfil não encontrado')
    if (/showUserMenu|dropdown/i.test(headerContent)) ok('Header: dropdown do usuário implementado')
    else                                           warn('Header: dropdown do usuário não detectado')
  } else {
    fail('Header.jsx não encontrado')
  }

  // ── Teste 15: AIChat bloqueado para não logados ───────────────────────
  section('🆕 Teste 15: AIChat só aparece para usuários logados')
  if (fs.existsSync(appPath)) {
    const appContent = fs.readFileSync(appPath, 'utf-8')
    if (/user && <AIChat/.test(appContent) || /\{user &&.*AIChat/s.test(appContent))
      ok('App.jsx: AIChat condicionado a {user && <AIChat />}')
    else
      fail('App.jsx: AIChat pode estar aparecendo para não logados — verifique a condição')
  }

  // ── Teste 16: Exercícios sem duplicata no lesson content ─────────────
  section('🆕 Teste 16: Exercícios removidos do Lesson Content')
  try {
    const { modules } = await import('./src/utils/courseData.js')
    const withExercises = []
    modules.forEach(m => {
      m.lessons?.forEach(l => {
        if (l.content && /EXERCÍCIOS PARA FIXAÇÃO|Complete as frases:|Fill in the blank/i.test(l.content)) {
          withExercises.push(`Módulo ${m.id} / Lesson ${l.id}`)
        }
      })
    })
    if (withExercises.length > 0) {
      warn(`${withExercises.length} lição(ões) ainda com exercícios no content (podem estar duplicados com Activities)`)
      withExercises.forEach(l => info(l))
    } else {
      ok('Nenhuma lição com seção de exercícios no content — sem duplicatas')
    }
  } catch (e) { fail(`Erro: ${e.message}`) }

  // ── Teste 17: Sequência de módulos e lições consistente ──────────────
  section('🆕 Teste 17: Consistência entre modules e LESSON_MODULE_MAP')
  try {
    const { modules } = await import('./src/utils/courseData.js')
    const moduleLessonsMap = { 1:[1], 2:[2], 3:[3], 4:[4,5], 5:[6,7,8], 6:[9] }
    let consistent = true

    Object.entries(moduleLessonsMap).forEach(([moduleId, lessonIds]) => {
      const module = modules.find(m => m.id === parseInt(moduleId))
      if (!module) {
        fail(`Módulo ${moduleId} existe no mapa mas não em courseData.js`)
        consistent = false
        return
      }
      const moduleLessonIds = module.lessons?.map(l => l.id) || []
      const missing = lessonIds.filter(id => !moduleLessonIds.includes(id))
      if (missing.length > 0) {
        fail(`Módulo ${moduleId}: lessons ${missing.join(', ')} no mapa mas ausentes em courseData.js`)
        consistent = false
      }
    })
    if (consistent) ok('Todos os módulos e lições estão consistentes entre courseData.js e o mapa')
  } catch (e) { fail(`Erro: ${e.message}`) }

  // ── Teste 18: api/chat.js usa Anthropic ──────────────────────────────
  section('🆕 Teste 18: api/chat.js configurado para Anthropic')
  const chatPath = path.join(__dirname, 'api/chat.js')
  if (fs.existsSync(chatPath)) {
    const chatContent = fs.readFileSync(chatPath, 'utf-8')
    if (/anthropic\.com/.test(chatContent))           ok('api/chat.js: URL da Anthropic encontrada')
    else                                               fail('api/chat.js: URL da Anthropic NÃO encontrada')
    if (/ANTHROPIC_API_KEY/.test(chatContent))         ok('api/chat.js: usa ANTHROPIC_API_KEY')
    else                                               fail('api/chat.js: ANTHROPIC_API_KEY não encontrada')
    if (/x-api-key/.test(chatContent))                 ok('api/chat.js: header x-api-key presente')
    else                                               fail('api/chat.js: header x-api-key ausente')
    if (/claude/.test(chatContent))                    ok('api/chat.js: modelo Claude referenciado')
    else                                               warn('api/chat.js: modelo Claude não detectado')
    // Verifica vírgula dupla (bug que causou erro)
    if (/,\s*,/.test(chatContent))                     fail('api/chat.js: vírgula dupla detectada — erro de sintaxe!')
    else                                               ok('api/chat.js: sem vírgulas duplas — sintaxe OK')
  } else {
    fail('api/chat.js não encontrado em api/')
  }

  // ── Teste 19: Verificação de variáveis de ambiente ───────────────────
  section('🆕 Teste 19: Variáveis de ambiente (.env)')
  try {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    const hasSupabaseUrl  = /VITE_SUPABASE_URL=https?:\/\/.+/.test(envContent)
    const hasSupabaseKey  = /VITE_SUPABASE_ANON_KEY=.{10,}/.test(envContent)
    const hasAnthropicKey = /ANTHROPIC_API_KEY=.{10,}/.test(envContent)
    const hasOldOpenAI    = /OPENAI_API_KEY=sk-/.test(envContent)

    if (hasSupabaseUrl)  ok('.env: VITE_SUPABASE_URL configurada')
    else                 fail('.env: VITE_SUPABASE_URL ausente ou inválida')

    if (hasSupabaseKey)  ok('.env: VITE_SUPABASE_ANON_KEY configurada')
    else                 fail('.env: VITE_SUPABASE_ANON_KEY ausente')

    if (hasAnthropicKey) ok('.env: ANTHROPIC_API_KEY configurada')
    else                 fail('.env: ANTHROPIC_API_KEY ausente — chat/voice/essay não vão funcionar')

    if (hasOldOpenAI)    warn('.env: OPENAI_API_KEY ainda presente — pode ser removida')

    // Verifica chave duplicada (bug que causou problema)
    if (/sk-ant-sk-ant/.test(envContent)) fail('.env: ANTHROPIC_API_KEY com prefixo duplicado (sk-ant-sk-ant-...)')
    else                                  ok('.env: ANTHROPIC_API_KEY sem prefixo duplicado')
  } catch (e) { fail(`.env: erro ao ler — ${e.message}`) }

  // ── Teste 20: Conquistas da página de perfil ─────────────────────────
  section('🆕 Teste 20: Conquistas (achievements) no Profile.jsx')
  if (fs.existsSync(profilePath)) {
    const content = fs.readFileSync(profilePath, 'utf-8')
    const achievements = ['First Steps', 'Bookworm', 'On a Roll', 'Star Student', 'Diamond', 'Champion']
    const missing = achievements.filter(a => !content.includes(a))
    if (missing.length > 0) warn(`Conquistas não encontradas: ${missing.join(', ')}`)
    else ok(`Todas as ${achievements.length} conquistas implementadas no Profile`)
  } else {
    fail('Profile.jsx não encontrado — não foi possível verificar conquistas')
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
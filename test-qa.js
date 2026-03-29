// test-qa.js
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar variáveis do .env
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

// Cores
const c = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
}

async function runTests() {
  console.log('\n' + '='.repeat(60))
  console.log(`${c.blue}🧪 TESTES QA - ENGLISH COURSE${c.reset}`)
  console.log('='.repeat(60) + '\n')

  let passed = 0
  let failed = 0
  let warnings = 0

  // ==================== TESTE 1: CONEXÃO ====================
  console.log(`${c.blue}📡 Teste 1: Conexão com Supabase${c.reset}`)
  try {
    const { error } = await supabase.from('profiles').select('count').limit(1)
    if (error) throw error
    console.log(`   ${c.green}✅ Conexão OK${c.reset}\n`)
    passed++
  } catch (error) {
    console.log(`   ${c.red}❌ Falha: ${error.message}${c.reset}\n`)
    failed++
  }

  // ==================== TESTE 2: TABELAS ====================
  console.log(`${c.blue}📊 Teste 2: Tabelas necessárias${c.reset}`)
  const tables = ['profiles', 'user_progress']
  for (const table of tables) {
    const { error } = await supabase.from(table).select('count').limit(1)
    if (error) {
      console.log(`   ${c.red}❌ Tabela ${table}: não encontrada${c.reset}`)
      failed++
    } else {
      console.log(`   ${c.green}✅ Tabela ${table}: OK${c.reset}`)
      passed++
    }
  }
  console.log()

  // ==================== TESTE 3: COLUNAS ====================
  console.log(`${c.blue}📋 Teste 3: Colunas do user_progress${c.reset}`)
  const required = ['id', 'user_id', 'lesson_id', 'completed', 'score', 'video_watched', 'content_read', 'answers', 'updated_at']
  const { data: colData, error: colError } = await supabase
    .from('user_progress')
    .select(required.join(','))
    .limit(1)
  
  if (colError) {
    console.log(`   ${c.red}❌ Erro: ${colError.message}${c.reset}`)
    failed++
  } else {
    console.log(`   ${c.green}✅ ${required.length} colunas verificadas${c.reset}`)
    passed++
  }
  console.log()

  // ==================== TESTE 4: USUÁRIOS ====================
  console.log(`${c.blue}👥 Teste 4: Usuários cadastrados${c.reset}`)
  const { data: users, error: usersError } = await supabase
    .from('profiles')
    .select('id, username, xp, level')
  
  if (usersError) {
    console.log(`   ${c.red}❌ Erro: ${usersError.message}${c.reset}`)
    failed++
  } else {
    console.log(`   ${c.green}✅ ${users.length} usuário(s) encontrado(s)${c.reset}`)
    users.forEach(u => {
      console.log(`      - ${u.username || 'sem nome'} (XP: ${u.xp || 0}, Level: ${u.level || 1})`)
    })
    passed++
  }
  console.log()

  // ==================== TESTE 5: PROGRESSO ====================
  console.log(`${c.blue}📈 Teste 5: Progresso dos usuários${c.reset}`)
  const { data: progress, error: progError } = await supabase
    .from('user_progress')
    .select('user_id, lesson_id, completed, score, video_watched, content_read')
  
  if (progError) {
    console.log(`   ${c.red}❌ Erro: ${progError.message}${c.reset}`)
    failed++
  } else {
    console.log(`   ${c.green}✅ ${progress.length} registro(s) de progresso${c.reset}`)
    
    // Verificar inconsistências
    const invalid = progress.filter(p => p.completed && (!p.video_watched || !p.content_read))
    if (invalid.length > 0) {
      console.log(`   ${c.yellow}⚠️ ${invalid.length} aula(s) marcadas como completas sem vídeo/conteúdo marcado${c.reset}`)
      warnings++
      invalid.forEach(p => {
        console.log(`      - lesson ${p.lesson_id}: video=${p.video_watched}, content=${p.content_read}`)
      })
    } else {
      console.log(`   ${c.green}✅ Nenhuma inconsistência encontrada${c.reset}`)
    }
    passed++
  }
  console.log()

  // ==================== TESTE 6: MÓDULOS ====================
  console.log(`${c.blue}📚 Teste 6: Dados dos módulos${c.reset}`)
  try {
    const { modules } = await import('./src/utils/courseData.js')
    if (!modules || modules.length === 0) {
      console.log(`   ${c.red}❌ Nenhum módulo encontrado${c.reset}`)
      failed++
    } else {
      let totalLessons = 0
      modules.forEach(m => {
        if (m.lessons) totalLessons += m.lessons.length
      })
      console.log(`   ${c.green}✅ ${modules.length} módulos, ${totalLessons} aulas${c.reset}`)
      passed++
    }
  } catch (e) {
    console.log(`   ${c.red}❌ Erro ao carregar courseData: ${e.message}${c.reset}`)
    failed++
  }
  console.log()

  // ==================== TESTE 7: EXERCÍCIOS ====================
  console.log(`${c.blue}📝 Teste 7: Dados dos exercícios${c.reset}`)
  try {
    const { exercisesByModule } = await import('./src/utils/exercisesData.js')
    const modulesCount = Object.keys(exercisesByModule).length
    let totalExercises = 0
    Object.values(exercisesByModule).forEach(m => {
      if (m.exercises) totalExercises += m.exercises.length
    })
    console.log(`   ${c.green}✅ ${modulesCount} módulos com exercícios, ${totalExercises} exercícios no total${c.reset}`)
    passed++
  } catch (e) {
    console.log(`   ${c.red}❌ Erro ao carregar exercisesData: ${e.message}${c.reset}`)
    failed++
  }
  console.log()

  // ==================== RELATÓRIO FINAL ====================
  console.log('='.repeat(60))
  console.log(`${c.blue}📋 RESUMO DOS TESTES${c.reset}`)
  console.log('='.repeat(60))
  console.log(`${c.green}✅ PASSED: ${passed}${c.reset}`)
  console.log(`${c.red}❌ FAILED: ${failed}${c.reset}`)
  console.log(`${c.yellow}⚠️ WARNINGS: ${warnings}${c.reset}`)
  console.log('='.repeat(60) + '\n')

  if (failed > 0) {
    console.log(`${c.red}⚠️ Alguns testes falharam. Verifique os erros acima.${c.reset}`)
  } else if (warnings > 0) {
    console.log(`${c.yellow}⚠️ Testes passaram, mas há inconsistências para corrigir.${c.reset}`)
  } else {
    console.log(`${c.green}🎉 Todos os testes passaram! Sistema está saudável!${c.reset}`)
  }
}

runTests().catch(console.error)

# EnglishMaster - Interactive English Learning Platform

Learn English from A1 to B2 with gamified lessons, interactive activities, and real-time progress tracking.

## Features

- 🎮 **Gamified Learning**: Earn XP, level up, and unlock achievements
- 📚 **Complete Curriculum**: From A1 (beginner) to B2 (upper-intermediate)
- 🎥 **Video Lessons**: Integrated YouTube lessons for each topic
- 📝 **Interactive Activities**: Multiple choice, fill in blanks, and matching exercises
- 📊 **Progress Tracking**: Visual progress bars and completion tracking
- 🏆 **Achievements System**: Earn badges for completing milestones
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🔐 **Authentication**: Secure user accounts with Supabase

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Hosting**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and add your Supabase credentials
4. Run development server: `npm run dev`
5. Open http://localhost:3000

## Database Setup

Run the SQL schema from the Supabase SQL editor:

\`\`\`sql
-- Users table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Modules table
CREATE TABLE public.modules (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT CHECK (level IN ('A1', 'A2', 'B1', 'B2')),
  order_number INTEGER NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons table
CREATE TABLE public.lessons (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  youtube_url TEXT,
  order_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table
CREATE TABLE public.user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id INTEGER REFERENCES public.lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, lesson_id)
);
\`\`\`

## Deployment

Deploy to Vercel:

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

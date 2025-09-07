# CyberTasks - Cyberpunk To-Do List App

A futuristic, cyberpunk-themed to-do list application built with modern web technologies. Experience task management in a neon-lit digital world with smooth animations and a sleek dark interface.

![CyberTasks Demo](https://via.placeholder.com/800x400/0a0a0f/00f5ff?text=CyberTasks+Demo)

## ✨ Features

### Core Functionality
- **CRUD Operations**: Add, edit, delete, and mark tasks as completed
- **Real-time Search**: Instantly find tasks with the search bar
- **Smart Filtering**: View All, Active, or Completed tasks
- **Task Categories**: Organize tasks with color-coded categories
- **Smooth Animations**: Framer Motion-powered transitions and micro-interactions

### AI-Powered Enhancements (Ready for Integration)
- **Smart Categorization**: AI suggests task categories (Work, Personal, Urgent)
- **Productivity Analytics**: Daily summary of completed tasks
- **Task Insights**: AI-powered productivity recommendations

### Design & UX
- **Cyberpunk Theme**: Dark backgrounds with neon blue and pink accents
- **Responsive Design**: Optimized for desktop and mobile devices
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Glassmorphism Effects**: Modern UI with backdrop blur and transparency

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom cyberpunk design system
- **UI Components**: shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite for fast development and building
- **State Management**: React hooks with local storage persistence
- **Icons**: Lucide React icon library

### Ready for Backend Integration
- **Database**: Supabase PostgreSQL (integration ready)
- **Authentication**: Supabase Auth with email/password and OAuth
- **Real-time Sync**: Supabase subscriptions for multi-device sync
- **AI Integration**: OpenAI API for smart features

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm))
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cybertasks.git
   cd cybertasks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
cybertasks/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AddTaskForm.tsx  # Task creation form
│   │   ├── TaskItem.tsx     # Individual task component
│   │   ├── FilterTabs.tsx   # Task filtering tabs
│   │   └── AIPanel.tsx      # AI suggestions panel
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Application pages
│   │   ├── Index.tsx        # Main todo list page
│   │   └── NotFound.tsx     # 404 error page
│   ├── index.css           # Global styles and design tokens
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── tailwind.config.ts     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration
```

## 🎨 Design System

The app uses a custom cyberpunk design system with:

### Color Palette
- **Background**: `#0a0a0f` (Deep space black)
- **Neon Blue**: `#00f5ff` (Primary accent)
- **Neon Pink**: `#ff007a` (Secondary accent)  
- **Purple**: `#8e2de2` (Highlights)

### Typography
- **Primary Font**: Inter (clean, modern)
- **Neon Effects**: Custom text-shadow for glowing text

### Components
All components use semantic design tokens from `index.css` and are fully customizable through Tailwind CSS.

## 🔌 Backend Integration (Coming Soon)

### Supabase Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Set up authentication and database tables
3. Configure environment variables
4. Enable real-time subscriptions

### Database Schema
```sql
-- Tasks table
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set up environment variables
3. Deploy with one click

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Deploy to any static host
The app builds to static files and can be deployed anywhere that serves HTML/CSS/JS.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the clean, consistent icons

## 📞 Support

If you have any questions or run into issues, please:
- Check existing [GitHub Issues](https://github.com/yourusername/cybertasks/issues)
- Create a new issue with detailed information
- Join our community discussions

---

**Built with 💙 using modern web technologies**

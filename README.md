# SmartLearn AI - React Frontend

A modern, professional-grade React + Tailwind CSS frontend for the Smart Video Learning Tool.

## Features

- 🎨 **Modern UI/UX**: Glassmorphism effects, gradient backgrounds, and smooth animations
- 🌓 **Dark Mode**: Fully functional dark/light mode toggle
- 🔐 **Authentication**: Elegant login/signup flow with social login options
- 📊 **Dashboard**: Stats tracking, learning history, and achievements
- 🎯 **Learning Workspace**: 3-tab interface for summaries, insights, and quizzes
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast**: Built with React 18 and optimized for performance

## Tech Stack

- **React 18.2** - UI framework
- **React Router 6** - Client-side routing
- **Tailwind CSS 3** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **Headless UI** - Accessible components

## Installation

```bash
cd frontend
npm install
```

## Development

Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LandingPage.js      # Hero section & features
│   │   ├── AuthCard.js          # Login/Signup
│   │   ├── Dashboard.js         # Main dashboard
│   │   └── LearningWorkspace.js # Video processing UI
│   ├── App.js                   # Router & auth logic
│   ├── index.js                 # Entry point
│   └── index.css                # Global styles
├── package.json
└── tailwind.config.js
```

## Configuration

The frontend connects to the FastAPI backend at `http://localhost:8000`. To change this, update the `API_BASE` constant in `LearningWorkspace.js`.

## Features Overview

### Landing Page
- High-impact hero section with glassmorphism input
- Features showcase with icons
- Call-to-action sections
- Fully responsive

### Authentication
- Toggle between Login/Signup
- Social login buttons (Google/GitHub)
- Form validation
- LocalStorage persistence

### Dashboard
- Statistics cards (videos processed, quiz scores, learning hours)
- Sidebar navigation
- Recent history
- Achievements system

### Learning Workspace
- **Tab 1**: Video summary (3 paragraphs)
- **Tab 2**: Core insights (5 key points with icons)
- **Tab 3**: Interactive quiz (10 questions with score modal)
- Dual input mode: YouTube URL or paste transcript

## Design System

- **Primary Color**: Indigo (#6366f1)
- **Font**: Inter
- **Icons**: Lucide React
- **Dark Mode**: Fully supported with class-based toggle

## License

MIT

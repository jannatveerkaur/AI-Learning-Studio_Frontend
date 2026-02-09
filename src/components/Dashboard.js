import React, { useState } from 'react';
import { Brain, Moon, Sun, LogOut, History, Home, Plus, FileText, Trophy, Download } from 'lucide-react';
import LearningWorkspace from './LearningWorkspace';

const Dashboard = ({ onLogout, darkMode, toggleDarkMode }) => {
  const [activeView, setActiveView] = useState('home');
  const [history] = useState([
    { id: 1, title: 'Introduction to Machine Learning', date: '2 hours ago' },
    { id: 2, title: 'React Best Practices 2026', date: 'Yesterday' },
    { id: 3, title: 'Python FastAPI Tutorial', date: '2 days ago' },
  ]);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              SmartLearn AI
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-73px)] p-6">
          <nav className="space-y-2">
            <SidebarButton
              icon={<Home className="w-5 h-5" />}
              label="Home"
              active={activeView === 'home'}
              onClick={() => setActiveView('home')}
            />
            <SidebarButton
              icon={<Plus className="w-5 h-5" />}
              label="New Learning"
              active={activeView === 'workspace'}
              onClick={() => setActiveView('workspace')}
            />
            <SidebarButton
              icon={<History className="w-5 h-5" />}
              label="Recent History"
              active={activeView === 'history'}
              onClick={() => setActiveView('history')}
            />
            <SidebarButton
              icon={<Trophy className="w-5 h-5" />}
              label="Achievements"
              active={activeView === 'achievements'}
              onClick={() => setActiveView('achievements')}
            />
          </nav>

          {activeView === 'home' && (
            <div className="mt-8">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                Recent History
              </h3>
              <div className="space-y-2">
                {history.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveView('workspace')}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 mt-1 text-gray-400 group-hover:text-primary-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeView === 'home' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Ready to transform some videos into learning experiences?
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <StatsCard
                  title="Videos Processed"
                  value="12"
                  icon={<FileText className="w-6 h-6 text-primary-600" />}
                  trend="+3 this week"
                />
                <StatsCard
                  title="Quiz Score Avg"
                  value="85%"
                  icon={<Trophy className="w-6 h-6 text-primary-600" />}
                  trend="+5% improvement"
                />
                <StatsCard
                  title="Learning Hours"
                  value="24h"
                  icon={<Brain className="w-6 h-6 text-primary-600" />}
                  trend="+8h this month"
                />
              </div>

              <button
                onClick={() => setActiveView('workspace')}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Start New Learning Session</span>
              </button>
            </div>
          )}

          {activeView === 'workspace' && <LearningWorkspace />}

          {activeView === 'history' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Learning History
              </h2>
              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="w-8 h-8 text-primary-600" />
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.date}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'achievements' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Achievements
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <AchievementCard
                  title="First Steps"
                  description="Processed your first video"
                  unlocked={true}
                />
                <AchievementCard
                  title="Quiz Master"
                  description="Scored 100% on a quiz"
                  unlocked={true}
                />
                <AchievementCard
                  title="Week Warrior"
                  description="7 days learning streak"
                  unlocked={false}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
      active
        ? 'bg-primary-600 text-white shadow-lg'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const StatsCard = ({ title, value, icon, trend }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
        {icon}
      </div>
    </div>
    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
      {title}
    </h3>
    <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
      {value}
    </p>
    <p className="text-xs text-green-600 dark:text-green-400">{trend}</p>
  </div>
);

const AchievementCard = ({ title, description, unlocked }) => (
  <div
    className={`p-6 rounded-xl border ${
      unlocked
        ? 'bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border-primary-200 dark:border-primary-800'
        : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-50'
    }`}
  >
    <Trophy className={`w-12 h-12 mb-4 ${unlocked ? 'text-primary-600' : 'text-gray-400'}`} />
    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    <p className="text-xs text-primary-600 dark:text-primary-400 mt-2">
      {unlocked ? '✓ Unlocked' : '🔒 Locked'}
    </p>
  </div>
);

export default Dashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Mail, Lock, Github, Moon, Sun, ArrowLeft } from 'lucide-react';

const AuthCard = ({ onLogin, darkMode, toggleDarkMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication (in production, call your backend API)
    const userData = {
      email: formData.email,
      name: formData.name || formData.email.split('@')[0]
    };
    onLogin(userData);
    navigate('/dashboard');
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login
    const userData = {
      email: `user@${provider}.com`,
      name: `${provider} User`
    };
    onLogin(userData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent pointer-events-none" />
      
      {/* Top Bar */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-white hover:text-primary-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Auth Card */}
      <div className="glass-card p-8 md:p-12 max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-10 h-10 text-white" />
            <span className="text-3xl font-bold text-white">SmartLearn AI</span>
          </div>
          <p className="text-white/80">
            {isLogin ? 'Welcome back! Login to continue' : 'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                placeholder="John Doe"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-white/60" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-white text-primary-600 font-bold py-3 rounded-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-transparent text-white/80">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center space-x-2 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all border border-white/30 text-white font-semibold"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google</span>
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            className="flex items-center justify-center space-x-2 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-all border border-white/30 text-white font-semibold"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/80 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span className="font-semibold underline">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;

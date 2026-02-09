import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Brain, Award, Zap, Moon, Sun, PlayCircle, CheckCircle, TrendingUp } from 'lucide-react';

const LandingPage = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-card">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              SmartLearn AI
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="mb-8 inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              Powered by GPT-4o
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Transform Videos Into
            <br />
            Learning Experiences
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            AI-powered summaries, interactive quizzes, and key insights from any video.
            Learn smarter, not harder.
          </p>

          {/* Input Bar with Glassmorphism */}
          <div className="glass-card p-2 max-w-2xl mx-auto mb-8">
            <div className="flex items-center space-x-2">
              <PlayCircle className="w-6 h-6 text-primary-600 ml-4" />
              <input
                type="text"
                placeholder="Paste YouTube URL or video transcript..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-gray-800 dark:text-gray-200 placeholder-gray-500"
                onFocus={() => navigate('/auth')}
              />
              <button className="btn-primary whitespace-nowrap">
                Generate
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            ✨ Free trial • No credit card required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Everything You Need to Learn Faster
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Powerful AI features designed for serious learners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-12 h-12 text-primary-600" />}
              title="AI Summaries"
              description="Get concise 3-paragraph summaries that capture the essence of any video in seconds."
            />
            <FeatureCard
              icon={<Award className="w-12 h-12 text-primary-600" />}
              title="Auto-Generated Quizzes"
              description="Test your knowledge with 10 smart multiple-choice questions tailored to the content."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 text-primary-600" />}
              title="Key Insights"
              description="Instantly extract the 5 most important takeaways with AI-powered analysis."
            />
            <FeatureCard
              icon={<CheckCircle className="w-12 h-12 text-primary-600" />}
              title="Multi-Source Support"
              description="Works with YouTube URLs or direct transcript paste from any platform."
            />
            <FeatureCard
              icon={<TrendingUp className="w-12 h-12 text-primary-600" />}
              title="Learning History"
              description="Track your progress and revisit past summaries anytime in your dashboard."
            />
            <FeatureCard
              icon={<PlayCircle className="w-12 h-12 text-primary-600" />}
              title="Instant Results"
              description="Processing takes just 15-30 seconds. Learn faster, save hours of watching."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students, professionals, and lifelong learners using AI to learn smarter.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-white text-primary-600 font-bold py-4 px-8 rounded-lg text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Start Learning Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-6 h-6 text-primary-500" />
            <span className="text-xl font-bold text-white">SmartLearn AI</span>
          </div>
          <p className="mb-4">Powered by OpenAI GPT-4o • Built with FastAPI & React</p>
          <p className="text-sm">© 2026 SmartLearn AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

export default LandingPage;
